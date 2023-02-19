import { forwardRef } from "react";
import { Dialog, Box, Slide } from "@mui/material";
import HeaderDialog from "./HeaderDialog";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>
});

const CustomDialog = (props) => {
    const { open, onClose, width, children, header } = props;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            fullWidth={true} 
            maxWidth={width}
            PaperProps={{
                sx: {
                    maxHeight: "100%"
                }
            }}
        >
            <Box sx={{ width: "100%" }}>
                {header && <HeaderDialog header={header} onClose={onClose} />}
                {children}
            </Box>
        </Dialog>
    )
}

export default CustomDialog;