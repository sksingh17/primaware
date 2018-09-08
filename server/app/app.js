require('dotenv').config({path:`${__dirname}\\.env`});
const {port} = require('./config')[process.env.NODE_ENV || 'dev'];
const express = require('express');
const bodyParser = require('body-parser');
const searchRouter = require('./route/search-route');
const detailRouter = require('./route/detail-route');
const app = express();

app.use(bodyParser.json());

app.use('/search', searchRouter);
app.use('/detail', detailRouter);

app.listen(port, () => {
  console.log(`Primaware Server listening on ${port}`);
});
