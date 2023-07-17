import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  notificationData: [],
  error: "",
};

// export const NotificationData = createAsyncThunk(
//   "notification/notificationdata",
//   async () => {
//     const response = await AxiosInstance({
//       url: "/notificationData",
//       method: "GET",
//     });
//     return response.data || {};
//   }
// );

// export const NotificationData = createAsyncThunk(
//   "notification/notificationdata",
//   async () => {
//     try {
//       const response = await AxiosInstance({
//         url: "/notificationData",
//         method: "GET",
//       });
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// );

export const NotificationData = createAsyncThunk(
  "notification/notificationdata",
  async () => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      // "http://localhost:5000/api/user/notificationData",
      Api_url+'/notificationData',
      config
    );
    return response.data;
  }
);

const notificationSlice = createSlice({
  name: "notificationData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(NotificationData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(NotificationData.fulfilled, (state, action) => {
      state.loading = false;
      state.notificationData = action.payload;
      state.error = "";
    });
    builder.addCase(NotificationData.rejected, (state, action) => {
      state.loading = false;
      state.notificationData = [];
      state.error = action.error.message;
    });
  },
});

export default notificationSlice.reducer;
