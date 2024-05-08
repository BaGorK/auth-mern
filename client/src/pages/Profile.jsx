import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const fileRef = useRef();

  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto'>
      <h2 className='font-semibold text-3xl text-gray-500  my-7 text-center '>
        Profile
      </h2>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
          alt='profile picture'
          className='h-24 w-24 rounded-full cursor-pointer object-cover mt-2 self-center'
          onClick={() => fileRef.current.click()}
        />
        <input
          type='text'
          placeholder='Username'
          defaultValue={currentUser.username}
          className='bg-slate-200 p-3 rounded-lg '
        />
        <input
          type='email'
          placeholder='Email'
          defaultValue={currentUser.email}
          className='bg-slate-200 p-3 rounded-lg '
        />
        <input
          type='password'
          placeholder='Password'
          className='bg-slate-200 p-3 rounded-lg '
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase  hover:opacity-85 disabled:opacity-75'>
          update
        </button>
      </form>
      <div className='flex justify-between mt-4'>
        <span className='text-red-600 cursor-pointer capitalize'>
          delete account
        </span>
        <span className='text-red-600 cursor-pointer capitalize'>sign out</span>
      </div>
    </div>
  );
}
