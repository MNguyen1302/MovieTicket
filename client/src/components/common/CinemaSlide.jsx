import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Box, Button, Stack, Typography } from "@mui/material";
import uiConfigs from "../../configs/ui.configs";
import menuConfigs from "../../configs/menu.configs";
import { setCluster } from "../../redux/features/scheduleSlice";

const CinemaSlide = () => {
    const [swiper, setSwiper] = useState();
    const [activeIndex, setActiveIndex] = useState(0);

    const dispatch = useDispatch();

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

    const getActiveIndex = (index, cluster) => {
        setActiveIndex(index);
        dispatch(setCluster(cluster));
    }

    return (
        <Box sx={{  display: "flex",
                    flexDirection: "row",
                    border: "solid 1px #545e70",
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
                onClick={() => console.log("click")}
            >
                {menuConfigs.cinemas.map((cinema, index) => (
                    <SwiperSlide key={index} onClick={() => getActiveIndex(index, cinema.cluster)}>
                        <Box sx={{ color: "text.primary" }}>
                            <Stack 
                                className={activeIndex === index ? 'active' : ''}
                                direction="column" 
                                spacing={1} 
                                alignItems="center"
                                sx={{ 
                                    padding: "1.1rem", 
                                    margin: "0 5px", 
                                    cursor: "pointer",
                                    transition: "0.2s ease",
                                    "&.active": {
                                        color: "#90b2ca",
                                        transition: "0.2s ease",
                                    }
                                }} 
                            >
                                <Box className={activeIndex === index ? 'active' : ''} sx={{
                                    width: "48px",
                                    height: "48px",
                                    border: "solid 3px #cfe8ee",
                                    borderRadius: "5px",
                                    transition: "0.2s ease",
                                    ...uiConfigs.style.backgroundImage(cinema.logo),
                                    "&.active": {
                                        border: "solid 3px #90b2ca",
                                        transition: "0.2s ease",
                                    }
                                }}/>
                                <Typography 
                                    fontWeight="500" 
                                    textAlign="center"
                                    sx={{
                                        ...uiConfigs.style.typoLines(1, "left")
                                    }}
                                >
                                    {cinema.name}
                                </Typography>
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

export default CinemaSlide