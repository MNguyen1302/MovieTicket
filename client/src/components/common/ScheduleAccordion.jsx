import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Grid, Paper } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from 'react-toastify';
import uiConfigs from '../../configs/ui.configs';
import cinemaApi from '../../api/modules/cinema.api';
import SpinnerLoading from './SpinnerLoading';
import { setSpinnerLoading } from '../../redux/features/globalLoadingSlice';

const time = ['17:00 ~ 18:00', '19:00 ~ 20:00', '21:00 ~ 22:00', '23:00 ~ 23:30', '23:00 ~ 23:30', '23:00 ~ 23:30', '23:00 ~ 23:30'];
const ScheduleAccordion = () => {
    const { spinnerLoading } = useSelector(state => state.globalLoading);
    const { cluster, date, address } = useSelector(state => state.schedule);

    const [cinemas, setCinemas] = useState([]);
    const [expanded, setExpanded] = useState();

    const { mediaId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        const getCinemas = async () => {
            dispatch(setSpinnerLoading(true));
            const { response, err } = await cinemaApi.getBySchedule({ cluster, movieId: mediaId, date, address });

            if (response) setCinemas(response);
            if (err) toast.error(err.message);
            dispatch(setSpinnerLoading(false));

        }

        getCinemas();
    }, [cluster, dispatch, date, address, mediaId])

    const handleChange = (index) => (e, newExpanded) => {
        setExpanded(newExpanded ? index : false);
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
                                    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 20 }} sx={{ margin: "0 10px" }}>
                                        {time.map((item, index) => (
                                            <Grid xs={2} md={4} key={index} sx={{ margin: "8px 0", cursor: "pointer" }}>
                                                <Paper 
                                                    variant='outlined' 
                                                    sx={{ 
                                                        width: "max-content", 
                                                        padding: { xs: "10px", md: "10px 20px" }, 
                                                        fontSize: "1.1rem", 
                                                        color: "#90b2ca",
                                                        border: "solid 1px #90b2ca"
                                                    }}
                                                >{item}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </>
            }
        </Box>
    )
}

export default ScheduleAccordion