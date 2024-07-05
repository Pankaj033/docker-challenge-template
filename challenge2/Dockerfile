# use Node.js official image from docker hub
FROM node:latest

# create working directory in the  container
WORKDIR /app

# copy package.json and package-lock.json to the container
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files to the container
COPY . .

# expose port 3000
EXPOSE 3000

# run the app
CMD ["node", "app.js"]