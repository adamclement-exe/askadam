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
const mongoServer = require('mongodb');
const mongoClient = mongoServer.MongoClient;
const dbName = 'aaa';
const serverUrl = 'mongodb+srv://aaa:uR2PckB4TvEvQxRW@cluster0.y12j6.mongodb.net/aaa?retryWrites=true&w=majority';

// Create a database
const dbUrl =  serverUrl + dbName;
const client = new mongoClient(dbUrl, { useUnifiedTopology: true});

client.connect( (err, db) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log('Database successfully created!');
        db.close();
    }
});
module.exports = client;
