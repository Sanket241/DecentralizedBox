import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractConfig from '../abi/DecentralizedBoxAbi';
import { Card, TextInput, Button } from 'flowbite-react';

const Viewer = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUploads, setFilteredUploads] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractConfig.addr, contractConfig.abi, provider);

        const allUploads = await contract.getAllUploadInfos();
        setUploads(allUploads);
        setFilteredUploads(allUploads);
      } catch (error) {
        console.error('Error fetching upload information from blockchain:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const handleSearch = () => {
    const filtered = uploads.filter(upload =>
      upload.ipfsHash.includes(searchTerm) ||
      upload.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUploads(filtered);
    setError(filtered.length === 0);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto min-h-screen bg-gray-100'>
      <h1 className='text-center text-3xl md:text-4xl my-8 font-bold text-gray-800'>View Uploaded Images</h1>
      <div className='flex flex-col items-center mb-6'>
        <div className='flex gap-4'>
          <TextInput
            placeholder='Search by IPFS hash, name, ID, or description'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setError(false); // Reset error state on new search input
            }}
            className='w-full md:w-80 shadow-md'
          />
          <Button onClick={handleSearch} className='bg-teal-500 hover:bg-teal-600 text-white'>
            Search
          </Button>
        </div>
      </div>
      {loading ? (
        <div className='text-center text-lg text-gray-600'>Loading...</div>
      ) : error ? (
        <div className='text-center text-lg text-red-500'>No results found for "{searchTerm}"</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {filteredUploads.map((upload, index) => (
            <div key={index} className='relative group'>
              <Card className='bg-white shadow-lg rounded-lg overflow-hidden'>
                <div className='relative group'>
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${upload.ipfsHash}`}
                    alt={`IPFS Hash: ${upload.ipfsHash}`}
                    className='w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <a
                      href={`https://gateway.pinata.cloud/ipfs/${upload.ipfsHash}`}
                      download
                      className='bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-colors duration-300'
                    >
                      Download Image
                    </a>
                  </div>
                </div>
                <div className='p-4'>
                  <div className='mb-4'>
                    <p className='text-lg font-bold text-gray-700'>Name:</p>
                    <p className='text-md text-gray-600'>{upload.name}</p>
                  </div>
                  <div className='mb-4'>
                    <p className='text-lg font-bold text-gray-700'>ID:</p>
                    <p className='text-md text-gray-600'>{upload.id}</p>
                  </div>
                  <div className='mb-4'>
                    <p className='text-lg font-bold text-gray-700'>Date & Time:</p>
                    <p className='text-md text-gray-600'>{upload.timestamp ? new Date(Number(upload.timestamp) * 1000).toLocaleString() : 'N/A'}</p>
                  </div>
                  <div className='mb-4'>
                    <p className='text-lg font-bold text-gray-700'>Description:</p>
                    <p className='text-md text-gray-600'>{upload.description}</p>
                  </div>
                  <div>
                    <p className='text-lg font-bold text-gray-700'>IPFS Hash:</p>
                    <a
                      href={`https://gateway.pinata.cloud/ipfs/${upload.ipfsHash}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-md text-blue-500 break-all hover:underline'
                    >
                      {upload.ipfsHash}
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Viewer;
