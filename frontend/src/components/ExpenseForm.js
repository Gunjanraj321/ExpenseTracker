import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ExpenseForm = () => {
    const isAuthenticated = useSelector((state) => state.user);
    const token = isAuthenticated?.token;
    
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        amount: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/expenses', formData, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
            setFormData({
                name: '',
                quantity: '',
                amount: ''
            });
        } catch (error) {
                console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto ">
        <form className="my-4" id="expenseForm" onSubmit={handleAddExpense}>
        <h2 className="text-2xl font-bold mb-4">Add Your Expense</h2>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.name}
          />
  
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.quantity}
          />
  
          <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Amount Spend:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.amount}
          />
  
          <button
            type="submit"
            id="submitButton"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Expense
          </button>
        </form>
      </div>
    );
};

export default ExpenseForm;
