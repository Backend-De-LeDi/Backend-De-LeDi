FROM node:24.11.0

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./dist ./dist

EXPOSE 3402

CMD ["node", "dist/src/index.js"]

