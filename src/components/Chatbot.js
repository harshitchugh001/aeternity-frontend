import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = ({ closeChatbot }) => {
    const [botMessages, setBotMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [publicKey, setPublicKey] = useState(null);
    const [amount, setAmount] = useState('');
    const [confirmSend, setConfirmSend] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.userId : null;
    const username = user ? user.name : null;
    const userPublicKey = user ? user.publicKey : null;

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = () => {
        setBotMessages([...botMessages, { id: userId, text: userInput }]);
        setUserInput('');

        if (transactionType === 'send' && userInput !== '') {
            setPublicKey(userInput);
            setBotMessages([
                ...botMessages,
                { id: 'bot', text: 'Enter the amount to send:' },
            ]);
        } else if (transactionType === 'send' && amount !== '') {
            setConfirmSend(true);
        }
    };

    const handleYes = () => {
        // Perform API call or any other action upon confirmation
        console.log('API call to send money');
        setBotMessages([
            ...botMessages,
            { id: 'bot', text: `Successfully sent ${amount} to recipient!` },
        ]);
        setConfirmSend(false);
    };

    const handleNo = () => {
        setBotMessages([
            ...botMessages,
            { id: 'bot', text: 'Transaction cancelled.' },
        ]);
        setConfirmSend(false);
    };

    const handleOptionSelection = (type) => {
        setTransactionType(type);

        if (type === 'send') {
            setBotMessages([
                ...botMessages,
                { id: 'bot', text: `Please enter the recipient's public key:` },
            ]);
        } else if (type === 'receive') {
            setBotMessages([
                ...botMessages,
                { id: 'bot', text: `This is your public key: ${userPublicKey}` },
            ]);
        }
    };

    const startChatAgain = () => {
        setBotMessages([]);
        setTransactionType('');
        setPublicKey(null);
        setAmount('');
        setConfirmSend(false);
    };

    return (
        <div className='fixed bottom-4 right-4 w-80 h-96 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden chatbot'>
            
            <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100'>
                <h2 className='text-lg font-bold'>Chatbot</h2>
                <button onClick={closeChatbot} className='focus:outline-none'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-gray-600'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path
                            fillRule='evenodd'
                            d='M13.414 12l3.293 3.293a1 1 0 01-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12 7.293 8.707a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 111.414 1.414L13.414 12z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
            </div>

            
            <div className='overflow-y-auto p-4 h-64 chatbot-messages'>
                
                {username && (
                    <div className='message bg-gray-200 p-2 rounded-md mb-2'>
                        Hello {username}, how can I help you today?
                    </div>
                )}
                {botMessages.map((message, index) => (
                    <div key={index} className='message bg-gray-200 p-2 rounded-md mb-2'>
                        {message.text}
                    </div>
                ))}
            </div>

            <div className='p-4 border-t border-gray-300 bg-gray-100'>
                
                {!transactionType && (
                    <div className='flex gap-2'>
                        <button
                            className='px-4 py-2 bg-blue-500 text-white rounded-md'
                            onClick={() => handleOptionSelection('send')}
                        >
                            Send Money
                        </button>
                        <button
                            className='px-4 py-2 bg-blue-500 text-white rounded-md'
                            onClick={() => handleOptionSelection('receive')}
                        >
                            Receive Money
                        </button>
                    </div>
                )}

                
                {transactionType === 'send' && !publicKey && (
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            placeholder="Recipient's Public Key"
                            className='flex-1 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500'
                            value={userInput}
                            onChange={handleInputChange}
                        />
                        <button
                            onClick={handleSend}
                            className='px-4 py-2 bg-blue-500 text-white rounded-md'
                        >
                            Next
                        </button>
                    </div>
                )}

                {transactionType === 'send' && publicKey && (
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            placeholder='Enter Amount'
                            className='flex-1 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <button
                            onClick={handleSend}
                            className='px-4 py-2 bg-blue-500 text-white rounded-md'
                        >
                            Send
                        </button>
                    </div>
                )}

                
                {confirmSend && (
                    <div className='flex gap-2'>
                        <button
                            onClick={handleYes}
                            className='px-4 py-2 bg-green-500 text-white rounded-md'
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleNo}
                            className='px-4 py-2 bg-red-500 text-white rounded-md'
                        >
                            No
                        </button>
                    </div>
                )}

                
                <div className='flex justify-center mt-4'>
                    <button
                        onClick={startChatAgain}
                        className='px-4 py-2 bg-green-500 text-white rounded-md'
                        style={{ display: transactionType ? 'block' : 'none' }}
                    >
                        Start Chat Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
