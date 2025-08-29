import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Ads from './user/Ads';
import Products from './user/Products';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; // Redirect if not logged in
      return;
    }

    axios
      .get('https://smith-server-qpxw.vercel.app/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((err) => {
        localStorage.removeItem('token');
        setError('Session expired or unauthorized');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      });
  }, []);

  return (
    <div className="container mt-5">
     <Ads />
     <Products />
    </div>
  );
};

export default Dashboard;