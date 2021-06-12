/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const carRouter = require('./routes/cars');
const userRouter = require('./routes/users');

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/cars', carRouter);
app.use('/users', userRouter);

app.get('/ping', (req, res) => res.status(200).send('Health Check Ping!'));

app.listen(port, '0.0.0.0', () => {
  console.log(`HTTP Server listening on http://localhost:${port}`);
});
