import React, { useState } from 'react';
import { ethers, isAddress } from 'ethers';
import { Button, TextInput, Alert } from 'flowbite-react';
import contractDetails from '../abi/DecentralizedBoxAbi';

const Access = () => {
  const { abi, addr: contractAddress } = contractDetails;
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGiveAccess = async () => {
    ethers.is
    if (!ethers.isAddress(address)) {
        console.log(isAddress)
      setMessage('Please enter a valid Ethereum address.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // We use ethers.js to interact with the smart contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Call the addSubOwner function from the contract
      const transaction = await contract.addSubOwner(address);
      await transaction.wait();

      setMessage('Access granted successfully!');
      setAddress('');
    } catch (error) {
      console.error('Error giving access:', error);
      setMessage('Failed to grant access. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Grant Access</h2>
        <TextInput
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleGiveAccess}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Give Access'}
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
