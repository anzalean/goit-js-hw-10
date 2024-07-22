import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');
const time = document.querySelector('input[name="delay"]');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (!time.value) {
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
    const delay = parseInt(time.value, 10);
    const state = selectedOption.value;
    
    console.log(`Delay time: ${delay}ms`);
    
    createPromise(delay, state).then(data => {
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

function createPromise(delay, state) {
    console.log("Start");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(`Fulfilled promise in ${delay}ms`);
            } else {
                reject(`Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
}
