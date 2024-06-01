import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ResetForm from "../components/ResetForm";

const AuthPage = () => {
  const [authOption, setAuthOption] = useState("login");
  
  const handleAuthOptionChange = (option) => {
    setAuthOption(option);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="mb-4">
        <button
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onClick={() => handleAuthOptionChange("login")}
        >
          Login
        </button>
        <button
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onClick={() => handleAuthOptionChange("signup")}
        >
          Signup
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onClick={() => handleAuthOptionChange("reset")}
        >
          Forgot Password
        </button>
      </div>
      
      
      {authOption === "login" && <Login />}
      {authOption === "signup" && <Signup />}
      {authOption === "reset" && <ResetForm />}
    </div>
  );
};

export default AuthPage;
