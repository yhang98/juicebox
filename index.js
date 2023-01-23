require('dotenv').config();

const PORT = 3000;
const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});

server.get('/add/:first/to/:second', (req, res, next) => {
  res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
   Number(req.params.first) + Number(req.params.second)
  }</h1>`);
});