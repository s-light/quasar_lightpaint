<template>
    <ul>
        <li v-for="item in visuals" :key="item.filename">
            <!--
                size="3vh"
                color="primary"
            -->
            <q-btn padding="xs" round icon="delete_forever" @click="item_delete(item)"></q-btn>
            <q-btn padding="xs" round icon="save" @click="item_save(item)"></q-btn>
            <img v-if="item.type == 'image'" :src="item.data" alt="" @click="item_copy(item)" />
            <video v-else-if="item.type == 'video'" :src="item.data" alt="" />
            <div class="info">{{ item.filename }}</div>
        </li>
    </ul>
</template>

<style scoped>
ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: stretch;
    align-items: center;

    list-style: inside none none;
    margin: 1rem;
    padding: 0;
}

ul li {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;

    position: relative;
    margin: 0.5rem;

    border: solid 1px hsl(250, 100%, 50%);
}

ul li button.q-btn {
    position: absolute;
    top: 0.5rem;
}

ul li button.q-btn:nth-child(1) {
    right: 0.5rem;
}

ul li button.q-btn:nth-child(2) {
    right: auto;
    left: 0.5rem;
}

ul li video,
ul li img {
    display: block;
    margin: 0;
    padding: 0;
    max-height: 40vh;
    /* allow 5 in a row */
    max-width: calc(25vw - 1.1rem);
}

ul li .info {
    position: absolute;
    bottom: 1px;
    left: 1px;
    text-shadow: 0 0 0.1rem hsl(0, 0%, 0%), 0 0 0.2rem hsl(0, 0%, 0%), 0 0 0.3rem hsl(0, 0%, 0%),
        0 0 0.4rem hsl(0, 0%, 0%), 0 0 0.4rem hsl(0, 0%, 0%), 0 0 0.4rem hsl(0, 0%, 0%),
        0 0 0.8rem hsl(0, 0%, 0%);
    /* box-shadow: 0 0 0.1rem hsl(0, 100%, 50%) inset; */
    width: calc(100% - (2 * 1px));
    padding: 0.3em;
    background-color: hsla(250, 100%, 50%, 0.6);
    font-size: 1vh;
}
</style>

<script setup>
import { useQuasar } from "quasar";
import { saveAs } from "file-saver";
const $q = useQuasar();

const props = defineProps({
    visuals: {
        type: Array,
        required: true,
    },
});

const visuals = props.visuals;

function item_delete(item2remove) {
    console.log("delete item", item2remove);
    const index = visuals.indexOf(item2remove);
    // only splice array when item is found
    if (index > -1) {
        // 2nd parameter means remove one item only
        visuals.splice(index, 1);
    }
    // arr = arr.filter(item => item !== item2remove)
}

function item_save(item) {
    console.log("save item", item);
    saveAs(item.data, item.filename);
}

async function item_copy(item) {
    try {
        // Create ClipboardItem with blob and its type, and add to an array
        const data = [new ClipboardItem({ [item.blob.type]: item.blob })];
        // Write the data to the clipboard
        await navigator.clipboard.write(data);
        $q.notify(`image '${item.filename}' copied to clipboard.`);
    } catch (e) {
        console.log("item_copy failed:", e);
    }
}
</script>
