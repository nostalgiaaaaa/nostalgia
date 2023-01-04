#build phase
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# run phase
FROM nginx
# build 폴더 복사 , 다른 phase 에서 가져옴
# nginx port 
EXPOSE 80
# from , destination
COPY --from=builder /app/build /usr/share/nginx/html
#start 는 디폴트