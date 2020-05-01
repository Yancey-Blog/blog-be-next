FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
  com.yanceyleo.version="1.0.0" \
  com.yanceyleo.release-date="2020-05-02"

WORKDIR /usr/src/app

COPY . ./usr/src/app

RUN yarn install

RUN yarn build

COPY . ./usr/src/app


FROM node:12-alpine 

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

CMD ["yarn", "deploy"]