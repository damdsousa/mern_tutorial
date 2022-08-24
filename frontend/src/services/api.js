import axios from 'axios'; //  http request handler, middleware que trata da comunicacao entre BE e FE.

const api = axios.create({
    baseURL: "http://localhost:8000"
})

export default api;