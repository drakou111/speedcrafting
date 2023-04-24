<template>
    <nav class="navbar navbar-light" style="background-color: #e3f2fd">
        <RouterLink v-if="isAuthenticated" :to="{ name: 'Home' }"
            >Home</RouterLink
        >
        <RouterLink v-if="isAuthenticated" :to="{ name: 'Settings' }"
            >Settings</RouterLink
        >
        <RouterLink v-if="isAuthenticated" :to="{ name: 'Logout' }"
            >Logout</RouterLink
        >
        <RouterLink v-if="isAuthenticated" :to="{ name: 'Profile' }"
            >Profile</RouterLink
        >
        <RouterLink v-if="!isAuthenticated" :to="{ name: 'Login' }"
            >Login</RouterLink
        >
        <RouterLink v-if="!isAuthenticated" :to="{ name: 'Signup' }"
            >Signup</RouterLink
        >
    </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isAuthenticated"]),
    },
};
</script>
