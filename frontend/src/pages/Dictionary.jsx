import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Container from "../components/Container.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";
import "../styles/Dictionary.css";

const Dictionary = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  // Sorting
  const [sortBy, setSortBy] = useState("word");
  const sortOptions = [
    { value: "word", label: "Word (A–Z)" },
    { value: "score", label: "Sentiment Score" },
    { value: "meaning", label: "Meaning (A–Z)" },
  ];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- Fetch Data ---
  useEffect(() => {
    fetch("http://localhost:3001/api/lexicon/bias-lexicon")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setFilteredResults(data);
      })
      .catch((err) => console.error("Error fetching lexicon:", err));
  }, []);

  // --- 🔍 Live Search: filters all columns ---
  useEffect(() => {
    const filtered = results.filter((item) => {
      const search = searchValue.toLowerCase();
      return (
        item.word.toLowerCase().includes(search) ||
        String(item.score / 5).toLowerCase().includes(search) ||
        item.meaning.toLowerCase().includes(search)
      );
    });
    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [searchValue, results]);

  // --- Sorting ---
  const handleSortByChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    const sorted = [...filteredResults].sort((a, b) => {
      if (value === "word" || value === "meaning") {
        return a[value].localeCompare(b[value]);
      }

      if (value === "score") {
        const scoreA = isNaN(parseFloat(a.score)) ? null : parseFloat(a.score);
        const scoreB = isNaN(parseFloat(b.score)) ? null : parseFloat(b.score);
        if (scoreA === null && scoreB === null) return 0;
        if (scoreA === null) return 1;
        if (scoreB === null) return -1;
        return scoreB - scoreA;
      }

      return 0;
    });

    setFilteredResults(sorted);
  };

  // --- Pagination logic ---
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredResults.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  // --- Input change handler ---
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="dictionary-container">
      <Navbar />
      <Container>
        <div className="dictionary-content">
          <div className="dictionary-card">
            {/* 🔍 Search & Sort Bar */}
            <div className="search-bar">
              <SearchBar
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
                onSearchClick={() => {}}
                onSearchClick={() => {}}
                sortBy={sortBy}
                onSortByChange={handleSortByChange}
                sortOptions={sortOptions}
              />
            </div>

          {/* 📖 Table (scrollable container) */}
<div className="table-scroll">
  <table className="dictionary-table">
    <thead>
      <tr>
        <th>Word</th>
        <th>Sentiment Score</th>
        <th>Definition</th>
      </tr>
    </thead>
    <tbody>
      {currentRows.length > 0 ? (
        currentRows.map((item, index) => (
          <tr key={index}>
            <td>{item.word}</td>
            <td>{item.score / 5}</td>
            <td>{item.meaning}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="3">No results found.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

            <div className="table-divider"></div>

            {/* 📄 Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={rowsPerPage}
              onRowsPerPageChange={(val) => {
                setRowsPerPage(val);
                setCurrentPage(1);
              }}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dictionary;