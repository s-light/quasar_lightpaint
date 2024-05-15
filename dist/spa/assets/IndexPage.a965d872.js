import { Q as QPage } from "./QPage.5d8a4d59.js";
import { i as inject, q as quasarKey, k as openBlock, l as createElementBlock, m as createBaseVNode, n as createBlock, p as withCtx, f as createVNode } from "./index.ac0898f0.js";
function useQuasar() {
  return inject(quasarKey);
}
if (typeof HTMLVideoElement !== "undefined" && !("requestVideoFrameCallback" in HTMLVideoElement.prototype) && "getVideoPlaybackQuality" in HTMLVideoElement.prototype) {
  HTMLVideoElement.prototype._rvfcpolyfillmap = {};
  HTMLVideoElement.prototype.requestVideoFrameCallback = function(callback) {
    const handle = performance.now();
    const quality = this.getVideoPlaybackQuality();
    const baseline = this.mozPresentedFrames || this.mozPaintedFrames || quality.totalVideoFrames - quality.droppedVideoFrames;
    const check = (old, now) => {
      const newquality = this.getVideoPlaybackQuality();
      const presentedFrames = this.mozPresentedFrames || this.mozPaintedFrames || newquality.totalVideoFrames - newquality.droppedVideoFrames;
      if (presentedFrames > baseline) {
        const processingDuration = this.mozFrameDelay || newquality.totalFrameDelay - quality.totalFrameDelay || 0;
        const timediff = now - old;
        callback(now, {
          presentationTime: now + processingDuration * 1e3,
          expectedDisplayTime: now + timediff,
          width: this.videoWidth,
          height: this.videoHeight,
          mediaTime: Math.max(0, this.currentTime || 0) + timediff / 1e3,
          presentedFrames,
          processingDuration
        });
        delete this._rvfcpolyfillmap[handle];
      } else {
        this._rvfcpolyfillmap[handle] = requestAnimationFrame((newer) => check(now, newer));
      }
    };
    this._rvfcpolyfillmap[handle] = requestAnimationFrame((newer) => check(handle, newer));
    return handle;
  };
  HTMLVideoElement.prototype.cancelVideoFrameCallback = function(handle) {
    cancelAnimationFrame(this._rvfcpolyfillmap[handle]);
    delete this._rvfcpolyfillmap[handle];
  };
}
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("video", { src: "" }, null, -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("canvas", null, null, -1);
const _hoisted_3 = [
  _hoisted_1,
  _hoisted_2
];
const _sfc_main$1 = {
  __name: "LightPaint",
  setup(__props) {
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
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      animation_handle = video.requestVideoFrameCallback(step);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, _hoisted_3);
    };
  }
};
const _sfc_main = {
  __name: "IndexPage",
  setup(__props) {
    const $q = useQuasar();
    $q.dark.set(true);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "flex flex-center content-stretch" }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1)
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
