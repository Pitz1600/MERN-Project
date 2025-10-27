import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PopupModal from "../components/Popupmodal";
import AnalysisModal from "../components/AnalysisModal";
import DeleteModal from "../components/DeleteModal";
import StartAnalyzingButton from "../components/StartAnalyzingButton";
import SearchBar from "../components/SearchBar";
import deleteIcon from "../assets/icon_delete.png";
import "../styles/History.css";
import Container from "../components/Container";

const History = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("text");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [analysisToDelete, setAnalysisToDelete] = useState(null);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const paginatedData = historyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStartAnalyzing = () => {
    navigate("/analyzer");
  };

  const handleSearchChange = (e) => setSearchValue(e.target.value);
  const handleSearchClick = () => {
    console.log("Searching for:", searchValue, "by", searchBy);
  };
  const handleSearchByChange = (e) => setSearchBy(e.target.value);

  const handleEmptyClick = () => setHistoryData([]);

  const handleWithDataClick = () => {
    setCurrentPage(1);
    setHistoryData([
      { id: "123456", dateTime: "October 1, 2025 | 12:55am", text: "Sample prompt 1", category: "Biased", score: "-0.51" },
      { id: "654321", dateTime: "October 1, 2025 | 01:23am", text: "Sample prompt 2", category: "Neutral", score: "0.87" },
      { id: "123333", dateTime: "October 1, 2025 | 02:06pm", text: "Sample prompt 3", category: "Reviewable", score: "0.00" },
      { id: "999999", dateTime: "October 1, 2025 | 03:12pm", text: "Extra prompt 4", category: "Biased", score: "0.74" },
      { id: "888888", dateTime: "October 1, 2025 | 03:25pm", text: "Extra prompt 5", category: "Neutral", score: "0.82" },
      { id: "777777", dateTime: "October 1, 2025 | 04:01pm", text: "Extra prompt 6", category: "Reviewable", score: "0.01" },
    ]);
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

        if (!resp.ok) {
          throw new Error(`Failed to fetch analyses: ${resp.status}`);
        }

        const json = await resp.json();
        if (!json.success) {
          throw new Error(json.message || 'Failed to fetch analyses');
        }

        // Map backend analyses to historyData items for the table
        const mapped = (json.analyses || []).map((a) => ({
          id: a._id || a.id || Math.random().toString(36).slice(2, 9),
          dateTime: a.date ? new Date(a.date).toLocaleString() : (a.dateTime || ''),
          text: a.original_text || a.text || '',
          category: a.category || a.type || '',
          score: a.sentiment_score || '',
          raw: a // keep original analysis object for full detail
        }));

        setHistoryData(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching analyses');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const handleDeleteClick = (e, analysis) => {
    e.stopPropagation();
    setAnalysisToDelete(analysis);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!analysisToDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/user/analysis/${analysisToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete analysis: ${response.status}`);
      }

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.message || 'Failed to delete analysis');
      }

      // Update local state
      const updated = historyData.filter((item) => item.id !== analysisToDelete.id);
      setHistoryData(updated);
      
      // Update pagination if needed
      if ((currentPage - 1) * itemsPerPage >= updated.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      // Reset delete modal state
      setShowDeleteModal(false);
      setAnalysisToDelete(null);
    } catch (err) {
      console.error('Error deleting analysis:', err);
      // You might want to show an error message to the user here
      setError(err.message || 'Error deleting analysis');
    }
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
                        <th>Submitted Text</th>
                        <th>Category</th>
                        <th>Sentiment Score</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item) => (
                        <tr key={item.id} onClick={() => { setSelectedAnalysis(item.raw); setShowModal(true); }} style={{ cursor: 'pointer' }}>
                          <td>{item.id}</td>
                          <td>{item.dateTime}</td>
                          <td>{item.text}</td>
                          <td>{item.category}</td>
                          <td>{item.score}</td>
                          <td>
                            <button className="delete-btn" onClick={(e) => handleDeleteClick(e, item)}>
                              <img src={deleteIcon} alt="Delete" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="pagination">
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
      <AnalysisModal show={showModal} onClose={() => { setShowModal(false); setSelectedAnalysis(null); }} analysis={selectedAnalysis} />

      {/* Popup Modal */}
      <PopupModal show={showPopup} onClose={() => setShowPopup(false)}>
        <div className="popup-content">
          <h2>Analyzing...</h2>
          <p>Your input is being processed.</p>
        </div>
      </PopupModal>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAnalysisToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default History;