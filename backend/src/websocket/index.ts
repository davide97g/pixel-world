import { type WebSocket, WebSocketServer } from 'ws';

interface PixelData {
  x: number;
  y: number;
  color: string;
  userId: string;
}

const port = 3001;
const wss = new WebSocketServer({ port });

console.log(`WebSocket server is running on ws://localhost:${port}`);

// Broadcast function to send data to all connected clients
const broadcast = (data: string, sender?: WebSocket) => {
  if (!sender) return;
  // biome-ignore lint/complexity/noForEach: <explanation>
  wss.clients.forEach((client) => {
    if (client !== sender && client.readyState === client.OPEN) {
      client.send(data);
    }
  });
};

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('A new client connected.');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    // Try to parse the incoming message as PixelData
    try {
      const pixelData: PixelData = JSON.parse(message.toString());
      console.log('Pixel Data Received:', pixelData);

      // Broadcast the data to other clients
      broadcast(JSON.stringify(pixelData), ws);
    } catch {
      console.error('Invalid message format:', message.toString());
    }
  });

  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});
