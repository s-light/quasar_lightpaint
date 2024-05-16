import { Q as QPage } from "./QPage.e30fc9ad.js";
import { y as openBlock, E as createBlock, C as withCtx, B as createBaseVNode, J as toDisplayString, K as unref, L as createTextVNode } from "./index.29135efd.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_3 = ["href"];
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_5 = ["href"];
const _sfc_main = {
  __name: "AboutPage",
  setup(__props) {
    const appinfo = { "name": "quasar-lightpaint", "version": "0.0.1", "productName": "Quasar LightPaint", "description": "a simple light painting app for webcam & phone use", "projectUrl": "https://github.com/s-light/quasar_lightpaint", "previewUrl": "https://s-light.github.io/quasar_lightpaint/dist/spa/#/" };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, {
        class: "flex column",
        style: { "align-items": "center" }
      }, {
        default: withCtx(() => [
          createBaseVNode("section", null, [
            createBaseVNode("h4", null, toDisplayString(unref(appinfo).productName), 1),
            createBaseVNode("p", null, "version: v" + toDisplayString(unref(appinfo).version), 1),
            createBaseVNode("p", null, [
              createTextVNode(toDisplayString(unref(appinfo).description), 1),
              _hoisted_1,
              createTextVNode(" find the project repository at "),
              _hoisted_2,
              createBaseVNode("a", {
                target: "_blank",
                href: unref(appinfo).projectUrl
              }, toDisplayString(unref(appinfo).projectUrl), 9, _hoisted_3)
            ]),
            createBaseVNode("p", null, [
              createTextVNode(" a live preview version is hosted at"),
              _hoisted_4,
              createBaseVNode("a", {
                target: "_blank",
                href: unref(appinfo).previewUrl
              }, toDisplayString(unref(appinfo).previewUrl), 9, _hoisted_5)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
