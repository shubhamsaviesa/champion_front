import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  order: [],
  error: "",
};

// export const orderListing = createAsyncThunk("order/orderListing", async () => {
//   return AxiosInstance({
//     url: "/orderlisting",
//     method: "GET",
//   }).then((response) => response.data);
// });

// export const orderListing = createAsyncThunk("order/orderListing", async () => {
//   try {
//     const response = await AxiosInstance({
//       url: "/orderlisting",
//       method: "GET",
//     });

//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// });

export const orderListing = createAsyncThunk(
  "order/orderListing",
  async (id) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      // "http://localhost:5000/api/user/orderlisting",
      Api_url+'/orderlisting',
      config,
      id
    );
    return response.data;
  }
);

export const DeleteOrderListingData = createAsyncThunk(
  "order/deleteorder",

  async (id) => {
    console.log("order/deleteorder", id);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/deleteorder",
      Api_url+'/deleteorder',
      id,
      config
    );
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(orderListing.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(orderListing.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = "";
    });
    builder.addCase(orderListing.rejected, (state, action) => {
      state.loading = false;
      state.order = [];
      state.error = action.error.message;
      console.log(action.error);
    });
    // ----------------------------------------------------

    builder.addCase(DeleteOrderListingData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteOrderListingData.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = "";
    });
    builder.addCase(DeleteOrderListingData.rejected, (state, action) => {
      state.loading = false;
      state.order = [];
      state.error = action.error.message;
    });
  },
});

export default orderSlice.reducer;
