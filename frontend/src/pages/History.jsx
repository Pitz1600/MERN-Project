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
  const [sortBy, setSortBy] = useState("dateTime"); // controlled sort field
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Define sort options here and pass to SearchBar
  const sortOptions = [
    { value: "id", label: "ID" },
    { value: "dateTime", label: "Date/Time" },
    { value: "prompt", label: "Prompt" },
    { value: "category", label: "Category" },
    { value: "score", label: "Sentiment Score" }, // 'score' will map to sentiment_score field
  ];

  // Pagination setup based on filtered data
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    // Keep currentPage valid when page size or filtered data changes
    const newTotal = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    if (currentPage > newTotal) setCurrentPage(newTotal);
  }, [itemsPerPage, filteredData, currentPage]);

  const handleStartAnalyzing = () => navigate("/analyzer");
  const handleSearchChange = (e) => setSearchValue(e.target.value);
  const handleSortByChange = (e) => setSortBy(e.target.value);

  const formatIdDisplay = (id) => {
    if (!id) return "";
    const str = String(id);
    if (str.length <= 8) return str;
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
            // keep an ISO date accessible for correct sorting (if a.date exists)
            _rawDateISO: a.date ? new Date(a.date).toISOString() : null,
            dateTime: a.date
              ? new Date(a.date)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")
              : "",
            prompt: a.prompt || a.text || a.original_text || "",
            category,
            sentiment_score: avgSentiment,
            raw: a,
          };
        });

        setHistoryData(mapped);
        setFilteredData(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error fetching analyses");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  // Combined effect: live-filter + sort whenever historyData, searchValue, or sortBy changes
  useEffect(() => {
    const term = searchValue.toLowerCase().trim();

    // base filtering
    const baseFiltered = historyData.filter((item) => {
      if (!term) return true; // include all when no search term
      // search across the main visible fields
      return (
        String(item.id || "").toLowerCase().includes(term) ||
        String(item.dateTime || "").toLowerCase().includes(term) ||
        String(item.prompt || "").toLowerCase().includes(term) ||
        String(item.category || "").toLowerCase().includes(term) ||
        String(item.sentiment_score || "").toLowerCase().includes(term)
      );
    });

    // sorting
    const sorted = [...baseFiltered].sort((a, b) => {
    if (sortBy === "dateTime") {
      const da = a._rawDateISO ? new Date(a._rawDateISO) : new Date(a.dateTime || 0);
      const db = b._rawDateISO ? new Date(b._rawDateISO) : new Date(b.dateTime || 0);
      return db - da; // newest first
    }

    if (sortBy === "score") {
      // Handle "N/A" and numeric comparison properly
      const aIsNA = a.sentiment_score === "N/A" || a.sentiment_score === "" || a.sentiment_score == null;
      const bIsNA = b.sentiment_score === "N/A" || b.sentiment_score === "" || b.sentiment_score == null;

      // If both are N/A, they’re equal
      if (aIsNA && bIsNA) return 0;
      // If only A is N/A, place it *after* B
      if (aIsNA) return 1;
      // If only B is N/A, place it *after* A
      if (bIsNA) return -1;

      // Both numeric → sort high to low
      const va = parseFloat(a.sentiment_score);
      const vb = parseFloat(b.sentiment_score);
      return vb - va;
    }

    const va = String(a[sortBy] || "").toLowerCase();
    const vb = String(b[sortBy] || "").toLowerCase();
    return va.localeCompare(vb);
  });

    setFilteredData(sorted);
    setCurrentPage(1);
  }, [historyData, searchValue, sortBy]);

  const handleDeleteSuccess = (deletedId) => {
    // remove from both states
    setHistoryData((prev) => prev.filter((item) => item.id !== deletedId));
    setFilteredData((prev) => prev.filter((item) => item.id !== deletedId));
  };

  return (
    <div className="history-container">
      <Navbar />

      <div className="history-content">
        <Container>
          {/* Search Bar */}
          <div className="history-search-section">
            <SearchBar
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              onSearchClick={() => {}} // kept for compatibility if SearchBar still expects it
              // provide both old 'searchBy' prop and new sort props if SearchBar uses them
              sortBy={sortBy}
              onSortByChange={handleSortByChange}
              sortOptions={sortOptions}
            />
          </div>

          {/* Table or Empty State */}
          <div className="history-table-container">
            {filteredData.length === 0 ? (
              <div className="history-empty">
                <p>{loading ? "Loading..." : "No results found."}</p>
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
                        <tr
                          key={item.id}
                          onClick={() => {
                            setSelectedAnalysis(item.raw);
                            setShowModal(true);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <td className="history-id-ellipsis" title={item.id}>
                            {formatIdDisplay(item.id)}
                          </td>
                          <td className="history-date-ellipsis" title={item.dateTime}>
                            {item.dateTime}
                          </td>
                          <td className="history-text-ellipsis" title={item.prompt}>
                            {item.prompt}
                          </td>
                          <td>{item.category}</td>
                          <td>{item.sentiment_score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="table-divider"></div>

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
                        setCurrentPage(1);
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
      {showModal && (
        <AnalysisModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedAnalysis(null);
          }}
          analysis={selectedAnalysis}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default History;