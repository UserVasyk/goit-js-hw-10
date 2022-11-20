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
  const countryName = evt.target.value;
  if (countryName === '' || evt.data === ' ') {
    return;
  }
  fetchCountries(countryName.trim())
    .then(countries => {
      if (countries.length > 1) {
        clearList(refs.countryInfo);
        clearList(refs.countryList);
      }
      if (countries.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            timeout: 2000,
          }
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        return renderCountryList(countries);
      } else if (countries.length === 1) {
        clearList(refs.countryList);
        return renderCountryInfo(countries[0]);
      }
    })
    .catch(error => {
      clearList(refs.countryInfo);
      clearList(refs.countryList);
      Notiflix.Notify.failure('Oops, there is no country with that name', {
        timeout: 2000,
      });
    });
}

function clearList(list) {
  list.innerHTML = '';
}
function renderCountryInfo(country) {
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
