FROM node:21-bookworm

WORKDIR /codechick

# RUN npm config set strict-ssl false
COPY --link package*.json ./
RUN npm install

COPY --link . .

RUN npx prisma generate
RUN npm run build
RUN npm prune

CMD ["node", ".output/server/index.mjs"]