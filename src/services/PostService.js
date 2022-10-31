import axios from 'axios';
import { BACKEND_HOST } from '../consts';

const POST_API_BASE_URL = BACKEND_HOST + "/api/posts/";

class PostService {
    getCategories(){
        return axios.get(POST_API_BASE_URL + 'categories/');
    }

    getCategory(categoryId){
        return axios.get(POST_API_BASE_URL + 'category/' + categoryId);
    }

    getAllPosts(page){
        return axios.get(POST_API_BASE_URL + 'all-posts/?page='+page);
    }

    getTenPosts(){
        return axios.get(POST_API_BASE_URL + 'ten-posts/');
    }

    getThreePosts(){
        return axios.get(POST_API_BASE_URL + 'three-posts/');
    }

    getSearchedPosts(word, page){
        let query = { "word" : word }
        return axios.post(POST_API_BASE_URL + 'search/?page=' + page, query);
    }

    getCategoryPosts(categoryId, page){
        return axios.get(POST_API_BASE_URL + 'category-posts/' + categoryId + '?page=' + page);
    }

    getPostById(postId){
        return axios.get(POST_API_BASE_URL + 'detail/' + postId);
    }
}

export default new PostService();