var express = require('express');
var router = express.Router();
var db=require('../database');
var url = require('url');
var request = require('request');
var bodyParser = require('body-parser');



router.get('/register', function(req, res, next) {
    
	res.render('register',  {message: 'Enter Details'});

});  

router.get('/login', function(req, res, next) {
    
	res.render('login',  {message: 'Enter Details'});

});  



router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post('/login/', (req, res) => {

let username = req.body.username;
let pass = req.body.password;

var crypto = require('crypto');
var hash = crypto.createHash('md5').update(pass).digest('hex');




var sql='SELECT * FROM users WHERE user = ? and hash = ?';
    db.all(sql,username,hash, function (err, data, fields) {
    if (err) throw err;

if(data.length<1){
	console.log("login fail");
res.render('login', {message: 'Incorrect Details'});
}
else{
	

console.log("logged in");


res.cookie('user', username, {signed: true})
   


if (username == "admin"){
res.redirect('/questions/question-list');	
}else{
res.redirect('/questions/question-list-user');
}

}



	
	
  });


    

});


router.post('/register/', (req, res) => {

let username = req.body.username;
let pass = req.body.password;

var crypto = require('crypto');
var hash = crypto.createHash('md5').update(pass).digest('hex');




var sql='SELECT * FROM users WHERE user = ?';
    db.all(sql,username, function (err, data, fields) {
    if (err) throw err;

if(data.length>0){
	console.log("Username Taken");
res.render('register', {message: 'Name Taken'});
}
else{
	

console.log("Username Free");


    
	
	
res.cookie('user', username, {signed: true})


var insertSql="INSERT INTO users (user,hash) VALUES (?, ? )";

db.all(insertSql,username,hash, function (err, data, fields) {
    if (err) throw err;

  });


res.redirect('/questions/question-list-user');


}

	
	
  });


    

});

 
router.get('/question-list-user', function(req, res, next) {
/*	
    var sql='SELECT * FROM questions WHERE answer IS NOT NULL AND answer<>""';
    db.all(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('question-list-user', { title: 'Answered Questions', userData: data});
  });
  
  */
	
 db.collection('questions').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result.name);
    client.close();
  });
	
	
});  





  
router.get('/question-list', function(req, res, next) {
	
	

	 console.log(req.signedCookies.user);
	 
    var sql='SELECT * FROM questions';
    db.all(sql, function (err, data, fields) {
    if (err) throw err;
	
	if(req.signedCookies.user=="admin"){
    res.render('question-list', { title: 'Question List', userData: data});
	console.log("ADMIN?!");
	}else{
		console.log("NOT ADMIN?!");
	    res.redirect('/questions/question-list-user');
	}
  });
});

router.get('/delete/:id', function(req, res, next) {
    
	var id = req.params.id;
var sql='DELETE FROM questions WHERE id = ?';
    db.run(sql,id, function (err, data, fields) {
    if (err) throw err;
    res.redirect('/questions/question-list');
  });
 
    
});


router.get('/edit/:id', function(req, res, next) {
    
	var id = req.params.id;
//console.log(id);
    var sql='SELECT * FROM questions WHERE id = ?';
    db.all(sql,id, function (err, data, fields) {
    if (err) throw err;
    res.render('question-edit', { title: 'Question Edit', userData: data});
  });
});

router.get('/cancel/:id', function(req, res, next) {
    
        res.redirect('/questions/question-list');
});




router.post('/edit/:id', (req, res) => {

let newQuestion = req.body.question;
let newAnswer = req.body.answer 
let id = req.body.id 

var insertSql="UPDATE questions SET question = ?, answer = ? WHERE id = ?";

db.all(insertSql,newQuestion,newAnswer,id, function (err, data, fields) {
    if (err) throw err;
            res.redirect('/questions/question-list');
  });

    

});



router.get('/add', function(req, res, next) {
    
    res.render('question-add', { title: 'Add Question'});

});


router.get('/logout', function(req, res, next) {
    res.clearCookie("user");
    res.render('login',  {message: 'Enter Details'});

});


router.post('/add', (req, res) => {

let newQuestion = req.body.question;
let newAnswer = req.body.answer 


var insertSql="INSERT INTO questions (id,question,answer) VALUES (null, ?, ? )";

db.all(insertSql,newQuestion,newAnswer, function (err, data, fields) {
    if (err) throw err;
            res.redirect('/questions/question-list');
  });

    

});


module.exports = router;



