
import React, { Fragment } from 'react';
import { Table } from 'reactstrap'
import * as Constants from '../common/constants';

export default class UsersTable extends React.Component{

    drawHeader = () =>{
        return (
            <h1>{Constants.USER_LIST_TITLE}</h1>
        )
    }

    render(){
        const { users } = this.props;
        return(
            <Fragment>
                {this.drawHeader()}
                {
                    users && 

                    <Table striped className="table-container">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>_id</th>
                            <th>User Name</th>
                            <th>Age</th>
                        </tr>
                        </thead>
                        <tbody>
                            { users.map( (user, index)=>(
                            <tr key={user._id}>
                                <th scope="row">{index+1}</th>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                            </tr>
                            ))
                            }
                        </tbody>            
                    </Table>
                }
            </Fragment>
        )
    }
}