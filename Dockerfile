FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
  com.yanceyleo.version="1.0.0" \
  com.yanceyleo.release-date="2020-05-01"

WORKDIR /app

COPY . .

RUN yarn install

RUN npm run build

EXPOSE 3002

CMD ["yarn", "deploy"]