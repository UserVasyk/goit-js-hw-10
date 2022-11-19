import '../css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

import refs from './refs.js';

const DEBOUNCE_DELAY = 300;

refs.inputCountry.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry(evt) {
  clearList(refs.countryList);
  clearList(refs.countryInfo);
  if (evt.target.value === '') {
    return;
  }
  const name = evt.target.value;
  fetchCountries(name.trim())
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            timeout: 3000,
          }
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        return renderCountryList(countries);
      } else if (countries.length === 1) {
        return renderCountryInfo(countries[0]);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name', {
        timeout: 3000,
      });
      clearList(refs.countryList);
      clearList(refs.countryInfo);
    });
}

function clearList(list) {
  list.innerHTML = '';
}
function renderCountryInfo(country) {
  if (refs.countryList !== '') {
    clearList(refs.countryList);
  }

  const { name, capital, population, flags, languages } = country;
  return (refs.countryInfo.innerHTML = `<div class="boxInfoCountry">
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
  </ul>`);
}
function renderCountryList(countries) {
  if (refs.countryInfo !== '') {
    clearList(refs.countryInfo);
  }

  return countries.map(country => {
    return refs.countryList.insertAdjacentHTML(
      'beforeend',
      `<li>
        <img class="country_flag" src="${country.flags.png}" />
        <p>${country.name.common}</p>
      </li>`
    );
  });
}
