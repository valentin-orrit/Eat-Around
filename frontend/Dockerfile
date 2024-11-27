FROM node:22.0.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

## EXPORT PORT IN vite.config FILE
EXPOSE 5173 

CMD [ "npm", "run", "dev" ]