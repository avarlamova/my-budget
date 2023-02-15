import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  auth: {
    user: string | null;
    token: string | null;
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      console.log(action.payload);
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: AuthState) => state.auth.user;
export const selectCurrentToken = (state: AuthState) => state.auth.token;
