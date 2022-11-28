var express = require('express');
var router = express.Router();

/* GET users listing. */
/*  The route is whatever specified when the module is imported
    plus whatever is defined in the first argument.
    i.e. './routes/users' specified in app.js, plus '/' */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send('You\'re so cool')
});

module.exports = router;