import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, TextInput, Label, Spinner, Alert } from 'flowbite-react';

const Signup = () => {
  const navigate = useNavigate();
  const [errormessage, setErrormessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrormessage(null);

    try {
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setErrormessage(data.message || 'Something went wrong');
      }

      setLoading(false);
      navigate('/signin');
    } catch (error) {
      setErrormessage(error.message);
      setLoading(false);
    }
  };

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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" name="username" value={user.username} onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="Email" id="email" name="email" value={user.email} onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Password" id="password" name="password" value={user.password} onChange={handleChange} />
            </div>
            <Button type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign Up'}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <NavLink to='/signin' className='text-blue-500'>Sign in</NavLink>
          </div>
          {errormessage && (
            <Alert className='mt-5' color="failure">{errormessage}</Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
