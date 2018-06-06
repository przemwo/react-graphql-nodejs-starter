import React from 'react';
import { graphql } from 'react-apollo';

import { getUsersQuery } from '../../queries';

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