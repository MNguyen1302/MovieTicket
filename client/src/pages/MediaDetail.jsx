import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, ListItemButton, Stack, Typography } from "@mui/material";

import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";
import CastSlide from "../components/common/CastSlide";

import tmdbConfigs from "../api/configs/tmdb.configs";
import themeConfigs from "../configs/theme.configs";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";
import uiConfigs from "../configs/ui.configs";
import { borderRadius } from "@mui/system";
import LeftMedia from "../components/common/LeftMedia";
import RightMedia from "../components/common/RightMedia";

const MediaDetail = () => {
    const { mediaType, mediaId } = useParams();

    const { user, listFavourites } = useSelector(state => state.user);

    const [media, setMedia] = useState();
    const [genres, setGenres] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [onRequest, setOnRequest] = useState(false);

    const dispatch = useDispatch();

    const videoRef = useRef(null);

    useEffect(() => {
        const getMedia = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
            dispatch(setGlobalLoading(false));
            if (response) {
                setMedia(response);
                setIsFavorite(response.isFavorite);
                setGenres(response.genres.splice(0, 2));
            }
            if (err) toast.error(err.message);
        }
        
        getMedia();
    }, [mediaType, mediaId, dispatch])
    
    const onFavouriteClick = async () => {
        if (!user) return dispatch(setAuthModalOpen(true));

        if (onRequest) return;

        if (isFavorite) return;

        setOnRequest(true);

        const body = {
            mediaId: media.id,
            mediaTitle: media.title || media.name,
            mediaType: mediaType,
            mediaPoster: media.poster_path,
            mediaRate: media.vote_average
        }

        const { response, err } = await favoriteApi.add(body); 

        if (err) toast.error(err.message);
        if (response) {
            dispatch(addFavorite(response));
            setIsFavorite(true);
            toast.success("Add favorite success");
        }
    }

    return (
        media ? (
            <>
                <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} value={media.vote_average} count={media.vote_count}/>
                <Box sx={{
                    color: "primary.contrastText",
                    ...uiConfigs.style.mainContent
                }}>
                    <Box sx={{
                        marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: { md: "row", sx: "column" }
                        }}>
                            <Box sx={{ 
                                width: { xs: "70%", sm: "50%", md: "50%" },
                                margin: { xs: "0 auto 2rem", md: "0 2.5rem 0 2rem" }
                            }}>
                                <Box sx={{
                                    paddingTop: "140%",
                                    ...uiConfigs.style.backgroundImage(tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path))
                                }}
                                /> 
                            </Box>
                            <Stack direction="column" spacing={5}>
                                <Typography
                                    variant="h2"
                                    fontWeight="500"
                                    sx={{
                                        ...uiConfigs.style.typoLines(1, "left")
                                    }}
                                >
                                    {`${media.name || media.title} ${mediaType === tmdbConfigs.mediaType.movie ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}
                                </Typography>

                                <Stack direction="row" spacing={1} mt={2}>
                                    {genres.map((genre, index) => (
                                        <Chip
                                            key={index}
                                            label={genre.name}
                                            variant="outlined"
                                            color="primary"
                                            sx={{
                                                borderWidth: "2px",
                                                borderColor: "#c4c4c4",
                                                color: "#c4c4c4"
                                            }}
                                        />
                                    ))}
                                </Stack>

                                <Stack direction="row" spacing={1} mt={5}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<PlayArrowIcon/>}
                                        sx={{
                                            borderRadius: "50px"
                                        }}
                                    >
                                        watch now
                                    </Button>
                                    <LoadingButton
                                        variant="text"
                                        sx={{
                                            width: "max-content",
                                            height: "50px",
                                            "& .MuiButton-starIcon": { marginRight: "0" },
                                        }}
                                        size="large"
                                        startIcon={isFavorite ? <FavoriteIcon/> : <FavoriteBorderOutlinedIcon/>}
                                        loadingPosition="start"
                                        loading={onRequest}
                                        onClick={onFavouriteClick}
                                    />
                                </Stack>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        marginTop: "2rem",
                                        ...uiConfigs.style.typoLines(5)
                                    }}
                                >
                                    {media.overview}
                                </Typography>

                                <Container header="cast">
                                    <CastSlide casts={media.credits.cast}/>
                                </Container>
                            </Stack>
                        </Box>
                    </Box>
                
                    <Stack direction={{ sm: "column", md: "row" }}>
                        <LeftMedia/>
                        <RightMedia/>
                    </Stack>
                </Box>
                    
            </>
        ) : null 
    )
}

export default MediaDetail