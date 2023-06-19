# Offizielles Node.js-Image als Basis
FROM node:latest

# Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiert die package.json und package-lock.json in den Container
COPY package.json package-lock.json ./

# Installiert die Abhängigkeiten
RUN apt-get update && \
    apt-get install -y nginx && \
    npm install -g ws uuid redis nodemon livereload connect-livereload 

# Installiere die Abhängigkeiten
RUN yarn install

# Manuelle Installation von 'express'
RUN npm install express

# Kopiert den Rest des Codes in den Container
COPY . .
COPY websocketserver.js /app
COPY app.js /app

# Startskript für den Webserver
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Setzt den Port, den die Anwendung im Container öffnet
EXPOSE 3000
EXPOSE 80

# Starte die Anwendung beim Start des Containers
CMD ["yarn", "start"]