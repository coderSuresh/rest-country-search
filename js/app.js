import { toggleDarkMode, setDarkMode, setLightMode } from "./dark-mode.js"
import { getCountries } from "./render-countries.js"
import { setFilterList } from "./set-filter-list.js"
import { searchCountry } from "./search-country.js"
import { renderCountryDetails } from "./render-details.js"

const filterDropDown = document.querySelector(".drop-down")
const goBack = document.querySelector(".go-back")
const uiMode = localStorage.getItem("uiMode") ? localStorage.getItem("uiMode") : ""

if (goBack) {
    goBack.addEventListener("click", () => {
        history.back()
    })
}

window.onload = () => {
    uiMode === "dark" ? setDarkMode() : setLightMode()
    const isFiltered = location.href.includes("?region")
    if (isFiltered) {
        const filterRegion = location.href.includes("?region") ? location.href.split("region=")[1].replace("-", " ") : ""
        document.querySelector(".filter button span").textContent = filterRegion.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
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

const handleScroll = () => {
    const countryContainer = document.querySelector(".country--list")
    const windowHeight = window.innerHeight
    const scrollHeight = window.scrollY
    const countryContainerHeight = countryContainer.offsetHeight
    const countryContainerTop = countryContainer.offsetTop

    if (countryContainer) {
        if (scrollHeight + windowHeight >= countryContainerHeight + countryContainerTop) {
            getCountries()
        }
    }
}

window.addEventListener("scroll", handleScroll)

getCountries()
setFilterList()
searchCountry()
renderCountryDetails()