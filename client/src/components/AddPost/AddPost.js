import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getUsersQuery = gql`
    {
        users {
            id
            name
        }
    }
`;

class AddPost extends React.Component {
    renderUsers = () => {
        const { loading, users = [] } = this.props.data;
        if(loading) {
            return(
                <option disabled>Loading users...</option>
            );
        } else {
            return(
                users.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                ))
            );
        }
    }
    render() {
        return (
            <form>
                <div>
                    <label htmlFor="">Title:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">Body:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">User:</label>
                    <select name="" id="">
                        <option disabled selected>Select user</option>
                        {this.renderUsers()}
                    </select>
                </div>
                <button>Add post</button>
            </form>
        );
    }
}
export default graphql(getUsersQuery)(AddPost);