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

export const fectchListingData = createAsyncThunk(
  "inventory/addinventory",
  async () => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      // "http://localhost:5000/api/user/listing",
      Api_url+'/listing',
      config
    );
    return response.data;
  }
);

export const GetListingDataId = createAsyncThunk(
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
      Api_url+`getProductCatalogId/${id}`,
      config
    );
    return response.data;
  }
);

export const insertEditedListingData = createAsyncThunk(
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
      // "http://localhost:5000/api/user/editlisting",
      Api_url+'editlisting',
      formData,
      config
    );
    console.log("response after edited data post successfully", response);
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
  name: "Listing",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fectchListingData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fectchListingData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fectchListingData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------------------------------------
    builder.addCase(GetListingDataId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetListingDataId.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(GetListingDataId.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------------------------------------
    builder.addCase(insertEditedListingData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertEditedListingData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(insertEditedListingData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // // --------------------------------------------------------
    // builder.addCase(DeleteProductCatalogDataa.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(DeleteProductCatalogDataa.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.users = action.payload;
    //   state.error = "";
    // });
    // builder.addCase(DeleteProductCatalogDataa.rejected, (state, action) => {
    //   state.loading = false;
    //   state.users = [];
    //   state.error = action.error.message;
    // });
    // // ----------------------------------------------------------
    // builder.addCase(DateFilterProductCatalogDataa.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(
    //   DateFilterProductCatalogDataa.fulfilled,
    //   (state, action) => {
    //     state.loading = false;
    //     state.users = action.payload;
    //     state.error = "";
    //   }
    // );
    // builder.addCase(DateFilterProductCatalogDataa.rejected, (state, action) => {
    //   state.loading = false;
    //   state.users = [];
    //   state.error = action.error.message;
    // });
  },
});

export default ProductCatalogSlice.reducer;
