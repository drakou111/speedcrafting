<template>
    <div>
        <div class="crafting-grid">
            <div
                v-for="(slot, index) in slots"
                :key="index"
                class="slot"
                @click="onSlotClick(index)"
            >
                <item v-if="slot.content" :item="slot.content" />
            </div>
        </div>
    </div>
</template>
<script>
import Item from "./ItemComponent.vue";
const images = require.context("../assets/items", false, /\.png$/);

export default {
    components: {
        Item,
    },
    data() {
        return {
            slots: [
                { content:  { name: "Diamond", image: "diamond.png" } },
                { content: { name: "apple", image: "apple.png" } },
                { content: null },
                { content: null },
                { content: null },
                { content: null },
                { content: null },
                { content: null },
                { content: null },
            ],
            currentItem: null,
        };
    },
    methods: {
        onSlotClick(index) {
            console.log(images)
            if (this.currentItem === null) {
                // Clicked on an empty slot with no item in hand
                const clickedSlotContent = this.slots[index].content;
                if (clickedSlotContent !== null) {
                    // Pick up the item from the slot
                    this.currentItem = clickedSlotContent;
                    this.slots[index].content = null;
                }
            } else {
                // Clicked on an empty slot with an item in hand
                if (this.slots[index].content === null) {
                    // Put the item in the slot
                    this.slots[index].content = this.currentItem;
                    this.currentItem = null;
                } else {
                    // Clicked on a non-empty slot with an item in hand
                    const clickedSlotContent = this.slots[index].content;
                    this.slots[index].content = this.currentItem;
                    this.currentItem = clickedSlotContent;
                }
            }
        },
    },
};
</script>
<style scoped>
.crafting-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}

.slot {
    width: 64px;
    height: 64px;
    border: 1px solid black;
}
</style>
