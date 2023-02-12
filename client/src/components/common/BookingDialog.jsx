import React from 'react'
import { Dialog, Box, Button, Typography, Grid, Stack, Divider } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import menuConfigs from '../../configs/menu.configs';
import CancelIcon from '@mui/icons-material/Cancel';

const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14']
const BookingDialog = ({ open, onClose }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth={true} 
            maxWidth="lg" 
            PaperProps={{
                sx: {
                    maxHeight: "100%"
                }
            }}
        >
            <Box sx={{ width: "100%" }}>
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
                    />
                    <Typography 
                        fontWeight="600" 
                        fontSize="1.2rem" 
                        sx={{ 
                            width: "100%", 
                            textAlign: "center",
                            paddingRight: "3rem"
                        }}
                    >Booking Ticket</Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#262626"
                }}>
                    <Box>
                        <Box sx={{ 
                            width: "16rem", 
                            height: "0.2rem", 
                            borderRadius: "0.5rem", 
                            backgroundColor: "#fff",
                            margin: "5px"
                        }}/>
                        <Typography textTransform="uppercase" textAlign="center">screen</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px"
                    }}>
                        {Array.from(Array(9)).map(item => (
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "4px"
                            }}>
                                {seats.map((seat, index) => (
                                    <button style={{
                                        width: "32px",
                                        height: "32px",
                                        backgroundColor: "#f72ed1",
                                        outline: "none",
                                        border: "none",
                                        borderRadius: "5px",
                                        color: "#fff",
                                        margin: "0 4px",
                                        fontSize: "0.7rem",
                                        cursor: "pointer",
                                        fontWeight: "600"
                                    }}
                                    >{seat}</button>
                                ))}
                            </Box>
                        ))}
                        <Box sx={{
                            margin: "10px"
                        }}>
                            <Grid container spacing={1} columns={{ xs: 4, md: 8 }} sx={{ width: "max-content", margin: "auto", paddingLeft: "4rem" }}>
                                {menuConfigs.seatCaptions.map((caption, index) => (
                                    <Grid item xs={2} md={4} key={index}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Box
                                                sx={{
                                                    width: "1.2rem",
                                                    height: "1.2rem",
                                                    borderRadius: "2px",
                                                    backgroundColor: caption.color
                                                }}
                                            />
                                            <Typography variant="body1" fontSize="0.9rem" fontWeight="500" textTransform="capitalize">{caption.content}</Typography>
                                        </Stack>
                                    </Grid>

                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    backgroundColor: "#fff",
                    padding: "0 30px",
                }}>
                    <Stack direction="column" sx={{ padding: "1rem 0" }}>
                        <Typography variant="body1" fontWeight="500" sx={{ color: "#000000" }}>Titanic</Typography>
                        <Typography variant="body1" sx={{ color: "#f97316" }}>17:15 ~ 20:29 · T3, 14/02 · Phòng chiếu 6</Typography>
                    </Stack>
                    <Divider sx={{ backgroundColor: "#f2f2f2"}}/>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#737373",
                        padding: "0.7rem 0",
                    }}>
                        <Typography fontWeight="500">Seating</Typography>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ padding: "0 5px", border: "solid 1px #f2f2f2", borderRadius: "5px" }}>
                            <Typography>A1</Typography>
                            <Button 
                                variant='text'
                                size="large"
                                startIcon={<CancelIcon/>}
                                sx={{
                                    color: "#EF4444"
                                }}
                            />
                        </Stack>
                    </Box>
                    <Divider sx={{ backgroundColor: "#f2f2f2"}}/>
                    <Box sx={{ 
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "1rem 0" 
                    }}>
                        <Stack direction="column" spacing={1} sx={{ color: "#737373"}}>
                            <Typography fontSize="0.9rem" fontWeight="500">Temporary</Typography>
                            <Typography fontSize="1.2rem" fontWeight="500" sx={{ color: "#000000" }}>105.000đ</Typography>
                        </Stack>
                        <Button sx={{ 
                            color: "#fff", 
                            backgroundColor: "#90b2ca", 
                            borderRadius: "5px", 
                            padding: "0 25px",
                            "&:hover": {
                                backgroundColor: "#90b2ca"
                            }
                        }}>Buy ticket</Button>    
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default BookingDialog;