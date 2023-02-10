import { Box } from '@mui/material';
import Container from './Container';
import CalendarStrip from './CalendarStrip';
import CinemaSlide from './CinemaSlide';
import LocationSelect from './LocationSelect';
import ScheduleAccordion from './ScheduleAccordion';

const LeftMedia = () => {
    return (
        <Box sx={{ width: { sm: "100%", md: "70%" } }}>
            <Container header="schedule">
                <LocationSelect/>
                <CalendarStrip/>
                <CinemaSlide/>
                <ScheduleAccordion/>
            </Container>
        </Box>
    )
}

export default LeftMedia;