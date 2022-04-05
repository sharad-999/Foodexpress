import axios from 'axios'
 import Noty from 'noty'

export function placeOrder(formObject) {
    axios.post('/orders', formObject).then((res) => {
        new Noty({
            type: 'success',
            timeout: 3000,
            text: res.data.message,
            progressBar: false,
        }).show();
        setTimeout(() => {
            window.location.href = '/customer/orders';
        }, 3000);
    }).catch((err)=> {
        new Noty({
            type: 'success',
            timeout: 3000,
            text: err.res,
            progressBar: false,
        }).show();
    })
}