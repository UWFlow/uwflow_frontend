FROM node:16-alpine AS builder

WORKDIR /work

COPY . .
RUN yarn install
RUN yarn lint-nofix
RUN yarn build

FROM nginx:alpine

COPY --from=builder /work/build /build
