import React, { useState } from 'react';
import { TextInput, FileInput, Button } from 'flowbite-react';

const Viewr = () => {

  const [user, setUser] = useState({
    description: "",
    file: null
  });

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
      const response = await fetch('http://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        body: formData,
        headers: {
          pinata_api_key: import.meta.env.pinata_api_key,
          pinata_secret_api_key: import.meta.env.pinata_secret_api_key,
          "Content-Type": "multipart/form-data",
        }
      });

      const responseData = await response.json();
      const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      console.log(fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
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
      </form>
    </div>
  );
};

export default Viewr;
