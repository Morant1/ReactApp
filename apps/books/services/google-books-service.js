const axios = require("../lib/axios");


export function getGoogleBooks(keyword) {
    // if (!keyword) return Promise.resolve()
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${keyword}&maxResults=40`)
        .then(res => res.data)
}