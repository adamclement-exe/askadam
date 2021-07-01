const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const router = express.Router();

// open database in memory
let db = new sqlite3.Database('./questions.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the questions database.');
});
module.exports = db;

