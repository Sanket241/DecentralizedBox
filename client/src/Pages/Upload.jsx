import React, { useState } from 'react';
import axios from 'axios';
import { TextInput, FileInput, Button } from 'flowbite-react';
import { ethers } from 'ethers'
import contractConfig from '../abi/DecentralizedBoxAbi';

const Upload = () => {

  const [user, setUser] = useState({
    description: "",
    file: null
  });
  const clickfunc =async()=>{
    console.log("hii")
    const provider = new ethers.BrowserProvider(window.ethereum);

    const contract = new ethers.Contract(contractConfig.addr, contractConfig.abi, provider);
    const d = await contract.getAllHashes();
    console.log(d);
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setUser({ ...user, file: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', user.file);
    formData.append('description', user.description);

    try {
      const response = await axios({
        method: 'post',
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        }
      });

      const fileUrl = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
      console.log(fileUrl);

      // Store IPFS hash on blockchain
      await storeHashOnBlockchain(response.data.IpfsHash);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const storeHashOnBlockchain = async (ipfsHash) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractConfig.addr, contractConfig.abi, signer);
    await contract.uploadHash(ipfsHash);
  };

  return (
    <>
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Description'
              value={user.description}
              name="description"
              required
              id='description'
              className='flex-1'
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 p-3'>
            <FileInput
              type='file'
              accept='image/*'
              name="file"
              onChange={handleChange}
            />
          </div>
          <Button type='submit'>Publish</Button>
          <Button type='submit' onClick={clickfunc}>get</Button>
        </form>
      </div>
    </>
  );
}

export default Upload;
