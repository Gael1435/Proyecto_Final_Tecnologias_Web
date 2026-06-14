import { Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

function Navbar({ theme, toggleTheme }) {

    return (

        <nav className="navbar print:!hidden">

            <div className="nav-links">

                <Link to="/">Inicio</Link>

                <Link to="/editor">Editor</Link>

                <Link to="/preview">Preview</Link>

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/about">About</Link>

            </div>

            <ThemeToggle
                theme={theme}
                toggleTheme={toggleTheme}
            />

        </nav>

    );
}

export default Navbar;