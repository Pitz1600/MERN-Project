import React from "react";

const SearchBar = ({ searchValue, onSearchChange, onSearchClick, searchBy, onSearchByChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      {/* Search Input + Button */}
      <div className="flex w-full md:w-[60%]">
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={onSearchChange}
          className="flex-grow px-4 py-2 border border-gray-300  text-sm focus:outline-none"
        />
        <button
          onClick={onSearchClick}
          className="bg-white border border-gray-300 border-l-0 px-4 py-2 rounded-r-full"
        >
          <img
            src="/src/assets/icon_search.png"
            alt="Search Icon"
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* Dropdown */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-800 font-medium">Search By:</span>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          value={searchBy}
          onChange={onSearchByChange}
        >
          <option value="text">Submitted Text</option>
          <option value="filename">File Name</option>
          <option value="date">Date</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;