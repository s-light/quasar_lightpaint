import { Q as QPage } from "./QPage.851d6b58.js";
import { i as inject, q as quasarKey, r as ref, c as computed, h, u as useSize, k as hMergeSlot, l as hSlot, m as useSizeProps, g as getCurrentInstance, t as toRaw, n as stopAndPrevent, p as createComponent, Q as QIcon, v as useSpinnerProps, x as useSpinner, o as onMounted, w as watch, y as openBlock, z as createElementBlock, B as createBaseVNode, f as createVNode, C as withCtx, D as QBtn, E as createBlock } from "./index.2c8d46fc.js";
import { u as useDark, a as useDarkProps } from "./use-dark.e3a0149a.js";
function useQuasar() {
  return inject(quasarKey);
}
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
var optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,
  modelValue: {
    required: true,
    default: null
  },
  val: {},
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (v) => v === "tf" || v === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
};
const useCheckboxEmits = ["update:modelValue"];
function useCheckbox(type, getInner) {
  const { props, slots, emit, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const isDark = useDark(props, $q);
  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
  const sizeStyle = useSize(props, optionSizes);
  const modelIsArray = computed(
    () => props.val !== void 0 && Array.isArray(props.modelValue)
  );
  const index = computed(() => {
    const val = toRaw(props.val);
    return modelIsArray.value === true ? props.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
  });
  const isTrue = computed(() => modelIsArray.value === true ? index.value !== -1 : toRaw(props.modelValue) === toRaw(props.trueValue));
  const isFalse = computed(() => modelIsArray.value === true ? index.value === -1 : toRaw(props.modelValue) === toRaw(props.falseValue));
  const isIndeterminate = computed(
    () => isTrue.value === false && isFalse.value === false
  );
  const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
  const classes = computed(
    () => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props.disable === true ? " disabled" : "") + (isDark.value === true ? ` q-${type}--dark` : "") + (props.dense === true ? ` q-${type}--dense` : "") + (props.leftLabel === true ? " reverse" : "")
  );
  const innerClass = computed(() => {
    const state = isTrue.value === true ? "truthy" : isFalse.value === true ? "falsy" : "indet";
    const color = props.color !== void 0 && (props.keepColor === true || (type === "toggle" ? isTrue.value === true : isFalse.value !== true)) ? ` text-${props.color}` : "";
    return `q-${type}__inner relative-position non-selectable q-${type}__inner--${state}${color}`;
  });
  const formAttrs = computed(() => {
    const prop = { type: "checkbox" };
    props.name !== void 0 && Object.assign(prop, {
      ".checked": isTrue.value,
      "^checked": isTrue.value === true ? "checked" : void 0,
      name: props.name,
      value: modelIsArray.value === true ? props.val : props.trueValue
    });
    return prop;
  });
  const injectFormInput = useFormInject(formAttrs);
  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: type === "toggle" ? "switch" : "checkbox",
      "aria-label": props.label,
      "aria-checked": isIndeterminate.value === true ? "mixed" : isTrue.value === true ? "true" : "false"
    };
    if (props.disable === true) {
      attrs["aria-disabled"] = "true";
    }
    return attrs;
  });
  function onClick(e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }
    if (props.disable !== true) {
      emit("update:modelValue", getNextValue(), e);
    }
  }
  function getNextValue() {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props.modelValue.slice();
        val.splice(index.value, 1);
        return val;
      }
      return props.modelValue.concat([props.val]);
    }
    if (isTrue.value === true) {
      if (props.toggleOrder !== "ft" || props.toggleIndeterminate === false) {
        return props.falseValue;
      }
    } else if (isFalse.value === true) {
      if (props.toggleOrder === "ft" || props.toggleIndeterminate === false) {
        return props.trueValue;
      }
    } else {
      return props.toggleOrder !== "ft" ? props.trueValue : props.falseValue;
    }
    return props.indeterminateValue;
  }
  function onKeydown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      stopAndPrevent(e);
    }
  }
  function onKeyup(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  }
  const getInnerContent = getInner(isTrue, isIndeterminate);
  Object.assign(proxy, { toggle: onClick });
  return () => {
    const inner = getInnerContent();
    props.disable !== true && injectFormInput(
      inner,
      "unshift",
      ` q-${type}__native absolute q-ma-none q-pa-none`
    );
    const child = [
      h("div", {
        class: innerClass.value,
        style: sizeStyle.value,
        "aria-hidden": "true"
      }, inner)
    ];
    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }
    const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
    label !== void 0 && child.push(
      h("div", {
        class: `q-${type}__label q-anchor--skip`
      }, label)
    );
    return h("div", {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown,
      onKeyup
    }, child);
  };
}
var QToggle = createComponent({
  name: "QToggle",
  props: {
    ...useCheckboxProps,
    icon: String,
    iconColor: String
  },
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || props.icon
      );
      const color = computed(() => isTrue.value === true ? props.iconColor : null);
      return () => [
        h("div", { class: "q-toggle__track" }),
        h(
          "div",
          {
            class: "q-toggle__thumb absolute flex flex-center no-wrap"
          },
          icon.value !== void 0 ? [
            h(QIcon, {
              name: icon.value,
              color: color.value
            })
          ] : void 0
        )
      ];
    }
    return useCheckbox("toggle", getInner);
  }
});
const svg = [
  h("g", {
    fill: "none",
    "fill-rule": "evenodd",
    transform: "translate(1 1)",
    "stroke-width": "2"
  }, [
    h("circle", {
      cx: "22",
      cy: "22",
      r: "6"
    }, [
      h("animate", {
        attributeName: "r",
        begin: "1.5s",
        dur: "3s",
        values: "6;22",
        calcMode: "linear",
        repeatCount: "indefinite"
      }),
      h("animate", {
        attributeName: "stroke-opacity",
        begin: "1.5s",
        dur: "3s",
        values: "1;0",
        calcMode: "linear",
        repeatCount: "indefinite"
      }),
      h("animate", {
        attributeName: "stroke-width",
        begin: "1.5s",
        dur: "3s",
        values: "2;0",
        calcMode: "linear",
        repeatCount: "indefinite"
      })
    ]),
    h("circle", {
      cx: "22",
      cy: "22",
      r: "6"
    }, [
      h("animate", {
        attributeName: "r",
        begin: "3s",
        dur: "3s",
        values: "6;22",
        calcMode: "linear",
        repeatCount: "indefinite"
      }),
      h("animate", {
        attributeName: "stroke-opacity",
        begin: "3s",
        dur: "3s",
        values: "1;0",
        calcMode: "linear",
        repeatCount: "indefinite"
      }),
      h("animate", {
        attributeName: "stroke-width",
        begin: "3s",
        dur: "3s",
        values: "2;0",
        calcMode: "linear",
        repeatCount: "indefinite"
      })
    ]),
    h("circle", {
      cx: "22",
      cy: "22",
      r: "8"
    }, [
      h("animate", {
        attributeName: "r",
        begin: "0s",
        dur: "1.5s",
        values: "6;1;2;3;4;5;6",
        calcMode: "linear",
        repeatCount: "indefinite"
      })
    ])
  ])
];
var QSpinnerRings = createComponent({
  name: "QSpinnerRings",
  props: useSpinnerProps,
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value,
      stroke: "currentColor",
      width: cSize.value,
      height: cSize.value,
      viewBox: "0 0 45 45",
      xmlns: "http://www.w3.org/2000/svg"
    }, svg);
  }
});
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
var LightPaint_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "flex-container" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("video", null, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("canvas", null, null, -1);
const _sfc_main$1 = {
  __name: "LightPaint",
  setup(__props) {
    ref();
    const animation_handle = ref(null);
    const canvas = ref();
    const ctx = ref();
    const video = ref();
    const media_stream = ref();
    const video_track = ref();
    const video_active = ref(true);
    const paint_active = ref(false);
    const video_constraints = {
      width: { min: 640, ideal: 4e3 },
      height: { min: 1e3, ideal: 2e3 },
      frameRate: { max: 30 }
    };
    onMounted(() => {
      console.log("onMounted");
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
      console.log("globalCompositeOperation", ctx.value.globalCompositeOperation);
      ctx.value.globalCompositeOperation = "source-over";
      console.log("globalCompositeOperation", ctx.value.globalCompositeOperation);
      ctx.value.fillStyle = "#000";
      ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
      ctx.value.globalCompositeOperation = compOp;
      console.log("globalCompositeOperation", ctx.value.globalCompositeOperation);
      console.log("clear_canvas done.");
    }
    function save_canvas() {
      console.log("save_canvas");
      console.log("TODO: please implement save!");
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
      navigator.mediaDevices.getUserMedia({
        video: video_constraints,
        audio: false
      }).then(function(stream) {
        media_stream.value = stream;
        console.log("media_stream", media_stream.value);
        video.value.srcObject = stream;
        video.value.play();
        video_track.value = media_stream.value.getVideoTracks()[0];
        console.log("video_track", video_track.value);
      }).catch(function(err) {
        console.log("An error occurred: " + err);
      });
    }
    function stop_cam() {
      media_stream.value.getTracks().forEach((track) => {
        if (track.readyState == "live") {
          track.stop();
        }
      });
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
        ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
      }
      animation_handle.value = video.value.requestVideoFrameCallback(step);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _hoisted_2,
        _hoisted_3,
        createBaseVNode("section", null, [
          createVNode(QToggle, {
            size: "5vh",
            modelValue: video_active.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => video_active.value = $event),
            icon: "videocam"
          }, null, 8, ["modelValue"]),
          createVNode(QToggle, {
            size: "5vh",
            modelValue: paint_active.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => paint_active.value = $event),
            color: "pink",
            icon: "emergency_recording"
          }, null, 8, ["modelValue"]),
          createVNode(QBtn, {
            size: "2vh",
            padding: "xs",
            color: "negative",
            round: "",
            icon: "radio_button_checked",
            loading: paint_active.value,
            onMousedown: _cache[2] || (_cache[2] = ($event) => paint_active.value = true),
            onMouseup: _cache[3] || (_cache[3] = ($event) => paint_active.value = false)
          }, {
            loading: withCtx(() => [
              createVNode(QSpinnerRings)
            ]),
            _: 1
          }, 8, ["loading"]),
          createVNode(QBtn, {
            size: "2vh",
            padding: "xs",
            color: "primary",
            round: "",
            icon: "delete_forever",
            onClick: clear_canvas
          }),
          createVNode(QBtn, {
            size: "2vh",
            padding: "xs",
            color: "primary",
            round: "",
            icon: "save",
            onClick: save_canvas
          })
        ])
      ]);
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
