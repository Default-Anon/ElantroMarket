import axios from 'axios'

axios.defaults.baseURL = "https://localhost:5001/api";


const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody)
}

const Products = {
    list: () => requests.get('/product'),
    details: (id) => requests.get(`/product/${id}`),
    create: (product) => requests.post('/product', product),
    update: (id, product) => requests.put(`/product${id}`, product),
    delete: (id) => requests.del(`/product/${id}`)
}
export default {
    Products
}