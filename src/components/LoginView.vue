<template>
    <div>
        <form @submit.prevent="login">
            <div>
                <h1>Login</h1>
                <label>Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { mainService } from "../services/mainService";
import router from "../router";
import { useToast } from "vue-toast-notification";

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async login() {
            if (this.email.length > 100 || this.password.length > 100) {
                useToast().open({
                    type: "warning",
                    message: "email or password too long",
                    duration: 6000,
                });
            } else {
                await mainService.login(this.email, this.password);
                router.push({ name: "Home" });
            }
        },
    },
};
</script>
