//Client_Server//
const socket = new WebSocket("ws://localhost:3000");

// Event-Listener für das Empfangen von Nachrichten über die WebSocket-Verbindung //
socket.addEventListener("message", (event) => {
  console.log(`Nachricht empfangen: ${event.data}`);
  displayMessage(event.data);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket geschlossen.");
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket-Fehler:", event);
});

// Wenn Benutzer eine Nachricht senden möchte, liest den Inhalt des Texteingabefelds, 
//formatiert die Nachricht und sendet sie über WebSocket an Server,
//Anschliessend wird Texteingabefeld geleert und formatierte Nachricht wird zur Anzeige hinzugefügt.
function sendMessage() {
  const messageInput = document.getElementById("message1");
  const message = messageInput.value;
  if (message) {
    const formattedMessage = `${getClientName()}: ${message}`;
    socket.send(formattedMessage);
    messageInput.value = "";
    /*displayMessage(formattedMessage);*/
  }
}

function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message1");
  const messageText = document.createElement("p");
  messageText.textContent = message;
  messageElement.appendChild(messageText);
  chatMessages.appendChild(messageElement);
}

// Tastatur überprüfung ob es eineEingabetaste ist //
function handleKeyDown(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Namenseingabefelds und gibt eingegebenen Namen zurück oder den Standardnamen "Anonym", wenn kein Name angegeben wurde //
function getClientName() {
  return document.getElementById("clientName").value || "Anonym";
}

const chatMessages = document.getElementById("chatMessages");




/* Ausgabe ohne style und wird zwei mal angezeigt weil der Event-Listener für das Empfangen von Nachrichten sowohl im JavaScript-Code als auch im WebSocket-Server-Code hinzugefügt ist 
const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", (event) => {
  console.log("WebSocket verbunden!");
  const message = document.getElementById("message1");
  socket.send(`Hallo, Server! Mein Name ist ${getClientName()}`);
  message.value = "";
});

socket.addEventListener("message", (event) => {
  console.log(`Nachricht empfangen: ${event.data}`);
  displayMessage(event.data);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket geschlossen.");
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket-Fehler:", event);
});

function sendMessage() {
  const messageInput = document.getElementById("message1");
  const message = messageInput.value;
  if (message) {
    const formattedMessage = `${getClientName()}: ${message}`;
    socket.send(formattedMessage);
    messageInput.value = "";
    displayMessage(formattedMessage);
  }
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function getClientName() {
  return document.getElementById("clientName").value || "Anonym";
}

const chatMessages = document.getElementById("chatMessages");

function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}
/*
/* ohne UserName Code
// Erstellt eine neue WebSocket-Verbindung //
const socket = new WebSocket("ws://localhost:3000");

// Event-Listener für das Öffnen der WebSocket-Verbindung //
socket.addEventListener("open", (event) => {
  console.log("WebSocket verbunden!");
  const message = document.getElementById("message");
  socket.send("Hallo, Server!");
});

// Event-Listener für das Empfangen von Nachrichten über die WebSocket-Verbindung //
socket.addEventListener("message", (event) => {
  console.log(`Nachricht empfangen: ${event.data}`);
  const chatMessages = document.getElementById("chatMessages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message1");
  messageElement.textContent = event.data;
  chatMessages.appendChild(messageElement);
});

// Event-Listener für das Schliessen der WebSocket-Verbindung //
socket.addEventListener("close", (event) => {
  console.log("WebSocket geschlossen.");
});

// Event-Listener für Fehler in der WebSocket-Verbindung //
socket.addEventListener("error", (event) => {
  console.error("WebSocket-Fehler:", event);
});

// Funktion zum Senden einer Nachricht über die WebSocket-Verbindung, wenn der Button geklickt wird //
function sendMessage() {
  const messageInput = document.getElementById("message1");
  socket.send(messageInput.value);
  messageInput.value = "";
} 

// Funktion mit enter senden weill es mich nervte //
function handleKeyDown(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Element zum Anzeigen der Chat-Nachrichten //
const chatMessages = document.getElementById("chatMessages");

// Funktion zum Anzeigen der Nachricht auf der Webseite //
function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}

  // Anzeigen der gesendeten Nachricht auf der Webseite //
  displayMessage(message);
  /*





/*zum Testen alt ohne Websocket*
document.getElementById('send1').addEventListener('click', function() {
  var message = document.getElementById('message1').value;
  var messages = document.getElementById('chatMessages');
  messages.innerHTML += '<div class="message1"><img src="img/profile.jpg" alt="User 1 Profile Picture"><p>' + message + '</p></div>';
  document.getElementById('message1').value = '';
});
*/

/*Alter Code keine Anzeige in HTML 
// Erstellelt neue WebSocket-Verbindung //
const socket = new WebSocket("ws://localhost:3000");

// Event-Listener für das Öffnen der WebSocket-Verbindung //
socket.addEventListener("open", (event) => { 
  console.log("WebSocket connected!");
  const message = document.getElementById("message")
  socket.send("Hello, server!");
});

// Event-Listener für das Empfangen von Nachrichten über die WebSocket-Verbindung //
socket.addEventListener("message", (event) => { 
  console.log(`Received message: ${event.data}`);
});

// Event-Listener für das Schliessen der WebSocket-Verbindung //
socket.addEventListener("close", (event) => { 
  console.log("WebSocket closed.");
});

// Event-Listener für Fehler in der WebSocket-Verbindung //
socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});

// Event-Listener für das Senden einer Nachricht über die WebSocket-Verbindung, wenn der Button geklickt wird//
document.getElementById('send1').addEventListener('click', function() {
  const messageInput = document.getElementById('message1');
  socket.send(messageInput.value);
  messageInput.value = '';
});
*/