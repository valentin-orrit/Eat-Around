FROM node:22.14.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

## EXPORT PORT IN vite.config FILE
EXPOSE 5173 

CMD [ "npm", "run", "dev" ]