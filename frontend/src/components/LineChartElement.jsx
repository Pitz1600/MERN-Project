import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

/**
 * LineChartElement
 * @param {Array} data - Array of objects like:
 * [
 *   { date: "2025-10-01", biased: 5, neutral: 3, reviewable: 2 },
 *   { date: "2025-10-02", biased: 2, neutral: 6, reviewable: 1 },
 * ]
 */
const LineChartElement = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center" }}>No data to display</p>;
  }

  // Format X labels (dates)
  const formattedData = data.map((d) => ({
    dateLabel: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    biased: d.biased || 0,
    neutral: d.neutral || 0,
    reviewable: d.reviewable || 0,
  }));

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "650px",
        margin: "0 auto",
        background: "#E0F7FA",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Trend Over Time
      </h3>

      <LineChart
        dataset={formattedData}
        xAxis={[
          {
            dataKey: "dateLabel",
            scaleType: "band",
            label: "Date",
          },
        ]}
        series={[
          {
            dataKey: "biased",
            label: "Biased",
            color: "#FF7F7F",
          },
          {
            dataKey: "neutral",
            label: "Neutral",
            color: "#00C853",
          },
          {
            dataKey: "reviewable",
            label: "Reviewable",
            color: "#FFD600",
          },
        ]}
        height={300}
        margin={{ left: 70, right: 30, top: 30, bottom: 50 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
};

export default LineChartElement;