import { toggleDarkMode, setDarkMode, setLightMode } from "./dark-mode.js"
import { getCountries } from "./render-countries.js"
import { setFilterList } from "./set-filter-list.js"
import { searchCountry } from "./search-country.js"
import { renderCountryDetails } from "./render-details.js"

const filterDropDown = document.querySelector(".drop-down")
const uiMode = localStorage.getItem("uiMode") ? localStorage.getItem("uiMode") : ""

window.onload = () => {
    uiMode === "dark" ? setDarkMode() : setLightMode()
    const isFiltered = location.href.includes("?region") 
    if (isFiltered) {
        const filterRegion = location.href.includes("?region") ? location.href.split("region=")[1].replace("-", " ") : ""
        document.querySelector(".filter button p").textContent = filterRegion
    }
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
renderCountryDetails()