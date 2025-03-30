import { ThemeContext, ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

const themeColors = (mode) => createTheme({
    palette: {
        mode,
        primary: { main: mode === "dark" ? "#9e23de" : "#A32829" },
        secondary: { main: mode === "dark" ? "#2F2F2F" : "#D9D9D9" },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

    const toggleTheme = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("theme", newMode);
    };

    const theme = useMemo(() => themeColors(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
