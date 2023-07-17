import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  SearsData: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
// export const InsertSearsData = createAsyncThunk('Sears/SearsListing', (SearsData) => {
//    return AxiosInstance({
//     url: "/SearsCredential",
//     method: "POST",
//     data: SearsData,
//    }).then(response => response.data
//   ).catch((e) => { console.log(e) })
// })

export const InsertSearsData = createAsyncThunk(
  "Sears/SearsListing",

  async (SearsData) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/SearsCredential",
      Api_url+'/SearsCredential',
      SearsData,
      config
    );

    return response.data;
  }
);

const SearsSlice = createSlice({
  name: "Sears",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(InsertSearsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(InsertSearsData.fulfilled, (state, action) => {
      state.loading = false;
      state.SearsData = action.payload;
      state.error = "";
    });
    builder.addCase(InsertSearsData.rejected, (state, action) => {
      state.loading = false;
      state.SearsData = [];
      state.error = action.error.message;
    });
  },
});

export default SearsSlice.reducer;
