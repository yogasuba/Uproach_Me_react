import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCd3xFH9XUTYXzUn1pvKZmOnvMKHvyLnIc',
    authDomain: 'sampleaproach.firebaseapp.com',
    projectId: 'sampleaproach',
    storageBucket: 'sampleaproach.firebasestorage.app',
    messagingSenderId: '1096251255049',
    appId: '1:1096251255049:web:e5cce8a18bbea936a40bd8',
    databaseURL: 'https://sampleaproach-default-rtdb.asia-southeast1.firebasedatabase.app/',
  };

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
