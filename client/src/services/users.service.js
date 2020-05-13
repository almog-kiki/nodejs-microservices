import  axios from 'axios';
import * as Constants from '../common/constants'

class UserDataService {
   
    getUsers = async()=>{
        const data = await axios.get("/api/v1/users", { headers: Constants.HTTP_HEADERS });
        return data.data;
    }

    createUser = async(newUser)=>{
        const data = await axios.post("/api/v1/users/create", newUser, { headers: Constants.HTTP_HEADERS });
        return data.data;
    }
}


export default new UserDataService();
