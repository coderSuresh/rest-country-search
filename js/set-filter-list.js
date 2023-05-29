const filterList = document.querySelector(".drop-down ul")
const filterBtnText = document.querySelector(".filter button span")

const setFilterList = () => {
    if (filterList && filterBtnText) {
        fetch("../data.json")
            .then((res) => res.json())
            .then((data) => {
                const regions = data.map((country) => country.region)
                const uniqueRegions = [...new Set(regions)]

                uniqueRegions.map((region) => {
                    fetch("../templates/template-region-list.html")
                        .then((res) => res.text())
                        .then((data) => {
                            const regionListHtml = data
                                .replace("{region}", region)
                            filterList.innerHTML += regionListHtml
                        })
                })
            })

        filterList.addEventListener("click", (e) => {
            filterBtnText.textContent = e.target.textContent
            location.href = `?region=${e.target.textContent.trim().toLowerCase().replace(" ", "-")}`
        })
    }
}

export { setFilterList }