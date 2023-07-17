import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  WishData: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
// export const InsertWishData = createAsyncThunk('Wish/WishListing', (WishData) => {
//    return AxiosInstance({
//     url: "/wishcredential",
//     method: "POST",
//     data: WishData,
//   }).then(response => response.data
//   ).catch((e) => { console.log(e) })
// })

export const InsertWishData = createAsyncThunk(
  "Wish/WishListing",

  async (WishData) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/wishcredential",
      Api_url+'/wishcredential',
      WishData,
      config
    );

    return response.data;
  }
);

const WishSlice = createSlice({
  name: "Wish",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(InsertWishData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(InsertWishData.fulfilled, (state, action) => {
      state.loading = false;
      state.WishData = action.payload;
      state.error = "";
    });
    builder.addCase(InsertWishData.rejected, (state, action) => {
      state.loading = false;
      state.WishData = [];
      state.error = action.error.message;
    });
  },
});

export default WishSlice.reducer;
