import React, { useState, useEffect } from "react";

import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";

import { useNavigate, Navigate } from "react-router-dom";
import "./SignUp.css";

const AuthPage = () => {
  if (localStorage.getItem("user_information")) {
    return <Navigate to={"/dashboard"} />;
  }
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneNo, setPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const [LoginVal, setLogin] = useState(false);
  const navigate = useNavigate();

  const [errorMsg, setError] = useState({
    errorState: false,
    errormsg: "Enter All Fileds...!",
  });

  const handleSignUpOrLoginForm = () => {
    setLogin((prev) => !prev);
    setPhoneNumber("");
    setUserPassword("");
    setUserName("");
    setUserEmail("");
    setError({
      errorState: false,
      errormsg: "Enter All Fileds...!",
    });
  };

  const postingDataFun = async (userData) => {
    const endpoint = LoginVal
      ? "https://syoft.dev/Api/user_registeration/api/user_registeration"
      : "https://syoft.dev/Api/userlogin/api/userlogin";

    try {
      const response = await axios.post(endpoint, userData);
      console.log(response.data);
      setIsLoading(false);

      console.log(LoginVal, "egghefgh", JSON.stringify(userData));
      if (!LoginVal) {
        localStorage.setItem("user_information", JSON.stringify(userData));
      } else {
        localStorage.setItem("user_information", JSON.stringify(userData));
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error.response.data);
      setError({
        errorState: true,
        errormsg: error.response.data,
      });
      setIsLoading(false);
    }
  };
  const handleFormTagInputChange = (e, inputChangingParameter) => {
    switch (inputChangingParameter) {
      case "username":
        setUserName(e.target.value);
        break;
      case "userEmail":
        setUserEmail(e.target.value);
        break;
      case "phoneNo":
        if (isNaN(e.target.value))
          return alert("Please enter only numeric values.");
        if (e.target.value.length > 10)
          return alert("Phone number should be exactly 10 digits.");
        setPhoneNumber(e.target.value);
        break;
      case "password":
        setUserPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      alert("Enter All Details");
      setError(true);
      return;
    }
    if (LoginVal && (!userName || !phoneNo)) {
      setError(true);
      alert("Enter All Details");
      return;
    }

    const sendingData = LoginVal
      ? {
          username: userName,
          email: userEmail,
          password: userPassword,
          phoneNumber: phoneNo,
          user_lastname: "Doe",
          user_city: "Hyderabad",
          user_zipcode: "500072",
        }
      : { email: userEmail, password: userPassword };
    setIsLoading((prev) => !prev);
    console.log(sendingData);
    postingDataFun(sendingData);
  };

  return isLoading ? (
    <div className="LoaderDiv">
      <SyncLoader size={10} color="#ff0b37" />
    </div>
  ) : (
    <div className="authPage">
      <div className="SideImgContainer">
        <img src="./Login_Img.png" alt="img" />
      </div>
      <div className={`authBox ${LoginVal ? "authBox-H60" : "authBox-H55"}`}>
        <img
          className="Nxt_watch_logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="Nxt Watch Logo"
        />
        <form
          className="formTag"
          onSubmit={(e) => {
            handleSubmitForm(e);
          }}
        >
          {LoginVal && (
            <>
              <label htmlFor="userName">USERNAME</label>
              <input
                className="formTag_input"
                id="userName"
                type="text"
                onChange={(e) => {
                  handleFormTagInputChange(e, "username");
                }}
                value={userName}
              />
            </>
          )}

          <>
            <>
              <label htmlFor="userName">Email</label>
              <input
                className="formTag_input"
                id="userEmail"
                type="email"
                onChange={(e) => {
                  handleFormTagInputChange(e, "userEmail");
                }}
                value={userEmail}
              />
            </>
          </>

          <>
            {LoginVal && (
              <>
                <label htmlFor="userName">Phone Number</label>
                <input
                  className="formTag_input"
                  id="phoneNUmber"
                  type="tel"
                  onChange={(e) => {
                    handleFormTagInputChange(e, "phoneNo");
                  }}
                  value={phoneNo}
                />
              </>
            )}
          </>

          <label htmlFor="userpassword">PASSWORD</label>
          <div className="formTag_input_withEye">
            <input
              id="userpassword"
              type="password"
              onChange={(e) => {
                handleFormTagInputChange(e, "password");
              }}
              value={userPassword}
            />
          </div>

          <button type="submit" className="formTag_Btn">
            {LoginVal ? "Sign Up" : "Login"}
          </button>
        </form>
        {errorMsg.errorState ? (
          <p style={{ margin: "10px" }} className="ErrorMsg">
            {errorMsg.errormsg}
          </p>
        ) : null}
        <button
          className="wannaSignUpBtn"
          onClick={() => handleSignUpOrLoginForm()}
        >
          <p>{LoginVal ? "Go To Login" : "Wanna Sign Up...?"}</p>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
