import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const ViewImage = () => {
  const [ipfsHash, setIpfsHash] = useState('');

  useEffect(() => {
    const fetchHashFromBlockchain = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "<DEPLOYED_CONTRACT_ADDRESS>";
      const abi = [
        "function getHash() public view returns (string memory)",
      ];
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const hash = await contract.getHash();
      setIpfsHash(hash);
    };

    fetchHashFromBlockchain();
  }, []);

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>View Image</h1>
      {ipfsHash ? (
        <img src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} alt="Uploaded to IPFS" />
      ) : (
        <p>No image uploaded yet.</p>
      )}
    </div>
  );
}

export default ViewImage;
