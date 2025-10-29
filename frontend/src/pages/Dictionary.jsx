import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Container from "../components/Container.jsx";
import "../styles/Dictionary.css";

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([
    {
      word: "Worse",
      sentiment: "-0.60",
      definition:
        "Of poorer quality or lower standard; less good or desirable.",
    },
    {
      word: "Better",
      sentiment: "0.80",
      definition: "Of a more excellent or effective kind; superior.",
    },
    {
      word: "Happy",
      sentiment: "0.90",
      definition: "Feeling or showing pleasure or contentment.",
    },
    {
      word: "Sad",
      sentiment: "-0.75",
      definition: "Feeling or showing sorrow; unhappy.",
    },
    {
      word: "Excited",
      sentiment: "0.85",
      definition: "Very enthusiastic and eager.",
    },
    {
      word: "Angry",
      sentiment: "-0.80",
      definition: "Feeling or showing strong annoyance or displeasure.",
    },
    {
      word: "Calm",
      sentiment: "0.60",
      definition: "Not showing or feeling nervousness, anger, or other strong emotions.",
    },
    {
      word: "Confused",
      sentiment: "-0.50",
      definition: "Unable to think clearly; bewildered.",
    },
  
  ]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
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
                {results.map((item, index) => (
                  <tr key={index}>
                    <td>{item.word}</td>
                    <td>{item.sentiment}</td>
                    <td>{item.definition}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Divider above footer */}
            <div className="table-divider"></div>

            {/* Footer controls */}
            <div className="table-footer">
              <select>
                <option>10 rows</option>
              </select>
              <div className="pagination">
                <button>&lt;</button>
                <span>Page 1</span>
                <button>&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dictionary;
