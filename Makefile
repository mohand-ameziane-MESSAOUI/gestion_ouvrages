
.DEFAULT_GOAL = help

PORTFRONT?=8001
PORTBACK?=8000

install-back: ## install dependencies for the backend app
	cd Back-End; npm i
run-back:  ## run backend app 
	cd Back-End; npm run dev

install-front:  ## install dependencies for the frontend app
	cd Front-End; npm i
run-front:  ## run front end app in dev env
	cd Front-End; NUXT_PORT=$(PORTFRONT) npm run dev

run-app: install-back install-front run-back run-front  ## install and run back and front app

CreateUploadFolder: ## init upload Folders
	mkdir -p uploads/profile_images
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'