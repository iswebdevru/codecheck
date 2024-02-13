FROM node:20.10.0

ENV APP_ROOT /web

WORKDIR ${APP_ROOT}

ADD . ${APP_ROOT}

RUN npm ci

RUN npm run build
RUN cp .env .output/server/
RUN npx prisma migrate deploy
CMD node .output/server/index.mjs