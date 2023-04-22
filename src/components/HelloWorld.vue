<template>
  <div>
    <button @click="incrementValue">Increment</button>
    <p>Current value: {{ counterValue }}</p>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction } from "firebase/database";

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

export default {
  data() {
    return {
      counterValue: 0,
    };
  },
  methods: {
    async incrementValue() {
      const valueRef = ref(database, "counter");

      // Read the current value from the database and log it to the console
      onValue(valueRef, (snapshot) => {
        this.counterValue = snapshot.val();
        console.log("Current value:", this.counterValue);
      });

      // Use a transaction to atomically increment the value
      try {
        await runTransaction(valueRef, (currentValue) => {
          return (currentValue || 0) + 1;
        });
        console.log("Value incremented successfully");
      } catch (error) {
        console.log("Error incrementing value:", error);
      }
    },
  },
  mounted() {
    const valueRef = ref(database, "counter");

    onValue(valueRef, (snapshot) => {
      this.counterValue = snapshot.val();
      console.log("Current value:", this.counterValue);
    });
  },
};
</script>
