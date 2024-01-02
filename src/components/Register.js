import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/signup`, {
        userName: formData.username,
        userEmail: formData.email,
        userPassword: formData.password,
      });

      console.log('SIGNUP SUCCESS', response);
      setFormData({
        ...formData,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('SIGNUP ERROR', error.response.data);
      setFormData({
        ...formData,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      
      // setUser({ ...user, buttonText: 'Submit' });

      toast.error(error.response.data.error || 'Registration failed');
      // Handle registration failure (show error message, etc.)
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt='' />
      </div>

      <div className='bg-gray-800 flex flex-col justify-center'>
        <form
          onSubmit={handleSubmit}
          className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'
        >
          <h2 className='text-4xl dark:text-white font-bold text-center'>REGISTER</h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Username</label>
            <input
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='text'
              name='username'
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Email</label>
            <input
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input
              className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Confirm Password</label>
            <input
              className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='flex justify-between text-gray-400 py-2'>
            <Link to='/login'>Already have an account? Login here</Link>
          </div>
          <button
            type='submit'
            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
