
import React, { Fragment } from 'react';
import SearchDataService from '../services/search.service';
import { Utils } from '../common/utils';
import * as Constants from '../common/constants';
import { Row, FormGroup, Label, Form, Input, Button } from 'reactstrap';
import ArtistsTable from './artistsTable';
import UsersTable from './usersTable';

const FORM_USER_OR_ARTIST_ID = "form_user_name_id";

export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoadingData: false,
            searchValue:""
        };
    }

    drawHeader = () =>{
        return (
            <div className="search-title">
                <span>{Constants.SEARCH_LIST_TITLE}</span>
            </div>
        )
    }

    handleOnChangeInput = (event) =>{
        const inputValue = event.target.value;
        switch (event.target.id) {
            case FORM_USER_OR_ARTIST_ID: {
                 this.setState({ searchValue: inputValue })
                break;
              }
              default:
                console.log("default case - no id like that : " + event.target.id)
            }
    }

    handleSearch = async () =>{
        this.setState({
            isLoadingData: true,
        }, async ()=>{
            const {searchValue} = this.state;
            const searchResult = await SearchDataService.search(searchValue);
            this.setState({
                isLoadingData: false,
                data: searchResult
            });
        })
    }

    drawSearchInput = () =>{
        const {searchValue} = this.state;
        return (
            <div className="section-container">
                { this.drawHeader() }
                <Form className="search-form">
                    <FormGroup>
                        <Label for="name">
                            {Constants.SEARCH_USER_OR_ARTISTS_TITLE}
                        </Label>
                        <Input
                            value={searchValue}
                            type="text"
                            id={FORM_USER_OR_ARTIST_ID}
                            placeholder={Constants.SEARCH_VALUE_PLACEHOLDER}
                            onChange={this.handleOnChangeInput}
                            className="form-input"
                            maxLength="100"
                            />
                    </FormGroup>
                    
                    <Button
                            color={"primary"}
                            onClick={this.handleSearch}>
                        {Constants.SEARCH}
                    </Button>
                </Form>
            </div>
        )
    }

    drawContent = (data) =>{
        return (
            <Fragment>
                <div style={{width:"70%", margin:"0 auto"}}>
                    <Row className="search-result zero-row-margin">
                        { data.users && <UsersTable users={data.users}></UsersTable> }
                    </Row>
                    <Row className="search-result zero-row-margin">
                        { data.artists && <ArtistsTable artists={data.artists}></ArtistsTable> }
                    </Row>
                </div>
            </Fragment>
        )
    }

    render(){
        const { data, isLoadingData } = this.state;
        return (
            <div className="search-container">
                {this.drawSearchInput()}
                { isLoadingData && Utils.drawSpinner() }
                { !isLoadingData && this.drawContent(data) }
            </div>
        )
    }

}