#!/usr/bin/env node

import context from '../config'

var exec = require('child_process').exec;

exec('cat template/nginx.conf.header',
  function (error, stdout, stderr) {
    if (error !== null) {
      console.log(stderr);
      console.log('exec error: ' + error);
    }

    console.log(stdout)

    for (const [index, context] of Object.entries(config.contexts)) {
      nginxFragment = `
        location ~ /k8s/${context.project}/${context.region}/${context.zone}/${context.cluster}(?<path>.*) {
           proxy_set_header Authorization "Bearer ${context.api.token}";
           proxy_pass ${context.api.server}$path;
        }`

      // FIXME
      console.log(nginxFragment.replace(/^      /g, ''))
    }
    console.log('}')
})
