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

        if (contextData.length != 4) {
          continue
        }

        project     = contextData[1]
        region      = contextData[2].replace(/-.$/, "")
        zone        = contextData[2].split('-')[2]
        cluster     = contextData[3]

        clusterKey = context.context.cluster
        userKey    = context.context.user

        if (clusterKey == "" || userKey == "") {
          continue
        }

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

      console.log('export default ' + JSON.stringify(config, null, 2))
   });


