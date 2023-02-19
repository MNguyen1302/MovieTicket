import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const HeaderDialog = ({ onClose, header }) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "8px",
            backgroundColor: "#90b2ca"
        }}>
            <Button
                variant="text"
                size="large"
                startIcon={<ArrowBackIosNewRoundedIcon/>}
                sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: 'transparent' },
                }}
                onClick={() => onClose()}
            />
            <Typography 
                fontWeight="600" 
                fontSize="1.2rem" 
                textTransform="capitalize"
                sx={{ 
                    width: "100%", 
                    textAlign: "center",
                    paddingRight: "3rem"
                }}
            >{header}</Typography>
        </Box>
    )
}

export default HeaderDialog