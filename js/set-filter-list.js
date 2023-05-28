const filterList = document.querySelector(".drop-down ul")
const filterBtnText = document.querySelector(".filter button p")

const setFilterList = () => {
    fetch("../data.json")
        .then((res) => res.json())
        .then((data) => {
            const regions = data.map((country) => country.region)
            const uniqueRegions = [...new Set(regions)]

            uniqueRegions.map((region) => {
                fetch("../template-region-list.html")
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

export { setFilterList }