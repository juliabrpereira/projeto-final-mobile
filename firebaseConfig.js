import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAmfuHqT_dulc5BOPHylwlBNp-7kM8pKpE',
  authDomain: 'iplace-bccb0.firebaseapp.com',
  projectId: 'iplace-bccb0',
  storageBucket: 'iplace-bccb0.firebasestorage.app',
  messagingSenderId: '937540131006',
  appId: '1:937540131006:web:31b66b4f51ba2ec4b6e6ef',
  measurementId: 'G-YTBQBV8N10',
};

const app = initializeApp(firebaseConfig);

export const auth =
  Platform.OS === 'web'
    ? getAuth(app)
    : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export const db = getFirestore(app);
