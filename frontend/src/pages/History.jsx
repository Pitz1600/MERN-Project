import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PopupModal from "../components/Popupmodal";
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
  const [currentPage, setCurrentPage] = useState(1);
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
      { id: "123456", dateTime: "Oct 1, 2025 | 12:55am", text: "Sample prompt 1", result: "BIAS", accuracy: "51%" },
      { id: "654321", dateTime: "Oct 1, 2025 | 01:23am", text: "Sample prompt 2", result: "NEUTRAL", accuracy: "87%" },
      { id: "123333", dateTime: "Oct 1, 2025 | 02:06pm", text: "Sample prompt 3", result: "UNCLEAR", accuracy: "90%" },
      { id: "999999", dateTime: "Oct 1, 2025 | 03:12pm", text: "Extra prompt 4", result: "BIAS", accuracy: "74%" },
      { id: "888888", dateTime: "Oct 1, 2025 | 03:25pm", text: "Extra prompt 5", result: "NEUTRAL", accuracy: "82%" },
      { id: "777777", dateTime: "Oct 1, 2025 | 04:01pm", text: "Extra prompt 6", result: "UNCLEAR", accuracy: "66%" },
    ]);
  };

  const handleDelete = (id) => {
    const updated = historyData.filter((item) => item.id !== id);
    setHistoryData(updated);
    if ((currentPage - 1) * itemsPerPage >= updated.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="history-container">
      <Navbar />

      {/* ✅ Buttons now directly below Navbar */}
      <div className="history-buttons-row">
        <button className="history-top-buttons" onClick={handleEmptyClick}>
          Empty
        </button>
        <button className="history-top-buttons" onClick={handleWithDataClick}>
          With data
        </button>
      </div>

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
                        <th>Result</th>
                        <th>Accuracy</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.dateTime}</td>
                          <td>{item.text}</td>
                          <td>{item.result}</td>
                          <td>{item.accuracy}</td>
                          <td>
                            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
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

      {/* Popup Modal */}
      <PopupModal show={showPopup} onClose={() => setShowPopup(false)}>
        <div className="popup-content">
          <h2>Analyzing...</h2>
          <p>Your input is being processed.</p>
        </div>
      </PopupModal>
    </div>
  );
};

export default History;