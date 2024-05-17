<template>
    <div
        ref="el"
        class="flex-container flex-column"
        :class="{ 'video-portrait': video_is_portrait }"
    >
        <section class="flex-container">
            <div class="flex-container flex-column">
                <video></video>
                <canvas id="tweak"></canvas>
            </div>
            <canvas id="result"></canvas>
        </section>
        <LightpainterControls
            @clear="clear_canvas"
            @save="save_canvas"
            v-model:paint_active="paint_active"
            v-model:tweak_active="tweak_active"
            v-model:tweak_lum="tweak_lum"
            v-model:video_active="video_active"
        ></LightpainterControls>
        <!-- v-model:video_filter_active="video_filter_active" -->
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

.flex-container > video,
.flex-container > canvas#tweak {
    max-width: 32vw;
    max-height: 40vh;
}
.flex-container > canvas#result {
    max-width: 67vw;
    max-height: 80vh;
}

.video-portrait .flex-container > video,
.video-portrait .flex-container > canvas#tweak,
.video-portrait .flex-container > canvas#result {
    transform: rotate(0deg);
    /* transform: rotate(90deg); */
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, watch, reactive } from "vue";
import { date, useQuasar } from "quasar";
import "rvfc-polyfill";

const $q = useQuasar();

import SavedVisuals from "components/SavedVisuals.vue";
import LightpainterControls from "components/LightpainterControls.vue";
import { watchEffect } from "vue";

const el = ref();
const animation_handle = ref(null);

const video = ref();
const media_stream = ref();
const video_track = ref();
const video_active = ref(true);
const video_is_portrait = ref(false);

const canvas_result = ref();
const ctx_result = ref();

const canvas_tweak = ref();
const ctx_tweak = ref();
const tweak_active = ref(true);
const tweak_lum = ref(0.8);

const paint_active = ref(false);
const saved_visuals = ref([]);

function test(event) {
    console.log("mouseout", event);
    // paint_active.value = false;
}

const video_constraints = {
    width: { min: 800, ideal: 1920 },
    height: { min: 600, ideal: 1080 },
    // width: { min: 500, ideal: 500 },
    // height: { min: 800, ideal: 1920 },
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

    canvas_tweak.value = document.querySelector("canvas");
    ctx_tweak.value = canvas_tweak.value.getContext("2d");

    canvas_result.value = document.querySelector("canvas#result");
    ctx_result.value = canvas_result.value.getContext("2d");

    // console.log("canvas_result", canvas_result.value);
    // console.log("ctx_result", ctx_result.value);
    // console.log("canvas_tweak", canvas_tweak.value);
    // console.log("ctx_tweak", ctx_tweak.value);
}

function clear_canvas() {
    console.log("clear_canvas");

    ctx_tweak.value.fillStyle = "#000";
    ctx_tweak.value.fillRect(0, 0, canvas_tweak.value.width, canvas_tweak.value.height);

    const compOp = ctx_result.value.globalCompositeOperation;
    ctx_result.value.globalCompositeOperation = "source-over";
    ctx_result.value.fillStyle = "#000";
    ctx_result.value.fillRect(0, 0, canvas_result.value.width, canvas_result.value.height);
    ctx_result.value.globalCompositeOperation = compOp;
}

function save_canvas() {
    console.log("save_canvas");
    canvas_result.value.toBlob((blob) => {
        const visual = {
            type: "image",
            filename: generate_filename(),
            data: canvas_result.value.toDataURL(),
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
            $q.notify("Starting Camera:" + err);
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

    // set canvas sizes
    canvas_tweak.value.height = track_settings.height;
    canvas_tweak.value.width = track_settings.width;

    canvas_result.value.height = track_settings.height;
    canvas_result.value.width = track_settings.width;
    ctx_result.value.globalCompositeOperation = "lighten";

    video_is_portrait.value = track_settings.height > track_settings.width;
    console.log("video_is_portrait", video_is_portrait.value);
    clear_canvas();

    // console.log("globalCompositeOperation", ctx_result.value.globalCompositeOperation);

    // start processing
    step();
}
function step() {
    if (tweak_active.value) {
        // ctx_tweak.value.rotate((90 * Math.PI) / 180);
        ctx_tweak.value.drawImage(
            video.value,
            0,
            0,
            canvas_tweak.value.width,
            canvas_tweak.value.height
        );
        tweakContrast();
    } else if (paint_active.value) {
        // update the canvas when a video proceeds to next frame
        ctx_result.value.drawImage(
            video.value,
            0,
            0,
            canvas_result.value.width,
            canvas_result.value.height
        );
    }
    animation_handle.value = video.value.requestVideoFrameCallback(step);
}

function easeInExpo(x) {
    // https://easings.net/#easeInExpo
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

// https://cubic-bezier.com/#1,0,1,.02
function bezier(t, initial, p1, p2, final) {
    // https://morethandev.hashnode.dev/demystifying-the-cubic-bezier-function-ft-javascript
    return (
        (1 - t) * (1 - t) * (1 - t) * initial +
        3 * (1 - t) * (1 - t) * t * p1 +
        3 * (1 - t) * t * t * p2 +
        t * t * t * final
    );
}

function bezierSimple(t, p1) {
    // https://morethandev.hashnode.dev/demystifying-the-cubic-bezier-function-ft-javascript
    return 3 * (1 - t) * (1 - t) * t * p1 + t * t * t;
}

function tweakContrast() {
    const imageData = ctx_tweak.value.getImageData(
        0,
        0,
        canvas_tweak.value.width,
        canvas_tweak.value.height
    );
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i + 0];
        let g = data[i + 1];
        let b = data[i + 2];
        // see https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation
        // convert r,g,b [0,255] range to [0,1]
        r = r / 255;
        g = g / 255;
        b = b / 255;
        // get the min and max of r,g,b
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        // lightness is the average of the largest and smallest color components
        const lum = (max + min) / 2;

        // bezier
        // tweak_lum.value
        data[i + 1] = g * bezierSimple(lum, tweak_lum.value) * 255;
        data[i + 0] = r * bezierSimple(lum, tweak_lum.value) * 255;
        data[i + 2] = b * bezierSimple(lum, tweak_lum.value) * 255;

        // if (lum < tweak_lum.value) {
        //     data[i + 0] = 0;
        //     data[i + 1] = 0;
        //     data[i + 2] = 0;
        //     // data[i + 3] = 0;
        // } else {
        //     // data[i + 3] = easeInExpo(lum) * 255;
        //     // data[i + 3] = 255;
        // }
    }
    ctx_tweak.value.putImageData(imageData, 0, 0);
    if (paint_active.value) {
        ctx_result.value.drawImage(canvas_tweak.value, 0, 0);
    }
}
</script>
