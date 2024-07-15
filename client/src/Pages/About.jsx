import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const About = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignUpClick = () => {
    if (currentUser) {
      navigate('/');
    } else{
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">About DecentralizedBox</h1>
      <section className="max-w-4xl text-center mb-6">
        <p className="text-lg leading-relaxed mb-4">
          Decentralized Box is an innovative platform that leverages the power of IPFS (InterPlanetary File System) to allow users to securely upload and share images. Valid users can upload their pictures to IPFS, ensuring decentralized and distributed storage. Other users can view these pictures and contribute by writing about them, sharing their thoughts and insights.
        </p>
        <p className="text-lg leading-relaxed">
          Our mission is to create a collaborative and secure environment for sharing and discussing visual content, harnessing the benefits of blockchain technology to provide a truly decentralized experience.
        </p>
      </section>

      <section className="max-w-4xl text-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Secure and decentralized image storage using IPFS</li>
          <li>Easy-to-use interface for uploading and viewing images</li>
          <li>Collaborative platform for users to write about images</li>
          <li>Decentralized and tamper-proof content management</li>
        </ul>
      </section>

      <section className="max-w-4xl text-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Enhanced security and privacy for uploaded images</li>
          <li>Decentralized storage ensures content availability and integrity</li>
          <li>Encourages community engagement and collaboration</li>
          <li>Supports the principles of decentralization and blockchain technology</li>
        </ul>
      </section>

      <section className="max-w-4xl text-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-lg leading-relaxed mb-4">
          The Decentralized Box platform utilizes IPFS to store images in a distributed manner. When a valid user uploads an image, it is added to the IPFS network, where it is securely stored and indexed. Each image is assigned a unique content identifier (CID) that can be used to retrieve it from the network.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Other users can view these images by navigating through the platform. They can also write and share their thoughts about the images, contributing to a rich and interactive experience. The decentralized nature of the platform ensures that all content is secure, tamper-proof, and accessible.
        </p>
      </section>

      <section className="max-w-4xl text-center">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-lg leading-relaxed mb-4">
          To start using Decentralized Box, simply sign up and verify your account. Once verified, you can begin uploading images and engaging with the community by writing about the images shared by others. Join us in creating a secure, decentralized platform for visual content sharing and collaboration.
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSignUpClick} >
          {
            currentUser ? 'Home' : 'Sign Up Now'
          }

        </button>
      </section>
    </div>
  );
};

export default About;
