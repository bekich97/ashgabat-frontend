import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const FILE_API_BASE_URL = BACKEND_HOST + "/api/filemanager/files/";

class FileService {
    getFiles(){
        return axios.get(FILE_API_BASE_URL);
    }
}

export default new FileService();