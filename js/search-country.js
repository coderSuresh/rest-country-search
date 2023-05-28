const searchInput = document.querySelector(".search input")

const searchCountry = () => {
    document.addEventListener("keyup", (e) => {

        if (searchInput.checkValidity()) {
            if (e.key === "Enter") {
                location.href = `?search=${searchInput.value}`
            }
        } else searchInput.reportValidity()
    })
}

export { searchCountry }