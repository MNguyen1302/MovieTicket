import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from 'react-toastify';
import uiConfigs from '../../configs/ui.configs';
import cinemaApi from '../../api/modules/cinema.api';
import SpinnerLoading from './SpinnerLoading';
import { setSpinnerLoading } from '../../redux/features/globalLoadingSlice';

const ScheduleAccordion = () => {
    const { spinnerLoading } = useSelector(state => state.globalLoading);
    const { cluster } = useSelector(state => state.schedule);

    const [cinemas, setCinemas] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getCinemas = async () => {
            dispatch(setSpinnerLoading(true));
            const { response, err } = await cinemaApi.getByCluster({ cluster });

            if (response) setCinemas(response);
            if (err) toast.error(err.message);
            dispatch(setSpinnerLoading(false));
        }

        getCinemas();
    }, [cluster, dispatch])
    
    return (
        <Box sx={{
            border: "solid 1px #545e70",
        }}>
            {
                spinnerLoading ? <SpinnerLoading/> : 
                    <>
                        {cinemas.map((cinema, index) => (
                            <Accordion key={index} elevation={0} disableGutters>
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
            
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </>
            }
        </Box>
    )
}

export default ScheduleAccordion