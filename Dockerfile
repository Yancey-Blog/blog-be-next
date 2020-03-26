FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
  com.yanceyleo.version="0.13.0" \
  com.yanceyleo.release-date="2020-03-24"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -d --registry=https://registry.npm.taobao.org

COPY . .

RUN npm run build


FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./

RUN npm ci --only=production -d --registry=https://registry.npm.taobao.org

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3002

CMD ["yarn", "deploy"]

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