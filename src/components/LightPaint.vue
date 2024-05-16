<template>
    <div ref="el" class="flex-container flex-column">
        <section class="flex-container">
            <video></video>
            <canvas></canvas>
        </section>
        <section class="controls flex-container">
            <q-toggle size="5vh" v-model="video_active" icon="videocam" />
            <q-toggle size="5vh" v-model="paint_active" color="pink" icon="emergency_recording" />
            <q-btn
                size="3vh"
                padding="xs"
                color="negative"
                round
                icon="radio_button_checked"
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
                size="3vh"
                padding="xs"
                color="primary"
                round
                icon="delete_forever"
                @click="clear_canvas"
            >
            </q-btn>
            <q-btn size="3vh" padding="xs" color="primary" round icon="save" @click="save_canvas">
            </q-btn>
            <!--  -->
        </section>
        <SavedVisuals :visuals="saved_visuals">Saved images:</SavedVisuals>
    </div>
</template>

<style scoped>
video,
canvas,
img {
    margin: 1rem;
    border: solid 1px hsl(250, 100%, 50%);
}

.flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: stretch;
    align-items: center;
    /* width: 100%; */
    /* height: 100%; */
}

.flex-column {
    flex-direction: column;
}

/* .flex-item:nth-child(1) */
.flex-container > * {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
    margin: 0.25rem 0;
}

/* .flex-container > video,
.flex-container > canvas {
    flex-grow: 1;
} */

@media (orientation: landscape) {
    .flex-container > video,
    .flex-container > canvas {
        max-width: 50vw;
        /* max-height: 90vh; */
    }
}
@media (orientation: portrait) {
    .flex-container > video,
    .flex-container > canvas {
        /* max-width: 50vw; */
        max-height: 45vh;
    }
}

.controls {
    justify-content: space-around;
    max-width: 50rem;
}
.controls > * {
    margin: 0 1rem;
}
</style>

<script setup>
import { ref, onMounted, watch } from "vue";
import { date } from "quasar";
import "rvfc-polyfill";

import SavedVisuals from "components/SavedVisuals.vue";

const el = ref();
const animation_handle = ref(null);
const canvas = ref();
const ctx = ref();
const video = ref();
const media_stream = ref();
const video_track = ref();
const video_active = ref(true);
const paint_active = ref(false);
const saved_visuals = ref([]);

function test(event) {
    console.log("mouseout", event);
    // paint_active.value = false;
}

const video_constraints = {
    width: { min: 500, ideal: 1920 },
    height: { min: 500, ideal: 1080 },
    frameRate: { max: 30 },
    facingMode: { ideal: "environment" },
};
// if (navigator.mediaDevices.getSupportedConstraints().facingMode) {
//     console.log("set facingMode environment.");
//     video_constraints.facingMode = { ideal: "environment" };
// }

function generate_filename(title = "lightpainting", ext = "png") {
    // const dateformat = new Intl.DateTimeFormat(undefined, {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    // });
    // const date_str = `${dateformat.format()}`;
    // if (title) {
    //     title += `- ${title}`;
    // }
    const formattedString = date.formatDate(Date.now(), "YYYY-MM-DD - HH:mm:ss.SSS");
    const filename = `${formattedString} - ${title}.${ext}`;
    return filename;
}

onMounted(() => {
    console.log("onMounted");
    // el.value; // <div>
    setup_canvas();
    setup_cam();
    start_cam();
});

function setup_canvas() {
    console.log("setup_canvas");
    canvas.value = document.querySelector("canvas");
    ctx.value = canvas.value.getContext("2d");
    console.log("canvas", canvas.value);
    console.log("ctx", ctx.value);
}

function clear_canvas() {
    console.log("clear_canvas");
    const compOp = ctx.value.globalCompositeOperation;
    ctx.value.globalCompositeOperation = "source-over";
    ctx.value.fillStyle = "#000";
    ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.value.globalCompositeOperation = compOp;
}

function save_canvas() {
    console.log("save_canvas");
    const visual = {
        type: "image",
        filename: generate_filename(),
        data: canvas.value.toDataURL(),
    };
    saved_visuals.value.push(visual);
}

function setup_cam() {
    console.log("setup_cam");
    video.value = document.querySelector("video");
    console.log("video", video.value);
    video.value.addEventListener("loadeddata", video_load_callback, false);
}

watch(video_active, async (newValue, oldValue) => {
    if (newValue) {
        start_cam();
    } else {
        stop_cam();
    }
});

function start_cam() {
    navigator.mediaDevices
        .getUserMedia({
            video: video_constraints,
            audio: false,
        })
        .then(function (stream) {
            media_stream.value = stream;
            console.log("media_stream", media_stream.value);
            video.value.srcObject = stream;
            video.value.play();
            video_track.value = media_stream.value.getVideoTracks()[0];
            console.log("video_track", video_track.value);
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });
}

function stop_cam() {
    if (media_stream.value) {
        media_stream.value.getTracks().forEach((track) => {
            if (track.readyState == "live") {
                track.stop();
            }
        });
    }
    video.value.srcObject = null;
}

function video_load_callback() {
    console.log("video_load_callback");
    video.value.cancelVideoFrameCallback(animation_handle.value);
    const track_settings = video_track.value.getSettings();
    canvas.value.height = track_settings.height;
    canvas.value.width = track_settings.width;
    ctx.value.globalCompositeOperation = "lighten";
    console.log("globalCompositeOperation", ctx.value.globalCompositeOperation);
    step();
}
function step() {
    if (paint_active.value) {
        // update the canvas when a video proceeds to next frame
        ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    }
    animation_handle.value = video.value.requestVideoFrameCallback(step);
}
</script>
