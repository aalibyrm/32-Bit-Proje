import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useState, createContext } from "react";

export const ThemeContext = createContext();

const themeColors = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: mode === "dark" ? "#9e23de" : "#8d1718",
            },
            secondary: {
                main: mode === "dark" ? "#2F2F2F" : "#D9D9D9",
            },
            background: {
                default: mode === "dark" ? "#121212" : "#f5f5f5",
                paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
            },
            text: {
                primary: mode === "dark" ? "#ffffff" : "#000000",
                secondary: mode === "dark" ? "#aaaaaa" : "#555555",
            },
            divider: mode === "dark" ? "#333" : "#ccc",
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
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
