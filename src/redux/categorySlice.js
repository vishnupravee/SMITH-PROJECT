import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await fetch("http://localhost:3000/api/categories");
    console.log(res,"rrrrrrrrrrrr");
    
    const data = await res.json();
    return data.data;
   
     // expecting {success:true, data:[...]}
  }
);

// ✅ Add category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData) => {
    const res = await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    return data.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default categorySlice.reducer;
