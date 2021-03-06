let axios = require('axios');

export default {
    makeProduct: async (data, onMake) => {
        // makeProduct sends data to the route so it can save it the db

        axios.post('/makeProduct', data, {
            headers: { 'auth-token': localStorage.getItem('_______________JWT_Token') } // header to the http request
        })
            .then(res => {
                onMake()
                // onMake is a function from makeNewProduct file 
            })
            .catch(err => console.log(err));
    },
    sellerProds: async (onRetreive) => {
        // sellerProds is a function to retrieve a sepecific seller with the the id
        axios.get(`/sellerProds`, { headers: { 'auth-token': localStorage.getItem('_______________JWT_Token') } })
            .then(res => {

                let { products } = res.data.results;
                onRetreive(products);
            })
            .catch(err => console.log(err));
    },
    allProds: async (onRetreive) => {
        // allProds takes onRetreive as a parameter and retreive all products data gives it to onRetreive as a parameter

        axios.get('/allProds')
            .then(res => {
                let { products } = res.data.results;
                // console.log(products)
                onRetreive(products);
            })
            .catch(err => console.log(err));
    },
    finishedStock: async (id) => {
        // finishedStock takes id as a parameter and make a put request to update the product by it's id
        axios.put(`/finishedStock/${id}`, {
            stockCondition: "finished"
        },
            { headers: { 'auth-token': localStorage.getItem('_______________JWT_Token') } })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    },
    byNameProducts: async (name, onRetreive) => {
        // byNameProducts makes get http request and returns products by name 
        axios.get(`/getProductsByName/${name}`)
            .then(res => {
                let { products } = res.data.results;
                onRetreive(products);
            })
            .catch(err => console.log(err));
    },
    productAndSeller: async (prodId, onRetreive) => {
        // productAndSeller makes get http request and return a response with product and it's seller data
        axios.get('/productProfile/' + prodId) // made get http request with product id as a param
            .then(res => {
                let { data } = res.data.results;
                onRetreive(data.account, data.product);
            })
            .catch(err => console.log(err))
    }

}