import React, { useState } from 'react';
import walletImage from '../assets/login.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chatbot from './chatbotsample';
import './chatbotbutton.css';
import { signout } from './helper';
// import loginImg from '../assets/login.jpg';

export default function Wallet() {
  const [transactionData, setTransactionData] = useState({
    receiverPublicKey: '',
    amount: '',
  });
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  

  const handleInputChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/singlesend`, {
        userId,
        receiverpublicKey: transactionData.receiverPublicKey,
        amount: transactionData.amount
      });
      console.log(response);
      alert(`transaction successful ${response.data.message}`)
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };
  const handleLogout = () => {
    signout(() => {
      window.location.href = '/';
    });
  };

  return (
    <div className='flex h-screen'>


      <div className='hidden sm:block sm:w-1/2'>
        <img className='w-full h-full object-cover' src={walletImage} alt='Wallet' />
      </div>


      <div className='w-full sm:w-1/2 bg-gray-800 flex justify-center items-center'>
        <button
          onClick={handleLogout}
          className='logout-btn absolute top-4 right-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg shadow-lg text-white font-semibold transition duration-300 ease-in-out'
        >
          Logout
        </button>


        <form
          onSubmit={handleSubmit}
          className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'
        >
          <h1 className='text-4xl dark:text-white font-bold text-center'>Single Transaction</h1>
          <h2 className='text-4xl dark:text-white font-bold text-center'>WALLET</h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Receiver's Public Key</label>
            <input
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='text'
              name='receiverPublicKey'
              value={transactionData.receiverPublicKey}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Amount</label>
            <input
              className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='text'
              name='amount'
              value={transactionData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='flex justify-between center text-gray-400 py-2'>
            <Link to='/batch'>Batch Transaction</Link>
          </div>
          <button
            type='button'
            onClick={toggleChatbot}
            className='chatbot-btn'
          >
            Chatbot
          </button>
          <button
            type='submit'
            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
          >
            SEND
          </button>
        </form>
        {showChatbot && <Chatbot closeChatbot={closeChatbot} />}
      </div>
    </div>
  );
}
