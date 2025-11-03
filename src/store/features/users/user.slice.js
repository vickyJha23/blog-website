import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
     if(typeof window !== "undefined"){
          const storedUser = localStorage.getItem("user");
          try {
               return storedUser ? JSON.parse(storedUser): {}
          } catch (err) {
               console.log("Invalid user data in localStorage", err); 
              return {};
          }

       }
       return {};
 }



const userSlice = createSlice({
    name: "user",
    initialState: {
        user: getInitialUser(),
        isModalActive: false,
        isLogoutButtonActive: false 
    },

    reducers: {
          setModalStatus (state, action) {
               state.isModalActive = action.payload;
          },
          setUserToStore (state, action) {
             state.user = action.payload;
          },
          setLogoutButtonStatus (state) {
              state.isLogoutButtonActive = !state.isLogoutButtonActive; 
          }
          

    }
})


export const {setModalStatus, setUserToStore, setLogoutButtonStatus} = userSlice.actions;
export default userSlice.reducer;
