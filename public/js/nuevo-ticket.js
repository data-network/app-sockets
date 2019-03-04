var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al sistema de tickets');
});

socket.on('disconnect', function() {
    console.log('Desconectado del sistema');
});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(suguienteTicket) {
        label.text(suguienteTicket)
    });
});