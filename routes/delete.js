var express = require('express');
var router = express.Router();
var router2 = express.Router();
var db=require('../database');

router.get('/delete', function(req, res, next) {
    var sql='SELECT * FROM questions';
    db.all(sql, function (err, data, fields) {
		
var url_parts = url.parse(req.url);
 console.log(url_parts);
 console.log(url_parts.pathname);

 
    if (err) throw err;
    res.render('question-list', { title: 'Question List', userData: data});
  });
});
module.exports = router;



