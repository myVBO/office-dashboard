var express = require('express');
var router = express.Router();
var socket = require('../socket');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Office Dashboard' });
});

router.get('/content', function(req, res) {
  var content = socket.getContent();
  res.setHeader('X-Sequence',content.sequence)
  res.send(content.html);
});

router.post('/content', function(req, res) {
  socket.setContent(req.body.html);
  res.send({ status: 200 });
});

router.get(/\/content\/([A-Za-z0-9\-]+)/, function(req, res) {
  var fragment;
  if ( fragment = socket.getFragment(req.params[0]) )
    res.send(fragment);
  else
    res.send({ status: 404 });
});

router.patch(/\/content\/([A-Za-z0-9\-]+)/, function(req, res) {
  if ( socket.setFragment(req.params[0], req.body.html) )
    res.send({ status: 200 });
  else
    res.send({ status: 404 });
});

module.exports = router;
