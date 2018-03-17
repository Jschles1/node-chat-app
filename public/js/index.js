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
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = $('<li></li>');
  li.text(`${message.from} (${formattedTime}): ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = $('<li></li>');
  const a = $('<a target="_blank">My Current Location</a>');

  li.text(`${message.from} (${formattedTime}): `);
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

  const messageTextBox = $('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

const locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.');
  });
});