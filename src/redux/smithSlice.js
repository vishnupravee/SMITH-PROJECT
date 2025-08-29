import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch smiths
export const fetchSmiths = createAsyncThunk(
  "smiths/fetchSmiths",
  async () => {
    const res = await fetch("http://localhost:3000/api/smiths");
    const data = await res.json();
    return data.data;
  }
);

// ✅ Add smith
export const addSmith = createAsyncThunk(
  "smiths/addSmith",
  async (smithData) => {
    const res = await fetch("http://localhost:3000/api/smiths", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(smithData),
    });
    const data = await res.json();
    return data.data;
  }
);

const smithSlice = createSlice({
  name: "smiths",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmiths.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSmiths.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSmiths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSmith.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default smithSlice.reducer;
