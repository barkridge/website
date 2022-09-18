FROM node:lts as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build
RUN yarn exec prisma generate

FROM node:lts

ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY . .

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

EXPOSE 3000

CMD ["yarn", "start"]
