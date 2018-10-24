import * as graphql from 'graphql';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        login: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        displayName: { type: GraphQLString },
        password: { type: GraphQLString },
        avatarName: { type: GraphQLString }
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                // code to get data from db
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

export default new GraphQLSchema({
    query: RootQuery
});
