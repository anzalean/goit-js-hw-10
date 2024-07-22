import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');
const time = document.querySelector('input[name="delay"]');

form.addEventListener('submit', e => {
    e.preventDefault(); 
if (!time.value  ) {
        iziToast.error({
            title: 'Caution',
            message: 'You forgot important data',
             theme: 'dark',
            position: 'topRight',
            backgroundColor: '#FFA000',
        });
        return;
    }
     const selectedOption = document.querySelector('input[name="state"]:checked');
    if (!selectedOption) {
        iziToast.error({
            title: 'Caution',
            message: 'You forgot important data',
             theme: 'dark',
            position: 'topRight',
            backgroundColor: '#FFA000',
        });
        return;
    }
    console.log(`Delay time: ${time.value}ms`); 
    createPromise().then(data => {
        console.log(data); 
        iziToast.success({ 
            title: 'Success',
            message: data,
            theme: 'dark',
            position: 'topRight',
            backgroundColor: '#59A10D',
        
        });
    }).catch(error => {
        console.log(error); 
        iziToast.error({ 
            title: 'Error',
            message: error,
            theme: 'dark',
            position: 'topRight',
            backgroundColor: '#EF4040',
        });
    });
});
function createPromise() {
    console.log("Start")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const selectedOption = document.querySelector('input[name="state"]:checked');
            console.log(`Selected option:`, selectedOption); 
            if (selectedOption) {
                const value = selectedOption.value;
                console.log(`Selected value: ${value}`); 
                if (value === 'fulfilled') {
                    resolve(`Fulfilled promise in ${time.value}ms`); 
                } else {
                    reject(`Rejected promise in ${time.value}ms`); 
                }
            } else {
                reject('No option selected'); 
            }
        }, parseInt(time.value, 10)); 
    });
}
