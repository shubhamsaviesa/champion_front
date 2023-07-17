import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const insertAddtemplateData = createAsyncThunk(
  "action/addtemplete",
  async (formData) => {
    console.log("formData in addtemplate", formData);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/addTemplate",
      Api_url+'/addTemplate',
      formData,
      config
    );

    console.log("response.data after post in add template", response.data);
    return response.data;
  }
);

export const insertEditedtemplateData = createAsyncThunk(
  "action/sendeditedtemplatedata",
  async (formData) => {
    console.log("formData in final posttemplete", formData);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/editTemplate",
      Api_url+'/editTemplate',
      formData,
      config
    );

    console.log("response after send edited template data", response);
    return response.data;
  }
);

const bulkSlice = createSlice({
  name: "bulk",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(insertAddtemplateData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertAddtemplateData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(insertAddtemplateData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    builder.addCase(insertEditedtemplateData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertEditedtemplateData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(insertEditedtemplateData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default bulkSlice.reducer;
