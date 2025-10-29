import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Container from "../components/Container.jsx";
import "../styles/Dictionary.css";

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:3001/api/lexicon/bias-lexicon")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setFilteredResults(data);
      })
      .catch((err) => console.error("Error fetching lexicon:", err));
  }, []);

  const handleSearch = () => {
    const filtered = results.filter((item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
    setCurrentPage(1); // reset to first page on search
  };

  // Pagination calculations
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredResults.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="dictionary-container">
      <Navbar />
      <Container>
        <div className="dictionary-content">
          <div className="dictionary-card">
            {/* Search bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for a word..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>

            {/* Table */}
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
                      <td>{item.score}</td>
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

            <div className="table-divider"></div>

            {/* Footer controls (pagination + rows per page) */}
            <div className="table-footer">
              <div className="rows-per-page">
                <label>Rows per page: </label>
                <select value={rowsPerPage} onChange={handleRowsChange}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="pagination">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dictionary;