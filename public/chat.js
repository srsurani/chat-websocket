// make connection
var socket = io.connect('http://localhost:8888');

//query DOM
var message = document.querySelector('#message');
var handle = document.querySelector('#handle');
var btn = document.querySelector('#send');
var output = document.querySelector('#output');
var feedback = document.querySelector('#feedback');

//emit events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
})

//listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
})

socket.on('typing', (data) => {
    feedback.innerHTML = `<p></em>${data} is typing message..</em></p>`;
})