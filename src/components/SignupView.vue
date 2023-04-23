<template>
    <div>
        <form @submit.prevent="onSignup">
            <h1>Sign up</h1>
            <div>
                <label>Email:</label>
                <input type="email" v-model="email" required>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" v-model="password" required>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>
  
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import router from '../router'
import { useToast } from 'vue-toast-notification'

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async onSignup() {
            try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, this.email, this.password);
                router.push({ name: "Home" });
            } catch (error) {
                useToast().open({
                    type: 'warning',
                    message: error.message,
                   duration: 6000
                })
            }
        },
    },
};
</script>
  