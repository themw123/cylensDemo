// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
            <svg width="100%" height="calc(100vh - 175px)" viewBox="0 0 405 809" fill="none" xmlns=""></svg>
        </Box>
    );
};

export default AuthBackground;
