<template>
    <div class="controls">
        <q-toggle size="5vh" dense v-model="video_active" icon="videocam" />
        <q-toggle size="5vh" dense v-model="tweak_active" icon="tonality" />
        <q-toggle size="5vh" dense v-model="paint_active" color="pink" icon="emergency_recording">
            <q-tooltip> 'r' to toggle painting</q-tooltip>
        </q-toggle>
        <q-btn
            size="2.5vh"
            padding="xs"
            color="negative"
            round
            icon="fiber_manual_record"
            :loading="paint_active"
            @mousedown="paint_active = true"
            @mouseup="paint_active = false"
            @touchstart="paint_active = true"
            @touchend="paint_active = false"
        >
            <template v-slot:loading>
                <q-spinner-rings />
            </template>
        </q-btn>
        <!--
                @mouseleave="paint_active = false" -->
        <q-btn
            size="2.5vh"
            padding="xs"
            color="primary"
            round
            icon="delete_forever"
            @click="$emit('clear')"
        >
            <q-tooltip>'c' to clear painting</q-tooltip>
        </q-btn>
        <q-btn size="2.5vh" padding="xs" color="primary" round icon="save" @click="$emit('save')">
            <q-tooltip>'s' to save current painting to memory</q-tooltip>
        </q-btn>
        <q-btn
            size="2.5vh"
            padding="xs"
            round
            @click="$q.fullscreen.toggle()"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        >
            <q-tooltip>toggle full screen mode</q-tooltip>
        </q-btn>
        <!--
            color="primary"
            :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
        -->

        <q-slider v-model="tweak_lum" :min="-5.0" :max="2.0" :step="0" :disable="!tweak_active" />
        <!--  -->
    </div>
</template>

<style scoped>
.controls {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: stretch;
    align-items: center;

    max-width: 60rem;
}

.controls > * {
    margin: 0 0.4rem;
}
</style>

<script setup>
import { AppFullscreen, useQuasar } from "quasar";
const $q = useQuasar();

// const props = defineProps({
//     visuals: {
//         type: Array,
//         required: true,
//     },
// });

const video_active = defineModel("video_active", { type: Boolean, required: true });
const tweak_active = defineModel("tweak_active", { type: Boolean, required: true });
const paint_active = defineModel("paint_active", { type: Boolean, required: true });
const tweak_lum = defineModel("tweak_lum", { type: Number, required: true });

const emit = defineEmits(["clear", "save"]);

// Requesting fullscreen mode:
$q.fullscreen
    .request()
    .then(() => {
        // success!
    })
    .catch((err) => {
        // oh, no!!!
    });

// Exiting fullscreen mode:
$q.fullscreen
    .exit()
    .then(() => {
        // success!
    })
    .catch((err) => {
        // oh, no!!!
    });
</script>
