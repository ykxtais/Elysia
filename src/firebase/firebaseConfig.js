import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDGeLzXvbul76TUWB2QOXBO2fltxyOhXpQ",
  authDomain: "elysiaauth.firebaseapp.com",
  projectId: "elysiaauth",
  storageBucket: "elysiaauth.firebasestorage.app",
  messagingSenderId: "467328459684",
  appId: "1:467328459684:web:fb763887a114213ba3d731"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
