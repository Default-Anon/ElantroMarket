import axios from 'axios'

//axios.defaults.baseURL = "http://dendfox-001-site1.dtempurl.com/api";
axios.defaults.baseURL = 'https://localhost:5001/api'
axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

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
    update: (id, product) => requests.put(`/product/${id}`, product),
    delete: (id) => requests.del(`/product/${id}`)
}
const SignInManager = {
    login: (user) => requests.post('user/login',user),
    register: (user) => requests.post('user/register', user),
    currentUser: () => requests.get('user')
}
const Filters = {
    list: (category) => requests.get(`/filter/${category}`),
    search: (category, searchText) => requests.get(`/filter/${category}/${searchText}`)
};
const Comments = {
    create: (comment) => requests.post(`/comment/create`, comment)
};
export default {
    Products,
    SignInManager,
    Filters,
    Comments
}