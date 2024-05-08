import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'auth-mern-7512e.firebaseapp.com',
  projectId: 'auth-mern-7512e',
  storageBucket: 'auth-mern-7512e.appspot.com',
  messagingSenderId: '277941185830',
  appId: '1:277941185830:web:d58f25bfb73ba24d4f25e7',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
