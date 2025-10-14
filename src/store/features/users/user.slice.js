import { createSlice } from "@reduxjs/toolkit";
import {registerUserThunk, loginUserThunk, getUserProfileThunk} from "./userThunk.js"


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isRegistered: false,
    isLoading: false,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    addUserToStore: (state, action) => {
      state.user = action.payload;
    },
    setRegistrationStatus: (state, action) => {
      state.isRegistered = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
     //    register thunk 
     builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isRegistered = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      });

      // builder thunk

      builder.addCase(loginUserThunk.pending, (state) => {
           state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
             state.isLoading = false;
              state.error = null;
              state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
             state.isLoading = false;
             state.error = action.payload?.message || action.error.message;

      })

      // get-profile thunk integration

      builder.addCase(getUserProfileThunk.pending, (state) => {
            state.isLoading = true;
      })
      builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
      })
      builder.addCase(getUserProfileThunk.rejected, (state, action) => {
             state.isLoading = false;
             state.user = null;
             state.error = action.payload?.message || action.error.message
      })

  },
});

export const { logout, setLoginStatus, addUserToStore, setRegistrationStatus } = userSlice.actions;
export default userSlice.reducer;
