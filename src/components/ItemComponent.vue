<template>
    <div class="item">
      <img :src="imageSrc" alt="" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    computed: {
      imageSrc() {
        // Use require to dynamically load the image based on the item's image attribute
        return require(`../assets/items/${this.item.image}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .item {
    width: 100%;
    height: 100%;
  }
  </style>
  