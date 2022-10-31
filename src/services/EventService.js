import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const EVENT_API_BASE_URL = BACKEND_HOST + "/api/events/";

class EventService {
    getEvents(page){
        return axios.get(EVENT_API_BASE_URL + '?page=' + page);
    }
    getEvent(id){
        return axios.get(EVENT_API_BASE_URL + 'detail/' + id);
    }
}

export default new EventService();