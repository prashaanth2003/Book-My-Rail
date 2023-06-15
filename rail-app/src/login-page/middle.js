//import axios from './axios'
const axios = require('axios');
const baseURL = 'http://localhost:5000/change';

const create = (newObject) => {
    const request = axios.post(baseURL, newObject);

    return request.then(response => {
      return response.data;
    })
  }

export default create;