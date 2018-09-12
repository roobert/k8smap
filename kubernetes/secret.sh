#!/usr/bin/env bash

VUE_CONFIG_FILE="${1:-../conf/config.vue.json}"
NGINX_CONFIG_FILE="${1:-../conf/nginx.conf.docker}"

set -euo pipefail

NGINX_CONFIG=$(cat ${NGINX_CONFIG_FILE} | base64 -w0)
VUE_CONFIG=$(cat ${VUE_CONFIG_FILE} | base64 -w0)

cp -v secret.yaml.tmpl secret.yaml

echo "  nginx.conf: $NGINX_CONFIG" >> secret.yaml
echo "  config.vue.json: $VUE_CONFIG" >> secret.yaml

#sed "s/VUE_CONFIG/`cat ${VUE_CONFIG_FILE}|base64 -w0`/g" secret.yaml.tmpl > secret.yaml
#sed "s/NGINX_CONFIG/$(cat ${NGINX_CONFIG_FILE}|base64 -w0)/g" secret.yaml.tmpl > secret.yaml
