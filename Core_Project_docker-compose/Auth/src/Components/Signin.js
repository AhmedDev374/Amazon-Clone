import React, { useState } from "react";
import "./signin.css";
import Logo from "../imgs/logo2.png";
import BG1 from "../imgs/login-BG.png";
import BG2 from "../imgs/login-BG2.png";
import google from "../imgs/google.png";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import swal from "sweetalert";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);

  document.title = "Amazon";

  // Handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Validate email on blur
  const handleEmailBlur = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Validate password on blur
  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("Please enter your password.");
    } else if (password.length < 4) {
      setPasswordError("Password is too short.");
    } else {
      setPasswordError("");
    }
  };

  // Sign in with email/password
  const LogInUser = async () => {
    handleEmailBlur();
    handlePasswordBlur();

    if (emailError || passwordError) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to external microservice
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

  // Sign in with Google
  const GoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect to external microservice
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

  return (
    <div className="signin-page">
      {/* Navbar */}
      <div className="login-navbar">
        <div className="main-logo">
          <img src={Logo} className="amazon-logo" alt="Amazon Logo" />
        </div>
        <div className="signup">
          <Link to="/signup">
            <button className="signup-btn">Sign up</button>
          </Link>
        </div>
      </div>

      {/* Background */}
      <div className="background">
        <img src={BG1} className="BG1" onLoad={() => setBgLoaded(true)} alt="BG1" />
        <img src={BG2} className="BG2" onLoad={() => setBgLoaded(true)} alt="BG2" />
      </div>

      {/* Login Form */}
      {bgLoaded && (
        <div className="main-form">
          <div className="login-form">
            <div className="some-text">
              <p className="user">User Login</p>
              <p className="user-desc">
                Hey, enter your details to sign in to your account
              </p>
            </div>

            <div className="user-details">
              <input
                type="email"
                placeholder="Enter Email"
                className="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}

              <input
                type="password"
                placeholder="Passcode"
                className="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                required
              />
              {passwordError && <div className="error-message">{passwordError}</div>}

              <button onClick={LogInUser} className="signin-btn">
                Sign in
              </button>

              <div className="extra-buttons">
                <p className="or">&#x2015; Or &#x2015;</p>
                <button onClick={GoogleAuth} className="google">
                  <p>Sign in with</p>
                  <img src={google} className="google-img" alt="Google" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signin;
