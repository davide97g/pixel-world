import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAg9xxlebz5AYtYU1BjGMdxHPqXU2K_HrU',
  authDomain: 'test-pixel-world.firebaseapp.com',
  projectId: 'test-pixel-world',
  storageBucket: 'test-pixel-world.firebasestorage.app',
  messagingSenderId: '126978234030',
  appId: '1:126978234030:web:c196844c1ffeb327433f3f',
  measurementId: 'G-Z2RKTLHGBD',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
// export const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider("6Lff0ucpAAAAAP6mde0lYAWcBZwKckPO8X4uuaTy"),
// });
