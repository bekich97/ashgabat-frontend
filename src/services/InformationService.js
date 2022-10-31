import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const INFORMATION_API_BASE_URL = BACKEND_HOST + "/api/informations/";

class InformationService {
    getInformations(){
        return axios.get(INFORMATION_API_BASE_URL);
    }
}

export default new InformationService();