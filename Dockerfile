FROM node:alpine

WORKDIR /app

COPY . /app

RUN yarn install && \
    yarn build

RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
