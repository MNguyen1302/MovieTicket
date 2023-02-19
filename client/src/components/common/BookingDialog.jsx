import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Grid, Stack, Divider } from '@mui/material';
import menuConfigs from '../../configs/menu.configs';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import seatApi from '../../api/modules/seat.api';
import otherUtils from '../../utils/other.utils';
import CustomDialog from './CustomDialog';
import FoodDialog from "./FoodDialog";

const BookingDialog = ({ open, onClose, schedule, movieName }) => {
    const [seatReserved, setSeatReserved] = useState([]);
    const [seats, setSeats] = useState([]);
    const [price, setPrice] = useState(0);
    const [openFoodDg, setOpenFoodDg] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const getSeats = async () => {
            const { response, err } = await seatApi.getList({ roomId: schedule.roomId.id });

            if (response) setSeats(response);
            if (err) toast.error(err.message);
        }

        getSeats();
    }, [schedule, seatReserved])
    
    const createSeats = (row) => {
        const rowAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

        return seats.filter(seat => seat.row === rowAlpha[row]);
    }

    const getSeatType = (reserved, isBooking, type) => {
        if (reserved) return "#d82d8b"

        if (isBooking === 1) return "#404040";

        return type === "Regular" ? "#722ed1" : "#f5222d";
    }

    const selectSeat = (seat) => {
        if (seatReserved.findIndex(s => s.id === seat.id) > -1) {
            setSeatReserved(seatReserved.filter(s => s.id !== seat.id));
            setPrice(currentPrice => currentPrice - (schedule.cinemaId.price + seat.type.surcharge));
        } 

        if (seatReserved.length > 7) {
            return toast.warning("You can only select up to 8 seats at a time");
        }
        
        if (seatReserved.findIndex(s => s.id === seat.id) === -1) {
            setSeatReserved(currentSeats => [...currentSeats, seat]);
            setPrice(currentPrice => currentPrice + (schedule.cinemaId.price + seat.type.surcharge));
        }
    }
    
    const removeAllSeat = () => {
        setSeatReserved([]);
        setPrice(0);
    }

    const handleBuyTicket = () => {
        if (seatReserved.length < 1) return toast.warning("Please choose up to 1 seat");

        setOpenFoodDg(true);
    }

    const handleCloseFoodDg = () => {
        setOpenFoodDg(false);
    }

    return (
        <>
            <CustomDialog
                onClose={onClose}
                open={open}
                header="booking ticket"
                width="lg"
            >
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
                        {Array.from(Array(schedule.roomId.totalRows)).map((item, index) => (
                            <Box key={index} sx={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "4px"
                            }}>
                                {seats.length > 0 && createSeats(index).map((seat, index) => (
                                    <button 
                                        key={index}
                                        className={seatReserved.findIndex(sr => sr.id === seat.id) > -1 ? "seat-item reserved" : "seat-item available"}
                                        id={seat.id}
                                        ref={ref}
                                        style={{
                                            position: "relative",
                                            width: "32px",
                                            height: "32px",
                                            backgroundColor: getSeatType(seatReserved.findIndex(sr => sr.id === seat.id) > -1 ? true : false,seat.isBooking, seat.type.name),
                                            outline: "none",
                                            border: "none",
                                            borderRadius: "5px",
                                            color: "#fff",
                                            margin: "0 4px",
                                            fontSize: "0.7rem",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                            transition: "0.3s ease"
                                        }}
                                        onClick={() => selectSeat(seat)}
                                    >{seat.row + "" + seat.column}</button>
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
                        <Typography variant="body1" fontWeight="500" sx={{ color: "#000000" }}>{movieName}</Typography>
                        <Typography variant="body1" sx={{ color: "#f97316" }}>{schedule.startTime + " ~ " + schedule.endTime + " · " + otherUtils.formatDate(schedule.date) + " · " + schedule.roomId.name}</Typography>
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
                        <Stack 
                            direction="row" 
                            spacing={1} 
                            alignItems="center" 
                            sx={{ 
                                padding: "0 5px", 
                                border: "solid 1px #f2f2f2", 
                                borderRadius: "5px",
                                visibility: seatReserved.length > 0 ? "unset" : "hidden"
                            }}
                        >
                            <Typography>{seatReserved.map(seat => ` ${seat.row}${seat.column}`).toString()}</Typography>
                            <Button 
                                variant='text'
                                size="large"
                                startIcon={<CancelIcon/>}
                                sx={{
                                    color: "#EF4444",
                                }}
                                onClick={() => removeAllSeat()}
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
                        <Stack direction="column" spacing={1} sx={{ color: "#737373" }}>
                            <Typography fontSize="0.9rem" fontWeight="500">Temporary</Typography>
                            <Typography fontSize="1.2rem" fontWeight="500" sx={{ color: "#000000" }}>{otherUtils.formatPrice(price)}</Typography>
                        </Stack>
                        <Button 
                            sx={{ 
                                color: "#fff", 
                                backgroundColor: "#90b2ca", 
                                borderRadius: "5px", 
                                padding: "0 25px",
                                "&:hover": {
                                    backgroundColor: "#90b2ca"
                                }
                            }}
                            onClick={() => handleBuyTicket()}
                        >Buy ticket</Button>    
                    </Box>
                </Box>
            </CustomDialog>
            <FoodDialog open={openFoodDg} onClose={handleCloseFoodDg} cluster={schedule.cinemaId.cluster} />
        </>
    )
}

export default BookingDialog;

