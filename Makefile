#PATH="/usr/local/bin:../node_modules/.bin:$PATH"

.DEFAULT_GOAL := serve

install:
	npm install
	sudo npm install -g @vue/cli-service-global

configure:
	@cd conf \
	&& generate-nginx-config.sh

build:

serve:
	@cd src \
	&& vue serve
