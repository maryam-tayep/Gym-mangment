import React from 'react'
import { useState,useEffect } from 'react'
import { BarChart,Bar,XAxis,YAxis ,Tooltip,ResponsiveContainer } from 'recharts'
import api from '../../api/axios'
export default function SessionsChart() {
    const [data,setData]=useState([]);
    useEffect(()=>{
      api.get("/dashboard/sessions-per-week").then((res)=>{
        setData(res.data);
      });
    },[])
  return (
    <div className="card p-3">
      <h5>sessions Performance</h5>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="members" fill="#0a46a1ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
