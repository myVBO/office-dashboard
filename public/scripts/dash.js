var clientVersion = "0.1";

var firstConnect = true;
var sequence = 0;

var socket = io.connect(
  'http://localhost',
  { 
    'reconnection delay': 1000,
    'reconnection limit': 100,
    'max reconnection attempts': Infinity
  }
);

function gel(name) {
  return document.getElementById(name);
}

function updateBuffer(){
  var content = gel('content');
  var buffer = gel('buffer');
  content.innerHTML = '';
  while ( buffer.firstChild ) {
    content.appendChild(buffer.firstChild);
  }
  gel('content').style.display = 'block';
}

function updateContent( html ) {
  var buffer = gel('buffer');
  buffer.innerHTML = html;
  updateBuffer();
}


socket.on('disconnect', function() {
  gel('content').style.display = 'none';
  gel('connection-lost').style.display = 'block';
});

socket.on('handshake', function(data) {
  if ( clientVersion != data.version ) {
    socket.disconnect();
    window.location.reload();
  } else {
    socket.emit('fetch',{});
    gel('connection-lost').style.display = 'none';
  }
});

socket.on('load', function (data) {
  if ( data.sequence >= sequence ) {
    sequence = data.sequence;
    updateContent( data.html );
  }
});

