FROM node:latest

WORKDIR ./backend

COPY package.json .
COPY yarn.lock .

RUN yarn install && \
    yarn cache clean --force

RUN npm install -g nodemon

COPY . .

CMD ["yarn", "dev"]
