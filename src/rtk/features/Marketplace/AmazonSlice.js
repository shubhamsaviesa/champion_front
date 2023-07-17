import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  AmazonData: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
// export const InsertAmazonData = createAsyncThunk('Amazon/AmazonListing', (AmazonData) => {
//    return AxiosInstance({
//     url: "/AmazonCredential",
//     method: "POST",
//     data: AmazonData,
//   }).then(response => response.data
//   ).catch((e) => { console.log(e) })
// })

export const InsertAmazonData = createAsyncThunk(
  "Amazon/AmazonListing",
  async (AmazonData) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/AmazonCredential",
      Api_url+'/AmazonCredential',
      AmazonData,
      config
    );

    return response.data;
  }
);

const AmazonSlice = createSlice({
  name: "Amazon",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(InsertAmazonData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(InsertAmazonData.fulfilled, (state, action) => {
      state.loading = false;
      state.AmazonData = action.payload;
      state.error = "";
    });
    builder.addCase(InsertAmazonData.rejected, (state, action) => {
      state.loading = false;
      state.AmazonData = [];
      state.error = action.error.message;
    });
  },
});

export default AmazonSlice.reducer;
