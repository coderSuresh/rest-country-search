const container = document.querySelector(".main-container")
const showLoading = () => {
    if (container) {
        container.innerHTML += `
            <div class="loading">
                <div class="loading--icon"></div>
            </div>
        `
    }
}

const hideLoading = () => {
    if (container) {
        const loading = document.querySelector(".loading")
        if (loading) {
            loading.remove()
        }
    }
}

export { showLoading, hideLoading }