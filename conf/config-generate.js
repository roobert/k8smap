#!/usr/bin/env node

var exec = require('child_process').exec;
var kubeConfig;

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

exec("kubectl config view --raw --output json",
   function (error, stdout, stderr) {
      if (error !== null) {
          console.log(stderr);
          console.log('exec error: ' + error);
      }

      kubeConfig = JSON.parse(stdout);
      config = { contexts: [] }

      for (const [index, context] of Object.entries(kubeConfig["contexts"])) {
        contextData = context.name.split('_');
        project     = contextData[1]
        region      = contextData[2].replace(/-.$/, "")
        zone        = contextData[2].split('-')[2]
        cluster     = contextData[3]

        clusterKey = context.context.cluster
        userKey    = context.context.user

        userData = findObjectByKey(kubeConfig.users, 'name' == userKey)
        var apiToken = userData['user']['auth-provider']['config']['access-token']

        clusterData = findObjectByKey(kubeConfig.clusters, 'name' == clusterKey)
        var apiAddress = clusterData['cluster']['server']

        config['contexts'].push({
          project: project,
          region: region,
          zone: zone,
          cluster: cluster,
          api: {
            server: apiAddress,
            token: apiToken
          }
        })
      }

      console.log('module.exports = ' + JSON.stringify(config, null, 2))
   });


