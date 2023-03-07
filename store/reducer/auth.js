import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.token = action.payload;
    },
    setAuthProfile(state, action) {
      state.profile = action.payload;
    },
    deleteAuthData(state) {
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setAuthToken, setAuthProfile, deleteAuthData } =
  authSlice.actions;
export default authSlice.reducer;
