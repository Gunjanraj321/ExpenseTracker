import React, { useState, useEffect } from 'react';

const UpdateExpenseModal = ({ isOpen, onClose, onUpdateExpense, expense }) => {
  const [updatedExpense, setUpdatedExpense] = useState({ ...expense });
    
  useEffect(() => {
    setUpdatedExpense({ ...expense });
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateExpense(expense.id, updatedExpense); 
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Update Expense</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedExpense.name}
                onChange={handleChange}
                className="border border-gray-400 rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={updatedExpense.quantity}
                onChange={handleChange}
                className="border border-gray-400 rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block">
                Amount Spend:
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={updatedExpense.amount}
                onChange={handleChange}
                className="border border-gray-400 rounded px-4 py-2 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateExpenseModal;
