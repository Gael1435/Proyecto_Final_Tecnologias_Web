function ThemeToggle({ theme, toggleTheme }) {

    return (

        <button onClick={toggleTheme}>

            {
                theme === "light"
                    ? "Modo Oscuro"
                    : "Modo Claro"
            }

        </button>

    );
}

export default ThemeToggle;