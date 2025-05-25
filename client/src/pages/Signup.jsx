import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const formStyle = {
  maxWidth: 400,
  margin: '2rem auto',
  fontFamily: 'Arial, sans-serif',
  fontSize: 16,
  color: '#333',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '1rem',
  fontSize: '1rem',
  borderRadius: 4,
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  fontSize: '1rem',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  marginBottom: '1rem',
  fontWeight: 'bold',
};

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      return setError('Passwords do not match');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/tasks');
      } else {
        setError('No token received from server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Sign Up</h2>
      <form onSubmit={handleSignup}>
        {error && <p style={errorStyle}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
          disabled={loading}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
          disabled={loading}
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={inputStyle}
          disabled={loading}
          autoComplete="new-password"
        />
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
