import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Report = () => {
  const { duration } = useParams();
  const [reportData, setReportData] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.user);
  const token = isAuthenticated?.token;
  console.log(duration);
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
    <div>
      <h2>{duration} Report</h2>
      <ul>
        {reportData.map((item, index) => (
          <li key={index}>{`${index + 1}: ${item.name} -- ${
            item.quantity
          }Pkt -- ${item.amount}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
