<template>
  <div
    @mousemove="onMouseMove"
    class="crafting-container"
    id="crafting-container"
  >
    <div class="crafting-grid">
      <div v-for="(slot, index) in slots" :key="index" class="slot">
        <item v-if="slot.content" :item="slot.content" />
        <div class="item-count" v-if="slot.content && slot.content.count">
          <div class="shadow-item-count">
            {{ slot.content.count }}
          </div>
          <div class="main-item-count">{{ slot.content.count }}</div>
        </div>
      </div>
    </div>
    <div
      v-if="currentItem"
      :style="`left: ${mousePosition.x}px; top: ${mousePosition.y}px`"
      class="held-item"
      @dragstart.prevent
      style="transform: translate(-50%, -50%)"
    >
      <img :src="imageSrc" alt="" class="item" />
      <div class="item-count" v-if="currentItem && currentItem.count">
        <div class="shadow-item-count">{{ currentItem.count }}</div>
        <div class="main-item-count">{{ currentItem.count }}</div>
      </div>
    </div>

    <div class="add-item">
      <input type="text" v-model="newItemName" placeholder="Item name" />
      <button @click="addItem">Add Item</button>
    </div>
  </div>
</template>
<script>
import Item from "./ItemComponent.vue";

export default {
  components: {
    Item,
  },
  data() {
    return {
      slots: [
        { content: { name: "apple", count: 16 } },
        { content: null },
        { content: null },
        { content: null },
        { content: null },
        { content: null },
        { content: null },
        { content: null },
        { content: null },
      ],
      currentItem: { name: "apple", count: 16 },
      mousePosition: { x: 0, y: 0 },

      rightDragSlots: [],
      leftDragSlots: [],
      slotIndex: null,

      leftDown: false,
      rightDown: false,

      cancelUp: false,
      itemCount: 0
    };
  },
  methods: {
    addItem() {
      const newItem = { name: this.newItemName, count: 16 };
      this.slots[0].content = newItem;
      this.newItemName = "";
    },

    leftClickDown() {
      if (!this.rightDown) {
        this.leftDown = true;
      }

      if (this.leftDown && this.currentItem !== null) {
        this.itemCount = this.currentItem.count;
      }
    },

    leftClickUp() {
      this.leftDown = false;

      //if (!this.cancelUp){
      //
      //}

      this.cancelUp = false;
      this.leftDragSlots = [];
    },

    rightClickDown() {
      if (!this.leftDown) {
        this.rightDown = true;
      }

      if (
        this.currentItem === null &&
        this.slots[this.slotIndex].content !== null
      ) {
        const count = this.slots[this.slotIndex].content.count / 2.0;
        this.currentItem = { ...this.slots[this.slotIndex].content };
        this.currentItem.count = Math.ceil(count);
        this.slots[this.slotIndex].content.count = Math.floor(count);
        this.rightDown = false;
        this.cancelUp = true;
      }

      if (
        this.slots[this.slotIndex].content !== null &&
        this.slots[this.slotIndex].content.count <= 0
      ) {
        this.slots[this.slotIndex].content = null;
      }
    },

    rightClickUp() {
      this.rightDown = false;

      if (
        this.currentItem !== null &&
        this.rightDragSlots.length <= 0 &&
        !this.cancelUp
      ) {
        if (
          this.slots[this.slotIndex].content !== null &&
          this.slots[this.slotIndex].content.name === this.currentItem.name &&
          this.slots[this.slotIndex].content.count < 64
        ) {
          this.slots[this.slotIndex].content.count++;
          this.currentItem.count--;
        } else if (this.slots[this.slotIndex].content === null) {
          this.slots[this.slotIndex].content = { ...this.currentItem };
          this.slots[this.slotIndex].content.count = 1;
          this.currentItem.count--;
        }
      }
      if (this.currentItem !== null && this.currentItem.count <= 0) {
        this.currentItem = null;
      }

      this.cancelUp = false;
      this.rightDragSlots = [];
    },

    handleSlotHover(event) {
      let slot = event.target;
      while (slot && !slot.classList.contains("slot")) {
        slot = slot.parentNode;
      }

      if (slot) {
        this.slotIndex = Array.from(slot.parentNode.children).indexOf(slot);
      }

      //RIGHT CLICK
      if (this.currentItem !== null) {
        if (
          this.rightDown &&
          this.rightDragSlots.length > 0 &&
          !this.rightDragSlots.includes(this.slotIndex)
        ) {
          if (
            this.slots[this.slotIndex].content !== null &&
            this.slots[this.slotIndex].content.name === this.currentItem.name &&
            this.slots[this.slotIndex].content.count < 64
          ) {
            this.slots[this.slotIndex].content.count++;
            this.currentItem.count--;
          } else if (this.slots[this.slotIndex].content === null) {
            this.slots[this.slotIndex].content = { ...this.currentItem };
            this.slots[this.slotIndex].content.count = 1;
            this.currentItem.count--;
          }
        }
      }

      //LEFT CLICK
      //

      if (!this.rightDragSlots.includes(this.slotIndex) && this.rightDown) {
        this.rightDragSlots.push(this.slotIndex);
      }

      //Empty the user's hand if count=0
      if (this.currentItem !== null && this.currentItem.count <= 0) {
        this.currentItem = null;
      }
    },

    handleSlotOut() {
      //RIGHT CLICK
      if (this.currentItem !== null) {
        if (
          this.rightDown &&
          this.rightDragSlots.length <= 0 &&
          !this.rightDragSlots.includes(this.slotIndex)
        ) {
          if (
            this.slots[this.slotIndex].content !== null &&
            this.slots[this.slotIndex].content.name === this.currentItem.name &&
            this.slots[this.slotIndex].content.count < 64
          ) {
            this.slots[this.slotIndex].content.count++;
            this.currentItem.count--;
          } else if (this.slots[this.slotIndex].content === null) {
            this.slots[this.slotIndex].content = { ...this.currentItem };
            this.slots[this.slotIndex].content.count = 1;
            this.currentItem.count--;
          }
        }
      }

      //LEFT CLICK
      //

      if (!this.rightDragSlots.includes(this.slotIndex) && this.rightDown) {
        this.rightDragSlots.push(this.slotIndex);
      }

      //Empty the user's hand if count=0
      if (this.currentItem !== null && this.currentItem.count <= 0) {
        this.currentItem = null;
      }

      this.slotIndex = null;
    },

    onMouseMove(event) {
      const container = this.$el.getBoundingClientRect();
      const x = event.clientX - container.left;
      const y = event.clientY - container.top;
      this.mousePosition.x = x;
      this.mousePosition.y = y;
    },
  },
  computed: {
    imageSrc() {
      // Use require to dynamically load the image based on the item's image attribute
      return require(`../assets/items/${this.currentItem.name}.png`);
    },
  },
  mounted() {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    const slots = document.querySelectorAll(".slot");
    slots.forEach((slot) => {
      slot.addEventListener("mouseover", this.handleSlotHover);
      slot.addEventListener("mouseout", this.handleSlotOut);
    });

    document.addEventListener("mousedown", (event) => {
      if (event.button == 0) {
        this.leftClickDown(event);
      } else if (event.button == 2) {
        this.rightClickDown(event);
      }
    });

    document.addEventListener("mouseup", (event) => {
      if (event.button == 0) {
        this.leftClickUp(event);
      } else if (event.button == 2) {
        this.rightClickUp(event);
      }
    });
  },
};
</script>
<style scoped>
.crafting-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.crafting-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px;
}

.slot {
  width: 64px;
  height: 64px;
  background-image: url("../assets/slot.png");
  background-size: cover;
  user-select: none;
  image-rendering: pixelated;
}

.slot:hover {
  background-image: url("../assets/slot_light.png");
}

.held-item {
  position: absolute;
  width: 64px;
  height: 64px;
  pointer-events: none;
}

.item {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}

.item-count {
  bottom: 0;
  right: 0;
  padding: 2px;
  font-size: 37px;
  text-align: right;
  box-sizing: border-box;
  pointer-events: none;
  transform: translate(9.3%, -69%);
  font-family: MinecraftRegular;
}

.main-item-count {
  color: rgb(63, 63, 63);
  font-size: 37px;
  font-family: MinecraftRegular;
  z-index: 2;
  pointer-events: none;
  user-select: none;
}

.shadow-item-count {
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  z-index: 1;
  transform: translate(-12.4%, -10.1%);
  font-size: 37px;
  font-family: MinecraftRegular;
  user-select: none;
}

@font-face {
  font-family: "MinecraftRegular";
  src: url("/fonts/MinecraftRegular-Bmg3.otf") format("truetype");
}
</style>
