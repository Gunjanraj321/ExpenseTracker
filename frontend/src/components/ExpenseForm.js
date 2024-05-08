import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ExpenseForm = () => {
    const isAuthenticated = useSelector((state) => state.auth.user);
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
            if (error.response.status === 401) {
                // Unauthorized error, token might have expired
                console.log('Token expired or invalid, logging out...');
                // Remove token from local storage
                localStorage.removeItem('jwtToken');
                // Redirect user to login page or show login modal
                // Example: window.location.href = '/login';
            } else {
                // Handle other errors
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="container mx-auto">
            <form className="my-4" id="expenseForm" onSubmit={handleAddExpense}>
                <label htmlFor="name" className="block">
                    Name:
                </label>
                <input type="text" id="name" name="name" required className="border border-gray-400 rounded px-4 py-2 mb-2" onChange={handleInputChange} value={formData.name} />

                <label htmlFor="quantity" className="block">
                    Quantity:
                </label>
                <input type="number" id="quantity" name="quantity" required className="border border-gray-400 rounded px-4 py-2 mb-2" onChange={handleInputChange} value={formData.quantity} />

                <label htmlFor="amount" className="block">
                    Amount Spend:
                </label>
                <input type="number" id="amount" name="amount" required className="border border-gray-400 rounded px-4 py-2 mb-2" onChange={handleInputChange} value={formData.amount} />

                <button type="submit" id="submitButton" className="bg-blue-500 text-white px-2 py-2 rounded">
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
