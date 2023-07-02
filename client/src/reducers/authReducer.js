import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login:false,
  user:null,
  environment:0,
  social:0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action) => {
     state.login=true
     state.user=action.payload;
    },
    
    authLogout: (state) => {
      state.login = false;
      state.user=null;
    },
   
  },
});

export const { authLogin, authCheckingFinish, authLogout } = authSlice.actions;
export default authSlice.reducer;
