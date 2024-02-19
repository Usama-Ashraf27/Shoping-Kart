import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userData: {},
  token: null,
  message: "",
  isAuth: false,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  // LOGIN CASE
  builder.addCase("loginRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("logoutRequest", (state, action) => {
    state.token = action.payload;
  });
  builder.addCase("logingSucess", (state, action) => {
    state.loading = false;
    state.userData = action.payload.user;
    state.token = action.payload.token;
    state.message = action.payload.message;
  });
  builder.addCase("loginFail", (state, action) => {
    state.isAuth = false;
    state.error = action.payload;
  });
  // ERROR MESSAGE CASE
  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });

  //Registre Case
  builder.addCase("registerRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("registerSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isAuth = true;
  });
  builder.addCase("registerFail", (state, action) => {
    state.isAuth = false;
    state.error = action.payload;
  });

  //Update User
  builder.addCase("updateUserRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("updateUserSuccess", (state, action) => {
    state.loading = false;
    // Assuming your state has a 'user' field
    state.user = action.payload;
    state.message = "User profile updated successfully";
  });
  builder.addCase("updateUserFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
