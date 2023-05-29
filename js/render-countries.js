import { showLoading, hideLoading } from "./loader.js"

const countryContainer = document.querySelector(".country--list")
const renderedCountries = {}

const renderCountry = (country) => {
    fetch("../templates/template-country-card.html")
        .then((res) => res.text())
        .then((data) => {
            const countryCard = data
                .replace("{country}", country.name)
                .replace("{country-url}", country.alpha3Code.toLowerCase())
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
    showLoading()

    const res = await fetch("../data.json")
    const data = await res.json()

    if (countryContainer) {
        const filterRegion = location.href.includes("?region")
            ? location.href.split("region=")[1].replace("-", " ")
            : ""
        const filterSearch = location.href.includes("?search")
            ? location.href.split("search=")[1].replace("-", " ")
            : ""

        let countryFound = false

        data.forEach((country, index) => {
            if (filterRegion) {
                if (country.region.toLowerCase() === filterRegion) {
                    renderCountry(country)
                    countryFound = true
                }
            } else if (filterSearch) {
                countryContainer.innerHTML = ""
                if (country.capital) {
                    if (country.name.toLowerCase().includes(filterSearch) ||
                        country.capital.toLowerCase().includes(filterSearch) ||
                        country.region.toLowerCase().includes(filterSearch) ||
                        country.subregion.toLowerCase().includes(filterSearch) ||
                        country.alpha3Code.toLowerCase().includes(filterSearch) ||
                        country.alpha2Code.toLowerCase().includes(filterSearch) ||
                        country.demonym.toLowerCase().includes(filterSearch) ||
                        country.nativeName.toLowerCase().includes(filterSearch)
                    ) {
                        renderCountry(country)
                        countryFound = true
                    }
                }
            } else {
                if (index >= batch * 20 && index < batch * 20 + 20) {
                    renderCountry(country)
                    countryFound = true
                }
            }
        })

        if (filterSearch && !countryFound) {
            countryContainer.innerHTML = `
                <div class="country--not-found">
                    <h2 class="font-bold">Country not found</h2>
                </div>
            `
        }
    }

    batch++
    hideLoading()
}

export { getCountries }