import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const VIDEO_API_BASE_URL = BACKEND_HOST + "/api/filemanager/videos/";

class VideoService {
    getVideos(){
        return axios.get(VIDEO_API_BASE_URL);
    }
}

export default new VideoService();