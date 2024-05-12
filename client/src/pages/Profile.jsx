/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseApp } from '../services/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../store/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();

  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(firebaseApp);
    const fileName = Date.now() + image.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      () => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart);
      const res = await fetch('/api/v1/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      dispatch(updateUserSuccess(data.data.user));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className='max-w-lg mx-auto'>
      <h2 className='font-semibold text-3xl text-gray-500  my-7 text-center '>
        Profile
      </h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile picture'
          className='h-24 w-24 rounded-full cursor-pointer object-cover mt-2 self-center'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700 '>
              {' '}
              Error uploading image (image size must be less than 2 MB){' '}
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-600 '>{`Uploading: ${imagePercent}% done`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700 '>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='Username'
          id='Username'
          defaultValue={currentUser.username}
          className='bg-slate-200 p-3 rounded-lg '
          onChange={handleChange}
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser.email}
          className='bg-slate-200 p-3 rounded-lg '
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='Password'
          className='bg-slate-200 p-3 rounded-lg '
          onChange={handleChange}
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
