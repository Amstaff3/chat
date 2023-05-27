// Erstellt eine neue WebSocket-Verbindung
const socket = new WebSocket("ws://localhost:3000");

// Event-Listener für das Öffnen der WebSocket-Verbindung
socket.addEventListener("open", (event) => {
  console.log("WebSocket verbunden!");
  const message = document.getElementById("message");
  socket.send("Hallo, Server!");
});

// Event-Listener für das Empfangen von Nachrichten über die WebSocket-Verbindung
socket.addEventListener("message", (event) => {
  console.log(`Nachricht empfangen: ${event.data}`);
  const chatMessages = document.getElementById("chatMessages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message1");
  messageElement.textContent = event.data;
  chatMessages.appendChild(messageElement);
});

// Event-Listener für das Schließen der WebSocket-Verbindung
socket.addEventListener("close", (event) => {
  console.log("WebSocket geschlossen.");
});

// Event-Listener für Fehler in der WebSocket-Verbindung
socket.addEventListener("error", (event) => {
  console.error("WebSocket-Fehler:", event);
});

// Funktion zum Senden einer Nachricht über die WebSocket-Verbindung, wenn der Button geklickt wird
function sendMessage() {
  const messageInput = document.getElementById("message1");
  socket.send(messageInput.value);
  messageInput.value = "";
}


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