#!/usr/bin/env bash

cat nginx.conf.header > nginx.conf
./template.js >> nginx.conf
echo '}' >> nginx.conf
