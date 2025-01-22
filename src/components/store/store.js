import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/slices/counterSlices/counterSlice";
import cartReducer from '../store/slices/cart/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer
  },
});