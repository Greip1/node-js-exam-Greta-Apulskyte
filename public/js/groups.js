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

// --------------------------------------------
async function getMyGroups(articlesToken) {
  const groupsArr = await getFetch('accounts', articlesToken);
  // console.log('groupsArr ===', groupsArr);
  if (groupsArr.success === false) {
    alert('Neaktyvus vartotojas, prasome prisijungti');
    window.location.replace('login.html');
  }
  destDiv.textContent = '';
  renderCards(groupsArr);
}

// ---------------------------------------------

//---------------------------------------------

function renderCards(arr) {
  arr.forEach((articleObj) => {
    createCard(articleObj);
  });
}
// -------------------------------------------

function createCard(obj) {
  const cardEl = creatElFn('div', '', 'card', destDiv);

  creatElFn('p', `Group id: ${obj.id}`, 'card-id', cardEl);
  creatElFn('hr', '', '', cardEl);
  creatElFn('h3', obj.name, 'card-name', cardEl);
  const selBtn = creatElFn('button', 'Select', 'card-button btn', cardEl);

  selBtn.addEventListener('click', () => {
    // console.log('group id', obj.group_id);
    window.location.href = `bills.html?group_id=${obj.group_id}`;
  });
}
// ================================================
// ================================================
// ================================================
// ================================================
// ===============================================extra select
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
  // console.log('groupsArr ===', groupsArr);
  if (groupsArr.success === false) {
    alert('Neaktyvus vartotojas, prasome prisijungti');
    window.location.replace('login.html');
  }
  destDiv.textContent = '';
  renderAllGroups(groupsArr);

  getMyGroups(token);
}
getAllGroupsToSelect(token);

// ====================================add group
// ====================================

const btnSubmitEl = document.querySelector('.add-group-btn');

btnSubmitEl.addEventListener('click', (e) => {
  e.preventDefault();
  const newArticleOb = articleString();
  // console.log(newArticleOb);

  addArticle(newArticleOb);
  getMyGroups(token);
});
function articleString() {
  // console.log('select el value', selectEl.value);
  const articleObj = {
    group_id: selectEl.value,
  };
  return articleObj;
}
async function addArticle(newArticle) {
  const resp = await fetch('http://localhost:3001/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token} ` },
    body: JSON.stringify(newArticle),
  });
  const atsinJs = await resp.json();
  // console.log(atsinJs);
  window.location.href = 'groups.html';
}
// =========
