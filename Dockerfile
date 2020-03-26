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
