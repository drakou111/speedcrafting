<template>
    Hello
    <div
        v-for="(slot, index) in slots"
        :key="index"
        class="slot"
    >
        <Slot :item="slot.content" :priority = 3></Slot>
    </div>
</template>

<script>
import Slot from "./SlotComponent.vue";
export default {
    components: {
        Slot,
    },
    data() {
        return {
            slots: [],
        };
    },

    mounted: {

        document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

        
    }
};
</script>

<style scoped></style>
