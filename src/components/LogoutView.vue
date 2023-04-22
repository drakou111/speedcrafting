<template>
    <div></div>
  </template>
  
  <script>
  import { mainService } from "../services/mainService.js";
  import { useRouter } from "vue-router";
  
  export default {
    created() {
      mainService.logout();
      const router = useRouter();
      router.push({ name: "Login" });
    },
  };
  </script>
  
  <style scoped></style>
  