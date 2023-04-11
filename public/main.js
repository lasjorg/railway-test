const nameList = document.querySelector('.name-list');
const form = document.querySelector('#form');

function getNames() {
  return fetch('http://localhost:3000/names')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function addName(e) {
  e.preventDefault();
  const name = new FormData(form).get('name');
  fetch('http://localhost:3000/newName', {
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
  console.log(names);
  render(names);

  form.addEventListener('submit', addName);
});
