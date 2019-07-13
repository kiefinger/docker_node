FROM node:8.16.0
COPY app          /home/node/utl-api-node-prod/app
WORKDIR /home/node/utl-api-node-prod/app
#RUN groupadd -r ugis && useradd -r -g ecomsystems ecomsystems
EXPOSE 1337
ENTRYPOINT [ "/bin/sh" , "-c"  ]
CMD [ "node index.js"]

