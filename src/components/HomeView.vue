<template>
    <div @mousemove="onMouseMove" class="crafting-container">
        <div class="crafting-grid">
            <div
                v-for="(slot, index) in slots"
                :key="index"
                class="slot"
                @click="onSlotClick(index)"
                @contextmenu.prevent="onSlotRightClick(index)"
            >
                <item v-if="slot.content" :item="slot.content" />
                <div
                    class="item-count"
                    v-if="slot.content && slot.content.count"
                >
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
            currentItem: null,
            mousePosition: { x: 0, y: 0 },
        };
    },
    methods: {
        addItem() {
            const newItem = { name: this.newItemName, count: 16 };
            this.slots[0].content = newItem;
            this.newItemName = "";
        },
        onSlotClick(index) {
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

                    if (
                        this.slots[index].content.name === this.currentItem.name
                    ) {
                        //Add values together
                        this.slots[index].content.count +=
                            this.currentItem.count;
                        this.currentItem.count = 0;
                        if (this.slots[index].content.count > 64) {
                            this.currentItem.count =
                                this.slots[index].content.count - 64;
                            this.slots[index].content.count = 64;
                        }

                        if (this.currentItem.count <= 0) {
                            this.currentItem = null;
                        }
                    } else {
                        //Swap the items if they are not the same
                        const clickedSlotContent = this.slots[index].content;
                        this.slots[index].content = this.currentItem;
                        this.currentItem = clickedSlotContent;
                    }
                }
            }
        },
        onSlotRightClick(index){
            if (this.currentItem === null) {
                //Click item with empty hand
                const clickedSlotContent = this.slots[index].content;
                if (clickedSlotContent !== null) {
                    const count = clickedSlotContent.count / 2.0
                    // Pick up the item from the slot
                    this.currentItem = Object.assign({}, clickedSlotContent);

                    this.currentItem.count = Math.ceil(count)
                    this.slots[index].content.count = Math.floor(count)

                    if (this.slots[index].content.count <= 0) {
                        this.slots[index].content = null;
                    }
                }
            } else {
                const clickedSlotContent = this.slots[index].content;
                if (clickedSlotContent === null) {
                    //Click empty slot with item in hand
                    this.slots[index].content = Object.assign({}, this.currentItem);
                    this.slots[index].content.count = 1;
                    this.currentItem.count--;
                    if (this.currentItem.count <= 0) {
                        this.currentItem = null;
                    }
                } else {
                    if (clickedSlotContent.name === this.currentItem.name){
                        //Click item with item in hand
                        this.slots[index].content.count++;
                        this.currentItem.count--;
                        if (this.currentItem.count <= 0) {
                        this.currentItem = null;
                    }
                    } else {
                        //Click not same item with item in hand
                        //idk what actually happens lol
                    }
                }
            }
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
    background-color: rgb(200, 200, 200);
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
    transform: translate(9.3%, -69%);
    font-family: MinecraftRegular;
}

.main-item-count {
    color: rgb(63, 63, 63);
    font-size: 37px;
    font-family: MinecraftRegular;
    z-index: 2;
    user-select: none;
}

.shadow-item-count {
    position: absolute;
    bottom: 0;
    right: 0;
    color: white; /* Change this to your desired color */
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
