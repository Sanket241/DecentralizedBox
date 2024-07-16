import React from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()
  const {currentUser} = useSelector((state) => state.user);
  const handlechange = () => {
    if(currentUser){
      navigate('/dashboard')
  }
  else{
    navigate('/signup')
  }
}
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        

        <main className="container mx-auto px-4 py-8">
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Decentralized Box</h2>
            <p className="mb-8">
              Store and share your files securely with the power of decentralization. Enjoy the benefits of privacy and ownership.
            </p>
          </section>

          {/* Image Section with Caption */}
          <section className="flex justify-center mb-12">
            <div className="relative">
              <img src='./IPFS.jpg' alt="Decentralized Storage" className="w-full h-auto max-w-lg rounded-lg shadow-md" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                Decentralized Storage with IPFS
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Feature Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Decentralized and Secure</h2>
              <p className="mb-4">
                Using IPFS technology, your files are stored across a decentralized network, ensuring security and redundancy.
              </p>
              <img src='./chain.jpeg' alt="Secure Storage" className="w-full h-auto rounded-lg" />
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Easy to Use</h2>
              <p className="mb-4">
                Our platform provides an intuitive interface, making it easy to upload, store, and share your files.
              </p>
              <img src='./easy_to_use.jpg' alt="Easy to Use" className="w-full h-auto rounded-lg" />
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Access Anywhere</h2>
              <p className="mb-4">
                Access your files from anywhere in the world, anytime. All you need is an internet connection.
              </p>
              <img src='./access_anywhere.jpg' alt="Access Anywhere" className="w-full h-auto rounded-lg" />
            </div>
          </section>

          {/* Benefits Section */}
          <section className="bg-white py-12 mb-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-semibold text-center mb-8">Why Choose Decentralized Box?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start">
                  <svg className="w-10 h-10 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-8zM12 11V9c0-1.105.895-2 2-2h5c1.105 0 2 .895 2 2v2M12 11v4c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-4M12 5h0M21 3h0M3 5h0M3 3h0"></path>
                  </svg>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
                    <p>Decentralized storage ensures your data is secure, reducing the risk of single-point failures and breaches.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-10 h-10 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-8zM12 11V9c0-1.105.895-2 2-2h5c1.105 0 2 .895 2 2v2M12 11v4c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-4M12 5h0M21 3h0M3 5h0M3 3h0"></path>
                  </svg>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Privacy Protection</h3>
                    <p>Your data remains private and under your control, with no central authority having access to your files.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-10 h-10 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-8zM12 11V9c0-1.105.895-2 2-2h5c1.105 0 2 .895 2 2v2M12 11v4c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-4M12 5h0M21 3h0M3 5h0M3 3h0"></path>
                  </svg>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Global Accessibility</h3>
                    <p>Access your data from anywhere in the world, at any time, with the assurance of global network support.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-12 bg-gray-200 mb-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-semibold text-center mb-8">What Our Users Say</h2>
              <div className="flex flex-col md:flex-row justify-center md:space-x-8">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
                  <p className="mb-4">"Decentralized Box has completely changed the way I store my data. The security and ease of use are unparalleled!"</p>
                  <h3 className="text-xl font-semibold">- Alice Johnson</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
                  <p className="mb-4">"I love the privacy and control I have over my files. Decentralized Box is the future of storage."</p>
                  <h3 className="text-xl font-semibold">- Bob Smith</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="mb-4">"Accessing my files from anywhere without worrying about security is a game-changer. Highly recommend!"</p>
                  <h3 className="text-xl font-semibold">- Clara Davis</h3>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Get Started with Decentralized Box Today</h2>
            <p className="mb-8">Join the revolution of decentralized storage. Sign up now and take control of your data.</p>
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700" onClick={handlechange}>
             {
                currentUser ? 'Go to Dashboard' : 'Sign Up Now'
             } 
             
            </button>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
