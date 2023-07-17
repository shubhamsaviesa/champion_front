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
export const insertAddInventoryData = createAsyncThunk(
  "inventory/addinventory",

  async (formData) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/addinventory",
      Api_url+'/addinventory',
      formData,
      config
    );

    return response.data;
  }
);

export const fetchCategoryDataInAddInventory = createAsyncThunk(
  "inventory/fetchCategoryDataInAddInventory",

  async (formData) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/category",
      Api_url+'/category',
      formData,
      config
    );

    return response.data;
  }
);

export const insertEditeInventoryData = createAsyncThunk(
  "inventory/sendeditedinventory",

  async (formData) => {
    console.log("editedData", formData);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/editproductcatalog",
      Api_url+'/editproductcatalog',
      formData,
      config
    );
    console.log("response after edited data post successfully", response);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "inventory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(insertAddInventoryData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertAddInventoryData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(insertAddInventoryData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    builder.addCase(insertEditeInventoryData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertEditeInventoryData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(insertEditeInventoryData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchCategoryDataInAddInventory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCategoryDataInAddInventory.fulfilled,
      (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchCategoryDataInAddInventory.rejected,
      (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message;
      }
    );
  },
});

export default userSlice.reducer;
