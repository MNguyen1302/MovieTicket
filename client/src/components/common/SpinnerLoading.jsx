import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";

const SpinnerLoading = () => {
    const { spinnerLoading } = useSelector(state => state.globalLoading);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (spinnerLoading) setIsLoading(true);
        else {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [spinnerLoading])

    return (
        <Box sx={{ display: isLoading ? "flex" : "none", justifyContent: "center", padding: "20px" }}>
            <CircularProgress/>
        </Box>
    )
}

export default SpinnerLoading;