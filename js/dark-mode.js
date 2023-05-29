const darkModeBtnText = document.querySelector(".toggle-ui-mode span")
const darkModeIcon = document.querySelector(".toggle-ui-mode i")

const setDarkMode = () => {
    console.log(darkModeBtnText)
    darkModeBtnText.textContent = "Light Mode"
    darkModeIcon.classList.remove("fa-moon")
    darkModeIcon.classList.add("fa-sun")
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("uiMode", "dark")
}

const setLightMode = () => {
    darkModeBtnText.textContent = "Dark Mode"
    darkModeIcon.classList.remove("fa-sun")
    darkModeIcon.classList.add("fa-moon")
    document.documentElement.setAttribute("data-theme", "light")
    localStorage.setItem("uiMode", "light")
}

const toggleDarkMode = () => {
    if (document.documentElement.getAttribute("data-theme").includes("dark")) {
        setLightMode()
    } else {
        setDarkMode()
    }
}

export { toggleDarkMode, setDarkMode, setLightMode }