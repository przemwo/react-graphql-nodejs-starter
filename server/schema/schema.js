const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;

// Three elements:
// types / relationships between types / root query

// Objects' types
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/users/${parent.userId}`)
                    .then((response) => {
                        if(!(response.status >= 200 && response.status < 300)) {
                            // handling data fetching errors
                            // return Promise.reject({...})
                        }
                        return response.data;
                    })
                    .catch(
                        // handling errors
                        // return Promise.reject({...})
                    );
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () =>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        greet: {
            type: GraphQLString,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                return `Hello ${args.name || 'world'}!`;
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
                    .then((response) => {
                        if(!(response.status >= 200 && response.status < 300)) {
                            // handling data fetching errors
                            // return Promise.reject({...})
                        }
                        return response.data;
                    })
                    .catch((error) => {
                        // handling errors
                        // return Promise.reject({...})
                    });
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
                    .then((response) => {
                        if(!(response.status >=200 && response.status <300)) {
                            // handling data fetching errors
                            // return Promise.reject({...})
                        }
                        return response.data;
                    })
                    .catch((error) => {
                        // handling errors
                        // return Promise.reject({...})
                    });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});