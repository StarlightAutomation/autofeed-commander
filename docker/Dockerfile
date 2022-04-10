FROM node:16

RUN mkdir -p /tmp/app
WORKDIR /tmp/app

COPY . /tmp/app

RUN apt update -y
RUN yarn install --network-timeout 100000 && yarn build

RUN mkdir -p /usr/src/app

RUN mv node_modules /usr/src/app && \
    mv assets /usr/src/app && \
    mv nuxt.config.js /usr/src/app && \
    mv package.json /usr/src/app && \
    mv .nuxt /usr/src/app

WORKDIR /usr/src/app
RUN rm -rf /tmp/app

EXPOSE 3000

CMD []
