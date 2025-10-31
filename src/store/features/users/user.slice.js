
import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")) || {}
      : {},
        isModalActive: false, 
    },

    reducers: {
          setModalStatus (state, action) {
               state.isModalActive = action.payload;
          },
          setUserToStore (state, action) {
             state.user = action.payload;
          }

    }
})


export const {setModalStatus, setUserToStore} = userSlice.actions;
export default userSlice.reducer;
