#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:../node_modules/.bin:$PATH"

vue serve
