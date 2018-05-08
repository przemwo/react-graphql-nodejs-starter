const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Three elements:
// types / relationships between types / root query

// Objects' types
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        post: {
            type: PostType,
            args: { id: { type: GraphQLString } },
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});