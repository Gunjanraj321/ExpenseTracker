import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ExpenseForm = () => {
  const token = useSelector((state) => state.auth.isToken);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    amount: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/expenses",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      setFormData({
        name: "",
        quantity: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center">
        <form
          className="my-4 space-y-4"
          id="expenseForm"
          onSubmit={handleAddExpense}
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">
            Add Your Expense
          </h2>

          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-600"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={handleInputChange}
              value={formData.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-lg font-semibold text-gray-600"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              required
              onChange={handleInputChange}
              value={formData.quantity}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-lg font-semibold text-gray-600"
            >
              Amount Spend:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              onChange={handleInputChange}
              value={formData.amount}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            id="submitButton"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
