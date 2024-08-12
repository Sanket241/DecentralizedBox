import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/userSlice/Slice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/auth/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src="/logo.png" width="25px" alt="Logo" className="mr-2" />
                    <h1 className="font-bold text-xl">Decentralized<span className='text-blue-600'>Box</span> </h1>
                </Link>

                <button 
                    onClick={toggleMobileMenu} 
                    className="sm:hidden text-slate-700 focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>

                <nav
                    className={`${
                        isMobileMenuOpen ? "block" : "hidden"
                    } sm:flex sm:items-center w-full sm:w-auto`}
                >
                    <ul className="sm:flex sm:gap-4">
                        <li>
                            <Link
                                to="/"
                                className="block text-slate-700 hover:text-slate-900 p-2 sm:inline sm:p-0"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="block text-slate-700 hover:text-slate-900 p-2 sm:inline sm:p-0"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                        </li>
                        {currentUser ? (
                            <>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="block text-slate-700 hover:text-slate-900 p-2 sm:inline sm:p-0"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {currentUser.rest.isAdmin ? "Upload" : "Viewer"}
                                    </Link>
                                </li>
                                {currentUser.rest.isAdmin && (
                                    <li>
                                        <Link
                                            to="/access"
                                            className="block text-slate-700 hover:text-slate-900 p-2 sm:inline sm:p-0"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Give Access
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={() => {
                                            handleSignout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block text-slate-700 hover:text-slate-900 p-2 sm:inline sm:p-0"
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    to="/signin"
                                    className="block text-slate-700 hover:text-slate-900 p-2 sm:inline sm:p-0"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
