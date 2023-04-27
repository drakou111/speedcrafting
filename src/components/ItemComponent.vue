<template>
    <div>
      <img :src="imageSrc" alt="itemImage" class="item"/>
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
        return require(`../assets/items/${this.item.name}.png`);
      },
    },
  };
  </script>
  
  <style scoped>
  .item {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    user-select: none;
    pointer-events: none;
    opacity: 100%;
  }
  </style>
  