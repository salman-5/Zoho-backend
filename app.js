const express = require('express');
const bodyParser = require('body-parser');
const mongoTest = require('./mongoose');
const cors = require('cors');

const app=express();

app.use(bodyParser.json());
app.post('/login',mongoTest.createUser);
app.post('/users',mongoTest.getUser)


app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.listen(4000);

