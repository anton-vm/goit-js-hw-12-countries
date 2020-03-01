import './css/styles.css';
import aboutCountry from './templates/aboutCountry.hbs';
import debounce from '../node_modules/lodash';



const input = document.querySelector('.input');

function renderCountry(data) {
  const description = aboutCountry(data);
  const place = document.querySelector('#root');
  console.log(data.name);
  place.innerHTML = '';
  place.insertAdjacentHTML('beforeend', description);
}

function renderList(data) {
  return `
<ul class="list-countries">           
<li class="list-countries_item">${data.name}</li>
</ul>
`
}

function fetchCountries(name) {
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 10) {
        const place = document.querySelector('#root');
        const text = `<p>Too many matches found! Please, enter more specific query!</p>`;
        place.innerHTML = '';
        place.insertAdjacentHTML('beforeend', text);
        // PNotify.error({
        //     title: 'Uh Oh!',
        //     text: 'Too many matches found! Please, enter more specific query!',
        //     hide: false
        //   });
      }
      if ((data.length <= 10) & (data.length > 1)) {
        const place = document.querySelector('#root');
        const list = data.map(el => renderList(el)).join('');
        console.log(list);
        place.innerHTML = '';
        place.insertAdjacentHTML('beforeend', list);
      }
      if (data.length === 1) {
        renderCountry(data[0]);
        console.log(data);
      }
    })
    .catch(err => console.log(err));
}

function inputData() {
  const inputData = input.value;
  fetchCountries(inputData);
}

function start() {
  input.addEventListener('input', _.debounce(inputData, 500))
}

start();
