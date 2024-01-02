import React, { useState } from 'react';
import walletImage from '../assets/login.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Wallet() {
  
  const [spends, setSpends] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;
  const [transactionHashes, setTransactionHashes] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target.result;
      processData(result);
    };

    reader.readAsText(file);
  };

  const processData = (data) => {
    const rows = data.split('\n');
    const transactions = [];

    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(',');
      if (columns.length === 2) {
        const publicKey = columns[0]?.trim();
        const amount = columns[1]?.trim();

        transactions.push({ publicKey, amount });
      } else {
        console.error(`Incorrectly formatted line at index ${i}: ${rows[i]}`);
      }
    }
    console.log('Transactions from file:', transactions);
    setSpends(transactions);
    console.log(spends);

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/batchsend', {
        userId,
        spends,
      });
      console.log(response.data.transactions);
      const hashes = response.data.transactions.map(transaction => transaction.hash);
      setTransactionHashes(hashes);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };


  return (
    <div className='flex h-screen'>
      
      <div className='hidden sm:block sm:w-1/2'>
        <img className='w-full h-full object-cover' src={walletImage} alt='Wallet' />
      </div>

      
      <div className='w-full sm:w-1/2 bg-gray-800 flex justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'
        >
          <h1 className='text-4xl dark:text-white font-bold text-center'>Batch Transaction</h1>
          <h2 className='text-4xl dark:text-white font-bold text-center'>WALLET</h2>
          <div className='flex justify-between center text-gray-400 py-2'>
          <a
            href={require('../assets/sample.csv').default}
            download='sample.csv'
            className='py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-teal-500/40'
          >
            Download Sample CSV
          </a>
        </div>

          
          <div className='flex justify-between center text-gray-400 py-2'>
            <input type='file' onChange={handleFileChange} accept='.csv' />
          </div>
          
          <div className='flex justify-between center text-gray-400 py-2'>
            <Link to='/wallet'>Single Transaction</Link>
          </div>
          <button
            type='submit'
            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
          >
            SEND
          </button>
          {transactionHashes.length > 0 && (
          <div>
            <h1 className='text-3xl dark:text-white font-bold text-center'>Transaction IDs</h1>
            <ul className='text-white'>
              {transactionHashes.map((hash, index) => (
                <li key={index}> {hash}</li>
              ))}
            </ul>
          </div>
        )}
        </form>


      </div>
    </div>
  );
}
