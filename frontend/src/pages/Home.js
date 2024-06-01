import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginatedExpenseList from '../components/Expense/PaginatedExpense';
import ExpenseForm from '../components/ExpenseForm';
import Leaderboard from '../components/premiumComponent/Leaderboard';
import { setShowForm } from "../redux/modalSlice";

const Home = () => {
  const [activeTab, setActiveTab] = useState("ExpenseForm");
  const isPremium = useSelector((state) => state.auth.isPremium);
  const dispatch = useDispatch();

  const handleFormTab = () => {
    setActiveTab("ExpenseForm");
    dispatch(setShowForm(true));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    dispatch(setShowForm(false));
  };

  return (
    <div className="h-screen flex">
      <aside
        id="default-sidebar"
        className="top-0 left-0 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 bg-slate-500">
          <ul className="space-y-2 font-medium">
            <li>
              <div
                className={`${
                  activeTab === "ExpenseForm"
                    ? "flex items-center p-2 text-black bg-gray-200 rounded-lg group"
                    : "flex items-center p-2 text-gray-200 rounded-lg hover:bg-slate-600 group"
                }`}
                onClick={handleFormTab}
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
                <span className="flex-1 ml-2 whitespace-nowrap font-bold text-lg">
                  Expense Form
                </span>
              </div>
            </li>
            <li>
              <div
                className={`${
                  activeTab === "PaginatedExpenseList"
                    ? "flex items-center p-2 text-black bg-gray-200 rounded-lg group"
                    : "flex items-center p-2 text-gray-200 rounded-lg hover:bg-slate-600 group"
                }`}
                onClick={() => handleTabClick("PaginatedExpenseList")}
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.418 3.623l-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377zM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Expenses</span>
              </div>
            </li>
            {isPremium && (
              <li>
                <div
                  className={`${
                    activeTab === "Leaderboard"
                      ? "flex items-center p-2 text-black bg-gray-200 rounded-lg group"
                      : "flex items-center p-2 text-gray-200 rounded-lg hover:bg-slate-600 group"
                  }`}
                  onClick={() => handleTabClick("Leaderboard")}
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 group-hover:text-gray-900"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Leaderboard
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </aside>
      <div className="flex-1 h-full overflow-y-auto p-4">
        {activeTab === "ExpenseForm" && <ExpenseForm />}
        {activeTab === "PaginatedExpenseList" && <PaginatedExpenseList />}
        {activeTab === "Leaderboard" && isPremium && <Leaderboard />}
      </div>
    </div>
  );
};

export default Home;
