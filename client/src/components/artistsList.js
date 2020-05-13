
import React, { Fragment } from 'react';
import ArtistsDataService from '../services/artists.service';
import { Utils } from '../common/utils';
import * as Constants from '../common/constants';
import ArtistTable from '../components/artistsTable'
import { Row, Col, FormGroup, Label, Form, Input, Button } from 'reactstrap'

const FORM_ARTISTS_NAME_ID = "form_artist_name_id";

export default class ArtistsList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            artists: [],
            isLoadingData: true,
            artistName:"",
        };
    }

    async componentDidMount(){
        const artists =  await ArtistsDataService.getArtists();
        this.setState({
            isLoadingData: false,
            artists: artists
        });
    }

  

    handleOnChangeInput = (event) =>{
        const inputValue = event.target.value;
        switch (event.target.id) {
            case FORM_ARTISTS_NAME_ID: {
                 this.setState({ artistName: inputValue })
                break;
              }
              default:
                console.log("default case - no id like that : " + event.target.id)
            }
    }

    handleCreateArtist = async () =>{
        this.setState({
            isLoadingData: true,
        }, async () =>{
            const {artistName} = this.state;
            let newArtist = {
                name: artistName        }
            const savedNewArtist = await ArtistsDataService.createArtist(newArtist);
            this.setState(prevState => ({
                artists: [...prevState.artists, savedNewArtist],
                isLoadingData: false,
                artistName: ""
              }))
        })
    }

    drawCreateArtistForm = () =>{
        const {artistName} = this.state;
        return (
            <div>
                 <h1>{Constants.ADD_ARTIST_TITLE}</h1>
                 <Form>
                <FormGroup>
                    <Label for="name">
                        {Constants.ARTIST_NAME_INPUT_TITLE}
                    </Label>
                    <Input
                        value={artistName}
                        type="text"
                        id={FORM_ARTISTS_NAME_ID}
                        placeholder={Constants.ARTIST_NAME_PLACEHOLDER}
                        onChange={this.handleOnChangeInput}
                        className="form-input"
                        maxLength="100"
                        />
                </FormGroup>

                <Button
                        color={"primary"}
                        onClick={this.handleCreateArtist}>
                    {Constants.ADD}
                </Button>
            </Form>
            </div>
           
        )
    }

 
    drawContent = (artists) =>{
        return (
            <Fragment>
                <Row>
                    <Col className="col-6 section-container">
                        {this.drawCreateArtistForm()}
                    </Col>
                    <Col  className="col-6 section-container">
                        <ArtistTable artists={artists}></ArtistTable>
                    </Col>
                </Row>
            </Fragment>
        )
    }

    render(){
        const { artists, isLoadingData } = this.state;
        return (
            <div className="artists-container">
                { isLoadingData && Utils.drawSpinner() }
                { !isLoadingData && this.drawContent(artists) }
            </div>
        )
    }

}