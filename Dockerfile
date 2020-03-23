FROM node:12-alpine

LABEL maintainer="Yancey Leo <yanceyofficial@gmail.com>" \
    version="0.1" 

COPY . /home/blog

RUN cd /home/blog && npm install --production -d --registry=https://registry.npm.taobao.org

WORKDIR /home/blog

EXPOSE 3002

CMD ["yarn", "start"]