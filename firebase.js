// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBeRVHBP909P1fJxAJW6PMpyvBU9bOqs3o",

  authDomain: "speedcrafting-e8421.firebaseapp.com",

  projectId: "speedcrafting-e8421",

  storageBucket: "speedcrafting-e8421.appspot.com",

  messagingSenderId: "633410195096",

  appId: "1:633410195096:web:508221c211df68ec678aed",

  measurementId: "G-P3JQJW3NRN"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);