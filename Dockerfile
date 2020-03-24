FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
  com.yanceyleo.version="0.13.0" \
  com.yanceyleo.release-date="2020-03-24"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci -d --registry=https://registry.npm.taobao.org

COPY . .

RUN npm run build

FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production -d --registry=https://registry.npm.taobao.org

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["pm2-runtime", "dist/main.js"]

# Builds
#
# docker build -t blog-be-next .

# Runs
#
# docker run blog-be-next