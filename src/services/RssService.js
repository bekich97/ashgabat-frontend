import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const RSS_API_BASE_URL = BACKEND_HOST + "/posts/latest-posts/feed";

class RssService {
    getRss(){
        return axios.get(RSS_API_BASE_URL, {
            'Content-Type': 'application/xml; charset=utf-8'
          });
    }
}

export default new RssService();