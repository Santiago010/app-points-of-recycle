// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
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

// const firebaseConfig = {
//   apiKey: 'AIzaSyCtqmgfmsn7xUkfwsYtuuHnBg-S6dxrF94',
//   authDomain: 'game-trivia-1a43d.firebaseapp.com',
//   projectId: 'game-trivia-1a43d',
//   storageBucket: 'game-trivia-1a43d.appspot.com',
//   messagingSenderId: '908075261911',
//   appId: '1:908075261911:web:0da2f823fd71e104043592',
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
