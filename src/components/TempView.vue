<template>
    <div>
        <button @click="incrementValue">Increment</button>
        <p>Current value: {{ counterValue }}</p>
        <p>Your contribution: {{ personalValue }}</p>
    </div>
</template>

<script>
import { mainService } from "../services/mainService.js";
//import { useToast } from "vue-toast-notification";

export default {
    data() {
        return {
            counterValue: 0,
            personalValue: 0
        };
    },
    methods: {
        async incrementValue() {
            await mainService.addValue("counter", 1);
        },
    },
    async mounted() {
        this.counterValue = await mainService.readValue("counter");
        this.items = await mainService.readValue("stringArray");

        mainService.addListener("counter", (value) => {
            this.counterValue = value;
        });

        mainService.addListener("stringArray", (value) => {
            this.items = value;
        });

        const user = await mainService.getUser()

        mainService.addListener(`users/${user.uid}/counter`, (value) => {
            this.personalValue = value
        });
    },
};
</script>
