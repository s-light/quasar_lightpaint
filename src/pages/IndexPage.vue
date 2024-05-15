<template>
    <q-page class="flex flex-center content-stretch">
        <LightPaint />
    </q-page>
</template>

<script setup>
// import { ref, computed } from 'vue'
import { useQuasar } from "quasar";
import LightPaint from "src/components/LightPaint.vue";

// import { useTheTimeStore } from "stores/thetime.js";

// import TimerDisplay from "components/TimerDisplay.vue";

// const thetime = useTheTimeStore();

// $q.notify('Message')

const $q = useQuasar();
// https://quasar.dev/quasar-plugins/addressbar-color
// $q.addressbarColor.set('#a2e3fa')

// dark mode
// get status
// console.log($q.dark.isActive); // true, false
// get configured status
// console.log($q.dark.mode) // "auto", true, false
// set status
$q.dark.set(true); // or false or "auto"
// toggle
// $q.dark.toggle()
</script>
