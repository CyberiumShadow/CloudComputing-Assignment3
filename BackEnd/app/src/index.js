/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const carRouter = require('./routes/cars');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/cars', carRouter);

app.listen(port, () => {
  console.log(`HTTP Server listening on http://localhost:${port}`);
});
