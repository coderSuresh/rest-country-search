const showLoading = () => {
    if (countryContainer) {
        countryContainer.innerHTML += `
            <div class="loading">
                <div class="loading--icon"></div>
            </div>
        `
    }
}

const hideLoading = () => {
    if (countryContainer) {
        const loading = document.querySelector(".loading")
        if (loading) {
            loading.remove()
        }
    }
}

export { showLoading, hideLoading }