PATH  := ./node_modules/.bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/bash

.DEFAULT_GOAL := serve

install:
	npm install
	sudo npm install -g @vue/cli-service-global

configure:
	@cd conf \
	&& ./bin/config-generate.js > config.js \
	&& ./bin/nginx-config-generate.js > nginx.conf

build:

serve:
	@cd src \
	&& vue serve
