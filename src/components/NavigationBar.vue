<template>
  <nav class="navbar navbar-light" style="background-color: #e3f2fd">

    <RouterLink to="/">Home</RouterLink>

    <RouterLink :to="{ name: 'Settings' }">Settings</RouterLink>
    
  </nav>
</template>
