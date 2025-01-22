import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.cartItem.find((item) => item.id === action.payload.id);
      if (isExist) {
        isExist.quantity += 1;
      } else {
        state.cartItem.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const isExist = state.cartItem.find((item) => item.id === action.payload.id);
      if (isExist) {
        isExist.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const isExist = state.cartItem.find((item) => item.id === action.payload.id);
      if (isExist && isExist.quantity > 1) {
        isExist.quantity -= 1;
      } else if (isExist && isExist.quantity === 1) {
        state.cartItem = state.cartItem.filter((item) => item.id !== action.payload.id)
      }
    },
    deleteProduct: (state, action) => {
      state.cartItem = state.cartItem.filter((item) => item.id !== action.payload.id)
    }
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct,  } = cartSlice.actions;

export default cartSlice.reducer;