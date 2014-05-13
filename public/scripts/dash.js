var clientVersion = "0.2";

var firstConnect = true;
var sequence = 0;

var audio = null;

var socket = io.connect(
  '/',
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

  var content = gel('content');
  content.style.display = 'block';
}

function updateContent( html ) {
  var buffer = gel('buffer');
  buffer.innerHTML = html;
  updateBuffer();
}

function updateFragment( fragment, html ) {
  var fragment = gel(fragment);
  fragment.innerHTML = html;
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

socket.on('content', function (data) {
  if ( data.sequence >= sequence ) {
    sequence = data.sequence;
    updateContent( data.html );
  }
});

socket.on('sound', function(data) {
  if ( audio ) audio.pause();

  if ( data.url ) {
    audio = new Audio(data.url);
    audio.play();
  }
});

socket.on('fragment', function (data) {
  if ( data.sequence >= sequence ) {
    sequence = data.sequence;
    updateFragment( data.fragment, data.html );
  }
});

