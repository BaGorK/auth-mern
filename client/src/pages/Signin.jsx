import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {
  const [formData, setFormData] = useState({});
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
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.status === 'fail') {
        return setIsError(true);
      }
      navigate('/');
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold capitalize my-5'>
        Sign in
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          {isLoading ? 'signing in...' : 'sign in'}
        </button>
      </form>
      <div className='flex gap-4 mt-4'>
        <p className='capitalize'>have no account?</p>
        <Link to='/signup'>
          <span className='text-blue-600'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-4'>{isError && 'something went wrong'}</p>
    </div>
  );
}
