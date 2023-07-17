import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../../Api/AxiosInstance";
import axios from "axios";
import { useParams } from "react-router-dom";
import Api_url from "../../../Api/Api";

const user = JSON.parse(localStorage.getItem("user"));

console.log("user", user);

const initialState = {
  loading: false,
  deleted: "",
  users: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk("user/fetchUsers", (formData) => {
  return AxiosInstance({
    url: "/userRegistration",
    method: "POST",
    data: formData,
  })
    .then((response) => response.data)
    .catch((e) => {
      console.log(e);
    });
});

export const LoginUsers = createAsyncThunk("user/loginUsers", (loginValue) => {
  return AxiosInstance({
    url: "/userLogin",
    method: "POST",
    data: loginValue,
  })
    .then((response) => response.data)
    .catch((e) => {
      console.log(e);
    });
});

export const changePassword = createAsyncThunk(
  "user/changepassword",
  (formValues) => {
    return AxiosInstance({
      url: "/changePassword",
      method: "POST",
      data: formValues,
    })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e);
      });
  }
);

export const addAccountInfo = createAsyncThunk(
  "user/addAccountInfo",
  (inventoryFormValue) => {
    return AxiosInstance({
      url: "/accountSetting",
      method: "POST",
      data: inventoryFormValue,
    })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e);
      });
  }
);

export const Verifyotp = createAsyncThunk(
  "user/verifyotpPassword",
  (otpvalue) => {
    return AxiosInstance({
      url: "/verifyOtp",
      method: "POST",
      data: otpvalue,
    })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e);
      });
  }
);

export const ResetPassowordOtp = createAsyncThunk(
  "user/Resetpassword",
  (otpvalue) => {
    return AxiosInstance({
      url: "/resetPassword",
      method: "POST",
      data: otpvalue,
    })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e);
      });
  }
);

//Get User Data
export const getUserData = createAsyncThunk(
  "userData/getUserData",
  async () => {
    const config = {
      headers: {
        // 'Authorization': localStorage.getItem("token"),
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // `http://localhost:5000/api/user/userData`,
      Api_url+'/userData',
      config
    );
    return response.data;
  }
);

export const postUserData = createAsyncThunk(
  "accountSetting/accountSettinginfo",
  async (userData) => {
    console.log("postUserData", userData);
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      // "http://localhost:5000/api/user/accountSetting",
      Api_url+'/accountSetting',
      userData,
      config
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------

    builder.addCase(LoginUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LoginUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(LoginUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });

    //.........................

    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });

    // --------------------------------
    builder.addCase(addAccountInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAccountInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addAccountInfo.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });

    builder.addCase(Verifyotp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Verifyotp.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(Verifyotp.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // --------------------------------------------------
    builder.addCase(ResetPassowordOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ResetPassowordOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(ResetPassowordOtp.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });

    //---------------------------------------------------
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
