var currentTheme = 'blue-light';

function handleThemeChange(theme) {
    document.body.classList.remove(`dotmenu-theme-${currentTheme}`);
    document.body.classList.add(`dotmenu-theme-${theme}`);
    currentTheme = theme;
}

handleThemeChange(currentTheme);
