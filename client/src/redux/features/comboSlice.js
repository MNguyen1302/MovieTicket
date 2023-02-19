import { createSlice } from "@reduxjs/toolkit";

export const comboSlice = createSlice({
  name: "AuthModal",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    setCombo: (state, action) => {
        state.items = action.payload;
        state.items = state.items.map(item => ({ ...item, quantity: 0 }))
    },
    setTotalPrice: (state, action) => {
        let total = 0;
        let totalPrice = state.items.map(item => {
            total += item.price * item.quantity;
            console.log(total);
            return total;
        })
        
        state.totalPrice = totalPrice[1];
    },
    incrementQty: (state, action) => {
        const updateQty = state.items.map(item => {
            if (item.id === action.payload) 
                return { ...item, quantity: item.quantity + 1 }
            return item;
        })

        state.items = updateQty;
    },
    decrementQty: (state, action) => {
        const updateQty = state.items.map(item => {
            if (item.id === action.payload) 
                return { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : item.quantity }
            return item;
        })

        state.items = updateQty;
    }
  }
});

export const {
  setCombo,
  setTotalPrice,
  incrementQty,
  decrementQty
} = comboSlice.actions;

export default comboSlice.reducer;