
import React, { Fragment } from 'react';
import UserDataService from '../services/users.service';
import { Utils } from '../common/utils';
import * as Constants from '../common/constants';
import { Row, Col, FormGroup, Label, Form, Input, Button } from 'reactstrap'
import UsersTable from './usersTable';


const FORM_USER_NAME_ID = "form_user_name_id";
const FORM_USER_AGE_ID = "form_user_age_id";

export default class UserList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            users: [],
            isLoadingData: true,
            userName:"",
            userAge:""
        };
    }

    async componentDidMount(){
        const users =  await UserDataService.getUsers();
        this.setState({
            isLoadingData: false,
            users: users
        });
    }




    handleOnChangeInput = (event) =>{
        const inputValue = event.target.value;
        switch (event.target.id) {
            case FORM_USER_NAME_ID: {
                 this.setState({ userName: inputValue })
                break;
              }
              case FORM_USER_AGE_ID: {
                  if(inputValue<100){
                      this.setState({ userAge: inputValue })
                  }
                break;
              }
              default:
                console.log("default case - no id like that : " + event.target.id)
            }
    }

    handleCreateUser = async () =>{

        this.setState({
            isLoadingData: true,
        }, async () =>{
            const {userName, userAge} = this.state;
            let newUser = {
                name: userName,
                age: userAge
            }
            const savedNewUser = await UserDataService.createUser(newUser);
            this.setState(prevState => ({
                users: [...prevState.users, savedNewUser],
                isLoadingData: false,
                userName:"",
                userAge:""
              }))
        })
        
    }

    drawCreateUserForm = () =>{
        const {userName, userAge} = this.state;
        return (
            <Fragment>
                 <h1>{Constants.ADD_USER_TITLE}</h1>
                <Form>
                    <FormGroup>
                        <Label for="name">
                            {Constants.USER_NAME_INPUT_TITLE}
                        </Label>
                        <Input
                            value={userName}
                            type="text"
                            id={FORM_USER_NAME_ID}
                            placeholder={Constants.USER_NAME_PLACEHOLDER}
                            onChange={this.handleOnChangeInput}
                            className="form-input"
                            maxLength="100"
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="age">
                            {Constants.USER_AGE_INPUT_TITLE}
                        </Label>
                        <Input
                            value={userAge}
                            type="number"
                            id={FORM_USER_AGE_ID}
                            placeholder={Constants.USER_AGE_PLACEHOLDER}
                            onChange={this.handleOnChangeInput}
                            className="form-input"
                            />
                    </FormGroup>
                    <Button
                            color={"primary"}
                            onClick={this.handleCreateUser}>
                        {Constants.ADD}
                    </Button>
                </Form>
            </Fragment>
        )
    }

    drawContent = (users) =>{
        return (
            <Fragment>
                <Row>
                    <Col className="col-6 section-container">
                        {this.drawCreateUserForm()}
                    </Col>
                    <Col className="col-6 section-container">
                        <UsersTable users={users}></UsersTable>
                    </Col>
                </Row>
            </Fragment>
        )
    }

    render(){
        const { users, isLoadingData } = this.state;
        return (
            <div className="users-container">
                { isLoadingData && Utils.drawSpinner() }
                { !isLoadingData && this.drawContent(users) }
            </div>
        )
    }

}