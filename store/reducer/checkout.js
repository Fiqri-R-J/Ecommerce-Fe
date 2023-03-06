import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setDataCheckout(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setDataCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
