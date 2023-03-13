const express = require('express');
const app = express();

const PORT = 8081;
const HOSTNAME = '0.0.0.0';

app.use('/', express.static('../../frontend/dist'));

app.listen(PORT, HOSTNAME, () => {
  console.log(`Listening on http://${HOSTNAME}:${PORT}`);
});
