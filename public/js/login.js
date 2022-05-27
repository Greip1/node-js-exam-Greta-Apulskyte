import { clearErrorsArr, checkInput, errorsArr } from './modules/validation.js';

const formEl = document.getElementById('login');
const baseUrl = 'http://localhost:3001/login';

const errroEl = document.getElementById('error');
const emailEl = formEl.elements.email;
const passEl = formEl.elements.password;

const errorMsgElementsArr = document.querySelectorAll('.error-msg');

emailEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'email', 'include-@']);
  handleError(errorsArr);
});
passEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-5', 'maxLength-10']);
  handleError(errorsArr);
});

// ----------------------------------------------------

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  console.log('loginObj ===', loginObj);
  // ------------------------------------------------
  clearErrors();
  checkInput(loginObj.email, 'email', ['required', 'minLength-4', 'email', 'include-@']);
  checkInput(loginObj.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  console.log('FE errorsArr ===', errorsArr);
  // --------------------------------------------------
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  // --------------------------------------------
  const resp = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs.success === true) {
    console.log('login success');
    errroEl.textContent = '';

    const { token } = dataInJs;
    localStorage.setItem('articlesToken', token);

    window.location.replace('groups.html');
  } else {
    console.log('login fail');
    handleError(dataInJs);
  }
});
// ---------------------------------------------------
function handleError(msg) {
  // errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}
function clearErrors() {
  // errorsArr = [];
  clearErrorsArr();
  errorMsgElementsArr.forEach((htmlElement) => {
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
