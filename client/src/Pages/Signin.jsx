import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { signinSuccess, signinStart, signinFailure } from '../redux/userSlice/Slice'
import { useDispatch, useSelector } from 'react-redux'
const Signin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error: errormessage } = useSelector(state => state.user)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user.email || !user.password) {
      return dispatch(signinFailure('Please fill all the fields'));
    }
    try {
      dispatch(signinStart())
      const res = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      const data = await res.json();
      if (data.success == false) {
        return dispatch(signinFailure(data.message))
      }
      if (res.ok) {
        dispatch(signinSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signinFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className="flex-1">
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span>Decentralized</span>
            <span>Box</span>
          </Link>
          <p className='text-sm mt-5'>You can sign up with your email and password.</p>
        </div>
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="Email" id="email" name="email" value={user.email} onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Password" id="password" name="password" value={user.password} onChange={handleChange} />
            </div>
            <Button type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'sign in'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <NavLink to='/signup' className='text-blue-500'>Sign up</NavLink>
          </div>
          {
            errormessage && (
              <Alert className='mt-5' color='failure'>
                {errormessage}
              </Alert>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default Signin