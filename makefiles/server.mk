### SERVER
server.start: ## Start with docker-compose.yml
	sudo docker-compose stop
	sudo docker-compose down
	sudo docker-compose up

server.startdev: ## Start with docker-compose.yml
	sudo docker-compose stop
	sudo docker-compose down
	sudo docker-compose -f docker-compose-dev.yml up

server.daemon: ## Start daemon docker-compose.yml
	sudo docker-compose up -d

server.stop: ## Stop running images
	sudo docker-compose stop

server.rebuild: ## Delete images and rebuild
	sudo docker-compose stop
	sudo docker-compose down
	sudo docker-compose up
