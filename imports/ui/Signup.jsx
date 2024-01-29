import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('users.signup', { email, role, password }, (error) => {
      if (error) {
        console.error('Error creating user:', error.reason);
      } else {
        console.log('User created successfully');
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);
        navigate('/');
      }
    });
  };

  return (
    <div className='bg-green-100 h-screen w-full flex mx-5 md:mx-0 justify-center items-center'>
      <div className='bg-white p-5 rounded-lg w-full md:w-[25%] '>
        <h1 className='text-2xl text-center text-green-700'>Create Account</h1>
        <form
          className='h-full w-full flex flex-col justify-center'
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className='text-center mt-[1rem] mb-[1rem] text-green-700'>Signup</p>
          <input
            className='mt-4 px-4 py-2'
            type='email'
            placeholder='Enter your email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='mt-4 mb-4 px-4 py-2'
            type='password'
            placeholder='Enter your password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='mt-3 flex justify-between items-center'>
            <div className='flex items-center'>
              <input
                type='radio'
                name='role'
                value='Admin'
                required
                onChange={(e) => setRole(e.target.value)}
              />
              <label className='ml-2 text-green-700'>Admin</label>
            </div>

            <div className='flex items-center'>
              <input
                type='radio'
                name='role'
                value='Borrower'
                onChange={(e) => setRole(e.target.value)}
              />
              <label className='ml-2 text-green-700'>Borrower</label>
            </div>

            <div className='flex items-center'>
              <input
                type='radio'
                name='role'
                value='Lender'
                onChange={(e) => setRole(e.target.value)}
              />
              <label className='ml-2 text-green-700'>Lender</label>
            </div>
          </div>
          <Link to='/login' className='font-light mx-3 my-4 text-green-700'>
            Login?
          </Link>
          <button
            type='submit'
            className='bg-green-700 text-white mt-[1rem] px-3 py-2 rounded-lg'
          >
            Let's go!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
