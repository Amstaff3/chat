
const express = require("express");
const http = require("http");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const { initializeWebsocketServer } = require("./websocketserver");
const { initializeAPI } = require("./server/api");

// Erstelle den Express-Server
const app = express();
const server = http.createServer(app);

// Erstelle einen LiveReload-Server
const env = process.env.NODE_ENV || "development";
if (env !== "production") {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
 // Verwende das LiveReload-Middleware
  app.use(connectLiveReload());
}

// Liefere statische Dateien aus dem "client"-Verzeichnis wie CSS, JavaScript und Bilder
app.use(express.static("client"));
// Route für die Startseite
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// Ermögliche Top-Level Await
(async function () {
   // Initialisiere den WebSocket-Server
  await initializeWebsocketServer(server);
  // Initialisiere die REST-API
  initializeAPI(app);
  // Starte den Webserver
  const serverPort = process.env.PORT || 3000;
  server.listen(serverPort, () => {
    console.log(
      `Express Server started on port ${serverPort} as '${env}' Environment`
    );
  });
})();
