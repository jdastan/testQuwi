FROM node:8.12-alpine

COPY ./ /app

WORKDIR /app

ENV HOST 0.0.0.0
ENV PORT 80
ENV ENV_SILENT true

EXPOSE 80

RUN npm ci \
 && npm run lint \
 && npm run build \
 && npm prune --production

ENTRYPOINT ["npm", "start"]
