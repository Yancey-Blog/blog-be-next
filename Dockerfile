FROM node:12-alpine

LABEL maintainer="Yancey Leo <yanceyofficial@gmail.com>" \
    version="0.1" 

WORKDIR /home/blog

COPY package.json yarn.lock ./

RUN npm install --production -d --registry=https://registry.npm.taobao.org

COPY . /home/blog

RUN npm build

CMD ["npm", "deploy"]