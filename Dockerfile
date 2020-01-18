FROM node:12.14-alpine3.9

RUN mkdir -p /pop-app

COPY ./package.json /pop-app
WORKDIR /pop-app

RUN npm install --production
COPY ./dist /pop-app/dist

CMD ["npm", "run", "serve:ssr"]
