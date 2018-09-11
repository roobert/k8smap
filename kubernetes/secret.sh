#!/usr/bin/env bash

CONFIG_FILE="${1:-$HOME/git/k8smap/conf/tmp/config.mjs}"

set -euo pipefail
sed "s/CONFIG/`cat ${CONFIG_FILE}|base64 -w0`/g" secret.yaml.tmpl > secret.yaml
