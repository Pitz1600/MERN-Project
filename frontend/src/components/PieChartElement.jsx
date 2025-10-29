import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "../styles/Dashboard.css"; // or your PieChartElement.css if separated

const COLORS = ["#FF7F7F", "#00FF00", "#FFFF00"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartElement({ data = [] }) {
  // ✅ show fallback if no data passed
  if (!data.length) {
    return <p style={{ color: "white" }}>No data available</p>;
  }

  return (
    <div className="usage-pie">
      <ResponsiveContainer width={250} height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="pie-labels">
        {data.map((entry, index) => (
          <div key={index}>
            <span
              className="color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
}
