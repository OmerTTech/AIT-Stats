import React, { useContext, useState } from "react";
import "../Auth.css";
import { FiAtSign } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { API } from "../../../services/Api";
import { Modal, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [emailBorder, setEmailBorder] = useState("");
  const [passwordBorder, setPasswordBorder] = useState("");
  const { setAccessToken } = useContext(AuthContext);

  // Modal durumunu yöneten state
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Modal açma ve kapama fonksiyonları
  const handleShowDemoModal = () => setShowDemoModal(true);
  const handleCloseDemoModal = () => setShowDemoModal(false);

  const getShowPass = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((previnputValues) => ({
      ...previnputValues,
      [name]: value,
    }));

    if (name === "email") {
      setEmailBorder("");
    } else if (name === "password") {
      setPasswordBorder("");
    }
  };

  const handleDemoLogin = (userType) => {
    if (userType === "student") {
      setInputValues({
        email: "user@gmail.com",
        password: "User123",
      });
    } else if (userType === "teacher") {
      setInputValues({
        email: "teacher@gmail.com",
        password: "Teacher123",
      });
    }
    setEmailBorder("");
    setPasswordBorder("");
    handleCloseDemoModal(); // Modalı kapat
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowPassword(false);

    if (!inputValues.email && !inputValues.password) {
      toast.error("Email and Password cannot be blank");
      setEmailBorder("red");
      setPasswordBorder("red");
      return;
    } else if (!inputValues.email) {
      toast.error("Email cannot be blank");
      setEmailBorder("red");
      return;
    } else if (!inputValues.password) {
      toast.error("Password cannot be blank");
      setPasswordBorder("red");
      return;
    } else {
      setEmailBorder("");
      setPasswordBorder("");
    }

    try {
      const response = await API.auth.login({
        email: inputValues.email,
        password: inputValues.password
      });
      
      const token = response.data.accessToken;
      const userData = jwtDecode(token);
      
      if (rememberMe) {
        localStorage.setItem("accessToken", token);
      } else {
        sessionStorage.setItem("accessToken", token);
      }
      setAccessToken(token);
      toast.success("Login successful!");
      window.location.reload();
    } catch (error) {
      console.error("Login error", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
      setPasswordBorder("red");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form onSubmit={submitHandler} className="form">
        {/* Demo butonu burada, formun içinde! */}
        <div>
          <Button
            onClick={handleShowDemoModal}
            variant="info"
            className="mt-0 mb-2"
          >
            Demo Users
          </Button>
        </div>

        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className={`inputForm ${emailBorder && "error"}`}>
          <FiAtSign className="login-icons" />
          <input
            type="email"
            className="input"
            placeholder="Enter your Email"
            name="email"
            value={inputValues.email}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className={`inputForm ${passwordBorder && "error"}`}>
          <IoLockClosedOutline className="login-icons" />
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="input"
            placeholder="Enter your Password"
            name="password"
            value={inputValues.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />

          {showPassword ? (
            <FaRegEye
              onClick={getShowPass}
              className="mx-2"
              style={{ fontSize: "1.35rem" }}
            />
          ) : (
            <FaRegEyeSlash
              onClick={getShowPass}
              className="mx-2"
              style={{ fontSize: "1.5rem" }}
            />
          )}
        </div>

        <div className="flex-row">
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="checkbox"
              className="m-1"
              style={{ width: "1rem", height: "1rem" }}
              onChange={(e) => {
                setRememberMe(e.target.checked);
              }}
            />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
        <p className="p">
          Don't have an account?{" "}
          <Link to="/register" className="span">
            Sign Up
          </Link>
        </p>
      </form>

      {/* Demo Login Modalı */}
      <Modal show={showDemoModal} onHide={handleCloseDemoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Demo Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select a demo account to log in automatically.</p>
          <div className="d-flex flex-column gap-2">
            <span style={{ cursor: "not-allowed" }}>
              <Button disabled variant="secondary">
                Admin account
              </Button>
            </span>
            <Button
              variant="secondary"
              onClick={() => handleDemoLogin("teacher")}
            >
              Teacher account
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleDemoLogin("student")}
            >
              Student account
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginPage;
