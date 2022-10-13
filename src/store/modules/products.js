import axios from "axios"
const products = {
    namespaced: true,
    state : {},
    getters : {},
    mutations : {},
    actions : {
        productAdd({commit}, payload){
            axios.post('https://loginvue-aa725-default-rtdb.firebaseio.com/products.json', payload.form_data, payload.config)
            .then(response => {
                console.log(response);
            })
        }
    }
}

export default products