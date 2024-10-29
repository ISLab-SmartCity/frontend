# Build stage
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 파일을 nginx로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 12312 포트 노출
EXPOSE 12312

CMD ["nginx", "-g", "daemon off;"]
