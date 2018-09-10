#!/usr/bin/env node --experimental-modules

import config from '../conf/config.common.mjs'
import { execSync } from 'child_process'

var vueConfig = { "contexts": [] }

for (const [index, context] of Object.entries(config.contexts)) {
  console.error("# generating config for: " + context.name)
  vueConfig["contexts"].push({
    name: context.name,
    project: context.project,
    region: context.region,
    zone: context.zone
  })
}

console.log("export default " + JSON.stringify(vueConfig, null, 2))
