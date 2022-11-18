import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';
import countryTemplate from './templates/countryTemplate.hbs';
const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
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
    .then(responce => {
      console.log(responce);
      refs.countryList.insertAdjacentHTML(
        'beforeend',
        countryTemplate(responce)
      );
    })
    .catch(error => console.log('error', error));
}
