const WebSocket = require("ws");
const redis = require("redis");
let publisher;

const clients = [];

// Initialisieren des Websocket-Servers
const initializeWebsocketServer = async (server) => {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || "6379",
    },
  });
  // Dies ist der Abonnententeil
  const subscriber = client.duplicate();
  await subscriber.connect();
  // Dies ist der Publisher-Teil
  publisher = client.duplicate();
  await publisher.connect();

  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  websocketServer.on("error", console.error);
  await subscriber.subscribe("newMessage", onRedisMessage);
  await publisher.publish("newMessage", "Hello from Redis!");
};

// Wenn eine neue Verbindung aufgebaut wird, wird die onConnection-Funktion aufgerufen
const onConnection = (ws) => {
  console.log("New websocket connection");
  ws.on("close", () => onClose(ws));
  ws.on("message", (message) => onClientMessage(ws, message));
  ws.send("Hello Client!");
  clients.push(ws); // Client zum Array hinzu //
  // TODO!!!!!! Fügen Sie den Client zum clients-Array hinzu
};

// Wenn eine neue Nachricht empfangen wird, wird die onClientMessage-Funktion aufgerufen
const onClientMessage = (ws, message) => {
  console.log("Message received: " + message);
  publisher.publish("newMessage", message); // Sende Nachricht an den Redis-Kanal //
  //TODO!!!!!! Senden Sie die Nachricht an den Redis-Kanal
};

// Wenn eine neue Nachricht aus dem Redis-Kanal empfangen wird, wird die Funktion onRedisMessage aufgerufen
const onRedisMessage = (message) => {
  console.log("Message received: " + message);
  clients.forEach(client => client.send(message)); // Senden Nachricht an alle Clients //
  //TODO!!!!!! Senden Sie die Nachricht an alle verbundenen Clients
};

// Wenn eine Verbindung geschlossen wird, wird die onClose-Funktion aufgerufen
const onClose = (ws) => {
  console.log("Websocket connection closed");
  const index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1); // Entfernen den Client aus Array //
  }
  //TODO!!!!!! Entfernen Sie den Client aus dem clients-Array
};

module.exports = { initializeWebsocketServer };
