import axios from 'axios';

const instance = axios.create({
    baseURL:"https://chatify-backend-production-98d3.up.railway.app/api"
});

export default instance;