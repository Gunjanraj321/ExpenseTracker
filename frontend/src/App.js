import Signup from "./components/Signup";
import Login from "./components/Login";
import Auth from "./hooks/useAuth";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import ResetForm from "./components/ResetForm";
import ResetPage from "./components/ResetPage";
import { Contact } from "./components/Contact";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ResetForm from "./components/ResetForm";
import { navItems, timeItems } from "./components/datafrombackend";
import Leaderboard from "./components/premiumComponent/Leaderboard";
import Report from './components/premiumComponent/Report'; // Import the Report component

const App = () => {
  const userLoginData = useSelector((state) => state.auth.user);
  const verifyUser = useSelector((state) => state.auth.isAuth);
  const isAuth = Auth();

  useEffect(() => {
    if (userLoginData?.token) {
      const interval = setInterval(() => {
        isAuth();
      }, 5 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [userLoginData]);

  return (
    <div>
      <Header navItems={navItems} timeItems={timeItems} />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/reset" element={<ResetForm />} />
        <Route path="/resetForm/:uuid" element={<ResetPage />} />
        <Route path="/report/:duration" element={<Report />} /> 
        <Route path="/leaderboard" element={<Leaderboard />} />        <Route
          path="/"
          element={verifyUser ? <Home /> : <Navigate to="/login" />}
        />{" "}
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;