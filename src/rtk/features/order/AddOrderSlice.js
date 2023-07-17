import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../../../Api/AxiosInstance";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  order: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const addOrder = createAsyncThunk(
  "order/addorders",
  async (addOrderData) => {
    console.log("addOrderData", addOrderData);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/addorder",
      Api_url+'/addorder',
      addOrderData,
      config
    );
    return response.data;
  }
);

const AddorderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = "";
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.loading = false;
      state.order = [];
      state.error = action.error.message;
    });
  },
});

export default AddorderSlice.reducer;
