import React from 'react'
import { Link } from 'react-router-dom'
import { signoutSuccess } from '../redux/userSlice/Slice'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handlesignout = async () => {
        try {
            const res = await fetch('/api/auth/signout', {
                method: 'POST',
            })
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    }


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
                    {
                        currentUser ? (
                            <>
                                <Link to="/dashboard">
                                    <li className='hidden sm:inline text-slate-700 hover:underline' >Dashboard</li>
                                </Link>
                                <li className='hidden sm:inline text-slate-700 hover:underline' onClick={handlesignout}>Sign out</li>

                            </>
                        ) : (
                            <>
                                <Link to="/signin">
                                    <li className='hidden sm:inline text-slate-700 hover:underline'>Sign in</li>
                                </Link>
                            </>
                        )
                    }




                </ul>
            </div>
        </header>
    )
}

export default Header