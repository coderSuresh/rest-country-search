const countryContainer = document.querySelector(".country--list")

const renderCountry = (country) => {
    fetch("../template-country-card.html")
        .then((res) => res.text())
        .then((data) => {
            const countryCard = data
                .replace("{country}", country.name)
                .replace("{country-url}", country.name.replace(" ", "-").toLowerCase())
                .replace("{population}", country.population)
                .replace("{region}", country.region)
                .replace("{capital}", country.capital)
                .replace("{flag}", country.flag)
            countryContainer.innerHTML += countryCard
        })
}

const getCountries = async () => {
    const res = await fetch("../data.json")
    const data = await res.json()

    const filterRegion = location.href.includes("?region") ? location.href.split("region=")[1].replace("-", " ") : ""
    const filterSearch = location.href.includes("?search") ? location.href.split("search=")[1].replace("-", " ") : ""

    if (countryContainer) {
        data.map((country) => {
            if (filterRegion) {
                if (country.region.toLowerCase() == filterRegion) {
                    renderCountry(country)
                }
            } else if (filterSearch) {
                if (country.name.toLowerCase().includes(filterSearch)) {
                    renderCountry(country)
                }
            } else {
                renderCountry(country)
            }
        })
    }
}

export { getCountries }