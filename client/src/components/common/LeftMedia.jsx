import { Box } from '@mui/material';
import Container from './Container';
import CalendarStrip from './CalendarStrip';
import CinemaSlide from './CinemaSlide';
import LocationSelect from './LocationSelect';
import ScheduleAccordion from './ScheduleAccordion';

const LeftMedia = ({ movieName }) => {
    return (
        <Box sx={{ width: { sm: "100%", lg: "70%" } }}>
            <Container header="schedule">
                <LocationSelect/>
                <CalendarStrip/>
                <CinemaSlide/>
                <ScheduleAccordion movieName={movieName}/>
            </Container>
        </Box>
    )
}

export default LeftMedia;