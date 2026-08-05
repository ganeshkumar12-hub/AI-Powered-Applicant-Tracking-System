import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#DC2626",
];

function ApplicationsPieChart({ stats }) {
  const data = [
    {
      name: "Shortlisted",
      value: stats.shortlisted,
    },
    {
      name: "Selected",
      value: stats.selected,
    },
    {
      name: "Rejected",
      value: stats.rejected,
    },
    {
      name: "Others",
      value:
        stats.applications -
        stats.shortlisted -
        stats.selected -
        stats.rejected,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ApplicationsPieChart;