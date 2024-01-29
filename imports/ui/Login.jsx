import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('users.login', { email, password }, (error, res) => {
      if (error) {
        console.error('Error login user:', error.reason);
        alert(error.reason);
      } else {
        console.log('User logged in successfully');
        localStorage.setItem('role', res.role);
        localStorage.setItem('email', email);
        navigate('/');
      }
    });
  };

  return (
    <div className='bg-green-100 h-screen w-full flex justify-center items-center mx-5 md:mx-0'>
      <div className='bg-white p-5 rounded-lg w-full md:w-[25%] '>
        <h1 className='text-2xl text-center text-green-700'>Welcome user!</h1>
        <form
          className='h-full w-full flex flex-col justify-center'
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className='text-center mt-[3rem] mb-[1rem] text-green-700'>Login</p>
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
            <Link to='/signup' className='text-green-700'>
              Signup
            </Link>
          </div>
          <button
            type='submit'
            className='bg-green-700 text-white mt-[2rem] px-3 py-2 rounded-lg'
          >
            Let's go!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
