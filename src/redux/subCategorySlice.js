import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch subcategories
export const fetchSubCategories = createAsyncThunk(
  "subcategories/fetchSubCategories",
  async () => {
    const res = await fetch("http://localhost:3000/api/subcategories");
    const data = await res.json();
    return data.data;
  }
);

// ✅ Add subcategory
export const addSubCategory = createAsyncThunk(
  "subcategories/addSubCategory",
  async (subCategoryData) => {
    const res = await fetch("http://localhost:3000/api/subcategories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subCategoryData),
    });
    const data = await res.json();
    return data.data;
  }
);

const subCategorySlice = createSlice({
  name: "subcategories",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default subCategorySlice.reducer;
