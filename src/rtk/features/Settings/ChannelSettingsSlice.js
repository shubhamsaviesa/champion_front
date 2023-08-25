import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchConnection = createAsyncThunk("user/fetchUsers", async () => {
  const config = {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    "http://localhost:5000/api/user/channelSetting",
    // Api_url+'/channelSetting',
    config
  );
  return response.data;
});

export const deleteConnection = createAsyncThunk("user/deleteuser", (data) => {
  return AxiosInstance({
    url: "/deleteChannelconnection",
    method: "POST",
    data: data,
  })
    .then((response) => response.data)
    .catch((e) => {
      console.log(e);
    });
});

export const editConnection = createAsyncThunk("user/edituser", (data) => {
  return AxiosInstance({
    url: "/editchannel",
    method: "POST",
    data: data,
  })
    .then((response) => response.data)
    .catch((e) => {
      console.log(e);
    });
});

export const channelconnectdisconnect = createAsyncThunk(
  "user/connectdisconnect",
  (data) => {
    return AxiosInstance({
      url: "/channelconnectdisconnect",
      method: "POST",
      data: data,
    })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e);
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchConnection.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchConnection.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchConnection.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // -------------------------------------------
    builder.addCase(deleteConnection.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // -------------------------------------------
    builder.addCase(editConnection.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // --------------------------------------------
    builder.addCase(channelconnectdisconnect.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
