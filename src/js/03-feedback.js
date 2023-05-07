import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('[name="email"]');
const message = document.querySelector('[name="message"]');
const allInputs = form.elements;
const LOCAL_STORAGE_KEY = 'feedback-form-state';

const dataForm = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];



const optimizedUpdatePage = throttle(updatePage, 500);

function saveForm(evt, optimizedUpdatePage) {
   
    dataForm = { email: email.value, message: message.value };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataForm));

    updatePage();
 
}


function updatePage() {
     
        email.value = dataForm.email || '';
        message.value = dataForm.message || '';
    
}




form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.elements.email.value || !form.elements.message.value) {
        alert('All fields must be filled!');
    }
    else {
        const result = Array.from(allInputs).reduce((r, ele) => {
            r[ele.name] = ele.value;
            return r;
        }, {});
        console.log(result);

        form.reset();
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    })


