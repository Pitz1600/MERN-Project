import React from "react";
import "../styles/components/SearchBar.css"; 

const SearchBar = ({
  searchValue,
  onSearchChange,
  onSearchClick,
  searchBy,
  onSearchByChange,
}) => {
  return (
    <div className="searchbar-container">
      {/* Search Input + Button */}
      <div className="searchbar-input-group">
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={onSearchChange}
          className="searchbar-input"
        />
        <button onClick={onSearchClick} className="searchbar-button">
          <img
            src="/src/assets/icon_search.png"
            alt="Search Icon"
            className="searchbar-icon"
          />
        </button>
      </div>

      {/* Dropdown */}
      <div className="searchbar-dropdown">
        <span className="searchbar-label">Sort By:</span>
        <select
          className="searchbar-select"
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
