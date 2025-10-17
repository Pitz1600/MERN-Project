import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PopupModal from "../components/Popupmodal";
import StartAnalyzingButton from "../components/StartAnalyzingButton";
import SearchBar from "../components/SearchBar";
import deleteIcon from "../assets/icon_delete.png"; // Import the delete icon

const History = () => {
  const navigate = useNavigate();
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

  const handleSearchChange = (e) => setSearchValue(e.target.value);
  const handleSearchClick = () => {
    console.log("Searching for:", searchValue, "by", searchBy);
  };
  const handleSearchByChange = (e) => setSearchBy(e.target.value);
  const handleEmptyClick = () => setHistoryData([]);
  const handleWithDataClick = () => {
    setCurrentPage(1); // Reset to first page
    setHistoryData([
      {
        id: "123456",
        dateTime: "Oct 1, 2025 | 12:55am",
        text: "Sample prompt 1",
        result: "BIAS",
        accuracy: "51%",
      },
      {
        id: "654321",
        dateTime: "Oct 1, 2025 | 01:23am",
        text: "Sample prompt 2",
        result: "NEUTRAL",
        accuracy: "87%",
      },
      {
        id: "123333",
        dateTime: "Oct 1, 2025 | 02:06pm",
        text: "Sample prompt 3",
        result: "UNCLEAR",
        accuracy: "90%",
      },
      {
        id: "999999",
        dateTime: "Oct 1, 2025 | 03:12pm",
        text: "Extra prompt 4",
        result: "BIAS",
        accuracy: "74%",
      },
      {
        id: "888888",
        dateTime: "Oct 1, 2025 | 03:25pm",
        text: "Extra prompt 5",
        result: "NEUTRAL",
        accuracy: "82%",
      },
      {
        id: "777777",
        dateTime: "Oct 1, 2025 | 04:01pm",
        text: "Extra prompt 6",
        result: "UNCLEAR",
        accuracy: "66%",
      },
    ]);
  };

  const handleDelete = (id) => {
    const updated = historyData.filter((item) => item.id !== id);
    setHistoryData(updated);
    if ((currentPage - 1) * itemsPerPage >= updated.length && currentPage > 1) {
      setCurrentPage(currentPage - 1); // Move back a page if last item on last page is deleted
    }
  };

  return (
    <div className="min-w-screen min-h-screen w-full bg-[#001F3F] flex flex-col overflow-x-hidden">
      <Navbar />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 flex flex-col gap-4 w-full">
        {/* Top Buttons */}
        <div className="flex justify-center sm:justify-end flex-wrap gap-2 w-full mt-2 px-2">
          <button
            className="min-w-[100px] h-[36px] bg-[#69D84F] rounded-[20px] text-black text-sm font-semibold shadow hover:bg-green-700 transition"
            onClick={handleEmptyClick}
          >
            Empty
          </button>
          <button
            className="min-w-[100px] h-[36px] bg-[#69D84F] rounded-[20px] text-black text-sm font-semibold shadow hover:bg-green-700 transition"
            onClick={handleWithDataClick}
          >
            With data
          </button>
        </div>

        {/* Main Container */}
        <div className="mx-auto bg-[#00B4D8] rounded-[20px] shadow-lg p-6 sm:p-8 md:p-10 w-full flex flex-col gap-6 min-w-6xl min-h-200">
          
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow">
            <SearchBar
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              onSearchClick={handleSearchClick}
              searchBy={searchBy}
              onSearchByChange={handleSearchByChange}
            />
          </div>

          {/* Data / Empty State */}
          <div className="bg-white p-6 flex flex-col gap-6 shadow-md w-full rounded-lg">
            {historyData.length === 0 ? (
              <div className="border border-gray-200 rounded-lg h-[300px] flex flex-col items-center justify-center">
                <p className="text-gray-700 text-base mb-4">History is empty.</p>
                <StartAnalyzingButton onClick={() => navigate("/analyzer")} />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 border-r border-gray-300">ID</th>
                        <th className="px-4 py-2 border-r border-gray-300">Date / Time</th>
                        <th className="px-4 py-2 border-r border-gray-300">Submitted Text</th>
                        <th className="px-4 py-2 border-r border-gray-300">Result</th>
                        <th className="px-4 py-2 border-r border-gray-300">Accuracy</th>
                        <th className="px-4 py-2 pl-6 text-red-600">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item) => (
                        <tr key={item.id} className="text-center hover:bg-gray-50 transition">
                          <td className="px-4 py-2 border-r border-gray-200">{item.id}</td>
                          <td className="px-4 py-2 border-r border-gray-200">{item.dateTime}</td>
                          <td className="px-4 py-2 border-r border-gray-200">{item.text}</td>
                          <td className="px-4 py-2 border-r border-gray-200">{item.result}</td>
                          <td className="px-4 py-2 border-r border-gray-200">{item.accuracy}</td>
                          <td className="px-4 py-2 pl-6 border-l border-gray-200">
                            <button onClick={() => handleDelete(item.id)}>
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                className="w-5 h-5 hover:scale-110 transition-transform"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6">
                  <div className="inline-flex items-center space-x-2 text-sm">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, idx) => {
                      const page = idx + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === page
                              ? "bg-blue-600 text-white font-bold"
                              : "bg-gray-100 hover:bg-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
