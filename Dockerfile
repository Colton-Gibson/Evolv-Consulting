#syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
RUN mkdir /evolv
WORKDIR /evolv
ADD . /evolv
COPY . . /src/data /server/app.js /server ./
RUN npm install --production
CMD ["node", "server/app.js"]