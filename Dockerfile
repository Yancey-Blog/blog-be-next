FROM node:12-alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3002

CMD ["yarn", "deploy"]
