import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, TextInput, Alert } from 'flowbite-react';
import contractDetails from '../abi/DecentralizedBoxAbi';

const Access = () => {
  const { abi, addr: contractAddress } = contractDetails;
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAccess = async (action) => {
    if (!ethers.isAddress(address)) {
      setMessage('Please enter a valid Ethereum address.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const transaction = action === 'grant'
        ? await contract.addSubOwner(address)
        : await contract.removeSubOwner(address);
      await transaction.wait();

      setMessage(`Access ${action === 'grant' ? 'granted' : 'removed'} successfully!`);
      setAddress('');
    } catch (error) {
      console.error(`Error ${action}ing access:`, error);
      setMessage(`Failed to ${action} access. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Manage Access</h2>
        <TextInput
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={() => handleAccess('grant')}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out mb-2"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Give Access'}
        </Button>
        <Button
          onClick={() => handleAccess('remove')}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Remove Access'}
        </Button>
        {message && (
          <Alert className="mt-4" color={message.includes('successfully') ? 'success' : 'failure'}>
            {message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Access;
