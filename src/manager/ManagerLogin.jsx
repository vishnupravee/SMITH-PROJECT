import React, { useState } from 'react';
import axios from 'axios';

const ManagerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:3000/api/auth/manager-login', formData);
      const { token, user } = res.data;

      if (user.role !== 'admin') {
        setMessage('Access denied. You are not an admin.');
        return;
      }

      if (user.status === 'blocked') {
        setMessage('Your account is blocked.');
        return;
      }

      // Save token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to admin panel
      window.location.href = '/manager';

    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Manager Login</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-dark w-100" type="submit">
          Login as Manager
        </button>
      </form>
    </div>
  );
};

export default ManagerLogin;