import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const REKLAMA_API_BASE_URL = BACKEND_HOST + "/api/statics/";

class ReklamaService {
    getReklama(){
        return axios.get(REKLAMA_API_BASE_URL  + 'mahabat/get');
    }
}

export default new ReklamaService();