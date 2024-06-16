import { createSlice } from "@reduxjs/toolkit";

export interface ITEM {
  id: string;
  description: string;
  price: number;
  title: string;
  quantity: number; 
}

interface CartState {
  items: ITEM[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload.item);
    },
    clearCart(state) {
      state.items = [];
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItem, clearCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
