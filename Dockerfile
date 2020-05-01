FROM node:12-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

COPY . .

EXPOSE 3002

CMD ["yarn", "deploy"]