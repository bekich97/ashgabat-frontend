import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const IMAGE_API_BASE_URL = BACKEND_HOST + "/api/filemanager/images/";
const CATEGORY_API_BASE_URL = BACKEND_HOST + "/api/filemanager/image-categories/";

class ImageService {
    getAllImages(){
        return axios.get(IMAGE_API_BASE_URL);
    }
    getCategoryImages(id){
        return axios.get(IMAGE_API_BASE_URL + "category-images/" + id + "/");
    }
    getImageCategories(){
        return axios.get(CATEGORY_API_BASE_URL);
    }
    getMixImages(){
        return axios.get(IMAGE_API_BASE_URL + 'mix-images/');
    }
}

export default new ImageService();