
import React, { Fragment }  from 'react';
import { Table } from 'reactstrap'
import * as Constants from '../common/constants';

export default class ArtistsTable extends React.Component{

    drawHeader = () =>{
        return (
            <h1>{Constants.ARTIST_LIST_TITLE}</h1>
        )
    }

    render(){
        const { artists } = this.props;
        return (
            <Fragment>
            {this.drawHeader()}
            {
                artists && 
           
                <Table striped className="table-container">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>_id</th>
                        <th>Artist Name</th>
                    </tr>
                    </thead>
                    <tbody>
                        { artists.map( (artist, index)=>(
                        <tr key={artist._id}>
                            <th scope="row">{index+1}</th>
                            <td>{artist._id}</td>
                            <td>{artist.name}</td>
                        </tr>
                        ))
                        }
                    </tbody>            
                </Table>
            
        } </Fragment>
        )
    }

}