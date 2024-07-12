import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className="flex-1">
          <Link to='/' className='font-bold dark:text-white text-4xl'>
          <span>Decentralized</span>
          <span>Box</span>
          </Link>
          <p className='text-sm mt-5'>You can sign up with your email and password or with Google.</p>
        </div>
        <div className="flex-1">
          
        </div>
      </div>

    </div>
  )
}

export default Signup