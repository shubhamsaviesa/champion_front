import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  ChannelActiveData: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
// export const FetchChannelActiveData = createAsyncThunk('channel/ChannelActiveSlice', async () => {
//   try {
//     const response = await AxiosInstance({
//       url: "/channelActive",
//       method: "GET",
//     })
//     return response.data
//   } catch (e) {
//     console.log(e)
//   }
// })

export const FetchChannelActiveData = createAsyncThunk(
  "channel/ChannelActiveSlice",
  async () => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      // "http://localhost:5000/api/user/channelActive",
      Api_url+'/channelActive',
      config
    );
    return response.data;
  }
);

const ChannelActiveSlice = createSlice({
  name: "channelactiveData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(FetchChannelActiveData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchChannelActiveData.fulfilled, (state, action) => {
      state.loading = false;
      state.ChannelActiveData = action.payload;
      state.error = "";
    });
    builder.addCase(FetchChannelActiveData.rejected, (state, action) => {
      state.loading = false;
      state.ChannelActiveData = [];
      state.error = action.error.message;
    });
  },
});
export default ChannelActiveSlice.reducer;
