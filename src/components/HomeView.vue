<template>
  <div>
    By Drakou111 btw
    <button @click="incrementValue">Increment</button>
    <p>Current value: {{ counterValue }}</p>
    <input type="text" v-model="newString">
    <button @click="addString">Add String</button>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { mainService } from "../services/mainService.js"

export default {
  data() {
    return {
      counterValue: 0,
      currentString: "",
      newString: "",
      items: []
    };
  },
  methods: {
    async addString() {
      this.currentString = this.newString;
      this.newString = "";
      if (this.currentString == ""){
        alert("Cant be blank")
      } else {
        await mainService.addValueToArray("stringArray", this.currentString);
      }
    },
    async incrementValue() {
      await mainService.addValue("counter", 1)
    },
  },
  async mounted() {
    this.counterValue = await mainService.readValue("counter");
    this.items = await mainService.readValue("stringArray")

    mainService.addListener("counter", (value) => {
      this.counterValue = value;
    });

    mainService.addListener("stringArray", (value) => {
      this.items = value;
    })
  },
};
</script>
