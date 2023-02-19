import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, List, ListItem, Typography, IconButton, Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { toast } from "react-toastify";
import CustomDialog from "./CustomDialog";
import uiConfigs from "../../configs/ui.configs";
import cinemaApi from "../../api/modules/cinema.api";
import otherUtils from "../../utils/other.utils";
import { setCombo, incrementQty, decrementQty, setTotalPrice } from "../../redux/features/comboSlice";

const FoodDialog = ({ open, onClose, cluster }) => {
    const { items, totalPrice } = useSelector(state => state.combo);

    const dispatch = useDispatch();

    useEffect(() => {
        const getListCombo = async () => {
            const { response, err } = await cinemaApi.getListCombo({ cluster });

            if (response) {
                dispatch(setCombo(response));
            }
            if (err) toast.error(err.message);
        }
        getListCombo();
    }, [cluster, dispatch])
    
    const plusQuantity = (id) => {
        dispatch(incrementQty(id))
        dispatch(setTotalPrice(id));
    }

    const minusQuantity = (id) => {
        dispatch(decrementQty(id));
        dispatch(setTotalPrice(id));
    }

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            width="xs"
            header="combo"
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0 20px",
                maxHeight: "calc(100vh - 300px)",
                overflowY: "auto"
            }}>
                {items.map((combo, index) => (
                    <Stack direction="row" spacing={3} alignItems="center" key={index}>
                        <Box sx={{
                            width: "7rem",
                            height: "80px",
                            flexShrink: 0
                        }}>
                            <Box sx={{
                                width: "0px",
                                height: "0px",
                                minHeight: "100%",
                                minWidth: "100%",
                                maxHeight: "100%",
                                maxWidth: "100%",
                                ...uiConfigs.style.backgroundImage(combo.image_path)
                            }}/>
                        </Box>
                        <List>
                            <ListItem disablePadding>
                                <Typography fontWeight="500" fontSize="1.1em">{combo.name + " - " + otherUtils.formatPrice(combo.price)}</Typography>
                            </ListItem>
                            <ListItem disablePadding>
                                <Typography variant="body1" fontSize="0.9em">{combo.description}</Typography>
                            </ListItem>
                            <ListItem disablePadding sx={{ marginTop: "5px" }}>
                                <IconButton 
                                    disableRipple={true}
                                    sx={{
                                        minWidth: "35px",
                                        minHeight: "35px",
                                        padding: 0,
                                    }}
                                    onClick={() => minusQuantity(combo.id)}
                                ><RemoveCircleOutlineIcon/></IconButton>
                                <Box 
                                    component="span" 
                                    sx={{ 
                                        padding: "4px 12px", 
                                        margin: "0 6px", 
                                        border: "solid 1px #f2f2f2", 
                                        borderRadius: "5px"
                                    }}
                                >{combo.quantity}</Box>
                                <IconButton 
                                    disableRipple={true}
                                    sx={{
                                        minWidth: "35px",
                                        minHeight: "35px",
                                        padding: 0,
                                    }}
                                    onClick={() => plusQuantity(combo.id)}
                                ><AddCircleOutlineIcon/></IconButton>
                            </ListItem>
                        </List>
                    </Stack>
                ))}
            </Box>
            <Stack direction="column" spacing={1} sx={{ borderTop: "solid 1px #fff", padding: "15px" }}>
                    <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ padding: "7px 0" }}>
                        <Typography>Tổng cộng</Typography>
                        <Typography variant="h5">{otherUtils.formatPrice(totalPrice)}</Typography>
                    </Stack>
                    <Button disableFocusRipple sx={{
                        padding: "10px",
                        background: "#90b2ca",
                        color: "#fff"
                    }}>Tiếp tục</Button>
                </Stack>
        </CustomDialog>
    )
} 

export default FoodDialog;