import express, { Request } from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import socketIO from 'socket.io';
import jwt from 'express-jwt';
import config from '../config.json';
// import jsonwebtoken from 'jsonwebtoken';

// TODO: move to another file
interface RequestNotAuthenticated extends Request {
    user: Object;
}

const app = express();
const server = app.listen(4002);
const io = socketIO.listen(server);
const auth = jwt({
    secret: config.jwtSecret,
    credentialsRequired: false, // Users should to be able to at least signup and login first.
    getToken: req => {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
            return req.headers.authorization.split(' ')[1];
        }

        if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});

app.use(
    '/graphql',
    auth,
    graphqlHTTP({
        schema,
        graphiql: false // Boolean(process.env.development)
    })
);

app.get('/', (req, res) => {
    res.send('OK');
});

server.listen(4002, () => {
    // tslint:disable-next-line
    console.log('Server is listening on port 4002!');
});

io.sockets.on('connection', socket => {
    socket.on('ON_CLICK', (msg: string) => {
        // tslint:disable-next-line
        console.log('message: ', msg);
    });
});
