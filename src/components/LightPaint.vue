<template>
    <div ref="el" class="flex-container flex-column">
        <section class="flex-container">
            <video></video>
            <canvas></canvas>
        </section>
        <LightpainterControls
            @clear="clear_canvas"
            @save="save_canvas"
            v-model:paint_active="paint_active"
            v-model:video_active="video_active"
        ></LightpainterControls>
        <SavedVisuals :visuals="saved_visuals">Saved images:</SavedVisuals>
    </div>
</template>

<style scoped>
video,
canvas {
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
</style>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { date, useQuasar } from "quasar";
import "rvfc-polyfill";

const $q = useQuasar();

import SavedVisuals from "components/SavedVisuals.vue";
import LightpainterControls from "components/LightpainterControls.vue";

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
    try {
        console.log("add global event listener");
        document.addEventListener("keydown", handleGlobalKeydown);
    } catch (error) {
        console.log(error);
    }
});
onUnmounted(() => {
    console.log("onUnmounted");
    try {
        console.log("remove global event listener");
        document.removeEventListener("keydown", handleGlobalKeydown);
    } catch (error) {
        console.log(error);
    }
});

function handleGlobalKeydown(event) {
    console.log("global keydown", event);

    $q.notify(`key: '${event.key}'`);
    switch (event.key) {
        case "p":
        case " ":
        case "r":
            paint_active.value = !paint_active.value;
            break;
        case "s":
            save_canvas();
            break;
        case "c":
            clear_canvas();
            break;

        default:
            break;
    }
}

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
    canvas.value.toBlob((blob) => {
        const visual = {
            type: "image",
            filename: generate_filename(),
            data: canvas.value.toDataURL(),
            blob: blob,
        };
        saved_visuals.value.push(visual);
    });
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
