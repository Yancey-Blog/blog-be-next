FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
  com.yanceyleo.version="0.13.0" \
  com.yanceyleo.release-date="2020-03-24"

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build


FROM node:12-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=builder /app/dist ./dist

EXPOSE 3002

CMD ["yarn", "deploy"]