const axios = require("../../../lib/axios.js");


export function getGoogleBooks(keyword) {
    // if (!keyword) return Promise.resolve()
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${keyword}&maxResults=40&key=AIzaSyDmya2Az9xeHL5r5HgyOL29s2hRTyUixLM`)
        .then(res => res.data)
}
