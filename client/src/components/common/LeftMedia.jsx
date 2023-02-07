import { useState, useEffect } from 'react';
import Container from './Container';
import CalendarStrip from './CalendarStrip';

const LeftMedia = () => {
    return (
        <Container header="schedule">
            <CalendarStrip/>
        </Container>
    )
}

export default LeftMedia;