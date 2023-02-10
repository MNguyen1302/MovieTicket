import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
    name: "Schedule",
    initialState: {
        date: "2023-02-10",
        cluster: "all",
        address: ""
    },
    reducers: {
        setCluster: (state, action) => {
            state.cluster = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        }
    }
})

export const {
    setCluster,
    setDate,
    setAddress
} = scheduleSlice.actions;

export default scheduleSlice.reducer;