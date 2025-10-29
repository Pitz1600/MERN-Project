import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AnalysisModal from "../components/AnalysisModal";
import StartAnalyzingButton from "../components/StartAnalyzingButton";
import SearchBar from "../components/SearchBar";
import "../styles/History.css";
import Container from "../components/Container";

const History = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("text");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.max(1, Math.ceil(historyData.length / itemsPerPage));
  const paginatedData = historyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Ensure currentPage is valid when itemsPerPage or data length changes
  useEffect(() => {
    const newTotal = Math.max(1, Math.ceil(historyData.length / itemsPerPage));
    if (currentPage > newTotal) setCurrentPage(newTotal);
  }, [itemsPerPage, historyData, currentPage]);

  const handleStartAnalyzing = () => {
    navigate("/analyzer");
  };

  const handleSearchChange = (e) => setSearchValue(e.target.value);
  const handleSearchClick = () => {
    console.log("Searching for:", searchValue, "by", searchBy);
  };
  const handleSearchByChange = (e) => setSearchBy(e.target.value);

  // Helper to format id so at least 4 characters are visible before ellipsis
  const formatIdDisplay = (id) => {
    if (!id) return '';
    const str = String(id);
    if (str.length <= 8) return str; // short ids show fully
    // show first 4 chars and last 2 for context
    return `${str.slice(0, 4)}...${str.slice(-2)}`;
  };

  // Fetch analyses for authenticated user on mount
  useEffect(() => {
    const fetchAnalyses = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch("http://localhost:3001/api/user/analysis", {
          method: "GET",
          credentials: "include",
        });
        if (!resp.ok) throw new Error(`Failed to fetch analyses: ${resp.status}`);

        const json = await resp.json();
        if (!json.success) throw new Error(json.message || "Failed to fetch analyses");

        const mapped = (json.analyses || []).map((a) => {
          const resultsArray = Array.isArray(a.results) ? a.results : [a];

          let category = "Neutral";
          const allCategories = resultsArray.map((r) => (r.category || "").toLowerCase());
          if (allCategories.includes("reviewable")) category = "Reviewable";
          else if (allCategories.includes("biased")) category = "Biased";

          const validScores = resultsArray
            .map((r) => parseFloat(r.sentiment_score))
            .filter((s) => !isNaN(s));
          const avgSentiment =
            validScores.length > 0
              ? (validScores.reduce((sum, s) => sum + s, 0) / validScores.length).toFixed(2)
              : "N/A";

          return {
            id: a._id || a.id || Math.random().toString(36).slice(2, 9),
            dateTime: a.date
              ? new Date(a.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).replace(",", "")
              : "",
            prompt: a.prompt || a.text || a.original_text || "",
            category,
            sentiment_score: avgSentiment,
            raw: a,
          };
        });

        setHistoryData(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error fetching analyses");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);


  const handleDeleteSuccess = (deletedId) => {
    setHistoryData((prevData) => prevData.filter(item => item.id !== deletedId));
  };

  return (
    <div className="history-container">
      <Navbar />

      {/* ✅ Main content below buttons */}
      <div className="history-content">
        <Container>
          {/* Search Bar */}
          <div className="history-search-section">
            <SearchBar
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              onSearchClick={handleSearchClick}
              searchBy={searchBy}
              onSearchByChange={handleSearchByChange}
            />
          </div>

          {/* Table or Empty State */}
          <div className="history-table-container">
            {historyData.length === 0 ? (
              <div className="history-empty">
                <p>History is empty.</p>
                <StartAnalyzingButton onClick={handleStartAnalyzing} />
              </div>
            ) : (
              <>
                <div className="history-table-wrapper">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date / Time</th>
                        <th>Prompt</th>
                        <th>Category</th>
                        <th>Sentiment Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item) => (
                        <tr key={item.id} onClick={() => { setSelectedAnalysis(item.raw); setShowModal(true); }} style={{ cursor: 'pointer' }}>
                          <td className="history-id-ellipsis" title={item.id}>{formatIdDisplay(item.id)}</td>
                          <td className="history-date-ellipsis" title={item.dateTime}>{item.dateTime}</td>
                          <td className="history-text-ellipsis" title={item.prompt}>{item.prompt}</td>
                          <td>{item.category}</td>
                          <td>{item.sentiment_score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <div className="rows-per-page">
                    <label htmlFor="rowsPerPage">Rows:</label>
                    <select
                      id="rowsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setItemsPerPage(val);
                        setCurrentPage(1); // reset to first page when page size changes
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <button
                        key={page}
                        className={currentPage === page ? "active" : ""}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>

      {/* Analysis Detail Modal */}
      {showModal && <AnalysisModal
      show={showModal}
      onClose={() => {
        setShowModal(false);
        setSelectedAnalysis(null);
        }}
      analysis={selectedAnalysis}
      onDeleteSuccess={handleDeleteSuccess} />
      }
    </div>
  );
};

export default History;