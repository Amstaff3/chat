# Verwende das offizielle Node.js-Image als Basisimage
FROM node:18

# Setze das Arbeitsverzeichnis innerhalb des Containers
WORKDIR /app

# Kopiere die package.json und package-lock.json Dateien in den Container
COPY package.json package-lock.json ./

# Installiere die Abhängigkeiten
RUN yarn install

# Kopiere den Quellcode in den Container
COPY . .

# Starte den Server beim Starten des Containers
CMD ["yarn", "start"]

