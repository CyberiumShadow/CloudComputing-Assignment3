ARG ARCH=
FROM ${ARCH}node:14-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 3000
CMD [ "node", "src/index.js" ]