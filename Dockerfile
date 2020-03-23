FROM node:12-alpine

LABEL maintainer="Yancey Leo <yanceyofficial@gmail.com>" \
    version="0.1" 

WORKDIR /home/blog

COPY package.json yarn.lock ./

RUN npm ci --production -d --registry=https://registry.npm.taobao.org

COPY . /home/blog

CMD ["pm2-runtime", "deploy"]

# 第一阶段，拉取 node 基础镜像并安装依赖，执行构建
FROM node:11-alpine as builder

WORKDIR /tmp
COPY . .
RUN npm config set registry https://registry.npm.taobao.org \
    && npm i -g yarn
RUN yarn && yarn build

# 第二阶段，将构建完的产物 build 文件夹 COPY 到实际 release 的镜像中，会丢弃第一阶段中其他的文件
FROM nginx:alpine

COPY .docker/conf/default.conf /etc/nginx/conf.d/
COPY --from=builder /tmp/build /usr/share/nginx/html

EXPOSE 80
