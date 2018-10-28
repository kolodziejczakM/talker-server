import * as graphql from 'graphql';
import User from '../models/user';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        // login: { type: GraphQLString },
        firstName: { type: GraphQLString }
        // lastName: { type: GraphQLString },
        // displayName: { type: GraphQLString },
        // password: { type: GraphQLString },
        // avatarName: { type: GraphQLString }
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        creatorId: { type: GraphQLString },
        creationDate: { type: GraphQLString }, // TODO: check if that type is valid. Maybe there is Date type
        content: { type: GraphQLString },
        edited: { type: GraphQLBoolean }, // TODO: check how to mark required fields
        editedDate: { type: GraphQLString },
        language: { type: GraphQLString }
    })
});

const users = [{ id: '1', firstName: 'Andrzej' }, { id: '2', firstName: 'Zdzisław' }];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                // code to get data from db
                // return users.find(
                //     (user: { id: string; firstName: string }): boolean =>
                //         user.id === args.id
                // );
            }
        },
        message: {
            type: MessageType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                // code to get data from db
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const user = new User({
                    firstName: args.firstName
                });
                // TODO: password hashing
                return user.save();
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
