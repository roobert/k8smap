#!/usr/bin/env node

var execSync = require('child_process').execSync;

try {
  configResult = execSync("kubectl config view --raw --output json").toString();

  kubeConfig = JSON.parse(configResult);

  config = { contexts: [] }

  for (const [index, context] of Object.entries(kubeConfig["contexts"])) {
    contextData = context.name.split('_')

    if (contextData.length != 4) {
      continue
    }

    name        = context.name
    project     = contextData[1]
    region      = contextData[2].replace(/-.$/, "")
    zone        = contextData[2].split('-')[2]
    cluster     = contextData[3]

    clusterKey = context.context.cluster
    userKey    = context.context.user

    if (clusterKey == "" || userKey == "") {
      continue
    }

    secretsCommand = 'kubectl get secret --output json --cluster ' + context.name

    var secretsResult

    try {
      console.error('# generating config for: ' + context.name)
      secretsResult = execSync(secretsCommand, {timeout: 3000}).toString();
    } catch(err) {
      if (err.code === 'ETIMEOUT') {
        continue
      }
    }

    secrets = JSON.parse(secretsResult)

    secret = secrets.items.find(function (obj) { return /^default.*/.test(obj.metadata.name) });
    apiToken = Buffer.from(secret.data.token, 'base64').toString()

    clusterData = kubeConfig.clusters.find(function (obj) { return obj.name === clusterKey });
    apiAddress = clusterData['cluster']['server']

    //userData = findObjectByKey(kubeConfig.users, 'name' == userKey)
    //var apiToken = userData['user']['auth-provider']['config']['access-token']
    clusterConfig = {
      name,
      project,
      region,
      zone,
      cluster,
      api: {
        server: apiAddress,
        token: apiToken
      }
    }

    //console.log(JSON.stringify(clusterConfig, null, 2))

    config['contexts'].push(clusterConfig)

  }
  console.log('export default ' + JSON.stringify(config, null, 2))
} catch (error) {
  console.log(error)
}
