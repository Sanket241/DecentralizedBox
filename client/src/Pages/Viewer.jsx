import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractConfig from '../abi/DecentralizedBoxAbi';
import { Card, TextInput, Button } from 'flowbite-react';

const Viewer = () => {
  const [hashes, setHashes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHashes, setFilteredHashes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHashes = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractConfig.addr, contractConfig.abi, provider);

        const allHashes = await contract.getAllHashes();
        setHashes(allHashes);
        setFilteredHashes(allHashes);
      } catch (error) {
        console.error('Error fetching hashes from blockchain:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHashes();
  }, []);

  const handleSearch = () => {
    const filtered = hashes.filter(hash => hash.includes(searchTerm));
    setFilteredHashes(filtered);
    setError(filtered.length === 0); 
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>View Uploaded Images</h1>
      <div className='flex justify-center mb-4'>
        <TextInput
          placeholder='Search by IPFS hash'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setError(false); // Reset error state on new search input
          }}
          className='mr-2'
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : error ? (
        <div className='text-center text-red-500'>No results found for "{searchTerm}"</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {filteredHashes.map((hash, index) => (
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
