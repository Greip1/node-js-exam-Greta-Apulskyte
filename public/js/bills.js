import { getFetch, postFetch } from './modules/fetch.js';
import { creatElFn } from './modules/helper.js';
console.log('this works just fine');

const token = localStorage.getItem('articlesToken');

const destDiv = document.querySelector('.table-data');

// const selectEl = document.getElementById('add-group-select');

// --------------------------
if (!token) {
  alert('Please login');
  window.location.replace('login.html');
}
// bills/:group_id
// --------------------------------------------
async function getMyGroups(articlesToken) {
  const groupId = window.location.search.split('=');

  const groupsArr = await getFetch(`bills/${groupId[1]}`, articlesToken);
  console.log('groupsArr ===', groupsArr);
  if (groupsArr.success === false) {
    alert('Neaktyvus vartotojas, prasome prisijungti');
    window.location.replace('login.html');
  }
  //   renderCards(groupsArr, destEl);
  destDiv.textContent = '';
  renderCards(groupsArr);
}
getMyGroups(token);
// ---------------------------------------------

//---------------------------------------------

function renderCards(arr) {
  const tableHeadTr = creatElFn('tr', '', 'table-id-head', destDiv);
  creatElFn('th', 'ID', 'table-id-head', tableHeadTr);
  creatElFn('th', 'Description', 'table-description-head', tableHeadTr);
  creatElFn('th', 'Amount', 'table-amount-head', tableHeadTr);
  arr.forEach((articleObj) => {
    createCard(articleObj);
  });
}
// -------------------------------------------

function createCard(obj) {
  const trEl = creatElFn('tr', '', 'card', destDiv);
  creatElFn('td', obj.id, 'table-id-data', trEl);
  creatElFn('td', obj.description, 'table-description-data', trEl);
  creatElFn('td', `$${obj.amount}`, 'table-amount-data', trEl);
}
