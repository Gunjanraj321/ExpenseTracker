import Auth from "./hooks/useAuth";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import ResetPage from "./components/ResetPage";
import { Contact } from "./components/Contact";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Leaderboard from "./components/premiumComponent/Leaderboard";
import Report from "./components/premiumComponent/Report";
import AuthPage from "./pages/AuthPage";
import Login from "./components/Login";

const App = () => {
  
  const userLoginData = useSelector((state) => state.user);
  console.log(userLoginData);
  const verifyUser = useSelector((state) => state.isAuth);

  const isAuth = Auth();

  useEffect(() => {
    console.log(userLoginData);
    if (userLoginData?.token) {
      console.log(userLoginData);
      const interval = setInterval(() => {
        isAuth();
      }, 5 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [userLoginData]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/auth" element={!verifyUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={verifyUser ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/resetForm/:uuid" element={<ResetPage />} />
        <Route path="/report/:duration" element={<Report />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
