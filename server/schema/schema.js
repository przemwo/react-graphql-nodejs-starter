const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
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
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${parent.id}`)
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
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts`)
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
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/users`)
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
    }
});

// Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type:  new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const user = {
                    name: args.name,
                    username: args.username,
                    email: args.email
                }
                return axios.post(`https://jsonplaceholder.typicode.com/users`, user)
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {});
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                body: { type:  new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const post = {
                    title: args.title,
                    body: args.body,
                    userId: args.userId
                };
                return axios.post(`https://jsonplaceholder.typicode.com/posts`, post)
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});