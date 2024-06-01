import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useRazorpay from "../hooks/useRazorpay";
import { clearAuthState } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { timeItems } from "./datafrombackend";

const Header = () => {
  const token = useSelector((state) => state.auth.isToken);
  const authenticated = useSelector((state) => state.auth.isAuth);
  console.log(authenticated);
  const isPremium = useSelector((state) => state.auth.isPremium);
  console.log(isPremium);
  const handlePremium = useRazorpay();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuthState());
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
              Expense Tracker
            </span>
          </a>
        </div>
        {token !== false && isPremium ? (
          <ul className="flex items-center space-x-6">
            {timeItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {authenticated && !isPremium && (
          <button
            type="button"
            onClick={handlePremium}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Buy Premium
          </button>
        )}

        <div>
          {token && (
            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
