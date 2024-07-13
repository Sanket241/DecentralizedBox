import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap mx-auto p-3'>
                        <img src="/logo.png" width="25px" alt="" />
                        <span>Decentralized</span>
                        <span>Box</span>

                    </h1>
                </Link>
                <ul className='flex gap-4'>
                    <Link to="/">
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>
                    <Link to="/about">
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>
                    <Link to="/signin">
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Sign in</li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header