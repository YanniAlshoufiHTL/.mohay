const net = require('net');
const { resolve } = require('path');

// Define the server address and port
const serverAddress = '172.17.210.91';
const serverPort = 12345;
let transpiledCode;

// Create a TCP socket instance
const socket = net.createConnection(serverPort, serverAddress, () => {
  console.log('Connected to server');
});

// TCP socket 'error' event handler
socket.on('error', (error) => {
  console.error('Socket error:', error);
});

// TCP socket 'close' event handler
socket.on('close', () => {
  console.log('Disconnected from server');
});

// Send and recieve message to the server
function sendMessage(variable) {
  return new Promise((resolve, reject) => {
    const message = JSON.stringify(variable); // Convert variable to a string representation (e.g., JSON)
    if (!socket.destroyed) {
      socket.write(message);

      socket.once('data', (data) => {
        const response = data.toString();
        //console.log('Received response:', response);
        resolve(response);
      });

      socket.once('error', (error) => {
        console.error('Socket error:', error);
        reject(error);
      });

      console.log('Sent message:', message);
    } else {
      console.error('Socket is not open');
      reject(new Error('Socket is not open'));
    }
  });
  return(resolve);
}
module.exports = {
    transpiledCode, sendMessage
}