import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      // Simpan token di localStorage
      localStorage.setItem('token', response.data.token);
      // Navigasi ke halaman home
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login gagal. Periksa username dan password Anda.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pastel-gray">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">Login</h2>
        {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
