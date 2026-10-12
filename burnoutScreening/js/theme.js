export function initTheme() {
    const themeBtn = document.getElementById("themeToggleBtn");
    const savedTheme = localStorage.getItem("gameTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeBtn.innerHTML = "&#9728;";
    }

    themeBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        if (isDark) {
            themeBtn.innerHTML = "&#9728;";
            localStorage.setItem("gameTheme", "dark");
        } else {
            themeBtn.innerHTML = "&#9790;";
            localStorage.setItem("gameTheme", "light");
        }
    });
}