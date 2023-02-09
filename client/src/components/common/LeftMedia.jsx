import Container from './Container';
import CalendarStrip from './CalendarStrip';
import CinemaSlide from './CinemaSlide';
import LocationSelect from './LocationSelect';
import ScheduleAccordion from './ScheduleAccordion';

const LeftMedia = () => {
    return (
        <Container header="schedule">
            <LocationSelect/>
            <CalendarStrip/>
            <CinemaSlide/>
            <ScheduleAccordion/>
        </Container>
    )
}

export default LeftMedia;