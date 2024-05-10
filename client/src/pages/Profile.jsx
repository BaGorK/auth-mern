/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { firebaseApp } from '../services/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

export default function Profile() {
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
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700 '> Error uploading image </span>
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
