import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    console.log(data);
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

        <button className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-75 duration-300'>
          sign up
        </button>
      </form>
      <div className='flex gap-4 py-4'>
        <p className='capitalize'>have an account?</p>
        <Link to='/signin'>
          <span className='text-blue-600'>Sign in</span>
        </Link>
      </div>
    </div>
  );
}
