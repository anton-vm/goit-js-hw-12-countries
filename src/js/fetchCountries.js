
export default {
    fetchCountries(name) {
       return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(res => res.json())
}
}
