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
    deleteDataCheckout(state) {
      state.data = null;
    },
  },
});

export const { setDataCheckout, deleteDataCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
