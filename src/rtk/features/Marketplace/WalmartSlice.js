import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  WalmartData: [],
  error: "",
};
// Generates pending, fulfilled and rejected action types
// export const InsertWalmartData = createAsyncThunk('Walmart/WalmartListing', async (WalmartData) => {
//    try {
//     const response = await AxiosInstance({
//       url: "/walmartCredential",
//       method: "POST",
//       data: WalmartData,
//     })
//     return response.data
//   } catch (e) {
//     console.log(e)
//   }
// })

export const InsertWalmartData = createAsyncThunk(
  "Walmart/WalmartListing",

  async (WalmartData) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/walmartCredential",
      Api_url+'/walmartCredential',
      WalmartData,
      config
    );

    return response.data;
  }
);

const WalmartSlice = createSlice({
  name: "Walmart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(InsertWalmartData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(InsertWalmartData.fulfilled, (state, action) => {
      state.loading = false;
      state.WalmartData = action.payload;
      state.error = "";
    });
    builder.addCase(InsertWalmartData.rejected, (state, action) => {
      state.loading = false;
      state.WalmartData = [];
      state.error = action.error.message;
    });
  },
});
export default WalmartSlice.reducer;
