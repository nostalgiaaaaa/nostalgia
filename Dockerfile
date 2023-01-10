#build phase
FROM node:alpine as builder
WORKDIR '/app'
ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
RUN npm install #package.json
RUN npm run build

# run phase
FROM nginx:latest
# build 폴더 복사 , 다른 phase 에서 가져옴
# nginx port 
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# from , destination
# COPY --from=builder /app/build /usr/share/nginx/html
#start 는 디폴트