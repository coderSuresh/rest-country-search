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
    if (e.target.classList.contains("filter-btn")) {
        filterDropDown.classList.toggle("hidden")
    } else {
        filterDropDown.classList.add("hidden")
    }

    if (e.target.classList.contains("toggle-ui-mode")) {
        toggleDarkMode()
    }
})

getCountries()
setFilterList()
searchCountry()