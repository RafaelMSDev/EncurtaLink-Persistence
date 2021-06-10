import axios from 'axios';

//1b6b24f5b33647ff22c83f8d823f05fc1bf66d3f - Token Key

//base url: https://api-ssl.bitly.com/v4/

export const key = '1b6b24f5b33647ff22c83f8d823f05fc1bf66d3f';

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${key}`
    }
})

export default api;