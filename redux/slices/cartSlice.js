import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
  },
  reducers: {
    addProducts: (state, action) => {
      state.items.push(action.payload);
    },
    // Action to remove a product by _id
    removeProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product._id !== action.payload
      );
    },
    // Optional: Action to update a product
    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    // Action to set the product list (replace current items with new ones)
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Export actions
export const { addProducts, removeProduct, updateProduct, setProducts } = productSlice.actions;

// Export reducer
export default productSlice.reducer;