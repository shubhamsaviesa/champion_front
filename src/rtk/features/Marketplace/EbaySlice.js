import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../../../Api/AxiosInstance";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  EbayData: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const InsertEbayData = createAsyncThunk(
  "Ebay/EbayListing",

  async (EbayData) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/ebaycredential",
      Api_url+'/ebaycredential',
      EbayData,
      config
    );

    return response.data;
  }
);

export const RedirectEbayUrl = createAsyncThunk(
  "Ebay/EbayRedirect",

  async (codes) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/EbayTokenGenrate",
      Api_url+'/EbayTokenGenrate',
      codes,
      config
    );
    return response.data;
  }
);

const EbaySlice = createSlice({
  name: "Ebay",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(InsertEbayData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(InsertEbayData.fulfilled, (state, action) => {
      state.loading = false;
      state.EbayData = action.payload;
      state.error = "";
    });
    builder.addCase(InsertEbayData.rejected, (state, action) => {
      state.loading = false;
      state.EbayData = [];
      state.error = action.error.message;
    });
    builder.addCase(RedirectEbayUrl.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RedirectEbayUrl.fulfilled, (state, action) => {
      state.loading = false;
      state.EbayData = action.payload;
      state.error = "";
    });
    builder.addCase(RedirectEbayUrl.rejected, (state, action) => {
      state.loading = false;
      state.EbayData = [];
      state.error = action.error.message;
    });
  },
});

export default EbaySlice.reducer;
