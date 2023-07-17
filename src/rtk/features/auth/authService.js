import axios from "axios";
import API_URL from "../../../Api/Api";

const register = async (userData) => {
  const response = await axios.post(API_URL + "/userRegistration", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "/userLogin", userData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
  if (response.data) {
    console.log("response data when user login", response);
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", `Bearer ${response.data.token}`);
  }
  return response.data;
};

// const login = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/userLogin`, userData, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//       },
//       withCredentials: true,
//     });

//     if (response.data) {
//       localStorage.setItem("user", JSON.stringify(response.data));
//       localStorage.setItem("token", `Bearer ${response.data.token}`);
//     }

//     return response.data;
//   } catch (error) {
//     // Handle any errors here
//     console.error("Login failed:", error);
//     throw error; // Rethrow the error or handle it appropriately
//   }
// };

const getOtp = async (contactnumber) => {
  const response = await axios.post(API_URL + "/getOtp", contactnumber);
  return response.data;
};

const verifyOtp = async (otpnumber) => {
  const response = await axios.post(API_URL + "/verifyOtp", otpnumber);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", `Bearer ${response.data.token}`);
  }
  return response.data;
};

const resetPassword = async (newPassword) => {
  const response = await axios.post(API_URL + "/resetPassword", newPassword);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", `Bearer ${response.data.token}`);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  getOtp,
  verifyOtp,
  resetPassword,
};

export default authService;
