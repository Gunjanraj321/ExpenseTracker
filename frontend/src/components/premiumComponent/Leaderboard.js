import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const token = useSelector((state) => state.auth.isToken);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(
        `https://expense-tracker-topaz-five.vercel.app/api/premium/leaderboard`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setLeaderboardData(data);
      } else {
        throw new Error("Failed to fetch leaderboard data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">
        Leaderboard
      </h2>
      <ul className="divide-y divide-gray-200">
        {leaderboardData.slice(0, 5).map((item, index) => (
          <li key={index} className="flex justify-between items-center py-4">
            <span className="text-lg font-semibold">{index + 1}.</span>
            <span className="text-lg font-semibold">{item.name}</span>
            <span className="text-lg font-semibold">{item.total_cost}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
