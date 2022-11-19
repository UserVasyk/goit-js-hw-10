import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;
refs.inputCountry.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry(evt) {
  if (evt.target.value === '') {
    return;
  }
  const name = evt.target.value;
  fetchCountries(name.trim())
    .then(countries => {
      clearList(refs.countryList);
      clearList(refs.countryInfo);
      if (countries.length > 10) {
        return window.alert('too many countries!!');
      } else if (countries.length >= 2 && countries.length <= 10) {
        return renderCountryList(countries);
      } else if (countries.length === 1) {
        console.log(countries[0]);
        return renderCountryInfo(countries[0]);
      }
    })
    .catch(error => {
      clearList(refs.countryList);
      clearList(refs.countryInfo);
    });
}

function renderCountryList(countries) {
  if (refs.countryInfo !== '') {
    clearList(refs.countryInfo);
  }

  countries.map(country => {
    return refs.countryList.insertAdjacentHTML(
      'beforeend',

      `<li>
        <img class="country_flag" src="${country.flags.png}"></img>
        <p>${country.name.common}</p>
      </li>`
    );
  });
}

function renderCountryInfo(country) {
  if (refs.countryList !== '') {
    clearList(refs.countryList);
  }

  const { name, capital, population, flags, languages } = country;
  refs.countryInfo.innerHTML = `<div class="boxInfoCountry">
  <img class="country_flag" src="${flags.png}"></img>
  <h1>${name.common}</h1>
  </div>
  <ul class="infoListCountry">
  
  <li><h2>Capital:<span class="valueInfo">${capital}</span></h2></li>  
  <li><h2>Population:<span class="valueInfo">${population}</span></h2></li>  
  <li><h2>Languages:<span class="valueInfo">${Object.values(languages).join(
    ', '
  )}</span></h2></li>  
  <p></p>
  </ul>`;
}
function clearList(list) {
  list.innerHTML = '';
}
