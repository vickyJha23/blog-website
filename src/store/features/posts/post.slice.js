import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
         posts: [],
         isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
         builder.addCase()         

    }
})


export default postSlice.reducer;

