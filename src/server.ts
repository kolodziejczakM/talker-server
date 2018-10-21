import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';

const app = express();

app.use('/graphql', graphqlHTTP({ schema }));

app.listen(4002, () => {
    // tslint:disable-next-line
    console.log('Example app listening on port 4002!');
});
