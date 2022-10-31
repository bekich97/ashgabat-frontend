import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const NOTICE_API_BASE_URL = BACKEND_HOST + "/api/notices/";

class NoticeService {
    getNotices(){
        return axios.get(NOTICE_API_BASE_URL);
    }
    getNotice(id){
        return axios.get(NOTICE_API_BASE_URL + 'detail/' + id);
    }
}

export default new NoticeService();