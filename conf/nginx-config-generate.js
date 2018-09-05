#!/usr/bin/env node

let config = require('./config.js')

for (const [index, context] of Object.entries(config.contexts)) {
  nginxFragment = `
    location ~ /k8s/${context.project}/${context.region}/${context.zone}/${context.cluster}(?<path>.*) {
       proxy_set_header Authorization "Bearer ${context.api.token}";
       proxy_pass ${context.api.address}$path;
    }`

  console.log(nginxFragment)
}
