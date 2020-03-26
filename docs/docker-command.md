# Docker command

## Docker

```bash
# Builds
#
# docker build -t blog-be-next .

# Runs
#
# docker run -d -p 127.0.0.1:3002:3002 --name blog-be-next blog-be-next:latest

# MongoDB
#
# docker run -d -p 127.0.0.1:27019:27017 --name mongodb mongo:latest

# Enter MongoDB's container
#
# docker exec -it mongodb bash
```

## Docker compose

```bash
# Run
# docker-compose up -d
```
