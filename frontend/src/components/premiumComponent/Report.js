import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Report = () => {
  const { duration } = useParams();
  const [reportData, setReportData] = useState([]);
  const token = useSelector((state) => state.auth.isToken);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/premium/${duration}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      // Check if the status is in the 2xx range
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setReportData(data);
      } else {
        throw new Error("Failed to fetch report data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [duration, token]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{duration} Report</h2>
      <ul className="divide-y divide-gray-200">
        {reportData.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-4"
          >
            <span className="text-lg">{index + 1}.</span>
            <span className="text-lg">{item.name}</span>
            <span className="text-lg">{item.quantity}Pkt</span>
            <span className="text-lg">{item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
