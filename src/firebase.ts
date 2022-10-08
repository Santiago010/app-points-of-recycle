// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCllgb-cPxTT8mJ1mSD80ZIcS0hxMP6ujw',
  authDomain: 'react-native-maps-360416.firebaseapp.com',
  projectId: 'react-native-maps-360416',
  storageBucket: 'react-native-maps-360416.appspot.com',
  messagingSenderId: '217883910309',
  appId: '1:217883910309:web:5be0c4f08298c63357ed4c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
