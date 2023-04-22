import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction, set, push } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBeRVHBP909P1fJxAJW6PMpyvBU9bOqs3o",
    authDomain: "speedcrafting-e8421.firebaseapp.com",
    projectId: "speedcrafting-e8421",
    storageBucket: "speedcrafting-e8421.appspot.com",
    messagingSenderId: "633410195096",
    appId: "1:633410195096:web:508221c211df68ec678aed",
    measurementId: "G-P3JQJW3NRN",
    databaseURL: "https://speedcrafting-e8421-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function setValue(key, value) {
  const valueRef = ref(database, key);
  try {
    await set(valueRef, value);
  } catch (error) {
    console.log("Error changing string:", error);
  }
}

function readValue(key) {
  return new Promise((resolve, reject) => {
    const valueRef = ref(database, key);
    onValue(valueRef, (snapshot) => {
      resolve(snapshot.val());
    }, (error) => {
      reject(error);
    });
  });
}

async function addValue(key, value) {
  const valueRef = ref(database, key);
  try {
    await runTransaction(valueRef, (currentValue) => {
      return currentValue + value;
    });
  } catch (error) {
    console.log("Error incrementing value:", error);
  }
}

// Define an object that will store the listeners
const listeners = {};

function addListener(key, callback) {
  const valueRef = ref(database, key);
  const listener = onValue(valueRef, (snapshot) => {
    callback(snapshot.val());
  });
  listeners[key] = listener;
}

function removeListeners() {
  Object.keys(listeners).forEach((key) => {
    const listener = listeners[key];
    if (listener) {
      listener();
      delete listeners[key];
    }
  });
}

async function addValueToArray(key, value) {
    const valueRef = ref(database, key);
    try {
      await push(valueRef, value);
    } catch (error) {
      console.log("Error adding value to array:", error);
    }
  }

export const mainService = {
  setValue,
  readValue,
  addValue,
  addListener,
  removeListeners,
  addValueToArray
};