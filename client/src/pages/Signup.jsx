import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold capitalize my-5'>
        Sign up
      </h1>
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Username'
          className='bg-slate-100 p-3 rounded-lg shadow-sm  '
        />
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 p-3 rounded-lg'
        />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 p-3 rounded-lg'
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
