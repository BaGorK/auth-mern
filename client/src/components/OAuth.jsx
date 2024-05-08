import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { firebaseApp } from '../services/firebase';

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
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
