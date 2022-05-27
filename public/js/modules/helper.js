export function creatElFn(tag, text, clas, dest) {
  const newEl = document.createElement(tag);
  newEl.textContent = text;
  newEl.className = clas;
  dest.append(newEl);
  return newEl;
}
