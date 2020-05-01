FROM node:12-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3002

CMD ["yarn", "deploy"]
