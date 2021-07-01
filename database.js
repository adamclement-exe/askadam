const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const router = express.Router();
/*
// open database in memory
let db = new sqlite3.Database('./questions.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the questions database.');
});

*/


//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://aaa:uR2PckB4TvEvQxRW@cluster0.y12j6.mongodb.net/aaa?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
