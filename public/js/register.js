import { clearErrorsArr, checkInput, errorsArr } from './modules/validation.js';
//

const baseUrl = 'http://localhost:3001';

const formEl = document.forms.register;
const errroEl = document.getElementById('error');

const nameEl = formEl.elements.fullName;
const emailEl = formEl.elements.email;
const passEl = formEl.elements.password;

const errorMsgElementsArr = document.querySelectorAll('.error-msg');

nameEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required']);
  handleError(errorsArr);
});
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

  const regObj = {
    full_name: formEl.elements.fullName.value.trim(),
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repPassword: formEl.elements.repPassword.value.trim(),
  };

  if (
    formEl.elements.password.value.trim() !== formEl.elements.repPassword.value.trim()
  ) {
    handleError('Data incorrect: skirtingi slaptaz.');
    return;
  }

  clearErrors();
  checkInput(regObj.full_name, 'fullName', ['required', 'minLength-5']);
  checkInput(regObj.email, 'email', ['required', 'minLength-4', 'email', 'include-@']);
  checkInput(regObj.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  // --------------------------------------------------
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  //----------------------------------------------
  registerFetch(regObj.full_name, regObj.email, regObj.password);
});

function handleError(msg) {
  errroEl.textContent = '';
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
// -----------------------------------------------------
async function registerFetch(full_name, email, password) {
  const registerObj = { full_name, email, password };
  const resp = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    handleError('Registration successful, please Login');
  } else {
    const res = await resp.json();
    console.log(res);
    handleError(res);
  }
}
// -------------------------------------------------
function clearErrors() {
  clearErrorsArr();
  errorMsgElementsArr.forEach((htmlElement) => {
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
