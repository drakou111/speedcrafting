<template>
    <div @mouseover="handleMouseOver" @mouseout="handleMouseOut">
        <img :src="imageSrc" alt="itemImage" class="item" />
    </div>
</template>

<script>
export default {
    emits: [
        "rightDown",
        "rightUp",
        "leftDown",
        "leftUp",
        "mouseOver",
        "mouseOut",
    ],

    props: {
        item: {
            type: Object,
            required: true,
        },
        priority: {
            type: Number,
            require: true,
        },
    },

    data() {
        return {
            itemName: "",
            itemCount: "",
        };
    },

    methods: {
        handleMouseOver(slot) {
            this.$emit("mouseOver", slot);
        },

        handleMouseOut(slot) {
            this.$emit("mouseOut", slot);
        },
    },

    computed: {
        imageSrc() {
            return require(`../assets/items/${this.item.name}.png`);
        },
    },

    mounted() {
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
.item {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    user-select: none;
    pointer-events: none;
    opacity: 100%;
}
</style>
