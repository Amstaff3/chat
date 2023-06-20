
//Server_Code// zeigt chats korrekt an!!!!
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

  const subscriber = client.duplicate();
  await subscriber.connect();
  publisher = client.duplicate();
  await publisher.connect();

  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  websocketServer.on("error", console.error);
  await subscriber.subscribe("newMessage", onRedisMessage);
  await publisher.publish("newMessage", "Hello from Redis!");
};

const onConnection = (ws) => {
  console.log("New websocket connection");
  ws.on("close", () => onClose(ws));
  ws.on("message", (message) => onClientMessage(ws, message));
  ws.send("Hello Teko Client!");
  clients.push(ws);
};

const onClientMessage = (ws, message) => {
  console.log("Message received: " + message);
  publisher.publish("newMessage", message);
};

const onRedisMessage = (message) => {
  console.log("Redis Message received: " + message);
  clients.forEach((client) => client.send(message));
};

const onClose = (ws) => {
  console.log("Websocket connection closed");
  const index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1);
  }
};

module.exports = { initializeWebsocketServer };

/*
Letzter Versuch eine User Liste und namensänderung zu Implementieren wie immer gescheitert

//Server_Code// zeigt chats korrekt an!!!!
const WebSocket = require("ws");
const redis = require("redis");

let publisher;
const clients = [];

// Initialisieren des WebSocket-Servers
const initializeWebsocketServer = async (server) => {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || "6379",
    },
  });

  const subscriber = client.duplicate();
  await subscriber.connect();
  publisher = client.duplicate();
  await publisher.connect();

  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  websocketServer.on("error", console.error);
  await subscriber.subscribe("newMessage", onRedisMessage);
  await publisher.publish("newMessage", "Hallo von Redis!");
};

const onConnection = (ws) => {
  console.log("Neue WebSocket-Verbindung");
  ws.on("close", () => onClose(ws));
  ws.on("message", (message) => onClientMessage(ws, message));
  ws.send("Hallo Teko Client!");
  clients.push(ws);
};

const onClientMessage = (ws, message) => {
  console.log("Nachricht empfangen: " + message);
  const parsedMessage = JSON.parse(message);

  if (parsedMessage.type === "changeUsername") {
    // Aktualisiere den Benutzernamen in der Liste der aktiven Benutzer
    activeUsers[client.id] = parsedMessage.username;
    broadcastActiveUsers();
    return;
  }

  publisher.publish("newMessage", message);
};


const onRedisMessage = (message) => {
  console.log("Redis-Nachricht empfangen: " + message);
  clients.forEach((client) => client.send(message));
};

const onClose = (ws) => {
  console.log("WebSocket-Verbindung geschlossen");
  const index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1);
  }
};

module.exports = { initializeWebsocketServer };
*/

//-------------------------------------------------------------------------------------------//

//Test probier eine userlist zu erstellen geht nicht //
/*const WebSocket = require("ws");
const redis = require("redis");

let publisher;
const clients = [];
const activeUsers = new Set();

const initializeWebsocketServer = async (server) => {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || "6379",
    },
  });

  const subscriber = client.duplicate();
  await subscriber.connect();
  publisher = client.duplicate();
  await publisher.connect();

  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  websocketServer.on("error", console.error);
  await subscriber.subscribe("newMessage", onRedisMessage);
  await publisher.publish("newMessage", "Hello from Redis!");
};

const onConnection = (ws) => {
  console.log("New websocket connection");
  ws.on("close", () => onClose(ws));
  ws.on("message", (message) => onClientMessage(ws, message));
  ws.send("Hello Teko Client!");

  // Füge den Benutzer zur Liste der aktiven Benutzer hinzu
  activeUsers.add(ws);

  // Sende die aktualisierte Benutzerliste an alle Clients
  broadcastActiveUsers();
};

const onClientMessage = (ws, message) => {
  console.log("Message received: " + message);
  publisher.publish("newMessage", message);
};

const onRedisMessage = (message) => {
  console.log("Redis Message received: " + message);
  clients.forEach((client) => client.send(message));
};

const onClose = (ws) => {
  console.log("Websocket connection closed");
  const index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1);
  }

  // Entferne den Benutzer aus der Liste der aktiven Benutzer
  activeUsers.delete(ws);

  // Sende die aktualisierte Benutzerliste an alle Clients
  broadcastActiveUsers();
};

const broadcastActiveUsers = () => {
  const activeUsersArray = Array.from(activeUsers).map((ws) => ws.getClientName());
  clients.forEach((client) => client.send(JSON.stringify({ type: "userList", payload: activeUsersArray })));
};


module.exports = { initializeWebsocketServer };
*/

//--------------------------------------------------------------------------------------------//

/*
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

// Implementiren vom Namen //
// Elemente zum Anzeigen des Clientnamens und der Chat-Nachrichten //
const clientNameInput = document.getElementById("clientName");
const chatMessages = document.getElementById("chatMessages");

// Event-Listener für das Senden einer Nachricht über die WebSocket-Verbindung //
document.getElementById("send1").addEventListener("click", function () {
  const clientName = clientNameInput.value;
  const messageInput = document.getElementById("message1");
  const message = messageInput.value;

  // Überprüfen, ob sowohl der Clientname als auch die Nachricht vorhanden sind //
  if (clientName && message) {
    // Nachricht formatieren: "[Clientname]: [Nachricht]" //
    const formattedMessage = `${clientName}: ${message}`;

    // Nachricht an den Server senden
    socket.send(formattedMessage);
    messageInput.value = "";

    // Anzeigen der gesendeten Nachricht auf der Webseite //
    displayMessage(formattedMessage);
  }
});

// Event-Listener für das Empfangen von Nachrichten über die WebSocket-Verbindung //
socket.addEventListener("message", (event) => {
  const message = event.data;
  displayMessage(message);
});

// Funktion zum Anzeigen der Nachricht auf der Webseite //
function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}


module.exports = { initializeWebsocketServer };
*/

