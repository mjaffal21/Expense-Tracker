import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartDashboard = ({ budgetList }) => {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart data={budgetList} margin={{ top: 7 }}>
          <XAxis dataKey="Name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpent" stackId="a" fill="#4845d2" />
          <Bar dataKey="Amount" stackId="b" fill="#c3c2ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
