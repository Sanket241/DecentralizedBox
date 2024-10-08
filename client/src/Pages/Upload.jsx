import React, { useState } from 'react';
import axios from 'axios';
import { TextInput, FileInput, Button } from 'flowbite-react';
import { ethers } from 'ethers';
import contractConfig from '../abi/DecentralizedBoxAbi';

const Upload = () => {
  const [user, setUser] = useState({
    description: "",
    file: null,
    name: "",
    id: ""
  });
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setUser({ ...user, file: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const validateForm = () => {
    const { name, id, description, file } = user;
    if (!name || !id || !description || !file) {
      setUploadStatus('All fields are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (!validateForm()) return;

    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', user.file);
    formData.append('description', user.description);

    try {
      // Upload the file to IPFS
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          }
        }
      );

      const fileUrl = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
      console.log('File URL:', fileUrl);

      // Store IPFS hash on blockchain
      await storeHashOnBlockchain(response.data.IpfsHash, user.name, user.id, user.description);

      setUploadStatus('Upload successful!');
      
      // Clear form after successful upload
      setUser({
        description: "",
        file: null,
        name: "",
        id: ""
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  const storeHashOnBlockchain = async (ipfsHash, name, id, description) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractConfig.addr, contractConfig.abi, signer);

      // Call the uploadHash function
      const tx = await contract.uploadHash(ipfsHash, name, id, description);
      
      // Wait for the transaction to be mined
      await tx.wait();
    } catch (error) {
      console.error('Error storing hash on blockchain:', error);
      setUploadStatus('Failed to store hash on blockchain.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Create a Post</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <TextInput
              type="text"
              placeholder="Name"
              value={user.name}
              name="name"
              required
              id="name"
              className="border-gray-300"
              onChange={handleChange}
            />
            <TextInput
              type="text"
              placeholder="ID"
              value={user.id}
              name="id"
              required
              id="id"
              className="border-gray-300"
              onChange={handleChange}
            />
            <TextInput
              type="text"
              placeholder="Description"
              value={user.description}
              name="description"
              required
              id="description"
              className="border-gray-300"
              onChange={handleChange}
            />
          </div>
          <div className="border-2 border-teal-400 p-3 rounded-lg bg-gray-100">
            <FileInput
              type="file"
              accept="image/*"
              name="file"
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">
            Publish
          </Button>
          {uploadStatus && (
            <p className={`mt-4 text-lg font-semibold text-center ${uploadStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
              {uploadStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
