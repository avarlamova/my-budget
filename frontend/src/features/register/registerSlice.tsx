import { createSlice } from "@reduxjs/toolkit";

interface RegisterState {
  user: string | null;
  password: string | null;
}

const registerSlice = createSlice({
  name: "register",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
  },
});

export const { setCredentials } = registerSlice.actions;

export default registerSlice.reducer;
