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