import React, { useState } from "react";
import DropdownMenu from "./DropDownMenu";
import { useDispatch, useSelector } from "react-redux";
import useRazorpay from "./useRazorpay";
import { isAuth, login, updateUserPremiumStatus } from "../redux/authSlice";
import { Link } from "react-router-dom";

const Header = ({ navItems, timeItems }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const isAuthenticated = useSelector((state) => state.auth.user);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const handlePremium = useRazorpay();

  const dispatch = useDispatch();

  const handleLogout = () => {
    if (isAuthenticated !== null) {
      dispatch(login(null));
      dispatch(isAuth(false));
      dispatch(updateUserPremiumStatus(false));
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
        </div>
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
            className="mr-6 text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Menu
          </button>
          {isNavMenuOpen && <DropdownMenu items={navItems} />}
        </div>
        <div className="relative inline-block text-left">
          {isAuthenticated !== null && isPremium ? (
            <>
              <button
                type="button"
                onClick={() => setIsTimeMenuOpen(!isTimeMenuOpen)}
                className="mr-6 text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                Time
              </button>
              {isTimeMenuOpen && <DropdownMenu items={timeItems} />}
            </>
          ) : null}
        </div>

        <div className="">
          {isAuthenticated !== null && !isPremium ? (
            <button
              type="button"
              onClick={handlePremium}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            >
              Buy Premium
            </button>
          ) : null}
        </div>
        <div>
          {isAuthenticated ? (
            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
