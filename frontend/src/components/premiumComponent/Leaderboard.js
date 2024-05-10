import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Leaderboard = ({ header }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.user);
  const token = isAuthenticated?.token;

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/premium/leaderboard`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setLeaderboardData(data);
      } else {
        throw new Error('Failed to fetch leaderboard data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboardData.map((item, index) => (
          <li key={index}>{`${index + 1}: ${item.name} -- ${item.total_cost}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
