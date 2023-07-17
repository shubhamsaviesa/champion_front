import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  DeleteId: "",
  error: "",
};

//Generates pending, fulfilled and rejected action types

export const fectchProductCatalogData = createAsyncThunk(
  "inventory/addinventory",
  async () => {
    const config = {
      headers: {
        // 'Authorization': localStorage.getItem("token"),
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      // "http://localhost:5000/api/user/productcatalog",
      Api_url+'/productcatalog',
      config
    );
    return response.data;
  }
);

export const DeleteProductCatalogData = createAsyncThunk(
  "inventory/deleteinventory",

  async (id) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/deleteOneproductcatalog",
      Api_url+'/deleteOneproductcatalog',
      id,
      config
    );
    return response.data;
  }
);

export const DeleteProductCatalogDataa = createAsyncThunk(
  "inventory/deletemanyinventory",

  async (id) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/deleteActionproductcatalog",
      Api_url+'/deleteActionproductcatalog',
      id,
      config
    );
    return response.data;
  }
);

export const GetProductCatalogId = createAsyncThunk(
  "inventory/getproductcatalogid",

  async (id) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      // `http://localhost:5000/api/user/getProductCatalogId/${id}`,
      Api_url+`/getProductCatalogId/${id}`,
      config
    );
    return response.data;
  }
);

export const DateFilterProductCatalogDataa = createAsyncThunk(
  "inventory/DateFilterProductCatalogDataa",
  async (formData) => {
    return AxiosInstance({
      url: "/productcatalogdatefilters",
      method: "POST",
      data: formData,
    })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e);
      });
  }
);

const ProductCatalogSlice = createSlice({
  name: "ProductCatalog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fectchProductCatalogData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fectchProductCatalogData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fectchProductCatalogData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------------------------------------
    builder.addCase(GetProductCatalogId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetProductCatalogId.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(GetProductCatalogId.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------------------------------------
    builder.addCase(DeleteProductCatalogData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteProductCatalogData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(DeleteProductCatalogData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // --------------------------------------------------------
    builder.addCase(DeleteProductCatalogDataa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteProductCatalogDataa.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(DeleteProductCatalogDataa.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------------------------------------------
    builder.addCase(DateFilterProductCatalogDataa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      DateFilterProductCatalogDataa.fulfilled,
      (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      }
    );
    builder.addCase(DateFilterProductCatalogDataa.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default ProductCatalogSlice.reducer;
