import { gql } from 'apollo-boost';

export const getPostsQuery = gql`
    {
        posts {
            id
            title
            body
        }
    }
`;

export const getUsersQuery = gql`
    {
        users {
            id
            name
        }
    }
`;
