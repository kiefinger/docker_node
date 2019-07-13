FROM node:latest
COPY [ "app" , "/app" ]
WORKDIR /app
#RUN groupadd -r ugis && useradd -r -g ecomsystems ecomsystems
EXPOSE 8080
ENTRYPOINT [ "/bin/sh" , "-c"  ]
CMD [ "node index.js"]

