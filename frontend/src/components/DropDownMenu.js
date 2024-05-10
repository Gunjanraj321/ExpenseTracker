import React from "react";

const DropdownMenu = ({ items }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
      <div className="py-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
