import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const API_API_BASE_URL = BACKEND_HOST + "/api/api/";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class ApiService {
    getCaptcha(){
        return axios.get(API_API_BASE_URL + 'get-captcha');
    };
    checkCaptcha(data){
        return axios({
            method: "post",
            url: API_API_BASE_URL + 'check-captcha',
            data: data,
            headers: {"Content-Type": "application/json"},
        });
    };
    checkOtp(data){
        return axios({
            method: "post",
            url: API_API_BASE_URL + 'check-otp',
            data: data,
            headers: {"Content-Type": "application/json"},
        });
    };
    checkCode(data){
        return axios({
            method: "post",
            url: API_API_BASE_URL + 'check-code',
            data: data,
            headers: {"Content-Type": "application/json"},
        });
    };
    getPhone(){
        return axios.get(API_API_BASE_URL + 'get-phone');
    };
}

export default new ApiService();