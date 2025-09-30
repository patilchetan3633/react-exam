// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// const API = "http://localhost:3000/products";


// export const fetchProduct = createAsyncThunk("product/fetch", async () => {
//   const res = await axios.get(API);
//   return res.data;
// });

// export const addProduct = createAsyncThunk("product/add", async (book) => {
//   const res = await axios.post(API, book);
//   return res.data;
// });

// export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
//   await axios.delete(`${API}/${id}`);
//   return id;
// });

// const productSlice = createSlice({
//   name: "Product",
//   initialState: { list: [], loading: false },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProduct.pending, (state) => { state.loading = true; })
//       .addCase(fetchProduct.fulfilled, (state, action) => {
//         state.list = action.payload;
//         state.loading = false;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.list = state.list.filter(p => p.id !== action.payload);
//       });
//   },
// });

// export default productSlice.reducer;
// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/products";

// Fetch all
export const fetchProduct = createAsyncThunk("product/fetch", async () => {
  const res = await axios.get(API);
  return res.data;
});

// Add
export const addProduct = createAsyncThunk("product/add", async (product) => {
  const res = await axios.post(API, product);
  return res.data;
});

// Update
export const updateProduct = createAsyncThunk("product/update", async ({ id, data }) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
});

// Delete
export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const productSlice = createSlice({
  name: "Product",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => { state.loading = true; })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const i = state.list.findIndex((p) => p.id === action.payload.id);
        if (i !== -1) state.list[i] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
