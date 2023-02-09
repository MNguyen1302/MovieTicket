import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
    name: "Schedule",
    initialState: {
        date: "",
        cluster: "all",
        address: ""
    },
    reducers: {
        setCluster: (state, action) => {
            state.cluster = action.payload;
        }
    }
})

export const {
    setCluster
} = scheduleSlice.actions;

export default scheduleSlice.reducer;