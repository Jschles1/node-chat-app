const socket = io();

socket.on('connect', function () {
  console.log('Connected to Server');

  // socket.emit('createMessage', {
  //   from: 'Mike',
  //   text: 'Hey'
  // });
});

socket.on('disconnect', function () {
  console.log('Server Disconnected');
});

socket.on('newMessage', function (message) {
  console.log('New Message: ', message);
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const li = $('<li></li>');
  const a = $('<a target="_blank">My Current Location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Mike',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {

  });
});

const locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});