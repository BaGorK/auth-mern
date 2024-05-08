import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { firebaseApp } from '../services/firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../store/user/userSlice';

export default function OAuth() {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);

      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result.user;
      const res = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: displayName, email, photo: photoURL }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.error('could not login with google: ', error);
    }
  };

  return (
    <button
      type='button'
      className='bg-red-800 p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-75 duration-300'
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
}
