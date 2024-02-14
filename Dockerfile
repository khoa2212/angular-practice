FROM node:20.10.0:alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm install -g @angular/cli

EXPOSE 4200

CMD [ "npm", "start" ]