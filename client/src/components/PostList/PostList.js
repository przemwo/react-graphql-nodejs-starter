import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getPostQuery = gql`
    {
        posts {
            id
            title
            body
        }
    }
`;

class PostList extends React.Component {
    renderPosts = () => {
        const { loading, posts = [] } = this.props.data;
        if(loading) {
            return <h2>Loading posts...</h2>
        } else {
            return(
                <ul>
                    { posts.map(({ id, title, body }) => (
                      <li key={ id }>
                        <h3>{ title }</h3>
                        <p>{ body }</p>
                      </li>
                    )) }
                </ul>
            );
        }
    }
    render() {
        return(
            <div>
                { this.renderPosts() }
            </div>
        );
    }
}
export default graphql(getPostQuery)(PostList);