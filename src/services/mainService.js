import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction, set, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import store from '../stores/store';
import { useToast } from 'vue-toast-notification'

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
const auth = getAuth(app)

async function setValue(key, value) {
    const valueRef = ref(database, key);
    try {
        await set(valueRef, value);
    } catch (error) {
        useToast().open({
            type: 'error',
            message: error.message,
            duration: 6000
        })
        throw error
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
        useToast().open({
            type: 'error',
            message: error.message,
            duration: 6000
        })
        throw error
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
        useToast().open({
            type: 'error',
            message: error.message,
            duration: 6000
        })
        throw error
    }
}

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        store.dispatch('login');
        return user
    } catch (error) {
        useToast().open({
            type: 'warning',
            message: error.message,
            duration: 6000
        })
        throw error
    }
}

async function signup(email, password) {
    const auth = getAuth();
    try {
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        useToast().open({
            type: 'warning',
            message: error.message,
            duration: 6000
        })
        throw error
    }
}


async function isLoggedIn() {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(!!user);
        });
    });
}

async function logout() {
    try {
        await auth.signOut();
        store.dispatch('logout');
        return true;
    } catch (error) {
        useToast().open({
            type: 'error',
            message: error.message,
            duration: 6000
        })
        throw error
    }
}

export const mainService = {
    setValue,
    readValue,
    addValue,
    addListener,
    removeListeners,
    addValueToArray,
    login,
    signup,
    isLoggedIn,
    logout,
    auth
};