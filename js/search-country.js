const searchInput = document.querySelector(".search input")

const searchCountry = () => {
    if (searchInput) {
        searchInput.addEventListener("keyup", handleKeyUp)
    }
}

const handleKeyUp = (e) => {
    if (e.key === "Enter") {
        if (searchInput.checkValidity()) {
            performSearch()
        } else {
            searchInput.reportValidity()
        }
    }
}

const performSearch = () => {
    location.href = `?search=${searchInput.value.trim()}`
}

export { searchCountry }
