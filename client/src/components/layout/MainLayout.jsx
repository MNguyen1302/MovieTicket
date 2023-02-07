import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AuthModal from "../common/AuthModal";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/features/userSlice";

const MainLayout = () => {
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const authUser = async () => {
            const { response, err } = await userApi.getInfo();

            if (response) dispatch(setUser(response));
            if (err) dispatch(setUser(null));
        }

        authUser();
    }, [dispatch])
    

    return (
        <>
            {/* global loading */}
            <GlobalLoading />
            {/* global loading */}

            {/* auth modal */}
            <AuthModal />

            <Box display="flex" minHeight="100vh">
                {/* header */}
                <Topbar />
                {/* header */}

                {/* main */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                <Outlet />
                </Box>
                {/* main */}
            </Box>

            {/* footer */}
            <Footer />
            {/* footer */}
        </>
    );
};

export default MainLayout;