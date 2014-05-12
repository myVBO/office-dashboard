var jade = require('jade');
var fs = require('fs');

function renderDash(name,data) {
  var path = 'views/dash/'+name+'.jade';
  var template = fs.readFileSync('views/dashes/'+name+'.jade', 'utf8');
  return jade.compile(template, { filename: path, pretty: true })(data);
}

var content = {
  sequence: 1,
  html: renderDash('nocontent')
};

module.exports = function( server )  {
  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function (socket) {
    socket.emit('handshake', { version: '0.1' });

    socket.on('fetch', function(data) {
      socket.emit('load', content );

    });
  });
};
