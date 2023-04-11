const nameList = document.querySelector('.name-list');
const form = document.querySelector('#form');

let development = false;
const URI = development
  ? 'http://localhost:3000/'
  : 'railway-test-production-af91.up.railway.app/';

function getNames() {
  return fetch(`${URI}${names}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function addName(e) {
  e.preventDefault();
  const name = new FormData(form).get('name');
  fetch(`${URI}${nameNames}`, {
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
  let HTML = '';
  HTML = names
    .map((name) => {
      return `
      <li>${name.name}</li>
    `;
    })
    .join('');
  nameList.innerHTML = HTML;
}

document.addEventListener('DOMContentLoaded', async () => {
  const names = await getNames();
  render(names);

  form.addEventListener('submit', addName);
});
