FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production -d --registry=https://registry.npm.taobao.org

COPY . .

RUN npm run build

FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

CMD ["pm2-runtime", "dist/main.js"]