import Auth from "./hooks/useAuth"
import Home from "./pages/Home"
import Header from "./components/Header";
import About from "./components/About";
import ResetPage from "./components/ResetPage";
import { Contact } from "./components/Contact";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Leaderboard from "./components/premiumComponent/Leaderboard";
import Report from "./components/premiumComponent/Report";
import AuthPage from "./pages/AuthPage";
import Login from "./components/Login";

function App() {
  const token = useSelector((state)=>state.auth.isToken);
  const verifyUser = useSelector((state)=>state.auth.isAuth);

  const isAuth = Auth();

  useEffect(()=>{
    if(token){
      const interval = setInterval(()=>{
        isAuth();
      },5*60*1000);
      return ()=>clearInterval(interval);
    }
  },[isAuth]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/auth" element={!verifyUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={verifyUser ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/resetForm/:uuid" element={<ResetPage />} />
        <Route path="/report/:duration" element={<Report />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
