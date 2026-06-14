import { useEffect, useState } from "react";

// Hook que gestiona el tema actual (light/dark) y lo persiste en localStorage
export const useTheme = () => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    // Aplica la clase en <body> y guarda la preferencia
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Alterna entre light y dark
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return {
        theme,
        toggleTheme
    };
};