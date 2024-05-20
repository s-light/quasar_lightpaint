import { c as computed, ah as Platform, w as watch, ai as vmHasRouter, o as onMounted, g as getCurrentInstance, L as nextTick, X as onDeactivated, N as onBeforeUnmount, Y as vmIsDestroyed, aj as css, ak as getElement, al as createDirective, Z as client, am as noop, an as leftClick, M as addEvt, ao as preventDraggable, K as prevent, ap as stop, a2 as position, O as cleanEvt, G as stopAndPrevent } from "./index.2f56bee1.js";
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v));
}
function pad(v, length = 2, char = "0") {
  if (v === void 0 || v === null) {
    return v;
  }
  const val = "" + v;
  return val.length >= length ? val : new Array(length - val.length + 1).join(char) + val;
}
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props, $q) {
  return computed(() => props.dark === null ? $q.dark.isActive : props.dark);
}
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
function useTimeout() {
  let timer = null;
  const vm = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null;
          fn();
        }, delay);
      }
    }
  };
}
const scrollTargetProp = [Element, String];
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
const modifiersAll = {
  left: true,
  right: true,
  up: true,
  down: true,
  horizontal: true,
  vertical: true
};
const directionList = Object.keys(modifiersAll);
modifiersAll.all = true;
function getModifierDirections(mod) {
  const dir = {};
  for (const direction of directionList) {
    if (mod[direction] === true) {
      dir[direction] = true;
    }
  }
  if (Object.keys(dir).length === 0) {
    return modifiersAll;
  }
  if (dir.horizontal === true) {
    dir.left = dir.right = true;
  } else if (dir.left === true && dir.right === true) {
    dir.horizontal = true;
  }
  if (dir.vertical === true) {
    dir.up = dir.down = true;
  } else if (dir.up === true && dir.down === true) {
    dir.vertical = true;
  }
  if (dir.horizontal === true && dir.vertical === true) {
    dir.all = true;
  }
  return dir;
}
const avoidNodeNamesList = ["INPUT", "TEXTAREA"];
function shouldStart(evt, ctx) {
  return ctx.event === void 0 && evt.target !== void 0 && evt.target.draggable !== true && typeof ctx.handler === "function" && avoidNodeNamesList.includes(evt.target.nodeName.toUpperCase()) === false && (evt.qClonedBy === void 0 || evt.qClonedBy.indexOf(ctx.uid) === -1);
}
function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir, distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y, absX = Math.abs(distX), absY = Math.abs(distY);
  const direction = ctx.direction;
  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? "left" : "right";
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? "up" : "down";
  } else if (direction.up === true && distY < 0) {
    dir = "up";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = "down";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = "left";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = "right";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  }
  let synthetic = false;
  if (dir === void 0 && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === void 0) {
      return {};
    }
    dir = ctx.event.lastDir;
    synthetic = true;
    if (dir === "left" || dir === "right") {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }
  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY
      },
      offset: {
        x: distX,
        y: distY
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY
      }
    }
  };
}
let uid = 0;
var TouchPan = createDirective(
  {
    name: "touch-pan",
    beforeMount(el, { value: value2, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) {
        return;
      }
      function handleEvent(evt, mouseEvent) {
        if (modifiers.mouse === true && mouseEvent === true) {
          stopAndPrevent(evt);
        } else {
          modifiers.stop === true && stop(evt);
          modifiers.prevent === true && prevent(evt);
        }
      }
      const ctx = {
        uid: "qvtp_" + uid++,
        handler: value2,
        modifiers,
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", "notPassiveCapture"],
              [document, "mouseup", "end", "passiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "passiveCapture"],
              [target, "touchend", "end", "passiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          ctx.lastEvt = evt;
          if (mouseEvent === true || modifiers.stop === true) {
            if (ctx.direction.all !== true && (mouseEvent !== true || ctx.modifiers.mouseAllDir !== true && ctx.modifiers.mousealldir !== true)) {
              const clone = evt.type.indexOf("mouse") !== -1 ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);
              evt.defaultPrevented === true && prevent(clone);
              evt.cancelBubble === true && stop(clone);
              Object.assign(clone, {
                qKeyEvent: evt.qKeyEvent,
                qClickOutside: evt.qClickOutside,
                qAnchorHandled: evt.qAnchorHandled,
                qClonedBy: evt.qClonedBy === void 0 ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid)
              });
              ctx.initialEvent = {
                target: evt.target,
                event: clone
              };
            }
            stop(evt);
          }
          const { left, top } = position(evt);
          ctx.event = {
            x: left,
            y: top,
            time: Date.now(),
            mouse: mouseEvent === true,
            detected: false,
            isFirst: true,
            isFinal: false,
            lastX: left,
            lastY: top
          };
        },
        move(evt) {
          if (ctx.event === void 0) {
            return;
          }
          const pos = position(evt), distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y;
          if (distX === 0 && distY === 0) {
            return;
          }
          ctx.lastEvt = evt;
          const isMouseEvt = ctx.event.mouse === true;
          const start = () => {
            handleEvent(evt, isMouseEvt);
            let cursor;
            if (modifiers.preserveCursor !== true && modifiers.preservecursor !== true) {
              cursor = document.documentElement.style.cursor || "";
              document.documentElement.style.cursor = "grabbing";
            }
            isMouseEvt === true && document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelayedFn) => {
              ctx.styleCleanup = void 0;
              if (cursor !== void 0) {
                document.documentElement.style.cursor = cursor;
              }
              document.body.classList.remove("non-selectable");
              if (isMouseEvt === true) {
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelayedFn !== void 0) {
                  setTimeout(() => {
                    remove();
                    withDelayedFn();
                  }, 50);
                } else {
                  remove();
                }
              } else if (withDelayedFn !== void 0) {
                withDelayedFn();
              }
            };
          };
          if (ctx.event.detected === true) {
            ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);
            const { payload, synthetic } = getChanges(evt, ctx, false);
            if (payload !== void 0) {
              if (ctx.handler(payload) === false) {
                ctx.end(evt);
              } else {
                if (ctx.styleCleanup === void 0 && ctx.event.isFirst === true) {
                  start();
                }
                ctx.event.lastX = payload.position.left;
                ctx.event.lastY = payload.position.top;
                ctx.event.lastDir = synthetic === true ? void 0 : payload.direction;
                ctx.event.isFirst = false;
              }
            }
            return;
          }
          if (ctx.direction.all === true || isMouseEvt === true && (ctx.modifiers.mouseAllDir === true || ctx.modifiers.mousealldir === true)) {
            start();
            ctx.event.detected = true;
            ctx.move(evt);
            return;
          }
          const absX = Math.abs(distX), absY = Math.abs(distY);
          if (absX !== absY) {
            if (ctx.direction.horizontal === true && absX > absY || ctx.direction.vertical === true && absX < absY || ctx.direction.up === true && absX < absY && distY < 0 || ctx.direction.down === true && absX < absY && distY > 0 || ctx.direction.left === true && absX > absY && distX < 0 || ctx.direction.right === true && absX > absY && distX > 0) {
              ctx.event.detected = true;
              ctx.move(evt);
            } else {
              ctx.end(evt, true);
            }
          }
        },
        end(evt, abort) {
          if (ctx.event === void 0) {
            return;
          }
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          if (abort === true) {
            ctx.styleCleanup !== void 0 && ctx.styleCleanup();
            if (ctx.event.detected !== true && ctx.initialEvent !== void 0) {
              ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
            }
          } else if (ctx.event.detected === true) {
            ctx.event.isFirst === true && ctx.handler(getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx).payload);
            const { payload } = getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx, true);
            const fn = () => {
              ctx.handler(payload);
            };
            if (ctx.styleCleanup !== void 0) {
              ctx.styleCleanup(fn);
            } else {
              fn();
            }
          }
          ctx.event = void 0;
          ctx.initialEvent = void 0;
          ctx.lastEvt = void 0;
        }
      };
      el.__qtouchpan = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        ctx.event !== void 0 && ctx.end();
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup();
        delete el.__qtouchpan;
      }
    }
  }
);
export { TouchPan as T, useDarkProps as a, clearSelection as b, capitalize as c, useModelToggleProps as d, useModelToggleEmits as e, useTimeout as f, getScrollbarWidth as g, useModelToggle as h, getScrollTarget as i, between as j, getHorizontalScrollPosition as k, getVerticalScrollPosition as l, hasScrollbar as m, pad as p, scrollTargetProp as s, useDark as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG91Y2hQYW4uY2IzYzVjZjcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtdGltZW91dC91c2UtdGltZW91dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3Njcm9sbC9zY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnRvdWNoL3RvdWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy90b3VjaC1wYW4vVG91Y2hQYW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdW5pdHMgPSBbICdCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiBodW1hblN0b3JhZ2VTaXplIChieXRlcywgZGVjaW1hbHMgPSAxKSB7XG4gIGxldCB1ID0gMFxuXG4gIHdoaWxlIChwYXJzZUludChieXRlcywgMTApID49IDEwMjQgJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpIHtcbiAgICBieXRlcyAvPSAxMDI0XG4gICAgKyt1XG4gIH1cblxuICByZXR1cm4gYCR7IGJ5dGVzLnRvRml4ZWQoZGVjaW1hbHMpIH0keyB1bml0c1sgdSBdIH1gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmV0d2VlbiAodiwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIG1heCA8PSBtaW5cbiAgICA/IG1pblxuICAgIDogTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHYpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVG9JbnRlcnZhbCAodiwgbWluLCBtYXgpIHtcbiAgaWYgKG1heCA8PSBtaW4pIHtcbiAgICByZXR1cm4gbWluXG4gIH1cblxuICBjb25zdCBzaXplID0gKG1heCAtIG1pbiArIDEpXG5cbiAgbGV0IGluZGV4ID0gbWluICsgKHYgLSBtaW4pICUgc2l6ZVxuICBpZiAoaW5kZXggPCBtaW4pIHtcbiAgICBpbmRleCA9IHNpemUgKyBpbmRleFxuICB9XG5cbiAgcmV0dXJuIGluZGV4ID09PSAwID8gMCA6IGluZGV4IC8vIGZpeCBmb3IgKC1hICUgYSkgPT4gLTBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhZCAodiwgbGVuZ3RoID0gMiwgY2hhciA9ICcwJykge1xuICBpZiAodiA9PT0gdm9pZCAwIHx8IHYgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdlxuICB9XG5cbiAgY29uc3QgdmFsID0gJycgKyB2XG4gIHJldHVybiB2YWwubGVuZ3RoID49IGxlbmd0aFxuICAgID8gdmFsXG4gICAgOiBuZXcgQXJyYXkobGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oY2hhcikgKyB2YWxcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBodW1hblN0b3JhZ2VTaXplLFxuICBjYXBpdGFsaXplLFxuICBiZXR3ZWVuLFxuICBub3JtYWxpemVUb0ludGVydmFsLFxuICBwYWRcbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlRGFya1Byb3BzID0ge1xuICBkYXJrOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCAkcSkge1xuICAvLyByZXR1cm4gaXNEYXJrXG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZGFyayA9PT0gbnVsbFxuICAgICAgPyAkcS5kYXJrLmlzQWN0aXZlXG4gICAgICA6IHByb3BzLmRhcmtcbiAgKSlcbn1cbiIsImltcG9ydCBQbGF0Zm9ybSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24gKCkge1xuICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgaWYgKHNlbGVjdGlvbi5lbXB0eSAhPT0gdm9pZCAwKSB7XG4gICAgICBzZWxlY3Rpb24uZW1wdHkoKVxuICAgIH1cbiAgICBlbHNlIGlmIChzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzICE9PSB2b2lkIDApIHtcbiAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgUGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlICYmIHNlbGVjdGlvbi5hZGRSYW5nZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpKVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gIT09IHZvaWQgMCkge1xuICAgIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpXG4gIH1cbn1cbiIsImltcG9ydCB7IHdhdGNoLCBuZXh0VGljaywgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcblxuICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IFsgRnVuY3Rpb24sIEFycmF5IF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlRW1pdHMgPSBbXG4gICdiZWZvcmVTaG93JywgJ3Nob3cnLCAnYmVmb3JlSGlkZScsICdoaWRlJ1xuXVxuXG4vLyBoYW5kbGVTaG93L2hhbmRsZUhpZGUgLT4gcmVtb3ZlVGljaygpLCBzZWxmICgmIGVtaXQgc2hvdylcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgY2FuU2hvdywgLy8gb3B0aW9uYWxcbiAgaGlkZU9uUm91dGVDaGFuZ2UsIC8vIG9wdGlvbmFsXG4gIGhhbmRsZVNob3csIC8vIG9wdGlvbmFsXG4gIGhhbmRsZUhpZGUsIC8vIG9wdGlvbmFsXG4gIHByb2Nlc3NPbk1vdW50IC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IHBheWxvYWRcblxuICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBoaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93IChldnQpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCAoZXZ0ICE9PSB2b2lkIDAgJiYgZXZ0LnFBbmNob3JIYW5kbGVkID09PSB0cnVlKVxuICAgICAgfHwgKGNhblNob3cgIT09IHZvaWQgMCAmJiBjYW5TaG93KGV2dCkgIT09IHRydWUpXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc1Nob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTaG93IChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IHRydWVcblxuICAgIGVtaXQoJ2JlZm9yZVNob3cnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlU2hvdyAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVTaG93KGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKGV2dCkge1xuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gfHwgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuXG4gICAgaWYgKGxpc3RlbmVyID09PSB0cnVlICYmIF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzSGlkZShldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0hpZGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IGZhbHNlXG5cbiAgICBlbWl0KCdiZWZvcmVIaWRlJywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZUhpZGUgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlSGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzTW9kZWxDaGFuZ2UgKHZhbCkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlICYmIHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2YWwgPT09IHRydWUpICE9PSBzaG93aW5nLnZhbHVlKSB7XG4gICAgICBjb25zdCBmbiA9IHZhbCA9PT0gdHJ1ZSA/IHByb2Nlc3NTaG93IDogcHJvY2Vzc0hpZGVcbiAgICAgIGZuKHBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgcHJvY2Vzc01vZGVsQ2hhbmdlKVxuXG4gIGlmIChoaWRlT25Sb3V0ZUNoYW5nZSAhPT0gdm9pZCAwICYmIHZtSGFzUm91dGVyKHZtKSA9PT0gdHJ1ZSkge1xuICAgIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgICAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaGlkZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByb2Nlc3NPbk1vdW50ID09PSB0cnVlICYmIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJvY2Vzc01vZGVsQ2hhbmdlKHByb3BzLm1vZGVsVmFsdWUpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIGNvbnN0IHB1YmxpY01ldGhvZHMgPSB7IHNob3csIGhpZGUsIHRvZ2dsZSB9XG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHB1YmxpY01ldGhvZHMpXG5cbiAgcmV0dXJuIHB1YmxpY01ldGhvZHNcbn1cbiIsImltcG9ydCB7IG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaW1lb3V0KGZuWywgZGVsYXldKVxuICogICAgcmVtb3ZlVGltZW91dCgpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGltZXIgPSBudWxsXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaW1lb3V0ICgpIHtcbiAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHRpbWVyID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGltZW91dClcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpbWVvdXQpXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaW1lb3V0LFxuXG4gICAgcmVnaXN0ZXJUaW1lb3V0IChmbiwgZGVsYXkpIHtcbiAgICAgIHJlbW92ZVRpbWVvdXQodGltZXIpXG5cbiAgICAgIGlmICh2bUlzRGVzdHJveWVkKHZtKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgICBmbigpXG4gICAgICAgIH0sIGRlbGF5KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgY3NzLCBnZXRFbGVtZW50IH0gZnJvbSAnLi4vZG9tL2RvbS5qcydcblxuZXhwb3J0IGNvbnN0IHNjcm9sbFRhcmdldFByb3AgPSBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7fSAvKiBTU1IgZG9lcyBub3Qga25vdyBhYm91dCBFbGVtZW50ICovXG4gIDogWyBFbGVtZW50LCBTdHJpbmcgXVxuXG5jb25zdCBzY3JvbGxUYXJnZXRzID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8gW11cbiAgOiBbIG51bGwsIGRvY3VtZW50LCBkb2N1bWVudC5ib2R5LCBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsVGFyZ2V0IChlbCwgdGFyZ2V0RWwpIHtcbiAgbGV0IHRhcmdldCA9IGdldEVsZW1lbnQodGFyZ2V0RWwpXG5cbiAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7XG4gICAgaWYgKGVsID09PSB2b2lkIDAgfHwgZWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB3aW5kb3dcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBlbC5jbG9zZXN0KCcuc2Nyb2xsLC5zY3JvbGwteSwub3ZlcmZsb3ctYXV0bycpXG4gIH1cblxuICByZXR1cm4gc2Nyb2xsVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpXG4gICAgPyB3aW5kb3dcbiAgICA6IHRhcmdldFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0IChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbEhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsV2lkdGggKGVsKSB7XG4gIHJldHVybiAoZWwgPT09IHdpbmRvdyA/IGRvY3VtZW50LmJvZHkgOiBlbCkuc2Nyb2xsV2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCkge1xuICByZXR1cm4gc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwXG4gICAgOiBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCkge1xuICByZXR1cm4gc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbExlZnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1WZXJ0aWNhbFNjcm9sbFRvIChlbCwgdG8sIGR1cmF0aW9uID0gMCAvKiAsIHByZXZUaW1lICovKSB7XG4gIGNvbnN0IHByZXZUaW1lID0gYXJndW1lbnRzWyAzIF0gPT09IHZvaWQgMCA/IHBlcmZvcm1hbmNlLm5vdygpIDogYXJndW1lbnRzWyAzIF1cbiAgY29uc3QgcG9zID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRTY3JvbGwoZWwsIHRvKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShub3dUaW1lID0+IHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSBub3dUaW1lIC0gcHJldlRpbWVcbiAgICBjb25zdCBuZXdQb3MgPSBwb3MgKyAodG8gLSBwb3MpIC8gTWF0aC5tYXgoZnJhbWVUaW1lLCBkdXJhdGlvbikgKiBmcmFtZVRpbWVcbiAgICBzZXRTY3JvbGwoZWwsIG5ld1BvcylcbiAgICBpZiAobmV3UG9zICE9PSB0bykge1xuICAgICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oZWwsIHRvLCBkdXJhdGlvbiAtIGZyYW1lVGltZSwgbm93VGltZSlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltSG9yaXpvbnRhbFNjcm9sbFRvIChlbCwgdG8sIGR1cmF0aW9uID0gMCAvKiAsIHByZXZUaW1lICovKSB7XG4gIGNvbnN0IHByZXZUaW1lID0gYXJndW1lbnRzWyAzIF0gPT09IHZvaWQgMCA/IHBlcmZvcm1hbmNlLm5vdygpIDogYXJndW1lbnRzWyAzIF1cbiAgY29uc3QgcG9zID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKGVsKVxuXG4gIGlmIChkdXJhdGlvbiA8PSAwKSB7XG4gICAgaWYgKHBvcyAhPT0gdG8pIHtcbiAgICAgIHNldEhvcml6b250YWxTY3JvbGwoZWwsIHRvKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShub3dUaW1lID0+IHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSBub3dUaW1lIC0gcHJldlRpbWVcbiAgICBjb25zdCBuZXdQb3MgPSBwb3MgKyAodG8gLSBwb3MpIC8gTWF0aC5tYXgoZnJhbWVUaW1lLCBkdXJhdGlvbikgKiBmcmFtZVRpbWVcbiAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oZWwsIHRvLCBkdXJhdGlvbiAtIGZyYW1lVGltZSwgbm93VGltZSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNldFNjcm9sbCAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpIHtcbiAgaWYgKHNjcm9sbFRhcmdldCA9PT0gd2luZG93KSB7XG4gICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgb2Zmc2V0KVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxUb3AgPSBvZmZzZXRcbn1cblxuZnVuY3Rpb24gc2V0SG9yaXpvbnRhbFNjcm9sbCAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpIHtcbiAgaWYgKHNjcm9sbFRhcmdldCA9PT0gd2luZG93KSB7XG4gICAgd2luZG93LnNjcm9sbFRvKG9mZnNldCwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApXG4gICAgcmV0dXJuXG4gIH1cbiAgc2Nyb2xsVGFyZ2V0LnNjcm9sbExlZnQgPSBvZmZzZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCwgb2Zmc2V0LCBkdXJhdGlvbikge1xuICBpZiAoZHVyYXRpb24pIHtcbiAgICBhbmltVmVydGljYWxTY3JvbGxUbyhzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgcmV0dXJuXG4gIH1cbiAgc2V0U2Nyb2xsKHNjcm9sbFRhcmdldCwgb2Zmc2V0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbUhvcml6b250YWxTY3JvbGxUbyhzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgcmV0dXJuXG4gIH1cbiAgc2V0SG9yaXpvbnRhbFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxubGV0IHNpemVcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCAoKSB7XG4gIGlmIChzaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc2l6ZVxuICB9XG5cbiAgY29uc3RcbiAgICBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSxcbiAgICBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgY3NzKGlubmVyLCB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcyMDBweCdcbiAgfSlcbiAgY3NzKG91dGVyLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMHB4JyxcbiAgICBsZWZ0OiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICB3aWR0aDogJzIwMHB4JyxcbiAgICBoZWlnaHQ6ICcxNTBweCcsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gIH0pXG5cbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcilcblxuICBjb25zdCB3MSA9IGlubmVyLm9mZnNldFdpZHRoXG4gIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcbiAgbGV0IHcyID0gaW5uZXIub2Zmc2V0V2lkdGhcblxuICBpZiAodzEgPT09IHcyKSB7XG4gICAgdzIgPSBvdXRlci5jbGllbnRXaWR0aFxuICB9XG5cbiAgb3V0ZXIucmVtb3ZlKClcbiAgc2l6ZSA9IHcxIC0gdzJcblxuICByZXR1cm4gc2l6ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzU2Nyb2xsYmFyIChlbCwgb25ZID0gdHJ1ZSkge1xuICBpZiAoIWVsIHx8IGVsLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIG9uWVxuICAgID8gKFxuICAgICAgICBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXknIF0pXG4gICAgICAgIClcbiAgICAgIClcbiAgICA6IChcbiAgICAgICAgZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCAmJiAoXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzY3JvbGwnKVxuICAgICAgICAgIHx8IGVsLmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmZsb3ctYXV0bycpXG4gICAgICAgICAgfHwgWyAnYXV0bycsICdzY3JvbGwnIF0uaW5jbHVkZXMod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpWyAnb3ZlcmZsb3cteCcgXSlcbiAgICAgICAgKVxuICAgICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFNjcm9sbFRhcmdldCxcblxuICBnZXRTY3JvbGxIZWlnaHQsXG4gIGdldFNjcm9sbFdpZHRoLFxuXG4gIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sXG4gIGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbixcblxuICBhbmltVmVydGljYWxTY3JvbGxUbyxcbiAgYW5pbUhvcml6b250YWxTY3JvbGxUbyxcblxuICBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgZ2V0U2Nyb2xsYmFyV2lkdGgsXG4gIGhhc1Njcm9sbGJhclxufVxuIiwiY29uc3QgbW9kaWZpZXJzQWxsID0ge1xuICBsZWZ0OiB0cnVlLFxuICByaWdodDogdHJ1ZSxcbiAgdXA6IHRydWUsXG4gIGRvd246IHRydWUsXG4gIGhvcml6b250YWw6IHRydWUsXG4gIHZlcnRpY2FsOiB0cnVlXG59XG5cbmNvbnN0IGRpcmVjdGlvbkxpc3QgPSBPYmplY3Qua2V5cyhtb2RpZmllcnNBbGwpXG5cbm1vZGlmaWVyc0FsbC5hbGwgPSB0cnVlXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RpZmllckRpcmVjdGlvbnMgKG1vZCkge1xuICBjb25zdCBkaXIgPSB7fVxuXG4gIGZvciAoY29uc3QgZGlyZWN0aW9uIG9mIGRpcmVjdGlvbkxpc3QpIHtcbiAgICBpZiAobW9kWyBkaXJlY3Rpb24gXSA9PT0gdHJ1ZSkge1xuICAgICAgZGlyWyBkaXJlY3Rpb24gXSA9IHRydWVcbiAgICB9XG4gIH1cblxuICBpZiAoT2JqZWN0LmtleXMoZGlyKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbW9kaWZpZXJzQWxsXG4gIH1cblxuICBpZiAoZGlyLmhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICBkaXIubGVmdCA9IGRpci5yaWdodCA9IHRydWVcbiAgfVxuICBlbHNlIGlmIChkaXIubGVmdCA9PT0gdHJ1ZSAmJiBkaXIucmlnaHQgPT09IHRydWUpIHtcbiAgICBkaXIuaG9yaXpvbnRhbCA9IHRydWVcbiAgfVxuXG4gIGlmIChkaXIudmVydGljYWwgPT09IHRydWUpIHtcbiAgICBkaXIudXAgPSBkaXIuZG93biA9IHRydWVcbiAgfVxuICBlbHNlIGlmIChkaXIudXAgPT09IHRydWUgJiYgZGlyLmRvd24gPT09IHRydWUpIHtcbiAgICBkaXIudmVydGljYWwgPSB0cnVlXG4gIH1cblxuICBpZiAoZGlyLmhvcml6b250YWwgPT09IHRydWUgJiYgZGlyLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgZGlyLmFsbCA9IHRydWVcbiAgfVxuXG4gIHJldHVybiBkaXJcbn1cblxuLy8gVGhpcyBpcyBlc3BlY2lhbGx5IGltcG9ydGFudCAobm90IHRoZSBtYWluIHJlYXNvbiwgYnV0IGltcG9ydGFudClcbi8vIGZvciBUb3VjaFN3aXBlIGRpcmVjdGl2ZSBydW5uaW5nIG9uIEZpcmVmb3hcbi8vIGJlY2F1c2UgdGV4dCBzZWxlY3Rpb24gb24gc3VjaCBlbGVtZW50cyBjYW5ub3QgYmUgZGV0ZXJtaW5lZFxuLy8gd2l0aG91dCBhZGRpdGlvbmFsIHdvcmsgKG9uIHRvcCBvZiBnZXRTZWxlY3Rpb24oKSBBUEkpXG4vLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04NTY4NlxuY29uc3QgYXZvaWROb2RlTmFtZXNMaXN0ID0gWyAnSU5QVVQnLCAnVEVYVEFSRUEnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFN0YXJ0IChldnQsIGN0eCkge1xuICByZXR1cm4gY3R4LmV2ZW50ID09PSB2b2lkIDBcbiAgICAmJiBldnQudGFyZ2V0ICE9PSB2b2lkIDBcbiAgICAmJiBldnQudGFyZ2V0LmRyYWdnYWJsZSAhPT0gdHJ1ZVxuICAgICYmIHR5cGVvZiBjdHguaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIGF2b2lkTm9kZU5hbWVzTGlzdC5pbmNsdWRlcyhldnQudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkpID09PSBmYWxzZVxuICAgICYmIChldnQucUNsb25lZEJ5ID09PSB2b2lkIDAgfHwgZXZ0LnFDbG9uZWRCeS5pbmRleE9mKGN0eC51aWQpID09PSAtMSlcbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldE1vZGlmaWVyRGlyZWN0aW9ucywgc2hvdWxkU3RhcnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnRvdWNoL3RvdWNoLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcG9zaXRpb24sIGxlZnRDbGljaywgcHJldmVudCwgc3RvcCwgc3RvcEFuZFByZXZlbnQsIHByZXZlbnREcmFnZ2FibGUsIG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUubm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5mdW5jdGlvbiBnZXRDaGFuZ2VzIChldnQsIGN0eCwgaXNGaW5hbCkge1xuICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG4gIGxldFxuICAgIGRpcixcbiAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgZGlzdFkgPSBwb3MudG9wIC0gY3R4LmV2ZW50LnksXG4gICAgYWJzWCA9IE1hdGguYWJzKGRpc3RYKSxcbiAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgY29uc3QgZGlyZWN0aW9uID0gY3R4LmRpcmVjdGlvblxuXG4gIGlmIChkaXJlY3Rpb24uaG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBkaXJlY3Rpb24udmVydGljYWwgIT09IHRydWUpIHtcbiAgICBkaXIgPSBkaXN0WCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnXG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLmhvcml6b250YWwgIT09IHRydWUgJiYgZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgZGlyID0gZGlzdFkgPCAwID8gJ3VwJyA6ICdkb3duJ1xuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi51cCA9PT0gdHJ1ZSAmJiBkaXN0WSA8IDApIHtcbiAgICBkaXIgPSAndXAnXG4gICAgaWYgKGFic1ggPiBhYnNZKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLmxlZnQgPT09IHRydWUgJiYgZGlzdFggPCAwKSB7XG4gICAgICAgIGRpciA9ICdsZWZ0J1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlICYmIGRpc3RYID4gMCkge1xuICAgICAgICBkaXIgPSAncmlnaHQnXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgIGRpciA9ICdkb3duJ1xuICAgIGlmIChhYnNYID4gYWJzWSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGRpc3RYIDwgMCkge1xuICAgICAgICBkaXIgPSAnbGVmdCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBkaXN0WCA+IDApIHtcbiAgICAgICAgZGlyID0gJ3JpZ2h0J1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZSAmJiBkaXN0WCA8IDApIHtcbiAgICBkaXIgPSAnbGVmdCdcbiAgICBpZiAoYWJzWCA8IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24udXAgPT09IHRydWUgJiYgZGlzdFkgPCAwKSB7XG4gICAgICAgIGRpciA9ICd1cCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgICAgICBkaXIgPSAnZG93bidcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlICYmIGRpc3RYID4gMCkge1xuICAgIGRpciA9ICdyaWdodCdcbiAgICBpZiAoYWJzWCA8IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24udXAgPT09IHRydWUgJiYgZGlzdFkgPCAwKSB7XG4gICAgICAgIGRpciA9ICd1cCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgICAgICBkaXIgPSAnZG93bidcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgc3ludGhldGljID0gZmFsc2VcblxuICBpZiAoZGlyID09PSB2b2lkIDAgJiYgaXNGaW5hbCA9PT0gZmFsc2UpIHtcbiAgICBpZiAoY3R4LmV2ZW50LmlzRmlyc3QgPT09IHRydWUgfHwgY3R4LmV2ZW50Lmxhc3REaXIgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgZGlyID0gY3R4LmV2ZW50Lmxhc3REaXJcbiAgICBzeW50aGV0aWMgPSB0cnVlXG5cbiAgICBpZiAoZGlyID09PSAnbGVmdCcgfHwgZGlyID09PSAncmlnaHQnKSB7XG4gICAgICBwb3MubGVmdCAtPSBkaXN0WFxuICAgICAgYWJzWCA9IDBcbiAgICAgIGRpc3RYID0gMFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBvcy50b3AgLT0gZGlzdFlcbiAgICAgIGFic1kgPSAwXG4gICAgICBkaXN0WSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN5bnRoZXRpYyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBldnQsXG4gICAgICB0b3VjaDogY3R4LmV2ZW50Lm1vdXNlICE9PSB0cnVlLFxuICAgICAgbW91c2U6IGN0eC5ldmVudC5tb3VzZSA9PT0gdHJ1ZSxcbiAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICBkaXJlY3Rpb246IGRpcixcbiAgICAgIGlzRmlyc3Q6IGN0eC5ldmVudC5pc0ZpcnN0LFxuICAgICAgaXNGaW5hbDogaXNGaW5hbCA9PT0gdHJ1ZSxcbiAgICAgIGR1cmF0aW9uOiBEYXRlLm5vdygpIC0gY3R4LmV2ZW50LnRpbWUsXG4gICAgICBkaXN0YW5jZToge1xuICAgICAgICB4OiBhYnNYLFxuICAgICAgICB5OiBhYnNZXG4gICAgICB9LFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IGRpc3RYLFxuICAgICAgICB5OiBkaXN0WVxuICAgICAgfSxcbiAgICAgIGRlbHRhOiB7XG4gICAgICAgIHg6IHBvcy5sZWZ0IC0gY3R4LmV2ZW50Lmxhc3RYLFxuICAgICAgICB5OiBwb3MudG9wIC0gY3R4LmV2ZW50Lmxhc3RZXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmxldCB1aWQgPSAwXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICd0b3VjaC1wYW4nLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ3RvdWNoLXBhbicsXG5cbiAgICAgIGJlZm9yZU1vdW50IChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzIH0pIHtcbiAgICAgICAgLy8gZWFybHkgcmV0dXJuLCB3ZSBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgIT09IHRydWUgJiYgY2xpZW50Lmhhcy50b3VjaCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXZlbnQgKGV2dCwgbW91c2VFdmVudCkge1xuICAgICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgPT09IHRydWUgJiYgbW91c2VFdmVudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5zdG9wID09PSB0cnVlICYmIHN0b3AoZXZ0KVxuICAgICAgICAgICAgbW9kaWZpZXJzLnByZXZlbnQgPT09IHRydWUgJiYgcHJldmVudChldnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIHVpZDogJ3F2dHBfJyArICh1aWQrKyksXG4gICAgICAgICAgaGFuZGxlcjogdmFsdWUsXG4gICAgICAgICAgbW9kaWZpZXJzLFxuICAgICAgICAgIGRpcmVjdGlvbjogZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKG1vZGlmaWVycyksXG5cbiAgICAgICAgICBub29wLFxuXG4gICAgICAgICAgbW91c2VTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpICYmIGxlZnRDbGljayhldnQpKSB7XG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZW1vdmUnLCAnbW92ZScsICdub3RQYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2V1cCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcblxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0LCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB0b3VjaFN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuXG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2htb3ZlJywgJ21vdmUnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcblxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzdGFydCAoZXZ0LCBtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCB0cnVlKVxuICAgICAgICAgICAgY3R4Lmxhc3RFdnQgPSBldnRcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICogU3RvcCBwcm9wYWdhdGlvbiBzbyBwb3NzaWJsZSB1cHBlciB2LXRvdWNoLXBhbiBkb24ndCBjYXRjaCB0aGlzIGFzIHdlbGw7XG4gICAgICAgICAgICAqIElmIHdlJ3JlIG5vdCB0aGUgdGFyZ2V0IChiYXNlZCBvbiBtb2RpZmllcnMpLCB3ZSdsbCByZS1lbWl0IHRoZSBldmVudCBsYXRlclxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmIChtb3VzZUV2ZW50ID09PSB0cnVlIHx8IG1vZGlmaWVycy5zdG9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICogYXJlIHdlIGRpcmVjdGx5IHN3aXRjaGluZyB0byBkZXRlY3RlZCBzdGF0ZT9cbiAgICAgICAgICAgICAgKiBjbG9uZSBldmVudCBvbmx5IG90aGVyd2lzZVxuICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5hbGwgIT09IHRydWVcbiAgICAgICAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgICAgICAgICYmIChtb3VzZUV2ZW50ICE9PSB0cnVlIHx8IChjdHgubW9kaWZpZXJzLm1vdXNlQWxsRGlyICE9PSB0cnVlICYmIGN0eC5tb2RpZmllcnMubW91c2VhbGxkaXIgIT09IHRydWUpKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZSA9IGV2dC50eXBlLmluZGV4T2YoJ21vdXNlJykgIT09IC0xXG4gICAgICAgICAgICAgICAgICA/IG5ldyBNb3VzZUV2ZW50KGV2dC50eXBlLCBldnQpXG4gICAgICAgICAgICAgICAgICA6IG5ldyBUb3VjaEV2ZW50KGV2dC50eXBlLCBldnQpXG5cbiAgICAgICAgICAgICAgICBldnQuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSAmJiBwcmV2ZW50KGNsb25lKVxuICAgICAgICAgICAgICAgIGV2dC5jYW5jZWxCdWJibGUgPT09IHRydWUgJiYgc3RvcChjbG9uZSlcblxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY2xvbmUsIHtcbiAgICAgICAgICAgICAgICAgIHFLZXlFdmVudDogZXZ0LnFLZXlFdmVudCxcbiAgICAgICAgICAgICAgICAgIHFDbGlja091dHNpZGU6IGV2dC5xQ2xpY2tPdXRzaWRlLFxuICAgICAgICAgICAgICAgICAgcUFuY2hvckhhbmRsZWQ6IGV2dC5xQW5jaG9ySGFuZGxlZCxcbiAgICAgICAgICAgICAgICAgIHFDbG9uZWRCeTogZXZ0LnFDbG9uZWRCeSA9PT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgICAgID8gWyBjdHgudWlkIF1cbiAgICAgICAgICAgICAgICAgICAgOiBldnQucUNsb25lZEJ5LmNvbmNhdChjdHgudWlkKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBjdHguaW5pdGlhbEV2ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBldnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgZXZlbnQ6IGNsb25lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc3RvcChldnQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBwb3NpdGlvbihldnQpXG5cbiAgICAgICAgICAgIGN0eC5ldmVudCA9IHtcbiAgICAgICAgICAgICAgeDogbGVmdCxcbiAgICAgICAgICAgICAgeTogdG9wLFxuICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICBtb3VzZTogbW91c2VFdmVudCA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICAgZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICBpc0ZpcnN0OiB0cnVlLFxuICAgICAgICAgICAgICBpc0ZpbmFsOiBmYWxzZSxcbiAgICAgICAgICAgICAgbGFzdFg6IGxlZnQsXG4gICAgICAgICAgICAgIGxhc3RZOiB0b3BcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgbW92ZSAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHBvcyA9IHBvc2l0aW9uKGV2dCksXG4gICAgICAgICAgICAgIGRpc3RYID0gcG9zLmxlZnQgLSBjdHguZXZlbnQueCxcbiAgICAgICAgICAgICAgZGlzdFkgPSBwb3MudG9wIC0gY3R4LmV2ZW50LnlcblxuICAgICAgICAgICAgLy8gcHJldmVudCBidWdneSBicm93c2VyIGJlaGF2aW9yIChsaWtlIEJsaW5rLWJhc2VkIGVuZ2luZSBvbmVzIG9uIFdpbmRvd3MpXG4gICAgICAgICAgICAvLyB3aGVyZSB0aGUgbW91c2Vtb3ZlIGV2ZW50IG9jY3VycyBldmVuIGlmIHRoZXJlJ3Mgbm8gbW92ZW1lbnQgYWZ0ZXIgbW91c2Vkb3duXG4gICAgICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNjE0NjRcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTcyMTM0MVxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3F1YXNhcmZyYW1ld29yay9xdWFzYXIvaXNzdWVzLzEwNzIxXG4gICAgICAgICAgICBpZiAoZGlzdFggPT09IDAgJiYgZGlzdFkgPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN0eC5sYXN0RXZ0ID0gZXZ0XG5cbiAgICAgICAgICAgIGNvbnN0IGlzTW91c2VFdnQgPSBjdHguZXZlbnQubW91c2UgPT09IHRydWVcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICBoYW5kbGVFdmVudChldnQsIGlzTW91c2VFdnQpXG5cbiAgICAgICAgICAgICAgbGV0IGN1cnNvclxuICAgICAgICAgICAgICBpZiAobW9kaWZpZXJzLnByZXNlcnZlQ3Vyc29yICE9PSB0cnVlICYmIG1vZGlmaWVycy5wcmVzZXJ2ZWN1cnNvciAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnNvciA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgfHwgJydcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJ1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaXNNb3VzZUV2dCA9PT0gdHJ1ZSAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXBvaW50ZXItZXZlbnRzLS1jaGlsZHJlbicpXG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm9uLXNlbGVjdGFibGUnKVxuICAgICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG5cbiAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCA9IHdpdGhEZWxheWVkRm4gPT4ge1xuICAgICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB2b2lkIDBcblxuICAgICAgICAgICAgICAgIGlmIChjdXJzb3IgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9IGN1cnNvclxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzTW91c2VFdnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1wb2ludGVyLWV2ZW50cy0tY2hpbGRyZW4nKVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAod2l0aERlbGF5ZWRGbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgd2l0aERlbGF5ZWRGbigpXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZWxzZSB7IHJlbW92ZSgpIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAod2l0aERlbGF5ZWRGbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICB3aXRoRGVsYXllZEZuKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5kZXRlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuaXNGaXJzdCAhPT0gdHJ1ZSAmJiBoYW5kbGVFdmVudChldnQsIGN0eC5ldmVudC5tb3VzZSlcblxuICAgICAgICAgICAgICBjb25zdCB7IHBheWxvYWQsIHN5bnRoZXRpYyB9ID0gZ2V0Q2hhbmdlcyhldnQsIGN0eCwgZmFsc2UpXG5cbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIGlmIChjdHguaGFuZGxlcihwYXlsb2FkKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgIGN0eC5lbmQoZXZ0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjdHguc3R5bGVDbGVhbnVwID09PSB2b2lkIDAgJiYgY3R4LmV2ZW50LmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQoKVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBjdHguZXZlbnQubGFzdFggPSBwYXlsb2FkLnBvc2l0aW9uLmxlZnRcbiAgICAgICAgICAgICAgICAgIGN0eC5ldmVudC5sYXN0WSA9IHBheWxvYWQucG9zaXRpb24udG9wXG4gICAgICAgICAgICAgICAgICBjdHguZXZlbnQubGFzdERpciA9IHN5bnRoZXRpYyA9PT0gdHJ1ZSA/IHZvaWQgMCA6IHBheWxvYWQuZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICBjdHguZXZlbnQuaXNGaXJzdCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5hbGwgPT09IHRydWVcbiAgICAgICAgICAgICAgLy8gYWNjb3VudCBmb3IgVU1EIHRvbyB3aGVyZSBtb2RpZmllcnMgd2lsbCBiZSBsb3dlcmNhc2VkIHRvIHdvcmtcbiAgICAgICAgICAgICAgfHwgKGlzTW91c2VFdnQgPT09IHRydWUgJiYgKGN0eC5tb2RpZmllcnMubW91c2VBbGxEaXIgPT09IHRydWUgfHwgY3R4Lm1vZGlmaWVycy5tb3VzZWFsbGRpciA9PT0gdHJ1ZSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgc3RhcnQoKVxuICAgICAgICAgICAgICBjdHguZXZlbnQuZGV0ZWN0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgIGN0eC5tb3ZlKGV2dClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIGFic1ggPSBNYXRoLmFicyhkaXN0WCksXG4gICAgICAgICAgICAgIGFic1kgPSBNYXRoLmFicyhkaXN0WSlcblxuICAgICAgICAgICAgaWYgKGFic1ggIT09IGFic1kpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChjdHguZGlyZWN0aW9uLmhvcml6b250YWwgPT09IHRydWUgJiYgYWJzWCA+IGFic1kpXG4gICAgICAgICAgICAgICAgfHwgKGN0eC5kaXJlY3Rpb24udmVydGljYWwgPT09IHRydWUgJiYgYWJzWCA8IGFic1kpXG4gICAgICAgICAgICAgICAgfHwgKGN0eC5kaXJlY3Rpb24udXAgPT09IHRydWUgJiYgYWJzWCA8IGFic1kgJiYgZGlzdFkgPCAwKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLmRvd24gPT09IHRydWUgJiYgYWJzWCA8IGFic1kgJiYgZGlzdFkgPiAwKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLmxlZnQgPT09IHRydWUgJiYgYWJzWCA+IGFic1kgJiYgZGlzdFggPCAwKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlICYmIGFic1ggPiBhYnNZICYmIGRpc3RYID4gMClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY3R4LmV2ZW50LmRldGVjdGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGN0eC5tb3ZlKGV2dClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguZW5kKGV2dCwgdHJ1ZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlbmQgKGV2dCwgYWJvcnQpIHtcbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xlYW5FdnQoY3R4LCAndGVtcCcpXG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCBmYWxzZSlcblxuICAgICAgICAgICAgaWYgKGFib3J0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCAmJiBjdHguc3R5bGVDbGVhbnVwKClcblxuICAgICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRldGVjdGVkICE9PSB0cnVlICYmIGN0eC5pbml0aWFsRXZlbnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIGN0eC5pbml0aWFsRXZlbnQudGFyZ2V0LmRpc3BhdGNoRXZlbnQoY3R4LmluaXRpYWxFdmVudC5ldmVudClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3R4LmV2ZW50LmRldGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5pc0ZpcnN0ID09PSB0cnVlICYmIGN0eC5oYW5kbGVyKGdldENoYW5nZXMoZXZ0ID09PSB2b2lkIDAgPyBjdHgubGFzdEV2dCA6IGV2dCwgY3R4KS5wYXlsb2FkKVxuXG4gICAgICAgICAgICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gZ2V0Q2hhbmdlcyhldnQgPT09IHZvaWQgMCA/IGN0eC5sYXN0RXZ0IDogZXZ0LCBjdHgsIHRydWUpXG4gICAgICAgICAgICAgIGNvbnN0IGZuID0gKCkgPT4geyBjdHguaGFuZGxlcihwYXlsb2FkKSB9XG5cbiAgICAgICAgICAgICAgaWYgKGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAoZm4pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm4oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN0eC5ldmVudCA9IHZvaWQgMFxuICAgICAgICAgICAgY3R4LmluaXRpYWxFdmVudCA9IHZvaWQgMFxuICAgICAgICAgICAgY3R4Lmxhc3RFdnQgPSB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbC5fX3F0b3VjaHBhbiA9IGN0eFxuXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgIGNvbnN0IGNhcHR1cmUgPSBtb2RpZmllcnMubW91c2VDYXB0dXJlID09PSB0cnVlIHx8IG1vZGlmaWVycy5tb3VzZWNhcHR1cmUgPT09IHRydWVcbiAgICAgICAgICAgID8gJ0NhcHR1cmUnXG4gICAgICAgICAgICA6ICcnXG5cbiAgICAgICAgICBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICAgIFsgZWwsICdtb3VzZWRvd24nLCAnbW91c2VTdGFydCcsIGBwYXNzaXZlJHsgY2FwdHVyZSB9YCBdXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWVudC5oYXMudG91Y2ggPT09IHRydWUgJiYgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgWyBlbCwgJ3RvdWNoc3RhcnQnLCAndG91Y2hTdGFydCcsIGBwYXNzaXZlJHsgbW9kaWZpZXJzLmNhcHR1cmUgPT09IHRydWUgPyAnQ2FwdHVyZScgOiAnJyB9YCBdLFxuICAgICAgICAgIFsgZWwsICd0b3VjaG1vdmUnLCAnbm9vcCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXSAvLyBjYW5ub3QgYmUgcGFzc2l2ZSAoZXg6IGlPUyBzY3JvbGwpXG4gICAgICAgIF0pXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgYmluZGluZ3MpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hwYW5cblxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBpZiAoYmluZGluZ3Mub2xkVmFsdWUgIT09IGJpbmRpbmdzLnZhbHVlKSB7XG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgY3R4LmVuZCgpXG4gICAgICAgICAgICBjdHguaGFuZGxlciA9IGJpbmRpbmdzLnZhbHVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3R4LmRpcmVjdGlvbiA9IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhiaW5kaW5ncy5tb2RpZmllcnMpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZVVubW91bnQgKGVsKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNocGFuXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gZW1pdCB0aGUgZW5kIGV2ZW50IHdoZW4gdGhlIGRpcmVjdGl2ZSBpcyBkZXN0cm95ZWQgd2hpbGUgYWN0aXZlXG4gICAgICAgICAgLy8gdGhpcyBpcyBvbmx5IG5lZWRlZCBpbiBUb3VjaFBhbiBiZWNhdXNlIHRoZSByZXN0IG9mIHRoZSB0b3VjaCBkaXJlY3RpdmVzIGRvIG5vdCBlbWl0IGFuIGVuZCBldmVudFxuICAgICAgICAgIC8vIHRoZSBjb25kaXRpb24gaXMgYWxzbyBjaGVja2VkIGluIHRoZSBzdGFydCBvZiBmdW5jdGlvbiBidXQgd2UgYXZvaWQgdGhlIGNhbGxcbiAgICAgICAgICBjdHguZXZlbnQgIT09IHZvaWQgMCAmJiBjdHguZW5kKClcblxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ21haW4nKVxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuXG4gICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG4gICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCAhPT0gdm9pZCAwICYmIGN0eC5zdHlsZUNsZWFudXAoKVxuXG4gICAgICAgICAgZGVsZXRlIGVsLl9fcXRvdWNocGFuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4pXG4iXSwibmFtZXMiOlsidmFsdWUiXSwibWFwcGluZ3MiOiI7QUFhTyxTQUFTLFdBQVksS0FBSztBQUMvQixTQUFPLElBQUksT0FBTyxDQUFDLEVBQUUsWUFBVyxJQUFLLElBQUksTUFBTSxDQUFDO0FBQ2xEO0FBRU8sU0FBUyxRQUFTLEdBQUcsS0FBSyxLQUFLO0FBQ3BDLFNBQU8sT0FBTyxNQUNWLE1BQ0EsS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDO0FBQ3BDO0FBaUJPLFNBQVMsSUFBSyxHQUFHLFNBQVMsR0FBRyxPQUFPLEtBQUs7QUFDOUMsTUFBSSxNQUFNLFVBQVUsTUFBTSxNQUFNO0FBQzlCLFdBQU87QUFBQSxFQUNSO0FBRUQsUUFBTSxNQUFNLEtBQUs7QUFDakIsU0FBTyxJQUFJLFVBQVUsU0FDakIsTUFDQSxJQUFJ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
