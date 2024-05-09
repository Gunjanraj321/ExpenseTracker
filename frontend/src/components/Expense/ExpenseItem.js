// ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ expense, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    onUpdate(expense);
  };

  const handleDelete = () => {
    onDelete(expense.id);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-bold">Name:</span>
        <span>{expense.name}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Quantity:</span>
        <span>{expense.quantity}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Amount:</span>
        <span>{expense.amount}</span>
      </div>
      <div className="flex space-x-2">
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Update
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
