import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useState, createContext } from "react";

export const ThemeContext = createContext();

const themeColors = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: mode === "dark" ? "#9E23DE" : "#8d1718",
                light: mode === "dark" ? "#B947F1" : "#B91A1C",
                dark: mode === "dark" ? "#7B1CAB" : "#6B1213",
            },
            secondary: {
                main: mode === "dark" ? "#2F2F2F" : "#D9D9D9",
                light: mode === "dark" ? "#4A4A4A" : "#F0F0F0",
                dark: mode === "dark" ? "#1A1A1A" : "#B8B8B8",
            },
            background: {
                default: mode === "dark"
                    ? "linear-gradient(135deg, #0F0F23 0%, #1A0F2E 25%, #2D1B3D 50%, #1A0F2E 75%, #0F0F23 100%)"
                    : "linear-gradient(135deg, #FDF2F8 0%, #F8FAFC 25%, #FEFEFE 50%, #F8FAFC 75%, #FDF2F8 100%)",
                paper: mode === "dark"
                    ? "linear-gradient(145deg, #1e1e1e 0%, #2A1B3D 50%, #1e1e1e 100%)"
                    : "linear-gradient(145deg, #ffffff 0%, #F8F4F6 50%, #ffffff 100%)",
                primaryGradient: mode === "dark"
                    ? "linear-gradient(135deg, #9E23DE 0%, #7B1CAB 50%, #5D1081 100%)"
                    : "linear-gradient(135deg, #8d1718 0%, #B91A1C 50%, #E01E37 100%)",
                secondaryGradient: mode === "dark"
                    ? "linear-gradient(135deg, #2F2F2F 0%, #1A1A1A 50%, #0D0D0D 100%)"
                    : "linear-gradient(135deg, #D9D9D9 0%, #F0F0F0 50%, #FFFFFF 100%)",
                accent: mode === "dark" ? "#FF6B6B" : "#8d1718",
                accentSecondary: mode === "dark" ? "#4ECDC4" : "#8d1718",
            },
            text: {
                primary: mode === "dark" ? "#FFFFFF" : "#1A1A1A",
                secondary: mode === "dark" ? "#E0E0E0" : "#4A4A4A",
                accent: mode === "dark" ? "#FF6B6B" : "#8d1718",
            },
            divider: mode === "dark" ? "#444444" : "#E0E0E0",
            gradient: {
                primary: mode === "dark"
                    ? "linear-gradient(90deg, #9E23DE, #FF6B6B, #4ECDC4)"
                    : "linear-gradient(90deg, #8d1718, #8d1718, #8d1718)",
                secondary: mode === "dark"
                    ? "linear-gradient(45deg, #2F2F2F, #4A4A4A)"
                    : "linear-gradient(45deg, #D9D9D9, #F0F0F0)",
            },
        },

        action: {
            hover: mode === "dark" ? "rgba(158, 35, 222, 0.1)" : "rgba(141, 23, 24, 0.1)",
            selected: mode === "dark" ? "rgba(158, 35, 222, 0.2)" : "rgba(141, 23, 24, 0.2)",
            disabled: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.26)",
        },
        typography: {
            fontFamily: '"Poppins", sans-serif',
            h1: {
                fontSize: '1.802rem',
                background: mode === "dark"
                    ? "linear-gradient(135deg, #FFFFFF, #E0E0E0)"
                    : "linear-gradient(135deg, #1A1A1A, #4A4A4A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            },
            h2: {
                fontSize: '1.602rem',
                fontWeight: 700,
                background: mode === "dark"
                    ? "linear-gradient(135deg, #FFFFFF, #E0E0E0)"
                    : "linear-gradient(135deg, #1A1A1A, #4A4A4A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            },
            h3: {
                fontSize: '1.424rem',
                fontWeight: 700,
            },
            h4: {
                fontSize: '1.266rem',
                fontWeight: 700,
            },
            h5: {
                fontSize: '1.125rem',
                fontWeight: 700,
            },

            body1: {
                fontWeight: 400,
            },
            body2: {
                fontWeight: 400,
            },

            caption: {
                fontSize: '0.700rem',
                fontWeight: 200,
            },

            button: {
                fontWeight: 700,
                textTransform: 'none',
            },
        },
        components: {
            MuiBox: {
                styleOverrides: {
                    root: {
                        '&.gradient-bg': {
                            background: mode === "dark"
                                ? "linear-gradient(135deg, #0F0F23 0%, #1A0F2E 25%, #2D1B3D 50%, #1A0F2E 75%, #0F0F23 100%)"
                                : "linear-gradient(135deg, #FDF2F8 0%, #F8FAFC 25%, #FEFEFE 50%, #F8FAFC 75%, #FDF2F8 100%)",
                        },
                        '&.card-gradient': {
                            background: mode === "dark"
                                ? "linear-gradient(145deg, #1e1e1e 0%, #2A1B3D 50%, #1e1e1e 100%)"
                                : "linear-gradient(145deg, #ffffff 0%, #F8F4F6 50%, #ffffff 100%)",
                            border: mode === "dark"
                                ? "1px solid rgba(158, 35, 222, 0.3)"
                                : "1px solid rgba(141, 23, 24, 0.3)",
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        background: mode === "dark"
                            ? "linear-gradient(145deg, #1e1e1e 0%, #2A1B3D 50%, #1e1e1e 100%)"
                            : "linear-gradient(145deg, #ffffff 0%, #F8F4F6 50%, #ffffff 100%)",
                        border: mode === "dark"
                            ? "1px solid rgba(158, 35, 222, 0.2)"
                            : "1px solid rgba(141, 23, 24, 0.2)",
                        boxShadow: mode === "dark"
                            ? "0 8px 32px rgba(158, 35, 222, 0.1)"
                            : "0 8px 32px rgba(141, 23, 24, 0.1)",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        background: mode === "dark"
                            ? "linear-gradient(135deg, #9E23DE, #B947F1)"
                            : "linear-gradient(135deg, #8d1718, #B91A1C)",
                        '&:hover': {
                            background: mode === "dark"
                                ? "linear-gradient(135deg, #B947F1, #9E23DE)"
                                : "linear-gradient(135deg, #B91A1C, #8d1718)",
                        },
                    },
                },
            },
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
