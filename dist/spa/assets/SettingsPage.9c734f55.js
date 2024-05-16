import { Q as QPage } from "./QPage.e30fc9ad.js";
import { y as openBlock, E as createBlock, C as withCtx, B as createBaseVNode, J as toDisplayString, K as unref } from "./index.29135efd.js";
const _sfc_main = {
  __name: "SettingsPage",
  setup(__props) {
    const appinfo = { "name": "quasar-lightpaint", "version": "0.0.1", "productName": "Quasar LightPaint", "description": "a simple light painting app for webcam & phone use", "projectUrl": "https://github.com/s-light/quasar_lightpaint", "previewUrl": "https://s-light.github.io/quasar_lightpaint/dist/spa/#/" };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, {
        class: "flex column",
        style: { "align-items": "center" }
      }, {
        default: withCtx(() => [
          createBaseVNode("section", null, [
            createBaseVNode("h4", null, toDisplayString(unref(appinfo).productName), 1)
          ])
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
