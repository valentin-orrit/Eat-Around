FROM node:22.0.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV NODE_ENV=development

EXPOSE 3000

CMD [ "npm", "run", "dev" ]