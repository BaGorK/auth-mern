import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../store/user/userSlice';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: 'edmealem@gmail.com',
    password: 'test1234',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === 'fail') {
        return dispatch(signInFailure(data?.message));
      }
      dispatch(signInSuccess(data?.data?.user));
      navigate('/');
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error?.message));
    }
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
          disabled={loading}
          className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-75 duration-300'
        >
          {loading ? 'signing in...' : 'sign in'}
        </button>
      </form>
      <div className='flex gap-4 mt-4'>
        <p className='capitalize'>have no account?</p>
        <Link to='/signup'>
          <span className='text-blue-600'>Sign up</span>
        </Link>
      </div>
      {!error ? (
        ''
      ) : (
        <p className='text-red-700 mt-4'>{error || 'something went wrong'}</p>
      )}
    </div>
  );
}
