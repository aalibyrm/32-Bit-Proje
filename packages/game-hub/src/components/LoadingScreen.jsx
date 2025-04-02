import { CircularProgress, Box } from "@mui/material";

function LoadingScreen() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
            }}
        >
            <CircularProgress size={100} />
        </Box>
    );
}

export default LoadingScreen;