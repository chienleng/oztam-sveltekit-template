SHELL = /bin/bash

deploy_stage:
	@up deploy -v staging
.PHONY: deploy_stage

deploy_prod:
	@up deploy -v production
.PHONY: deploy_prod
