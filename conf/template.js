#!/usr/bin/env node

var config = require('./config');
var contexts = config.contexts;

for (const [index, context] of Object.entries(contexts)) {
  for (const [clusterIndex, cluster] of Object.entries(context.clusters)) {
    nginxFragment = `
  location ~ /k8s/${context.project}/${cluster.project}/${cluster.zone}/${cluster.cluster}(?<path>.*) {
    proxy_set_header Authorization "Bearer ${cluster.api.token}";
    proxy_pass https:\/\/${cluster.api.address}$path;
  }`
    console.log(nginxFragment)
  }
}
