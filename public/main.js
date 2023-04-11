const nameList = document.querySelector('.name-list');
const form = document.querySelector('#form');

let development = false;
const URI = development ? 'http://localhost:3000/' : '/';

function getNames() {
  return fetch(`${URI}names`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function addName(e) {
  e.preventDefault();
  const name = new FormData(form).get('name');
  document.querySelector('#name').value = '';
  fetch(`${URI}newName`, {
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  getNames()
    .then((names) => render(names))
    .catch((err) => console.log(err));
}

function render(names) {
  nameList.innerHTML = names.map((name) => `<li>${name.name}</li>`).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  const names = await getNames();
  render(names);

  form.addEventListener('submit', addName);
});
