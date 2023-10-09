FROM node:18-alpine

WORKDIR /bloodPressure/nodejs

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install 


RUN  npm install -g @babel/core @babel/cli

COPY  . .

CMD [ "npm", "run","nodemon" ]
