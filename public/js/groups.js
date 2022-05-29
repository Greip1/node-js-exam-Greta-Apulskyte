import { getFetch, postFetch } from './modules/fetch.js';
import { creatElFn } from './modules/helper.js';

const token = localStorage.getItem('articlesToken');

const destDiv = document.querySelector('.cards-container');

const selectEl = document.getElementById('add-group-select');

// --------------------------
if (!token) {
  alert('Please login');
  window.location.replace('login.html');
}

async function getMyGroups(articlesToken) {
  const groupsArr = await getFetch('accounts', articlesToken);
  if (groupsArr.success === false) {
    alert('Neaktyvus vartotojas, prasome prisijungti');
    window.location.replace('login.html');
  }
  destDiv.textContent = '';
  renderCards(groupsArr);
}

function renderCards(arr) {
  arr.forEach((articleObj) => {
    createCard(articleObj);
  });
}

function createCard(obj) {
  const cardEl = creatElFn('div', '', 'card', destDiv);

  creatElFn('p', `Group id: ${obj.id}`, 'card-id', cardEl);
  creatElFn('hr', '', '', cardEl);
  creatElFn('h3', obj.name, 'card-name', cardEl);
  const selBtn = creatElFn('button', 'Select', 'card-button btn', cardEl);

  selBtn.addEventListener('click', () => {
    window.location.href = `bills.html?/+${obj.name}/group_id=${obj.group_id}`;
  });
}

// ================================================
// ================================================
// ===============================================extra task select
function createSelectOptions(obj) {
  const selOptionEL = creatElFn(
    'option',
    `Group id: ${obj.id} - ${obj.name}`,
    'card-id',
    selectEl
  );
  selOptionEL.setAttribute('value', `${obj.id}`);
}

function renderAllGroups(arr) {
  arr.forEach((groupObj) => {
    createSelectOptions(groupObj);
  });
}

async function getAllGroupsToSelect(articlesToken) {
  const groupsArr = await getFetch('groups', articlesToken);
  if (groupsArr.success === false) {
    alert('Neaktyvus vartotojas, prasome prisijungti');
    window.location.replace('login.html');
  }
  destDiv.textContent = '';
  renderAllGroups(groupsArr);

  getMyGroups(token);
}
getAllGroupsToSelect(token);

// ====================================asign group
// ====================================

const btnSubmitEl = document.querySelector('.add-group-btn');

btnSubmitEl.addEventListener('click', (e) => {
  e.preventDefault();
  const newGroupOb = asignGroupString();

  asignGroup(newGroupOb);
  getMyGroups(token);
});
function asignGroupString() {
  const articleObj = {
    group_id: selectEl.value,
  };
  return articleObj;
}

async function asignGroup(newGr) {
  postFetch('accounts', token, newGr);
}
// ================================================================================================
// ============add new group

const inputNameEl = document.getElementById('create-group-input');

const addNewGroupBtn = document.querySelector('#create-group-btn');

const errEl = document.getElementById('error');

addNewGroupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newBillOb = newGroupString();
  if (inputNameEl.value.length < 1) {
    errEl.textContent = 'Input can not be empty';
    return;
  }

  addNewGroup(newBillOb);
  getAllGroupsToSelect(token);
  inputNameEl.value = '';
});

function newGroupString() {
  const articleObj = {
    name: inputNameEl.value,
  };
  return articleObj;
}
async function addNewGroup(newBill) {
  await postFetch('groups', token, newBill);
}
