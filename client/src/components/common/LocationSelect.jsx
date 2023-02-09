import React, { useState } from 'react';
import { Select, MenuItem, Box, ListItemIcon, SvgIcon } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationSelect = () => {
    const [city, setCity] = useState('TP.HCM');

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    return (
        <Box sx={{
            width: "100%",
            height: "max-content",
            textAlign: "right",
            margin: "15px 0"
        }}>
            <Select 
                sx={{ width: 150 }}
                value={city} 
                onChange={handleChange}
                displayEmpty
                renderValue={(value) => {
                    return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <SvgIcon>
                                <LocationOnIcon/>
                            </SvgIcon>
                            {value}
                        </Box>
                    )
                }}
            >
                <MenuItem value="TP.HCM">TP.HCM</MenuItem>
                <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
            </Select>
        </Box>
    )
}

export default LocationSelect