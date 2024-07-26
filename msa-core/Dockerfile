FROM node:20.10-alpine3.18
ENV PROJECT_MSA_PATH=/home/${PROJECT_BASE_USER}/${PROJECT_BASE_NAME}/msa-${PROJECT_BASE_NAME}
WORKDIR /home/${PROJECT_BASE_USER}/${PROJECT_BASE_NAME}/msa-${PROJECT_BASE_NAME}
COPY ./ ./
RUN yarn install && yarn global add pm2
RUN apk add openrc
RUN pm2 startup -u node && env PATH=$PATH:/usr/bin pm2 startup openrc -u node --hp /home/${PROJECT_BASE_USER}/${PROJECT_BASE_NAME}/msa-${PROJECT_BASE_NAME} && pm2 save
RUN yarn build:all
USER node
CMD ["yarn", "pm2-docker:all"]
