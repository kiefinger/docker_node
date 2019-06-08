FROM node:8.16.0
#RUN groupadd -r ecomsytems && useradd -r -g ecomsytems ecomsytems
COPY app          /home/node/utl-api-node-mdb/app
COPY test         /home/node/utl-api-node-mdb/test
COPY package.json /home/node/utl-api-node-mdb
WORKDIR           /home/node/utl-api-node-mdb
RUN npm install
RUN npm install mocha --save-dev
EXPOSE 1337
ENTRYPOINT [ "/bin/sh" , "-c"  ]
#CMD [ "node index.js"]
CMD [ "npm start"]

