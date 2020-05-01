FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
  com.yanceyleo.version="1.0.0" \
  com.yanceyleo.release-date="2020-05-02"

WORKDIR /usr/src/api

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build


FROM node:12-alpine

WORKDIR /usr/src/api

COPY --from=builder /usr/src/api/ .

EXPOSE 3002

CMD ["yarn", "deploy"]
