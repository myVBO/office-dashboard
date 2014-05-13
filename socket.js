var jade = require('jade');
var fs = require('fs');
var jsdom = require("jsdom").jsdom;

function renderDash(name,data) {
  var path = 'views/dash/'+name+'.jade';
  var template = fs.readFileSync('views/dashes/'+name+'.jade', 'utf8');
  return jade.compile(template, { filename: path, pretty: true })(data);
}

var content = {
  sequence: new Date().getTime(),
  html: renderDash('nocontent'),
  audio: null
};

var io;

module.exports = {
  listen: function(server) {
    io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {
      socket.emit('handshake', { version: '0.2' });

      socket.on('fetch', function(data) {
        socket.emit('content', content );

      });
    });
  },

  setContent : function(html) {
    content.html = html;
    content.sequence = new Date().getTime();
    io.sockets.emit('content',content);
    return true;
  },

  setFragment : function(fragment, html) {
    var dom = jsdom('<html><body>'+content.html+'</body></html>');

    var node = dom.getElementById(fragment);
    node.innerHTML = html;
    content.html = dom.body.innerHTML;

    if ( node ) {
      content.sequence = new Date().getTime();
      io.sockets.emit('fragment',{sequence: content.sequence, html: html, fragment: fragment});
      return true;
    }

    return false;
  },

  getFragment : function(fragment) {
    var dom = jsdom('<html><body>'+content.html+'</body></html>');

    var node = dom.getElementById(fragment);

    return node ? node.innerHTML : null;
  },

  getContent : function() {
    return content;
  },

  playSound : function(url) {
    io.sockets.emit('sound',{url: url});
    return true;
  },

  stopSound : function() {
    io.sockets.emit('sound',{url: null});
    return true;
  },
};
