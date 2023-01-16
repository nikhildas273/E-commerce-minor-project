import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDgh0ZSIusygdiq1U5VwmO28JNpt9Nqip0',
  authDomain: 'e-commerce-minor.firebaseapp.com',
  projectId: 'e-commerce-minor',
  storageBucket: 'e-commerce-minor.appspot.com',
  messagingSenderId: '1065835324916',
  appId: '1:1065835324916:web:78a4f8338ff36a563445a1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);