import { createSlice } from "@reduxjs/toolkit";

export interface ITEM {
  id: string;
  description: string;
  price: string;
  title: string;
}

interface CartState {
  item: ITEM[];
}

const initialState: CartState = {
  item: [],
};

const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addItem(state, action) {
      state.item.push(action.payload.item);
    },
    clearCart(state) {
      state.item = [];
    },
    removeFromCart: (state, action) => {
      const removedItem = state.item.find(temp => temp.id == action.payload.id);
      state.item = state.item.filter(temp => temp.id !== action.payload.id);
  },
  },
});

export const { addItem, clearCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
