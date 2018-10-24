import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import socketIO from 'socket.io';

const app = express();
const server = app.listen(4002);
const io = socketIO.listen(server);

app.use('/graphql', graphqlHTTP({ schema }));

app.get('/', (req, res) => {
    res.send('OK');
});

server.listen(4002, () => {
    // tslint:disable-next-line
    console.log('Example app listening on port 4002!');
});

io.sockets.on('connection', socket => {
    // tslint:disable-next-line
    console.log('someone has joined.');
});
