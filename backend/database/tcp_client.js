const net = require('net');
const { resolve } = require('path');

// Define the server address and port
const serverAddress = '172.17.220.168';
const serverPort = 6924;

let socket;
// Create a TCP socket instance
function createTCPConnection() {
  socket = net.createConnection(serverPort, serverAddress, () => {
    console.log('Connected to server');
  });
}

// Send and recieve message to the server
function sendMessage(variable) {
  return new Promise((resolve, reject) => {
    const message = variable;
    if (!socket.destroyed) {
      socket.write(message);

      socket.once('data', (data) => {
        const response = data;
        resolve(response);
      });

      socket.once('error', (error) => {
          while(socket.destroyed) {
            try {
              createTCPConnection();
            } catch {}
          }
      });

      console.log('Sent message:', message);
    } else {
      console.error('Socket is not open');
    }
  });
}
module.exports = {
  sendMessage, createTCPConnection
}