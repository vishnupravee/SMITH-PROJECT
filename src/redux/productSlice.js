import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.data.data.json();
    return data.data; // assuming API returns { success:true, data:[...] }
  }
);

// ✅ Async thunk to add new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    return data.data; // assuming API returns saved product
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // for optimistic updates or local actions
    removeProduct: (state, action) => {
      state.items = state.items.filter(
        (prod) => prod.productId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔹 Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { removeProduct } = productSlice.actions;
export default productSlice.reducer;
