import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  NeweggData: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
// export const InsertNeweggData = createAsyncThunk('Newegg/NeweggListing', (NeweggData) => {
//    return AxiosInstance({
//     url: "/NeweggCredential",
//     method: "POST",
//     data: NeweggData,

//   }).then(response => response.data
//   ).catch((e) => { console.log(e) })
// })

export const InsertNeweggData = createAsyncThunk(
  "Newegg/NeweggListing",

  async (NeweggData) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/NeweggCredential",
      Api_url+'/NeweggCredential',
      NeweggData,
      config
    );

    return response.data;
  }
);

const NeweggSlice = createSlice({
  name: "Newegg",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(InsertNeweggData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(InsertNeweggData.fulfilled, (state, action) => {
      state.loading = false;
      state.NeweggData = action.payload;
      state.error = "";
    });
    builder.addCase(InsertNeweggData.rejected, (state, action) => {
      state.loading = false;
      state.NeweggData = [];
      state.error = action.error.message;
    });
  },
});

export default NeweggSlice.reducer;
