var express = require('express');
var path= require('path');
var api = express.Router();

//Middle ware that is specific to this router
api.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// Define the home page route
api.get('/api', function(req, res) {
  res.send('API routers');
});

// Define the about route
api.get('/about', function(req, res) {
  res.send('About us');
});


module.exports = api;