import { toggleDarkMode, setDarkMode, setLightMode } from "./dark-mode.js"
import { getCountries } from "./render-countries.js"
import { setFilterList } from "./set-filter-list.js"
import { searchCountry } from "./search-country.js"

const filterDropDown = document.querySelector(".drop-down")
const uiMode = localStorage.getItem("uiMode") ? localStorage.getItem("uiMode") : ""

window.onload = () => {
    uiMode === "dark" ? setDarkMode() : setLightMode()
}

document.addEventListener("click", (e) => {
    if (filterDropDown) {
        if (e.target.classList.contains("filter-btn")) {
            filterDropDown.classList.toggle("hidden")
        } else {
            filterDropDown.classList.add("hidden")
        }
    }

    if (e.target.classList.contains("toggle-ui-mode")) {
        toggleDarkMode()
    }
})

getCountries()
setFilterList()
searchCountry()

const renderCountryDetails = () => {
    const detailsContainer = document.querySelector(".country--details")
    const countryName = location.href.includes("?country=") ? location.href.split("?country=")[1].replace(/%20/g, " ")  : "" //replace %20 with space in country name globally (g) in the string

    if (detailsContainer && countryName) {
        fetch("../data.json")
            .then((res) => res.json())
            .then((data) => {
                data = data.filter((country) => country.name.toLowerCase() === countryName)[0]
                fetch("../template-country-details.html")
                    .then((res) => res.text())
                    .then((template) => {

                        const languages = data.languages.map((language) => language.name).join(", ")
                        const currencies = data.currencies.map((currency) => currency.name).join(", ")
                        const borders = data.borders.map((border) => {
                            return `
                                    <p class="w-fit bg-elem px-4 rounded flex-grow text-center">${border}</p>
                                `
                        }).join("")

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
}

renderCountryDetails()