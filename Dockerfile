FROM node:alpine AS builder

COPY . .
RUN yarn install
RUN yarn build

FROM nginx:alpine

COPY --from=builder /build /build
