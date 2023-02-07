import { Typography, useTheme } from '@mui/material';

const Logo = () => {
    const theme = useTheme();
    const strLogo = "cinemabee";

    return (
        <Typography 
            fontWeight="500" 
            fontSize="1.7rem" 
            sx={{ 
                "& .text": { marginRight: "5px", textTransform: "uppercase" },
                "& .text-highlight": { marginRight: "5px", textTransform: "uppercase", color: theme.palette.primary.main }
            }}
        >
            {strLogo.split("").map((text, index) => (
                <span key={index} className={index < 6 ? "text" : "text-highlight"}>{text}</span>
            ))}
        </Typography>
    );
};

export default Logo;