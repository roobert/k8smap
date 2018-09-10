#!/usr/bin/env node --experimental-modules

//let config = require('../config.js')
import config from '../tmp/config.common.mjs'
import { execSync } from 'child_process'

var headerFile=(process.argv[2])

var nginxHeader = execSync('cat ' + headerFile).toString()

console.log(nginxHeader)

for (const [index, context] of Object.entries(config.contexts)) {
  console.error("# generating config for " + context.name)
  var nginxFragment = `
    location ~ /k8s/${context.project}/${context.region}/${context.zone}/${context.cluster}(?<path>.*) {
       proxy_set_header Authorization "Bearer ${context.api.token}";
       proxy_pass ${context.api.server}$path;
    }`

  console.log(nginxFragment.replace(/^      /g, ''))
}

console.log('}')
