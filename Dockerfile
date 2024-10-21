
# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY tsconfig.json .
COPY *.ts .

# Add crontab file in the cron directory
COPY crontab /etc/cron.d/check-vm-status-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/check-vm-status-cron

# Apply cron job
RUN crontab /etc/cron.d/check-vm-status-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Start cron and the application
#CMD cron && tail -f /var/log/cron.log
CMD ["/usr/sbin/crond", "-f", "-d", "0"]