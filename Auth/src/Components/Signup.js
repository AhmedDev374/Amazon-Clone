import React, { useState } from "react";
import "./signin.css";
import Logo from "../imgs/logo2.png";
import BG1 from "../imgs/login-BG.png";
import BG2 from "../imgs/login-BG2.png";
import google from "../imgs/google.png";
import { app } from "../Firebase";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import swal from "sweetalert";
import { toast } from "react-toastify";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  document.title = "Amazon";

  const notify1 = () =>
    toast.error("Please fill up all the credentials properly!", {
      position: "top-center",
      autoClose: 1200,
      theme: "colored",
    });

  // Handlers
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleEmailBlur = (e) => {
    if (
      e.target.value === "" ||
      !e.target.value.includes("@") ||
      !e.target.value.includes(".")
    ) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleNameBlur = (e) => {
    if (e.target.value === "") {
      setNameError("Please enter your name.");
    } else {
      setNameError("");
    }
  };

  const handlePasswordBlur = (e) => {
    if (e.target.value === "") {
      setPasswordError("Please enter your password.");
    } else if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const CreateUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      // ✅ Redirect to microservice home
      window.location.href = "http://localhost/home";
    } catch (error) {
      swal({
        title: "Error!",
        text: error.message,
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  const GoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      // ✅ Redirect to microservice home
      window.location.href = "http://localhost/home";
    } catch (error) {
      swal({
        title: "Error!",
        text: error.message,
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  const handleBgLoad = () => setBgLoaded(true);

  const handleSignupClick = () => {
    if (name === "" || email === "" || password === "") {
      notify1();
      return;
    }
    if (nameError || emailError || passwordError) {
      notify1();
      return;
    }
    CreateUser();
  };

  return (
    <>
      <div className="signin-page">
        <div className="login-navbar">
          <div className="main-logo">
            <img src={Logo} className="amazon-logo" alt="Amazon Logo" />
          </div>
          <div className="signup">
            <Link to="/">
              <button className="signup-btn">Sign in</button>
            </Link>
          </div>
        </div>
        <div className="background">
          <img src={BG1} className="BG1" onLoad={handleBgLoad} alt="bg1" />
          <img src={BG2} className="BG2" onLoad={handleBgLoad} alt="bg2" />
        </div>
        {bgLoaded && (
          <div className="main-form2">
            <div className="login-form">
              <div className="some-text">
                <p className="user">User Registration</p>
                <p className="user-desc">
                  Hey, Enter your details to create a new account
                </p>
              </div>
              <div className="user-details">
                <input
                  type="text"
                  placeholder="Name"
                  className="name"
                  value={name}
                  onBlur={handleNameBlur}
                  onChange={handleNameChange}
                  required
                />
                {nameError && <div className="error-message">{nameError}</div>}
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
                <input
                  type="password"
                  placeholder="Passcode"
                  className="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  required
                />
                {passwordError && (
                  <div className="error-message">{passwordError}</div>
                )}
                <button onClick={handleSignupClick} className="signin-btn">
                  Sign up
                </button>
                <div className="extra-buttons">
                  <p className="or">&#x2015; Or &#x2015;</p>
                  <button onClick={GoogleAuth} className="google">
                    <p>Sign up with</p>
                    <img src={google} className="google-img" alt="google" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Signup;
