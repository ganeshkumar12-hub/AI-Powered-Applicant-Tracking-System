import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function ApplicationsBarChart({ stats }) {
  const data = [
    {
      name: "Applied",
      value:
        stats.applications -
        stats.shortlisted -
        stats.selected -
        stats.rejected,
      color: "#2563EB",
    },
    {
      name: "Shortlisted",
      value: stats.shortlisted,
      color: "#7C3AED",
    },
    {
      name: "Selected",
      value: stats.selected,
      color: "#16A34A",
    },
    {
      name: "Rejected",
      value: stats.rejected,
      color: "#DC2626",
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.color}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ApplicationsBarChart;