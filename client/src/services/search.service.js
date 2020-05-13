import  axios from 'axios';
import * as Constants from '../common/constants'

class SearchDataService {

    search = async(searchString)=>{
        const data = await axios.get(`/api/v1/search?value=${searchString}`, { headers: Constants.HTTP_HEADERS })
        return data.data;
    }
}

export default new SearchDataService();
