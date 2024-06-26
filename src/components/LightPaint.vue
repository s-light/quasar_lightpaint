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

@media screen and (orientation: landscape) {
    .video-portrait .flex-container {
        align-items: end;
        position: relative;
    }
    .video-portrait .flex-container > video {
        transform: rotate(-90deg);
        max-height: 32vw;
        max-width: 40vh;
        position: absolute;
        top: calc(32vh - 40vw);
        right: calc((32vw - 40vh) * 0.54);
    }
}
@media screen and (orientation: portrait) {
    .video-portrait .flex-container {
        /* align-items: end; */
        position: relative;
    }
    .video-portrait .flex-container > video {
        /* transform: rotate(-90deg); */
        /* max-height: 32vw; */
        /* max-width: 40vh; */
        /* position: absolute; */
        /* top: calc(32vh - 40vw); */
        /* right: calc((32vw - 40vh) * 0.54); */
    }
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
const device_is_landscape = ref(true);
const orientationEvents = ref([]);

const canvas_result = ref();
const ctx_result = ref();

const canvas_tweak = ref();
const ctx_tweak = ref();
const tweak_active = ref(false);
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
    // ffmpeg -f lavfi -i testsrc=size=1080x1920 -f v4l2 -vcodec rawvideo -pixel_format yuv420p -framerate 15 -video_size 1080x1920 /dev/video61
    // width: { ideal: 1080 },
    // height: { ideal: 1920 },
    // width: { min: 1, max: 1080 },
    // height: { min: 1100, max: 2000 },
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
    // console.log("onMounted");
    // el.value; // <div>
    setup_canvas();
    setup_cam();
    start_cam();

    document.addEventListener("keydown", handleGlobalKeydown);
    // https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/change_event
    screen.orientation.addEventListener("change", handleScreenOrientationChange);

    update_device_is_landscape();
});
onUnmounted(() => {
    // console.log("onUnmounted");
    try {
        console.log("remove event listener..");
        document.removeEventListener("keydown", handleGlobalKeydown);
        screen.orientation.removeEventListener("change", handleScreenOrientationChange);
    } catch (error) {
        console.log(error);
    }
});

function handleScreenOrientationChange(event) {
    console.log("screen.orientation 'change'", event);
    handleOrientationChange();
}

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

function update_device_is_landscape() {
    if (screen.orientation.type.startsWith("landscape")) {
        device_is_landscape.value = true;
    } else {
        // device in landscape mode
        device_is_landscape.value = false;
    }
    console.log("device_is_landscape", device_is_landscape.value);
}

function handleOrientationChange(event) {
    console.log("handleOrientationChange", screen.orientation);
    update_device_is_landscape();
    if (video_track.value) {
        video_load_callback();
    }
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

    video_is_portrait.value = track_settings.height > track_settings.width;
    console.log("video_is_portrait", video_is_portrait.value);
    update_device_is_landscape();

    if (video_is_portrait.value && device_is_landscape.value) {
        canvas_tweak.value.height = track_settings.width;
        canvas_tweak.value.width = track_settings.height;

        canvas_result.value.height = track_settings.width;
        canvas_result.value.width = track_settings.height;
    } else {
        // set canvas sizes
        canvas_tweak.value.height = track_settings.height;
        canvas_tweak.value.width = track_settings.width;

        canvas_result.value.height = track_settings.height;
        canvas_result.value.width = track_settings.width;
    }
    ctx_result.value.globalCompositeOperation = "lighten";

    clear_canvas();

    // console.log("globalCompositeOperation", ctx_result.value.globalCompositeOperation);

    // start processing
    step();
}
function step() {
    // update the canvas when a video proceeds to next frame
    if (tweak_active.value) {
        if (video_is_portrait.value && device_is_landscape.value) {
            ctx_tweak.value.save();
            ctx_tweak.value.translate(0, canvas_tweak.value.height);
            ctx_tweak.value.rotate((-90 * Math.PI) / 180);
            ctx_tweak.value.drawImage(video.value, 0, 0);
            ctx_tweak.value.restore();
        } else {
            ctx_tweak.value.drawImage(video.value, 0, 0);
        }
        tweakContrast();
    } else if (paint_active.value) {
        // ctx_result.value.drawImage(
        //     video.value,
        //     0,
        //     0,
        //     canvas_result.value.width,
        //     canvas_result.value.height
        // );
        if (video_is_portrait.value && device_is_landscape.value) {
            ctx_result.value.save();
            ctx_result.value.translate(0, canvas_result.value.height);
            ctx_result.value.rotate((-90 * Math.PI) / 180);
            ctx_result.value.drawImage(video.value, 0, 0);
            ctx_result.value.restore();
        } else {
            ctx_result.value.drawImage(video.value, 0, 0);
        }
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
