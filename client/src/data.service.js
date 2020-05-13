import  axios from 'axios';

const headers = {
    'Access-Control-Allow-Origin': '*',
}   
const axiosInstance = axios.create({
    baseURL:"http://localhost:5000"
  });

class DataService {
   
    // users-serivce
    getUsers = async()=>{
        const data = await axiosInstance.get("/api/v1/users", { headers: headers });
        return data.data;
    }

    createUser = async(newUser)=>{
        const data = await axiosInstance.post("/api/v1/users/create", newUser, { headers: headers });
        return data.data;
    }

    // artists-serivce
    getArtists = async()=>{
        const data = await axiosInstance.get("/api/v1/artists", { headers: headers });
        return data.data;
    }

    createArtist = async(newUser)=>{
        const data = await axiosInstance.post("/api/v1/artists/create", newUser, { headers: headers });
        return data.data;
    }

    //search-service
    search = async(searchString)=>{
        const data = await axiosInstance.get(`/api/v1/search?value=${searchString}`)
        return data.data;
    }
}


export default new DataService();
