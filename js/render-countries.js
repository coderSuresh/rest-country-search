const countryContainer = document.querySelector(".country--list")

const renderCountry = (country) => {
    fetch("../template-country-card.html")
        .then((res) => res.text())
        .then((data) => {
            const countryCard = data
                .replace("{country}", country.name)
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

    data.map((country) => {
        renderCountry(country)
    })
}

export { getCountries }