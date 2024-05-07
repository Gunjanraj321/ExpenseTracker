import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isAuth, login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // handleChange function for form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/sign/loginUser",
        formData
      );
      console.log(response.data);

      navigate("/");
      dispatch(login(response.data));
      dispatch(isAuth(true));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h2 className="text-xl font-bold text-gray-900 my-2 pX-4 md:text-2xl">
        Login
      </h2>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className="w-full font-bold text-black bg-yellow-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <a
            href="/signup"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </a>
          </p>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Want to Reset password ?{" "}
          <a
            href="/reset"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Reset Password
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
