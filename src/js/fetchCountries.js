function fetchCountries(name) {
  const params = {
    mainUrl: 'https://restcountries.com/v3.1/name',
    sortUrl: 'fields=name,capital,population,flags,languages',
  };
  return fetch(`${params.mainUrl}/${name}?${params.sortUrl}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
export { fetchCountries };
