<template>
    <div>
        <video></video>
        <canvas></canvas>
        <q-toggle size="5vh" v-model="video_active" icon="videocam" />
        <q-toggle size="5vh" v-model="paint_active" color="pink" icon="emergency_recording" />
        <br />
        <q-btn color="primary" icon="deleteforever" @click="clear_canvas"> clear canvas </q-btn>
    </div>
</template>

<style>
video,
canvas {
    margin: 1rem;
    border: solid 1px greenyellow;
}
</style>

<script setup>
import { ref, onMounted, watch } from "vue";
import "rvfc-polyfill";

const el = ref();
const animation_handle = ref(null);
const canvas = ref();
const ctx = ref();
const video = ref();
const video_stream = ref();
const video_active = ref(true);
const paint_active = ref(false);

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
    ctx.value.globalCompositeOperation = "lighten";
}

function clear_canvas() {
    console.log("clear_canvas");
    const compOp = ctx.value.globalCompositeOperation;
    ctx.value.globalCompositeOperation = "source-over";
    ctx.value.fillStyle = "#f0f";
    // ctx.value.fillRect(0, 0, ctx.value.height, ctx.value.width);
    ctx.value.fillRect(0, 0, 20, 20);
    ctx.value.globalCompositeOperation = compOp;
    console.log("clear_canvas done.");
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
        .getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video_stream.value = stream;
            console.log("video_stream", video_stream.value);
            video.value.srcObject = stream;
            video.value.play();
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });
}

function stop_cam() {
    video_stream.value.getTracks().forEach((track) => {
        if (track.readyState == "live") {
            track.stop();
        }
    });
    video.value.srcObject = null;
}

function video_load_callback() {
    console.log("video_load_callback");
    video.value.cancelVideoFrameCallback(animation_handle.value);
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
