export const startWebSocketServer = () => {
  const ws = new WebSocket(`ws://localhost:${3001}`);

  ws.onopen = () => {
    console.log('Connected to the server');

    // Send some example pixel data
    ws.send(
      JSON.stringify({
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: 'red',
        userId: 'user123',
      }),
    );
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received pixel data:', data);
  };

  ws.onclose = () => {
    console.log('Disconnected from the server');
  };
};
