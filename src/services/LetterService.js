import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const LETTER_API_BASE_URL = BACKEND_HOST + "/api/letter/";

class LetterService {
    getRegions(){
        return axios.get(LETTER_API_BASE_URL + 'regions/');
    }
    getReasons(){
        return axios.get(LETTER_API_BASE_URL + 'reasons/');
    }
    createLetter(formData){
        return axios({
            method: "post",
            url: LETTER_API_BASE_URL + 'create/',
            data: formData,
            headers: {"Content-Type": "multipart/form-data"},
        }).then(() => {
            return {data: {"status": "success"}}
        }).catch(() => {
            return {data: {"status": "failed"}}
        });
    }
}

export default new LetterService();