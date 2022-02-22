import _ from "lodash";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  console.log(cx, cy, midAngle, percent);
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const One = ({ services }) => {
  const servicesData = [
    { name: "Pending", value: _.size(_.filter(services, (each) => each.status === "Pending")), fill: "##ebb23f" },
    { name: "Confirmed", value: _.size(_.filter(services, (each) => each.status === "Confirmed")) , fill: "#00C49F"},
    { name: "Rejected", value: _.size(_.filter(services, (each) => each.status === "Rejected")), fill: "##ed4618" },
  ];

  return (
    <div style={{backgroundColor: "#1F2833",marginLeft: "80px",height: 300, width: 400}}>
      <h3 className="pb-3 text-white">
        Consultancy status :
      </h3>
    <ResponsiveContainer width="100%" height="100%" >
      <PieChart width={400} height={450}>
        <Pie
          data={servicesData}
          cx="50%"
          cy="34%"
          label={renderCustomizedLabel}
          outerRadius={100}
          nameKey="name"
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => {
            return <Cell key={`cell-${index}`}  />;
          })}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
};

export default One;
