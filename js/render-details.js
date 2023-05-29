import { showLoading, hideLoading } from "./loader.js"

const detailsContainer = document.querySelector(".country--details")
const alpha3Code = location.href.includes("?country=") ? location.href.split("?country=")[1] : ""

const renderCountryDetails = () => {
    showLoading()
    if (detailsContainer && alpha3Code) {
        fetch("../data.json")
            .then((res) => res.json())
            .then((data) => {
                data = data.filter((country) => country.alpha3Code.toLowerCase() === alpha3Code)[0]
                fetch("../template-country-details.html")
                    .then((res) => res.text())
                    .then((template) => {

                        const languages = data.languages ? data.languages.map((language) => language.name).join(", ") : "No languages"
                        const currencies = data.currencies ? data.currencies.map((currency) => currency.name).join(", ") : "No currencies"
                        const borders = data.borders ? data.borders.map((border) => {
                            return `
                                <a href="?country=${border.toLowerCase()}" class="border-tag bg-elem">
                                    <p>${border}</p>
                                </a>
                                `
                        }).join("") : "No borders"

                        const countryDetails = template
                            .replace("{country}", data.name)
                            .replace("{flag}", data.flags.svg)
                            .replace("{native name}", data.nativeName)
                            .replace("{population}", data.population)
                            .replace("{region}", data.region)
                            .replace("{sub region}", data.subregion)
                            .replace("{capital}", data.capital)
                            .replace("{tld}", data.topLevelDomain)
                            .replace("{currencies}", currencies)
                            .replace("{languages}", languages)
                            .replace("{borders}", borders)

                        detailsContainer.innerHTML = countryDetails
                    })
            })
    }
    hideLoading()
}

export { renderCountryDetails }