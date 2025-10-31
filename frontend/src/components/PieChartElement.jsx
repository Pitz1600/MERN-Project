import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";
import "../styles/Dashboard.css";

const COLORS = ["#4285F4", "#FBBC05", "#EA4335", "#00BCD4", "#34A853"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

export default function PieChartElement({ data = [] }) {
  if (!data.length) {
    return <p style={{ color: "white" }}>No data available</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "12px",
      }}
    >
      <ResponsiveContainer width={400} height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div style={{ color: "black", fontSize: "14px" }}>
        {data.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: COLORS[index % COLORS.length],
                display: "inline-block",
                marginRight: "8px",
              }}
            ></span>
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
}
