import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handlechange = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Welcome to Decentralized Box</h2>
          <p className="text-base sm:text-lg mb-8">
            Store and share your files securely with the power of decentralization. Enjoy the benefits of privacy and ownership.
          </p>
        </section>

        {/* Image Section with Caption */}
        <section className="flex justify-center mb-12">
          <div className="relative max-w-full sm:max-w-lg">
            <img
              src="https://massive.io/wp-content/uploads/2022/09/Decentralized-storage-featured-image.jpg"
              alt="Decentralized Storage"
              className="w-full h-auto rounded-lg shadow-md"
            />
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
            <p className="text-sm sm:text-base mb-4">
              Using IPFS technology, your files are stored across a decentralized network, ensuring security and redundancy.
            </p>
            <img
              src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/04/defi.jpeg"
              alt="Secure Storage"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Easy to Use</h2>
            <p className="text-sm sm:text-base mb-4">
              Our platform provides an intuitive interface, making it easy to upload, store, and share your files.
            </p>
            <img
              src="https://media.istockphoto.com/id/1313523467/photo/global-blockchain-background.jpg?s=612x612&w=0&k=20&c=kG16j3GEy2YHk6uObl5jFKuX_Rky4z14UhplqPddkyI="
              alt="Easy to Use"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Access Anywhere</h2>
            <p className="text-sm sm:text-base mb-4">
              Access your files from anywhere in the world, anytime. All you need is an internet connection.
            </p>
            <img
              src="https://media.licdn.com/dms/image/C4E12AQFgCm6Up_k4Jw/article-cover_image-shrink_600_2000/0/1539702304945?e=2147483647&v=beta&t=dw5iW90ph9r5hQ2OjGeo66uBua9fHe4idwE9cADfX_8"
              alt="Access Anywhere"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white py-12 mb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
              Why Choose Decentralized Box?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start">
                <svg
                  className="w-10 h-10 text-blue-600 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-8zM12 11V9c0-1.105.895-2 2-2h5c1.105 0 2 .895 2 2v2M12 11v4c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-4M12 5h0M21 3h0M3 5h0M3 3h0"
                  ></path>
                </svg>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Enhanced Security</h3>
                  <p className="text-sm sm:text-base">
                    Decentralized storage ensures your data is secure, reducing the risk of single-point failures and breaches.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-10 h-10 text-blue-600 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-8zM12 11V9c0-1.105.895-2 2-2h5c1.105 0 2 .895 2 2v2M12 11v4c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-4M12 5h0M21 3h0M3 5h0M3 3h0"
                  ></path>
                </svg>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Privacy Protection</h3>
                  <p className="text-sm sm:text-base">
                    Your data remains private and under your control, with no central authority having access to your files.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-10 h-10 text-blue-600 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-8zM12 11V9c0-1.105.895-2 2-2h5c1.105 0 2 .895 2 2v2M12 11v4c0 1.105.895 2 2 2h5c1.105 0 2-.895 2-2v-4M12 5h0M21 3h0M3 5h0M3 3h0"
                  ></path>
                </svg>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Reliable Access</h3>
                  <p className="text-sm sm:text-base">
                    With a decentralized network, your data is always available, with redundancy built into the system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <button
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handlechange}
          >
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
