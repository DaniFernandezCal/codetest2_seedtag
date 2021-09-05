FROM node:14-alpine

EXPOSE 8888
WORKDIR /seedtagtest
COPY . /seedtagtest
RUN npm install
RUN npm run prepare
CMD ["node", "./dist/src/index.js"]