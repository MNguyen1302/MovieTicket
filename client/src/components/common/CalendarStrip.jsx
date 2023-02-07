import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Box, Button, Stack, Typography } from "@mui/material";

let curr = new Date();
// let curr = [
//     { day: "07", dayOfWeek: "Tue"},
//     { day: "08", dayOfWeek:"Wed"},
//     { day: "09", dayOfWeek:"Tue"},
//     { day: "10", dayOfWeek:"Tue"},
//     { day: "11", dayOfWeek:"Tue"},
//     { day: "12", dayOfWeek:"Tue"},
//     { day: "12", dayOfWeek:"Tue"},
//     { day: "12", dayOfWeek:"Tue"},
//     { day: "12", dayOfWeek:"Tue"},
//     { day: "12", dayOfWeek:"Tue"},
// ]
const CalendarStrip = () => {
    const [dateStrip, setDateStrip] = useState([]);
    const [swiper, setSwiper] = useState();

    const prevRef = useRef();
    const nextRef = useRef();

    useEffect(() => {
        if (swiper) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [swiper])

    useEffect(() => {
        let first = curr.getDate() - 1;
        for(let i = 1; i < 11; i++) {
            let next = new Date(curr.getTime());
            next.setDate(first+i);
            const dayOfWeek = next.toString().split(" ")[0];
            const day = next.toString().split(" ")[2]
            setDateStrip(oldDate => [...oldDate, { dayOfWeek, day }])                  
        }
        console.log(dateStrip)
    }, [curr])
    

    return (
        <Box sx={{  display: "flex",
                    flexDirection: "row",
                    "& .swiper-slide": {
                        width: { xs: "50%", md: "25%", lg: "12.5%" },
                        color: "primary.contrastText"
                    }
            }}
        >
            <Button
                variant="text"
                size="large"
                startIcon={<ArrowBackIosRoundedIcon/>}
                sx={{
                    "&:hover": { backgroundColor: 'transparent' },
                }}
                ref={prevRef}
            />
            <Swiper
                modules={[Navigation]}
                grabCursor={true}
                slidesPerView={"auto"}
                navigation={{
                    prevEl: prevRef?.current,
                    nextEl: nextRef?.current,
                }}
                style={{ width: "100%", height: "max-content" }}
                onSwiper={setSwiper}
            >
                {dateStrip.map((d, index) => (
                    <SwiperSlide key={index}>
                        <Box sx={{
                            color: "text.primary"
                        }}>
                            <Stack 
                                direction="column" 
                                spacing={1} 
                                sx={{ 
                                    padding: "1.1rem", 
                                    margin: "0 5px", 
                                    backgroundColor: "#545e70",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                <Typography variant="h5" fontWeight="700" textAlign="center">{d.day}</Typography>
                                <Typography textAlign="center">{d.dayOfWeek}</Typography>
                            </Stack>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Button
                variant="text"
                size="large"
                startIcon={<ArrowForwardIosRoundedIcon/>}
                sx={{
                    "&:hover": { backgroundColor: 'transparent' },
                }}
                ref={nextRef}
            />
        </Box>
    )
}

export default CalendarStrip