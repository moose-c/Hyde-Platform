# alpine contains smaller version of the specified images, done locally to save space and setup time
FROM node:alpine

# copy files from current directory to working directory
WORKDIR /app/website
COPY . .

# install serve
RUN npm install -g serve

EXPOSE 80

# launch production server
CMD [ "serve", "-s", "build", "-l", "tcp://0.0.0.0:80" ]
