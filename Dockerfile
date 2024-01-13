FROM node:latest

WORKDIR .

COPY package.json .
COPY yarn.lock .

RUN yarn install && \
    yarn cache clean --force

RUN yarn install

COPY . ./

CMD ["yarn", "dev"]