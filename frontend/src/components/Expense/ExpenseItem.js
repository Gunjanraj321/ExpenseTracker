import React from 'react';

const ExpenseItem = ({ expense, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    onUpdate(expense);
  };

  const handleDelete = () => {
    onDelete(expense.id);
  };

  return (
    <ul className="max-w-md divide-y divide-gray-200">
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            <span className="font-bold">Name:</span> {expense.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            <span className="font-bold">Quantity:</span> {expense.quantity}
          </p>
          <p className="text-sm text-gray-500 truncate">
            <span className="font-bold">Amount:</span> {expense.amount}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Update
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </li>
  </ul>
  

  );
};

export default ExpenseItem;
