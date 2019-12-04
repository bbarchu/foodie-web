docker-build:
	docker build -t foodie:web .

docker-run:
	docker run -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm foodie:web
