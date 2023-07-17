import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import Api_url from "../../../Api/Api";

const initialState = {
  loading: false,
  bulkimportData: [],
  error: "",
};

//Add New template data
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

//Get Data for Edit Based on Template id
export const GetBulkImportDataId = createAsyncThunk(
  "inventory/getbulkimportid",

  async (id) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      // `http://localhost:5000/api/user/getbulkimportId/${id}`,
      Api_url+`/getbulkimportId/${id}`,
      config
    );
    return response.data;
  }
);

//send id with mapping data
export const SendMappingDataId = createAsyncThunk(
  "inventory/sendmappinddataid",

  async (id, finalmappedObj) => {
    console.log("id", id);
    console.log("finalmappedObj", finalmappedObj);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // `http://localhost:5000/api/user/mapTemplate/${id}`,
      Api_url+`/mapTemplate/${id}`,
      config,
      finalmappedObj
    );
    console.log("response from backend SendMappingDataId ", response);
    return response.data;
  }
);

export const editTemplateData = createAsyncThunk(
  "template/editMappingHandle",
  async (templatename) => {
    console.log("formData in editTemplate", templatename);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/editTemplate",
      Api_url+'/editTemplate',
      templatename,
      config
    );

    console.log("response.data after post in add template", response.data);
    return response.data.yourtemplate;
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

    console.log("response after send edited template data", response.data);
    return response.data;
  }
);

export const nextHandleAction = createAsyncThunk(
  "template/nextHandle",
  async (finalmappedObj, tempId) => {
    console.log("formData in editTemplate", tempId);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // `http://localhost:5000/api/user/editTemplate/${tempId}`,
      Api_url+`/editTemplate/${tempId}`,
      finalmappedObj,
      config
    );

    console.log("response.data after post in add template", response.data);
    return response.data.yourtemplate;
  }
);

//send upload file data
export const sendBulkUploadData = createAsyncThunk(
  "action/sendbulkuploaddata",
  async ({ file, tempName }) => {
    console.log("formData in sendBulkUploadData", file, tempName);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tempName", tempName);

    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      // "http://localhost:5000/api/user/uploadfile",
      Api_url+'/uploadfile',
      formData,
      config
    );
    console.log("response in uploadfile", response);
    return response.data;
  }
);

//fetch data of bulkuploadlisting
export const FetchAddtemplateData = createAsyncThunk(
  "action/fetchaddtemplete",
  async () => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      // "http://localhost:5000/api/user/bulkuploadlisting",
      Api_url+'/bulkuploadlisting',
      config
    );
    return response.data;
  }
);

export const DeleteBulkImportData = createAsyncThunk(
  "bulkimport/DeleteBulkImportData",
  async (id) => {
    console.log("dispatch slice sinle bulk import");
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/deleteMappingTemplate",
      Api_url+'/deleteMappingTemplate',
      id,
      config
    );
    return response.data;
  }
);

export const DeleteBulkImportDataa = createAsyncThunk(
  "bulkimport/deletemanytemplate",

  async (id) => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/deletemultitemplate",
      Api_url+'/deletemultitemplate',
      id,
      config
    );
    return response.data;
  }
);

const addTemplateSlice = createSlice({
  name: "bulkimport",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(insertAddtemplateData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertAddtemplateData.fulfilled, (state, action) => {
      state.loading = false;
      state.bulkimportData = action.payload;
      state.error = "";
    });
    builder.addCase(insertAddtemplateData.rejected, (state, action) => {
      state.loading = false;
      state.bulkimportData = [];
      state.error = action.error.message;
    });
    // ----------------------------------
    builder.addCase(GetBulkImportDataId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetBulkImportDataId.fulfilled, (state, action) => {
      state.loading = false;
      state.bulkimportData = action.payload;
      state.error = "";
    });
    builder.addCase(GetBulkImportDataId.rejected, (state, action) => {
      state.loading = false;
      state.bulkimportData = [];
      state.error = action.error.message;
    });
    // ----------------------------------
    builder.addCase(sendBulkUploadData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendBulkUploadData.fulfilled, (state, action) => {
      state.loading = false;
      state.bulkimportData = action.payload;
      state.error = "";
    });
    builder.addCase(sendBulkUploadData.rejected, (state, action) => {
      state.loading = false;
      state.bulkimportData = [];
      state.error = action.error.message;
    });
    // ----------------------------------
    builder.addCase(insertEditedtemplateData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertEditedtemplateData.fulfilled, (state, action) => {
      state.loading = false;
      state.bulkimportData = action.payload;
      state.error = "";
    });
    builder.addCase(insertEditedtemplateData.rejected, (state, action) => {
      state.loading = false;
      state.bulkimportData = [];
      state.error = action.error.message;
    });
    // ----------------------------------
    builder.addCase(FetchAddtemplateData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchAddtemplateData.fulfilled, (state, action) => {
      state.loading = false;
      state.bulkimportData = action.payload;
      state.error = "";
    });
    builder.addCase(FetchAddtemplateData.rejected, (state, action) => {
      state.loading = false;
      state.bulkimportData = [];
      state.error = action.error.message;
    });
    // ----------------------------------
    builder.addCase(DeleteBulkImportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteBulkImportData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(DeleteBulkImportData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------------------
    builder.addCase(SendMappingDataId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SendMappingDataId.fulfilled, (state, action) => {
      state.loading = false;
      state.bulkimportData = action.payload;
      state.error = "";
    });
    builder.addCase(SendMappingDataId.rejected, (state, action) => {
      state.loading = false;
      state.bulkimportData = [];
      state.error = action.error.message;
    });
    builder.addCase(DeleteBulkImportDataa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteBulkImportDataa.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(DeleteBulkImportDataa.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default addTemplateSlice.reducer;
