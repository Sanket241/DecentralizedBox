import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractConfig from '../abi/DecentralizedBoxAbi';
import { Card } from 'flowbite-react';

const Viewer = () => {
  const [hashes, setHashes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHashes = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractConfig.addr, contractConfig.abi, provider);

        const allHashes = await contract.getAllHashes();
        setHashes(allHashes);
      } catch (error) {
        console.error('Error fetching hashes from blockchain:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHashes();
  }, []);

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>View Uploaded Images</h1>
      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {hashes.map((hash, index) => (
            <Card key={index}>
              <img
                src={`https://gateway.pinata.cloud/ipfs/${hash}`}
                alt={`IPFS Hash: ${hash}`}
                className='w-full h-48 object-cover'
              />
              <p className='text-center break-words'>{hash}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Viewer;
