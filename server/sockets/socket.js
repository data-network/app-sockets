const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-manager');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.ultimoTicket(),
        ultimosCuatro: ticketControl.ultimosCuatroTicket()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.ultimosCuatroTicket()
        });
    })
});