import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, login, updateUserPremiumStatus } from "../redux/authSlice";
import useRazorpay from "./useRazorpay";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div className="max-w-screen-xl flex fleax-wrap justify-between items-center mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <div className="">
          {isAuthenticated && (
            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-6 text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Menu
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Daily
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Monthly
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Yearly
                </a>
              </div>
            </div>
          )}
        </div>
        {isMenuOpen && (
          <div className="py-1">
            <a
              href="/"
              className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-100 !important"
            >
              Home
            </a>
            <a
              href="/about"
              className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-100 !important"
            >
              About
            </a>
            <a
              href="/contact"
              className="block px-4 py-2 text-sm text-black bg-white hover:bg-gray-100 !important"
            >
              Contact
            </a>
          </div>
        )}
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
      </div>
    </nav>
  );
};

export default Header;
