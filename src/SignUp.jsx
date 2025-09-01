import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

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
      const res = await axios.post('https://smith-server-qpxw.vercel.app/api/auth/signup', formData);
      setMessage(res.data.message || 'Signup successful!');
       if (res.data.success) {
        // ✅ Redirect after short delay or immediately
        navigate("/");
      }
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  console.log(message,"messaggeeeeeeeeeeeeeeeee");
  
  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Sign Up</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            name="username"
            type="text"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <button className="btn btn-primary w-100" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;