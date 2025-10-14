import { createSlice } from "@reduxjs/toolkit";

const modalSlice =  createSlice({
      name: "modal",
      initialState: {
          isModalActive: false,
      },
      reducers: {
          setModalStatus: (state, action) => {
               state.isModalActive = action.payload;
          }
      }
});


export const { setModalStatus } = modalSlice.actions;
export default modalSlice.reducer;
