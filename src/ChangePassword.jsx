import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('https://new-task-server-rosy.vercel.app/api/user/change-password', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(res.data.message);
      setFormData({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Change Password</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Old Password</label>
          <input
            name="oldPassword"
            type="password"
            className="form-control"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            name="newPassword"
            type="password"
            className="form-control"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-warning w-100" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;