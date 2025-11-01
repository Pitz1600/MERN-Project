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

  // Extract X (dates) and Y (values)
  const xLabels = data.map((d) =>
    new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  const biasedData = data.map((d) => d.biased || 0);
  const neutralData = data.map((d) => d.neutral || 0);
  const reviewableData = data.map((d) => d.reviewable || 0);

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", background: "#90E0EF", padding: "1rem", borderRadius: "8px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Trend Over Time
      </h3>
      <LineChart
        xAxis={[
          {
            data: xLabels,
            scaleType: "band",
            label: "Date",
          },
        ]}
        series={[
          {
            id: "biased",
            label: "Biased",
            data: biasedData,
            color: "#FF7F7F",
          },
          {
            id: "neutral",
            label: "Neutral",
            data: neutralData,
            color: "#00FF00",
          },
          {
            id: "reviewable",
            label: "Reviewable",
            data: reviewableData,
            color: "#FFFF00",
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