const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('[WebSocket] Starting WebSocket server on port 8080');

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('[WebSocket] New client connected');

  // Enviar un mensaje de ejemplo cuando un cliente se conecta
  const exampleMessage = 'Servidor: ¡Bienvenido al chat grupal!';
  ws.send(exampleMessage);

  ws.on('message', (message) => {
    console.log(`[WebSocket] Received message: ${message}`);

    // Broadcast the message to all clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('[WebSocket] Client disconnected');
  });
});