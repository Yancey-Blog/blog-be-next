FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

RUN yarn build

COPY . .

EXPOSE 3002

CMD ["yarn", "deploy"]