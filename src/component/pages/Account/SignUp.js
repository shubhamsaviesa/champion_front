import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../style/Account/signup.css";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset, logout } from "../../../rtk/features/auth/authSlice";
import { useFormik } from "formik";
import Spinner from "../../Spinner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { signupSchema } from "./signUpSchema/signUpSchema";
import * as Yup from "yup";
import "yup-phone";
const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  mobilenumber: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const signupSchema = Yup.object({
    firstname: Yup.string()
      .matches(/^[A-Za-z]+$/, "Please enter valid name")
      .min(2)
      .max(40)
      .required("firstname is required"),
    lastname: Yup.string()
      .matches(/^[A-Za-z]+$/, "Please enter valid name")
      .min(2)
      .max(40)
      .required("lastname is required"),
    username: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Username must be Alphanumeric")
      .min(4)
      .max(10)
      .required("username is required"),
    // mobilenumber: Yup.string()
    //   .typeError("Invalid Input: numbers please")
    //   .min(10, "mobile number must be at least 10 digit")
    //   .required("Please enter your mobile number"),
    mobilenumber: Yup.string()
      .matches(/^[0-9]{10}$/, "mobile number is not valid")
      .required("mobile number is required"),
    email: Yup.string()
      .email("Email must be in a correct format")
      .required("Please enter your email"),
    password: Yup.string().min(8).required("password is required"),
    confirmPassword: Yup.string()
      .required("Please retype your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const [changIcon, setChangIcon] = useState(true);
  const [changIcon2, setChangIcon2] = useState(true);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        if (values) {
          console.log("Registration ~ values", values);
          dispatch(register(values));
          toast.success("User Registration Sucessfull");
          dispatch(logout());
          dispatch(reset());
          navigate("/");
          // action.resetForm();
        } else if (isError) {
          toast.error(message);
        }
      },
    });
  console.log("Registration ~ errors", errors);



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }
  //   if (isSuccess && user.status === "succes") {
  //     toast.success("Sucessfull");
  //     dispatch(logout());
  //     // dispatch(reset())
  //     // window.location.reload()
  //     navigate("/");
  //   }
  //   dispatch(reset());
  // }, [user, isError, isSuccess, message, navigate, dispatch]);

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match");
  //   } else {
  //     const userData = {
  //       firstname,
  //       lastname,
  //       username,
  //       email,
  //       mobilenumber,
  //       password,
  //       confirmPassword,
  //     };
  //     if (user && user.status === "failed") {
  //       toast.error("Fill all the entries");
  //     }
  //     dispatch(register(userData));
  //   }
  // };

  if (isLoading) {
    return <Spinner />;
  }
  const changeEyeIconHandle = () => {
    setChangIcon(!changIcon);
  };
  const changeEyeIconHandle2 = () => {
    setChangIcon2(!changIcon2);
  };

  return (
    <>
      <div className="imagebackgroundforsignup">
        <div className="signupform">
          <div className="topcontaintonsignup">
            <h1 className="signinheader">Create Account</h1>
            <p className="subheaderparagraphonsingup">
              Please fill the form to create your account
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="signuphalfinput">
              <div className="formInput1">
                <div className="forminputdiv">
                  <input
                    className="inputforaccountpage"
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="formInput1">
                <div className="forminputdiv">
                  <input
                    className="inputforaccountpage"
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="signuphalfinput">
              <div className="errortext">
                {errors.firstname && touched.firstname ? (
                  <p className="form-error">{errors.firstname}</p>
                ) : null}{" "}
              </div>
              <div className="errortext">
                {errors.lastname && touched.lastname ? (
                  <p className="form-error">{errors.lastname}</p>
                ) : null}
              </div>
            </div>
            <div className="signuphalfinput">
              <div className="formInput1">
                <div className="forminputdiv">
                  <input
                    className="inputforaccountpage"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="formInput1">
                <div className="forminputdiv">
                  <input
                    className="inputforaccountpage"
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="signuphalfinput">
              <div className="errortext">
                {errors.username && touched.username ? (
                  <p className="form-error">{errors.username}</p>
                ) : null}{" "}
              </div>{" "}
              <div className="errortext">
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}{" "}
              </div>
            </div>

            <div className="formInput">
              <div className="forminputdiv">
                <input
                  className="inputforaccountpage"
                  type="text"
                  name="mobilenumber"
                  placeholder="Mobile number"
                  value={values.mobilenumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
              </div>
            </div>
            {errors.mobilenumber && touched.mobilenumber ? (
              <p className="form-error">{errors.mobilenumber}</p>
            ) : null}
            <div className="formInput">
              <div className="forminputdiv">
                <input
                  className="inputforaccountpage"
                  type={changIcon ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />

                {changIcon ? (
                  <VisibilityIcon
                    onClick={changeEyeIconHandle}
                    sx={{ marginLeft: "0px" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={changeEyeIconHandle}
                    sx={{ marginLeft: "0px" }}
                  />
                )}
              </div>
            </div>
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
            <div className="formInput">
              <div className="forminputdiv">
                <input
                  className="inputforaccountpage"
                  type={changIcon2 ? "password" : "text"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />

                {changIcon2 ? (
                  <VisibilityIcon
                    onClick={changeEyeIconHandle2}
                    sx={{ marginLeft: "0px" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={changeEyeIconHandle2}
                    sx={{ marginLeft: "0px" }}
                  />
                )}
              </div>
            </div>
            {errors.confirmPassword && touched.confirmPassword ? (
              <p className="form-error">{errors.confirmPassword}</p>
            ) : null}
            <Button className="formsubmitbuttononsingup" type="submit">
              SIGN UP
            </Button>
            <Button className="signinonsignup" onClick={() => navigate("/")}>
              SIGN IN
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
