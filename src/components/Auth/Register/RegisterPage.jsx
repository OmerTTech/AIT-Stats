import React, { useState, useContext } from "react";
import "../Auth.css";
import { FiAtSign } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API } from "../../../services/Api";
import { AuthContext } from "../../../contexts/AuthContext";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);
  
  const [inputValues, setInputValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "student"
  });

  const getShowPass = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowPassword(false);

    if (!inputValues.name || !inputValues.email || !inputValues.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await API.auth.register({
        name: inputValues.name,
        surname: inputValues.surname || null,
        email: inputValues.email,
        password: inputValues.password,
        role: inputValues.role
      });

      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
      setAccessToken(token);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration error", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form onSubmit={submitHandler} className="form">
        <div className="flex-column">
          <label>Name </label>
        </div>
        <div className="inputForm">
          <input 
            type="text" 
            className="input" 
            placeholder="Enter your Name" 
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-column">
          <label>Surname </label>
        </div>
        <div className="inputForm">
          <input 
            type="text" 
            className="input" 
            placeholder="Enter your Surname" 
            name="surname"
            value={inputValues.surname}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <FiAtSign style={{ fontSize: "1.25rem" }} />
          <input 
            type="email" 
            className="input" 
            placeholder="Enter your Email" 
            name="email"
            value={inputValues.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <IoLockClosedOutline style={{ fontSize: "1.25rem" }} />
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="input"
            placeholder="Enter your Password"
            name="password"
            value={inputValues.password}
            onChange={handleInputChange}
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

        <div className="flex-column">
          <label>Role</label>
        </div>
        <div className="inputForm">
          <select 
            name="role" 
            value={inputValues.role} 
            onChange={handleInputChange}
            className="input"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Sign Up
        </button>
        <p className="p">
          Already have an account?
          <Link to="/login" className="span">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
