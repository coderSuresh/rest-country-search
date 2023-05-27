const filterDropDown = document.querySelector(".drop-down")

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
        filterDropDown.classList.toggle("hidden")
    } else {
        filterDropDown.classList.add("hidden")
    }
})