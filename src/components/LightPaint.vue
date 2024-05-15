<template>
    <div>
        <video src=""></video>
        <canvas></canvas>
    </div>
</template>

<script setup>
// import { ref, computed } from 'vue'
import "rvfc-polyfill";

let animation_handle;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const video = document.querySelector("video");
video.addEventListener("loadeddata", video_load_callback, false);

function video_load_callback() {
    video.cancelVideoFrameCallback(animation_handle);
    step();
}
function step() {
    // update the canvas when a video proceeds to next frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    animation_handle = video.requestVideoFrameCallback(step);
}
</script>
