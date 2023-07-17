import React, { useState, useEffect, useContext } from "react";
import "../../style/Account/signin.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { BsLockFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset, logout } from "../../../rtk/features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../../Spinner";
import { DataContext } from "../../context/DataProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [changIcon, setChangIcon] = useState(true);
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { sidenavbar, setSidenavbar } = useContext(DataContext);
  // const [sidebar,setSidebar]=useState(sidenavbar)
  // const test = setSidebar(false)
  // console.log("test side bar",test)

  let { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //   if (user !== null) {
  //     if (user && user.status === "wrong credentials") {
  //       toast.error("Email or Password is not correct");
  //     }
  //     if (user && user.status === "Required field") {
  //       toast.error("Email and Password is Required");
  //     }
  //     if (user && user.status === "failed") {
  //       toast.error("Invalid Cradentional");
  //     }
  //     if (user && user.status === "succes") {
  //       toast.success("You are logged in");
  //       navigate("/Dashboard");
  //       sidenavbar = false;
  //       dispatch(reset());
  //       dispatch(logout());
  //     }
  //   }
  // }, [user]);

  useEffect(() => {
    if (user && user.status !== null) {
      // check if user has status property and not null
      if (user && user.status === "wrong credentials") {
        toast.error("Email or Password is not correct");
      }
      if (user && user.status === "Required field") {
        toast.error("Email and Password is Required");
      }
      if (user && user.status === "failed") {
        toast.error("Invalid Cradentional");
      }
      if (user && user.status === "succes") {
        toast.success("You are logged in");
        navigate("/Dashboard");
        sidenavbar = false;
        dispatch(reset());
        dispatch(logout());
      }
    }
  }, [user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSidenavbar(true);
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleSignup = () => {
    navigate("/signup");
  };

  const changeEyeIconHandle = () => {
    setChangIcon(!changIcon);
  };

  return (
    <>
      <div className="imagebackgroundforlogin">
        <div className="signinform">
          <div className="topcontaint">
            <h1 className="signinheader">Sign In</h1>
            <p className="subheaderparagraph">
              This is a Secure system and you will need to provide your login
              details to access the site.
            </p>
          </div>
          <Form onSubmit={onSubmit}>
            <div className="formInput">
              <div className="forminputdiv2">
                {" "}
                <span style={{ fontSize: "1.4rem" }}>
                  <FiMail />|
                </span>
                <input
                  className="inputforaccountpage"
                  type="email"
                  name="email"
                  placeholder="Enter your username or phone"
                  onChange={onChange}
                  value={email}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="formInput">
              <div className="forminputdiv2">
                {" "}
                <span style={{ fontSize: "1.5rem" }}>
                  <BsLockFill />|
                </span>
                <input
                  className="inputforaccountpage"
                  type={changIcon ? "password" : "text"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={onChange}
                  value={password}
                  autoComplete="off"
                />{" "}
                {changIcon ? (
                  <VisibilityIcon onClick={changeEyeIconHandle} />
                ) : (
                  <VisibilityOffIcon onClick={changeEyeIconHandle} />
                )}
              </div>
            </div>
            <div className="checkboxarea">
              <div className="checkboxbutton">
                <Checkbox defaultChecked color="success" />
                <span>Remember Me</span>
              </div>
              <div className="forgetresetlink">
                <Link to="/ForgetPassword" className="forgetlink">
                  Forgot/Reset Password
                </Link>
              </div>
            </div>
            <Button className="formsubmitbutton" type="submit">
              LOGIN
            </Button>
            <Button className="signuponlogin" onClick={handleSignup}>
              SIGN UP
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
