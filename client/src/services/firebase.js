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
export const firebaseApp = initializeApp(firebaseConfig);

// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }
