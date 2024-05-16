import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OAuth } from '../components';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: 'edmealem',
    email: 'edmealem@gmail.com',
    password: 'test1234',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.status !== 'success') {
        return setIsError(data?.message || true);
      }
      navigate('/signin');
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold capitalize my-5'>
        Sign up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Username'
          className='bg-slate-100 p-3 rounded-lg shadow-sm  '
          defaultValue='edmealem'
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 p-3 rounded-lg'
          defaultValue='edmealem@gmail.com'
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          defaultValue='test1234'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />

        <button
          disabled={isLoading}
          className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-75 duration-300'
        >
          {isLoading ? 'signing up...' : 'sign up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-4 mt-4'>
        <p className='capitalize'>have an account?</p>
        <Link to='/signin'>
          <span className='text-blue-600'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-4'>
        {isError ? isError : isError && 'something went wrong'}
      </p>
    </div>
  );
}
