var currentTheme = 'blue-light';

function handleThemeChange(theme) {
    document.body.classList.remove(`darkflex-theme-${currentTheme}`);
    document.body.classList.add(`darkflex-theme-${theme}`);
    currentTheme = theme;
}

handleThemeChange(currentTheme);
