import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('form');
console.log(form);
const time = document.querySelector('input[name="delay"]');
console.log(time);


form.addEventListener('submit', e => {
    e.preventDefault();

    console.log(time.value);
    createPromise().then(data => {console.log(data);}).catch(error => {console.error(error);});
});
function createPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const selectedOption = document.querySelector('input[name="state"]:checked');
            if (selectedOption) {
                const value = selectedOption.value;
                if (value === 'Fullfilled') {
                    resolve(`Fulfilled promise in ${time.value}ms`);
                   
                } else {
                    reject(`Rejected promise in ${time.value}ms`);
                   
                }

            }
        }, time.value);
    });
}
    
    