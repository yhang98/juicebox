const express = require('express');
const { client } = require('./db');
client.connect();

require('dotenv').config();

const server = express();


const morgan = require('morgan');
server.use(morgan('dev'));

const bodyParser = require ('body-parser')

server.use(bodyParser.json())

server.use(express.json())

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});


const PORT = 3000;
server.listen(PORT, () => {
  // old stuff
  console.log('The server is up on port', PORT)
});