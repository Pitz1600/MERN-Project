import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

/**
 * PieChartElement
 * @param {Array} data - Array of objects [{ name: string, value: number }]
 */
const PieChartElement = ({ data }) => {
  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center" }}>No data to display</p>;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Add percentage values
  const chartData = data.map((item) => ({
    ...item,
    label: item.name,
    value: item.value,
    percent: total > 0 ? ((item.value / total) * 100).toFixed(1) : 0,
  }));

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", backgroundColor: "#90E0EF", padding: "1rem", borderRadius: "8px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Bias Distribution
      </h3>
    <PieChart
      series={[
        {
          data: chartData,
          arcLabel: (item) => `${item.percent}%`,
          arcLabelMinAngle: 25,
          arcLabelRadius: "60%",
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
          fill: "#000",
        },
      }}
      width={300}
      height={300}
    />
    </div>
  );
};

export default PieChartElement;