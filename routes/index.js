var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.redirect('/questions/question-list-user');
});

module.exports = router;
