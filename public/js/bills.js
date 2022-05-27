import { getFetch, postFetch } from './modules/fetch.js';
import { creatElFn } from './modules/helper.js';
console.log('this works just fine');

const token = localStorage.getItem('articlesToken');

const destDiv = document.querySelector('.table-data');

const groupId = window.location.search.split('=');

// ====================================
if (!token) {
  alert('Please login');
  window.location.replace('login.html');
}
// ====================================

async function getMyGroups(token) {
  const groupsArr = await getFetch(`bills/${groupId[1]}`, token);
  console.log('groupsArr ===', groupsArr);
  if (groupsArr.success === false) {
    alert('Neaktyvus vartotojas, prasome prisijungti');
    window.location.replace('login.html');
  }
  destDiv.textContent = '';
  renderCards(groupsArr);
}
getMyGroups(token);

function renderCards(arr) {
  const tableHeadTr = creatElFn('tr', '', 'table-id-head', destDiv);
  creatElFn('th', 'ID', 'table-id-head', tableHeadTr);
  creatElFn('th', 'Description', 'table-description-head', tableHeadTr);
  creatElFn('th', 'Amount', 'table-amount-head', tableHeadTr);
  arr.forEach((articleObj) => {
    createCard(articleObj);
  });
}

function createCard(obj) {
  const trEl = creatElFn('tr', '', 'table-row', destDiv);
  creatElFn('td', obj.id, 'table-id-data', trEl);
  creatElFn('td', obj.description, 'table-description-data', trEl);
  creatElFn('td', `$${obj.amount}`, 'table-amount-data', trEl);
}
// ====================add bill
//  =============================

const formEl = document.forms[0];
const inputAmountEl = formEl.amount;
const inputDescriptionEl = formEl.description;

const btnSubmitEl = document.querySelector('.add-group-btn');

const errEl = document.getElementById('error');

btnSubmitEl.addEventListener('click', (e) => {
  e.preventDefault();
  const newBillOb = articleString();
  if (inputDescriptionEl.value.length < 1 || inputAmountEl.value.length < 1) {
    errEl.textContent = 'Uzpildykite visus ivedimo laukus';
    return;
  }

  addArticle(newBillOb);
  getMyGroups(token);
});

function articleString() {
  const articleObj = {
    group_id: groupId[1],
    amount: inputAmountEl.value,
    description: inputDescriptionEl.value,
  };
  return articleObj;
}
async function addArticle(newBill) {
  const resp = await postFetch(`bills?group_id=${groupId[1]}`, token, newBill);
  const atsinJs = await resp.json();
  console.log(atsinJs);
}
