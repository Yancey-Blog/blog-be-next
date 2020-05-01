FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
  com.yanceyleo.version="1.1.0" \
  com.yanceyleo.release-date="2020-05-01"

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build


FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3002

CMD ["yarn", "deploy"]