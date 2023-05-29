const countryContainer = document.querySelector(".country--list")
const renderedCountries = {}

const renderCountry = (country) => {
    fetch("../template-country-card.html")
        .then((res) => res.text())
        .then((data) => {
            const countryCard = data
                .replace("{country}", country.name)
                .replace("{country-url}", country.alpha2Code.toLowerCase())
                .replace("{population}", country.population)
                .replace("{region}", country.region)
                .replace("{capital}", country.capital)
                .replace("{flag}", country.flag)
           
            if (!renderedCountries[country.alpha2Code]) {
                countryContainer.innerHTML += countryCard
                renderedCountries[country.alpha2Code] = true
            }
        })
}

let batch = 0

const getCountries = async () => {
    const res = await fetch("../data.json")
    const data = await res.json()

    if (countryContainer) {
        const filterRegion = location.href.includes("?region")
            ? location.href.split("region=")[1].replace("-", " ")
            : ""
        const filterSearch = location.href.includes("?search")
            ? location.href.split("search=")[1].replace("-", " ")
            : ""
        
        data.forEach((country, index) => {
            if (filterRegion) {
                if (country.region.toLowerCase() === filterRegion) {
                    renderCountry(country)
                }
            } else if (filterSearch) {
                if (country.name.toLowerCase().includes(filterSearch)) {
                    renderCountry(country)
                }
            } else {
                if (index >= batch * 20 && index < batch * 20 + 20) {
                    renderCountry(country)
                }
            }
        })
    }

    batch++
}

export { getCountries }