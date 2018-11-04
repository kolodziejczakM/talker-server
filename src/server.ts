import express, { Request } from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import socketIO from 'socket.io';
import jwt from 'express-jwt';
import config from '../config.json';
import mongoose from 'mongoose';
import cors from 'cors';

// import jsonwebtoken from 'jsonwebtoken';

// TODO: move to another file
interface RequestNotAuthenticated extends Request {
    user: Object;
}

const app = express();
app.use(cors());
const server = app.listen(4002);
const io = socketIO.listen(server);

mongoose.connect(
    `mongodb://${config.dbUser}:${config.dbPassword}@ds143893.mlab.com:43893/gql-talker`,
    { useNewUrlParser: true }
);

mongoose.connection.once('open', () => {
    // tslint:disable-next-line
    console.log('Connected to database.');
});

const auth = jwt({
    secret: config.jwtSecret,
    credentialsRequired: false, // Users should to be able to at least signup and login first.
    getToken: req => {
        // TODO: Move it somewhere else - it has to be used in graphql resolvers
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
        graphiql: true // Boolean(process.env.development)
    })
);

app.get('/', (req, res) => {
    res.send('ok');
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
