// PaginatedExpenseList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import UpdateExpenseModal from './UpdateExpenseModal';

const PaginatedExpenseList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.user);
  const token = isAuthenticated?.token;

  useEffect(() => {
    fetchExpenseList(currentPage);
  }, [currentPage]);

  const fetchExpenseList = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/expenses/paginated?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = response.data;
      setExpenses(data.expenses);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log("Error occurred while fetching data:", err);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openUpdateModal = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleUpdateExpense = async (expenseId, updatedExpense) => {
    try {
      console.log(updatedExpense.id)
      const response = await axios.put(`http://localhost:3000/api/expenses/${expenseId}`, updatedExpense, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(response)
      if (response.status === 200) {
        fetchExpenseList(currentPage);
      }
    } catch (err) {
      console.log("Error occurred while updating expense:", err);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/expenses/${expenseId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        fetchExpenseList(currentPage);
      }
    } catch (err) {
      console.log("Error occurred while deleting expense:", err);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Paginated Expense List</h2>
      <div id="expenseList" className="space-y-4">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onUpdate={openUpdateModal} onDelete={handleDeleteExpense} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
      <UpdateExpenseModal
        isOpen={isModalOpen}
        onClose={closeUpdateModal}
        onUpdateExpense={handleUpdateExpense}
        expense={selectedExpense}
      />
    </div>
  );
};

export default PaginatedExpenseList;
