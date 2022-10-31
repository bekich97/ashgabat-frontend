import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const STATIC_API_BASE_URL = BACKEND_HOST + "/api/statics/";

class StaticService {
    getStatic(key){
        return axios.get(STATIC_API_BASE_URL  + key);
    }
}

export default new StaticService();