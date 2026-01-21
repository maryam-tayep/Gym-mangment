import React from 'react'
import {CartesianGrid,Line,LineChart,XAxis,YAxis ,Tooltip,ResponsiveContainer } from 'recharts'
import { useEffect, useState } from "react";
import api from "../../api/axios";
export default function MemberGraph() {
const [data, setData] = useState([]);
useEffect(() => {
  api.get("/dashboard/members-growth").then(res => {
    setData(res.data);
  });
}, []);

  return (
    <div className="card">
      <h5>Members Growth</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="members"
            stroke="#0d6efd"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
