FROM node:18.3.0-alpine

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
COPY . /app/
EXPOSE 8066

CMD ["npm", "run", "start"]