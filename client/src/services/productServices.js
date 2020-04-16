let axios = require('axios');

export default {
    makeProduct: async (data, onMake) => {
        // makeProduct sends data to the route so it can save it the db
        axios.post('http://localhost:5000/makeProduct', {
            headers: { 'auth-token': localStorage.getItem('_______________JWT_Token') },
            body: data
        })
            .then(res => {
                onMake()
                // onMake is a function from makeNewProduct file 
            })
            .catch(err => console.log(err));
    },
    sellerProds: async (id, onRetreive) => {
        // sellerProds is a function to retrieve a sepecific seller with the the id
        axios.get(`http://localhost:5000/sellerProds/${id}`, { headers: { 'auth-token': localStorage.getItem('_______________JWT_Token') } })
            .then(res => {

                let { products } = res.data.results;
                onRetreive(products);
            })
            .catch(err => console.log(err));
    },
    allProds: async (onRetreive) => {
        axios.get('http://localhost:5000/allProds' + localStorage.getItem('_______________JWT_Token'), { headers: { 'auth-token': localStorage.getItem('_______________JWT_Token') } })
            .then(res => {
                let { products } = res.data.results;
                onRetreive(products);
            })
            .catch(err => console.log(err));
    }
}