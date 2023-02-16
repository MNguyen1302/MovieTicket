import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Grid, Paper, Button } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from 'react-toastify';
import uiConfigs from '../../configs/ui.configs';
import cinemaApi from '../../api/modules/cinema.api';
import SpinnerLoading from './SpinnerLoading';
import { setSpinnerLoading } from '../../redux/features/globalLoadingSlice';
import BookingDialog from './BookingDialog';

const ScheduleAccordion = ({ movieName }) => {
    const { spinnerLoading } = useSelector(state => state.globalLoading);
    const { cluster, date, address } = useSelector(state => state.schedule);

    const [cinemas, setCinemas] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [expanded, setExpanded] = useState();
    const [schedule, setSchedule] = useState();
    const [open, setOpen] = useState(false);

    const { mediaId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        const getCinemas = async () => {
            dispatch(setSpinnerLoading(true));
            const { response, err } = await cinemaApi.getBySchedule({ cluster, movieId: mediaId, date, address });

            if (response) {
                setCinemas(response.cinemas);
                setSchedules(response.schedules)
            }
            if (err) toast.error(err.message);
            dispatch(setSpinnerLoading(false));
        }

        getCinemas();
    }, [cluster, dispatch, date, address, mediaId])

    const handleChange = (index) => (e, newExpanded) => {
        setExpanded(newExpanded ? index : false);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    }
    
    const handleOpenDialog = (schedule) => {
        setOpen(true)
        setSchedule(schedule);
    }

    return (
        <Box sx={{
            border: "solid 1px #545e70",
        }}>
            {
                spinnerLoading ? <SpinnerLoading/> : 
                    <>
                        {cinemas.map((cinema, index) => (
                            <Accordion 
                                key={index} 
                                elevation={0} 
                                expanded={expanded === index}
                                onChange={handleChange(index)}
                                disableGutters
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{ alignItems: "center" }}>
                                    <Box sx={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "5px",
                                        border: "solid 1px #757575",
                                        margin: "0 10px",
                                        ...uiConfigs.style.backgroundImage(cinema.logo)
                                    }}/>
                                    <Stack direction="column" spacing={0} marginX="5px">
                                        <Typography variant="body1" fontWeight="500">{cinema.name}</Typography>
                                        <Typography 
                                            variant="body1" 
                                            fontSize="0.9rem" 
                                            sx={{
                                                color: "#9e9e9e"
                                            }}
                                        >
                                            {cinema.address}
                                        </Typography>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={0} columns={{ xs: 4, sm: 8, md: 20 }} sx={{ margin: "0 10px" }}>
                                        {schedules.map((schedule, index) => (
                                            (schedule.cinemaId.id === cinema.id) && <Grid item xs={2} md={4} key={index} sx={{ margin: "10px 0", cursor: "pointer" }}>
                                                <Button
                                                    variant='outlined' 
                                                    sx={{
                                                        width: "max-content", 
                                                        fontSize: "1.1rem", 
                                                        color: "#90b2ca",
                                                        border: "solid 1px #90b2ca"
                                                    }}
                                                    onClick={() => handleOpenDialog(schedule)}
                                                >{schedule.startTime + " ~ " + schedule.endTime}</Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                        {open && <BookingDialog open={open} onClose={handleCloseDialog} schedule={schedule} movieName={movieName}/>}
                    </>
            }
        </Box>
    )
}

export default ScheduleAccordion