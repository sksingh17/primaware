require('dotenv').config({path:`${__dirname}\\.env`});
const {port} = require('./config')[process.env.NODE_ENV || 'dev'];
const express = require('express');
const bodyParser = require('body-parser');
const searchRouter = require('./route/search-route');
const detailRouter = require('./route/detail-route');
const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/primaware/api/search', searchRouter);
app.use('/primaware/api/detail', detailRouter);

app.listen(port, () => {
  console.log(`Primaware Server listening on ${port}`);
});
