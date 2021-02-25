FROM node:15-alpine

WORKDIR /app
COPY . /app

RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]