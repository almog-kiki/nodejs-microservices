import  axios from 'axios';
import * as Constants from '../common/constants'

// const axiosInstance = axios.create({
//     baseURL: Constants.BASIC_URL
// });

class ArtistsDataService {

    getArtists = async()=>{
        const data = await axios.get("/api/v1/artists", { headers: Constants.HTTP_HEADERS });
        return data.data;
    }

    createArtist = async(newUser)=>{
        const data = await axios.post("/api/v1/artists/create", newUser, { headers: Constants.HTTP_HEADERS });
        return data.data;
    }
}


export default new ArtistsDataService();
