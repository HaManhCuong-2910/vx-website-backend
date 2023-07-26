# Base image
FROM node:16-alpine
# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./


# Install app dependencies
RUN npm install --force

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

ENV PORT=2080
ENV DATABASE_URL="mongodb+srv://cuonghm:vanha110100@cluster0.e74cvwr.mongodb.net/vx-database?retryWrites=true&w=majority"
ENV MAIL_SERVICE_USER="cuonghamanhcuong12@gmail.com"
ENV MAIL_SERVICE_PASS="uohszegpljkaxbjt"

EXPOSE 8080


# Start the server using the production build
CMD [ "node", "dist/main.js" ]
