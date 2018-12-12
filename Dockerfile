FROM node:7.6

# Set environment variables
ENV appDir /var/www/app/current
ENV PORT 5000

# Run updates and install deps
RUN apt-get update -y && \
    rm -rf /var/lib/apt/lists/*

# Set the work directory
RUN mkdir -p /var/www/app/current
WORKDIR ${appDir}

# install typescript compiler globally
RUN npm install -g typescript --quiet

# install Angular CLI
RUN npm install -g @angular/cli

RUN npm install -g bower grunt-cli

# Add our package.json and install *before* adding our app files
ADD package.json ./
RUN npm i --quiet

# Add app files
COPY . /var/www/app/current

# compile & build project
#RUN npm install

#Expose the port
#EXPOSE 5000

#CMD ["grunt", "express_dev"]
