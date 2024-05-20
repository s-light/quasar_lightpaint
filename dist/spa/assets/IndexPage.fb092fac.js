import { Q as QPage } from "./QPage.f16fb6de.js";
import { i as inject, q as quasarKey, P as Plugin, l as isDate, m as defaultLang, _ as _export_sfc, n as openBlock, p as createElementBlock, F as Fragment, t as renderList, j as createVNode, Q as QBtn, u as createCommentVNode, v as createBaseVNode, x as toDisplayString, y as unref, r as ref, c as computed, h, z as useSize, B as hMergeSlot, C as hSlot, D as useSizeProps, g as getCurrentInstance, E as toRaw, G as stopAndPrevent, H as createComponent, I as QIcon, J as isKeyCode, K as prevent, L as nextTick, M as addEvt, w as watch, o as onMounted, N as onBeforeUnmount, O as cleanEvt, R as listenOpts, a as onUnmounted, S as injectProp, U as Teleport, V as createGlobalNode, W as removeGlobalNode, X as onDeactivated, Y as vmIsDestroyed, Z as client, $ as Transition, a0 as useSpinnerProps, a1 as useSpinner, a2 as position, a3 as isNumber, a4 as isObject, a5 as hDir, a6 as mergeModels, a7 as useModel, a8 as withCtx, a9 as createTextVNode, aa as normalizeClass, ab as pushScopeId, ac as popScopeId, ad as createBlock } from "./index.2f56bee1.js";
import { p as pad, c as capitalize, u as useDark, a as useDarkProps, b as clearSelection, g as getScrollbarWidth, d as useModelToggleProps, s as scrollTargetProp, e as useModelToggleEmits, f as useTimeout, h as useModelToggle, i as getScrollTarget, j as between, T as TouchPan } from "./TouchPan.cb3c5cf7.js";
function useQuasar() {
  return inject(quasarKey);
}
const breaks = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function isLeapJalaaliYear(jy) {
  return jalCalLeap(jy) === 0;
}
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6)
    return 31;
  if (jm <= 11)
    return 30;
  if (isLeapJalaaliYear(jy))
    return 30;
  return 29;
}
function jalCalLeap(jy) {
  const bl = breaks.length;
  let jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    jp = jm;
  }
  n = jy - jp;
  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }
  return leap;
}
function div(a, b) {
  return ~~(a / b);
}
function mod(a, b) {
  return a - ~~(a / b) * b;
}
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(mask, dateLocale) {
  const days = "(" + dateLocale.days.join("|") + ")", key = mask + days;
  if (regexStore[key] !== void 0) {
    return regexStore[key];
  }
  const daysShort = "(" + dateLocale.daysShort.join("|") + ")", months = "(" + dateLocale.months.join("|") + ")", monthsShort = "(" + dateLocale.monthsShort.join("|") + ")";
  const map = {};
  let index = 0;
  const regexText = mask.replace(reverseToken, (match) => {
    index++;
    switch (match) {
      case "YY":
        map.YY = index;
        return "(-?\\d{1,2})";
      case "YYYY":
        map.YYYY = index;
        return "(-?\\d{1,4})";
      case "M":
        map.M = index;
        return "(\\d{1,2})";
      case "MM":
        map.M = index;
        return "(\\d{2})";
      case "MMM":
        map.MMM = index;
        return monthsShort;
      case "MMMM":
        map.MMMM = index;
        return months;
      case "D":
        map.D = index;
        return "(\\d{1,2})";
      case "Do":
        map.D = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        map.D = index;
        return "(\\d{2})";
      case "H":
        map.H = index;
        return "(\\d{1,2})";
      case "HH":
        map.H = index;
        return "(\\d{2})";
      case "h":
        map.h = index;
        return "(\\d{1,2})";
      case "hh":
        map.h = index;
        return "(\\d{2})";
      case "m":
        map.m = index;
        return "(\\d{1,2})";
      case "mm":
        map.m = index;
        return "(\\d{2})";
      case "s":
        map.s = index;
        return "(\\d{1,2})";
      case "ss":
        map.s = index;
        return "(\\d{2})";
      case "S":
        map.S = index;
        return "(\\d{1})";
      case "SS":
        map.S = index;
        return "(\\d{2})";
      case "SSS":
        map.S = index;
        return "(\\d{3})";
      case "A":
        map.A = index;
        return "(AM|PM)";
      case "a":
        map.a = index;
        return "(am|pm)";
      case "aa":
        map.aa = index;
        return "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return daysShort;
      case "dddd":
        return days;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "w":
        return "(\\d{1,2})";
      case "ww":
        return "(\\d{2})";
      case "Z":
        map.Z = index;
        return "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        map.ZZ = index;
        return "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        map.X = index;
        return "(-?\\d+)";
      case "x":
        map.x = index;
        return "(-?\\d{4,})";
      default:
        index--;
        if (match[0] === "[") {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  });
  const res = { map, regex: new RegExp("^" + regexText) };
  regexStore[key] = res;
  return res;
}
function getDateLocale(paramDateLocale, langProps) {
  return paramDateLocale !== void 0 ? paramDateLocale : langProps !== void 0 ? langProps.date : defaultLang.date;
}
function formatTimezone(offset, delimeter = "") {
  const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.floor(absOffset / 60), minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes);
}
function applyYearMonthDayChange(date2, mod2, sign) {
  let year = date2.getFullYear(), month = date2.getMonth();
  const day = date2.getDate();
  if (mod2.year !== void 0) {
    year += sign * mod2.year;
    delete mod2.year;
  }
  if (mod2.month !== void 0) {
    month += sign * mod2.month;
    delete mod2.month;
  }
  date2.setDate(1);
  date2.setMonth(2);
  date2.setFullYear(year);
  date2.setMonth(month);
  date2.setDate(Math.min(day, daysInMonth(date2)));
  if (mod2.date !== void 0) {
    date2.setDate(date2.getDate() + sign * mod2.date);
    delete mod2.date;
  }
  return date2;
}
function applyYearMonthDay(date2, mod2, middle) {
  const year = mod2.year !== void 0 ? mod2.year : date2[`get${middle}FullYear`](), month = mod2.month !== void 0 ? mod2.month - 1 : date2[`get${middle}Month`](), maxDay = new Date(year, month + 1, 0).getDate(), day = Math.min(maxDay, mod2.date !== void 0 ? mod2.date : date2[`get${middle}Date`]());
  date2[`set${middle}Date`](1);
  date2[`set${middle}Month`](2);
  date2[`set${middle}FullYear`](year);
  date2[`set${middle}Month`](month);
  date2[`set${middle}Date`](day);
  delete mod2.year;
  delete mod2.month;
  delete mod2.date;
  return date2;
}
function getChange(date2, rawMod, sign) {
  const mod2 = normalizeMod(rawMod), d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDayChange(d, mod2, sign) : d;
  for (const key in mod2) {
    const op = capitalize(key);
    t[`set${op}`](t[`get${op}`]() + sign * mod2[key]);
  }
  return t;
}
function normalizeMod(mod2) {
  const acc = { ...mod2 };
  if (mod2.years !== void 0) {
    acc.year = mod2.years;
    delete acc.years;
  }
  if (mod2.months !== void 0) {
    acc.month = mod2.months;
    delete acc.months;
  }
  if (mod2.days !== void 0) {
    acc.date = mod2.days;
    delete acc.days;
  }
  if (mod2.day !== void 0) {
    acc.date = mod2.day;
    delete acc.day;
  }
  if (mod2.hour !== void 0) {
    acc.hours = mod2.hour;
    delete acc.hour;
  }
  if (mod2.minute !== void 0) {
    acc.minutes = mod2.minute;
    delete acc.minute;
  }
  if (mod2.second !== void 0) {
    acc.seconds = mod2.second;
    delete acc.second;
  }
  if (mod2.millisecond !== void 0) {
    acc.milliseconds = mod2.millisecond;
    delete acc.millisecond;
  }
  return acc;
}
function adjustDate(date2, rawMod, utc) {
  const mod2 = normalizeMod(rawMod), middle = utc === true ? "UTC" : "", d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDay(d, mod2, middle) : d;
  for (const key in mod2) {
    const op = key.charAt(0).toUpperCase() + key.slice(1);
    t[`set${middle}${op}`](mod2[key]);
  }
  return t;
}
function extractDate(str, mask, dateLocale) {
  const d = __splitDate(str, mask, dateLocale);
  const date2 = new Date(
    d.year,
    d.month === null ? null : d.month - 1,
    d.day === null ? 1 : d.day,
    d.hour,
    d.minute,
    d.second,
    d.millisecond
  );
  const tzOffset = date2.getTimezoneOffset();
  return d.timezoneOffset === null || d.timezoneOffset === tzOffset ? date2 : getChange(date2, { minutes: d.timezoneOffset - tzOffset }, 1);
}
function __splitDate(str, mask, dateLocale, calendar, defaultModel) {
  const date2 = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  defaultModel !== void 0 && Object.assign(date2, defaultModel);
  if (str === void 0 || str === null || str === "" || typeof str !== "string") {
    return date2;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const langOpts = getDateLocale(dateLocale, Plugin.props), months = langOpts.months, monthsShort = langOpts.monthsShort;
  const { regex, map } = getRegexData(mask, langOpts);
  const match = str.match(regex);
  if (match === null) {
    return date2;
  }
  let tzString = "";
  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[map.X !== void 0 ? map.X : map.x], 10);
    if (isNaN(stamp) === true || stamp < 0) {
      return date2;
    }
    const d = new Date(stamp * (map.X !== void 0 ? 1e3 : 1));
    date2.year = d.getFullYear();
    date2.month = d.getMonth() + 1;
    date2.day = d.getDate();
    date2.hour = d.getHours();
    date2.minute = d.getMinutes();
    date2.second = d.getSeconds();
    date2.millisecond = d.getMilliseconds();
  } else {
    if (map.YYYY !== void 0) {
      date2.year = parseInt(match[map.YYYY], 10);
    } else if (map.YY !== void 0) {
      const y = parseInt(match[map.YY], 10);
      date2.year = y < 0 ? y : 2e3 + y;
    }
    if (map.M !== void 0) {
      date2.month = parseInt(match[map.M], 10);
      if (date2.month < 1 || date2.month > 12) {
        return date2;
      }
    } else if (map.MMM !== void 0) {
      date2.month = monthsShort.indexOf(match[map.MMM]) + 1;
    } else if (map.MMMM !== void 0) {
      date2.month = months.indexOf(match[map.MMMM]) + 1;
    }
    if (map.D !== void 0) {
      date2.day = parseInt(match[map.D], 10);
      if (date2.year === null || date2.month === null || date2.day < 1) {
        return date2;
      }
      const maxDay = calendar !== "persian" ? new Date(date2.year, date2.month, 0).getDate() : jalaaliMonthLength(date2.year, date2.month);
      if (date2.day > maxDay) {
        return date2;
      }
    }
    if (map.H !== void 0) {
      date2.hour = parseInt(match[map.H], 10) % 24;
    } else if (map.h !== void 0) {
      date2.hour = parseInt(match[map.h], 10) % 12;
      if (map.A && match[map.A] === "PM" || map.a && match[map.a] === "pm" || map.aa && match[map.aa] === "p.m.") {
        date2.hour += 12;
      }
      date2.hour = date2.hour % 24;
    }
    if (map.m !== void 0) {
      date2.minute = parseInt(match[map.m], 10) % 60;
    }
    if (map.s !== void 0) {
      date2.second = parseInt(match[map.s], 10) % 60;
    }
    if (map.S !== void 0) {
      date2.millisecond = parseInt(match[map.S], 10) * 10 ** (3 - match[map.S].length);
    }
    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = map.Z !== void 0 ? match[map.Z].replace(":", "") : match[map.ZZ];
      date2.timezoneOffset = (tzString[0] === "+" ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }
  date2.dateHash = pad(date2.year, 6) + "/" + pad(date2.month) + "/" + pad(date2.day);
  date2.timeHash = pad(date2.hour) + ":" + pad(date2.minute) + ":" + pad(date2.second) + tzString;
  return date2;
}
function isValid(date2) {
  return typeof date2 === "number" ? true : isNaN(Date.parse(date2)) === false;
}
function buildDate(mod2, utc) {
  return adjustDate(new Date(), mod2, utc);
}
function getDayOfWeek(date2) {
  const dow = new Date(date2).getDay();
  return dow === 0 ? 7 : dow;
}
function getWeekOfYear(date2) {
  const thursday = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  thursday.setDate(thursday.getDate() - (thursday.getDay() + 6) % 7 + 3);
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff);
}
function getDayIdentifier(date2) {
  return date2.getFullYear() * 1e4 + date2.getMonth() * 100 + date2.getDate();
}
function getDateIdentifier(date2, onlyDate) {
  const d = new Date(date2);
  return onlyDate === true ? getDayIdentifier(d) : d.getTime();
}
function isBetweenDates(date2, from, to, opts = {}) {
  const d1 = getDateIdentifier(from, opts.onlyDate), d2 = getDateIdentifier(to, opts.onlyDate), cur = getDateIdentifier(date2, opts.onlyDate);
  return (cur > d1 || opts.inclusiveFrom === true && cur === d1) && (cur < d2 || opts.inclusiveTo === true && cur === d2);
}
function addToDate(date2, mod2) {
  return getChange(date2, mod2, 1);
}
function subtractFromDate(date2, mod2) {
  return getChange(date2, mod2, -1);
}
function startOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
function endOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](11);
    case "month":
    case "months":
      t[`${prefix}Date`](daysInMonth(t));
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](23);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](59);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](59);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](999);
  }
  return t;
}
function getMaxDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.max(t, new Date(d));
  });
  return t;
}
function getMinDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.min(t, new Date(d));
  });
  return t;
}
function getDiff(t, sub, interval) {
  return (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / interval;
}
function getDateDiff(date2, subtract, unit = "days") {
  const t = new Date(date2), sub = new Date(subtract);
  switch (unit) {
    case "years":
    case "year":
      return t.getFullYear() - sub.getFullYear();
    case "months":
    case "month":
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(t, "day"), startOfDate(sub, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(t, "hour"), startOfDate(sub, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(t, "minute"), startOfDate(sub, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(t, "second"), startOfDate(sub, "second"), 1e3);
  }
}
function getDayOfYear(date2) {
  return getDateDiff(date2, startOfDate(date2, "year"), "days") + 1;
}
function inferDateFormat(date2) {
  return isDate(date2) === true ? "date" : typeof date2 === "number" ? "number" : "string";
}
function getDateBetween(date2, min, max) {
  const t = new Date(date2);
  if (min) {
    const low = new Date(min);
    if (t < low) {
      return low;
    }
  }
  if (max) {
    const high = new Date(max);
    if (t > high) {
      return high;
    }
  }
  return t;
}
function isSameDate(date2, date22, unit) {
  const t = new Date(date2), d = new Date(date22);
  if (unit === void 0) {
    return t.getTime() === d.getTime();
  }
  switch (unit) {
    case "second":
    case "seconds":
      if (t.getSeconds() !== d.getSeconds()) {
        return false;
      }
    case "minute":
    case "minutes":
      if (t.getMinutes() !== d.getMinutes()) {
        return false;
      }
    case "hour":
    case "hours":
      if (t.getHours() !== d.getHours()) {
        return false;
      }
    case "day":
    case "days":
    case "date":
      if (t.getDate() !== d.getDate()) {
        return false;
      }
    case "month":
    case "months":
      if (t.getMonth() !== d.getMonth()) {
        return false;
      }
    case "year":
    case "years":
      if (t.getFullYear() !== d.getFullYear()) {
        return false;
      }
      break;
    default:
      throw new Error(`date isSameDate unknown unit ${unit}`);
  }
  return true;
}
function daysInMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
}
function getOrdinal(n) {
  if (n >= 11 && n <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
  }
  return `${n}th`;
}
const formatter = {
  YY(date2, dateLocale, forcedYear) {
    const y = this.YYYY(date2, dateLocale, forcedYear) % 100;
    return y >= 0 ? pad(y) : "-" + pad(Math.abs(y));
  },
  YYYY(date2, _dateLocale, forcedYear) {
    return forcedYear !== void 0 && forcedYear !== null ? forcedYear : date2.getFullYear();
  },
  M(date2) {
    return date2.getMonth() + 1;
  },
  MM(date2) {
    return pad(date2.getMonth() + 1);
  },
  MMM(date2, dateLocale) {
    return dateLocale.monthsShort[date2.getMonth()];
  },
  MMMM(date2, dateLocale) {
    return dateLocale.months[date2.getMonth()];
  },
  Q(date2) {
    return Math.ceil((date2.getMonth() + 1) / 3);
  },
  Qo(date2) {
    return getOrdinal(this.Q(date2));
  },
  D(date2) {
    return date2.getDate();
  },
  Do(date2) {
    return getOrdinal(date2.getDate());
  },
  DD(date2) {
    return pad(date2.getDate());
  },
  DDD(date2) {
    return getDayOfYear(date2);
  },
  DDDD(date2) {
    return pad(getDayOfYear(date2), 3);
  },
  d(date2) {
    return date2.getDay();
  },
  dd(date2, dateLocale) {
    return this.dddd(date2, dateLocale).slice(0, 2);
  },
  ddd(date2, dateLocale) {
    return dateLocale.daysShort[date2.getDay()];
  },
  dddd(date2, dateLocale) {
    return dateLocale.days[date2.getDay()];
  },
  E(date2) {
    return date2.getDay() || 7;
  },
  w(date2) {
    return getWeekOfYear(date2);
  },
  ww(date2) {
    return pad(getWeekOfYear(date2));
  },
  H(date2) {
    return date2.getHours();
  },
  HH(date2) {
    return pad(date2.getHours());
  },
  h(date2) {
    const hours = date2.getHours();
    return hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
  },
  hh(date2) {
    return pad(this.h(date2));
  },
  m(date2) {
    return date2.getMinutes();
  },
  mm(date2) {
    return pad(date2.getMinutes());
  },
  s(date2) {
    return date2.getSeconds();
  },
  ss(date2) {
    return pad(date2.getSeconds());
  },
  S(date2) {
    return Math.floor(date2.getMilliseconds() / 100);
  },
  SS(date2) {
    return pad(Math.floor(date2.getMilliseconds() / 10));
  },
  SSS(date2) {
    return pad(date2.getMilliseconds(), 3);
  },
  A(date2) {
    return this.H(date2) < 12 ? "AM" : "PM";
  },
  a(date2) {
    return this.H(date2) < 12 ? "am" : "pm";
  },
  aa(date2) {
    return this.H(date2) < 12 ? "a.m." : "p.m.";
  },
  Z(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset, ":");
  },
  ZZ(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset);
  },
  X(date2) {
    return Math.floor(date2.getTime() / 1e3);
  },
  x(date2) {
    return date2.getTime();
  }
};
function formatDate(val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (val !== 0 && !val || val === Infinity || val === -Infinity) {
    return;
  }
  const date2 = new Date(val);
  if (isNaN(date2)) {
    return;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const locale = getDateLocale(dateLocale, Plugin.props);
  return mask.replace(
    token,
    (match, text) => match in formatter ? formatter[match](date2, locale, __forcedYear, __forcedTimezoneOffset) : text === void 0 ? match : text.split("\\]").join("]")
  );
}
function clone(date2) {
  return isDate(date2) === true ? new Date(date2.getTime()) : date2;
}
var date = {
  isValid,
  extractDate,
  buildDate,
  getDayOfWeek,
  getWeekOfYear,
  isBetweenDates,
  addToDate,
  subtractFromDate,
  adjustDate,
  startOfDate,
  endOfDate,
  getMaxDate,
  getMinDate,
  getDateDiff,
  getDayOfYear,
  inferDateFormat,
  getDateBetween,
  isSameDate,
  daysInMonth,
  formatDate,
  clone
};
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
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var FileSaver_min = { exports: {} };
(function(module, exports) {
  (function(a, b) {
    b();
  })(commonjsGlobal, function() {
    function b(a2, b2) {
      return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
    }
    function c(a2, b2, c2) {
      var d2 = new XMLHttpRequest();
      d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
        g(d2.response, b2, c2);
      }, d2.onerror = function() {
        console.error("could not download file");
      }, d2.send();
    }
    function d(a2) {
      var b2 = new XMLHttpRequest();
      b2.open("HEAD", a2, false);
      try {
        b2.send();
      } catch (a3) {
      }
      return 200 <= b2.status && 299 >= b2.status;
    }
    function e(a2) {
      try {
        a2.dispatchEvent(new MouseEvent("click"));
      } catch (c2) {
        var b2 = document.createEvent("MouseEvents");
        b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
      }
    }
    var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h2) {
      var i = f.URL || f.webkitURL, j = document.createElement("a");
      g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h2) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
        i.revokeObjectURL(j.href);
      }, 4e4), setTimeout(function() {
        e(j);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h2) {
      if (g2 = g2 || f2.name || "download", "string" != typeof f2)
        navigator.msSaveOrOpenBlob(b(f2, h2), g2);
      else if (d(f2))
        c(f2, g2, h2);
      else {
        var i = document.createElement("a");
        i.href = f2, i.target = "_blank", setTimeout(function() {
          e(i);
        });
      }
    } : function(b2, d2, e2, g2) {
      if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
        return c(b2, d2, e2);
      var h2 = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((j || h2 && i || a) && "undefined" != typeof FileReader) {
        var k = new FileReader();
        k.onloadend = function() {
          var a2 = k.result;
          a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
        }, k.readAsDataURL(b2);
      } else {
        var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
        g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
          l.revokeObjectURL(m);
        }, 4e4);
      }
    });
    f.saveAs = g.saveAs = g, module.exports = g;
  });
})(FileSaver_min);
var SavedVisuals_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$2 = ["src", "onClick"];
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "info" };
const _sfc_main$3 = {
  __name: "SavedVisuals",
  props: {
    visuals: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const $q = useQuasar();
    const props = __props;
    const visuals = props.visuals;
    function item_delete(item2remove) {
      console.log("delete item", item2remove);
      const index = visuals.indexOf(item2remove);
      if (index > -1) {
        visuals.splice(index, 1);
      }
    }
    function item_save(item) {
      console.log("save item", item);
      FileSaver_min.exports.saveAs(item.data, item.filename);
    }
    async function item_copy(item) {
      try {
        const data = [new ClipboardItem({ [item.blob.type]: item.blob })];
        await navigator.clipboard.write(data);
        $q.notify(`image '${item.filename}' copied to clipboard.`);
      } catch (e) {
        console.log("item_copy failed:", e);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visuals), (item) => {
          return openBlock(), createElementBlock("li", {
            key: item.filename
          }, [
            createVNode(QBtn, {
              padding: "xs",
              round: "",
              icon: "delete_forever",
              onClick: ($event) => item_delete(item)
            }, null, 8, ["onClick"]),
            createVNode(QBtn, {
              padding: "xs",
              round: "",
              icon: "save",
              onClick: ($event) => item_save(item)
            }, null, 8, ["onClick"]),
            item.type == "image" ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: item.data,
              alt: "",
              onClick: ($event) => item_copy(item)
            }, null, 8, _hoisted_1$2)) : item.type == "video" ? (openBlock(), createElementBlock("video", {
              key: 1,
              src: item.data,
              alt: ""
            }, null, 8, _hoisted_2)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_3, toDisplayString(item.filename), 1)
          ]);
        }), 128))
      ]);
    };
  }
};
var SavedVisuals = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b693a684"], ["__file", "SavedVisuals.vue"]]);
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
function useFormAttrs(props) {
  return computed(() => ({
    type: "hidden",
    name: props.name,
    value: props.modelValue
  }));
}
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
const useAnchorStaticProps = {
  target: {
    type: [Boolean, String, Element],
    default: true
  },
  noParentEvent: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  configureAnchorEl
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer = null;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) {
          return;
        }
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null)
        return;
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
let queue = [];
let waitFlags = [];
function clearFlag(flag) {
  waitFlags = waitFlags.filter((entry) => entry !== flag);
}
function addFocusWaitFlag(flag) {
  clearFlag(flag);
  waitFlags.push(flag);
}
function removeFocusWaitFlag(flag) {
  clearFlag(flag);
  if (waitFlags.length === 0 && queue.length !== 0) {
    queue[queue.length - 1]();
    queue = [];
  }
}
const portalProxyList = [];
const QPortal = createComponent({
  name: "QPortal",
  setup(_, { slots }) {
    return () => slots.default();
  }
});
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, type) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode(false, type);
      }
      portalIsActive.value = true;
      portalProxyList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true)
      return;
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm.proxy.__qPortal = true;
  injectProp(vm.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, h(QPortal, renderPortalContent))] : void 0
  };
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
function useTick() {
  let tickFn;
  const vm = getCurrentInstance();
  function removeTick() {
    tickFn = void 0;
  }
  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  };
}
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) {
    return;
  }
  let portalIndex = portalProxyList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalProxyList[portalIndex].$;
    if (proxy.type.name === "QTooltip") {
      portalIndex--;
      continue;
    }
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) {
      return;
    }
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index !== -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    bottom,
    height,
    left,
    right,
    width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();
  top += absoluteOffset.top;
  left += absoluteOffset.left;
  if (offset !== void 0) {
    top += offset[1];
    left += offset[0];
  }
  return {
    top,
    bottom: top + 1,
    height: 1,
    left,
    right: left + 1,
    width: 1,
    middle: left,
    center: top
  };
}
function getTargetProps(width, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width / 2,
    right: width
  };
}
function getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[anchorOrigin.vertical] - targetProps[selfOrigin.vertical],
    left: anchorProps[anchorOrigin.horizontal] - targetProps[selfOrigin.horizontal]
  };
}
function setPosition(cfg, retryNumber = 0) {
  if (cfg.targetEl === null || cfg.anchorEl === null || retryNumber > 5) {
    return;
  }
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1);
    }, 10);
    return;
  }
  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth
  } = cfg;
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  const { scrollLeft, scrollTop } = targetEl;
  const anchorProps = absoluteOffset === void 0 ? getAnchorProps(anchorEl, cover === true ? [0, 0] : offset) : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth: maxWidth || "100vw",
    maxHeight: maxHeight || "100vh",
    visibility: "visible"
  });
  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
  const { elWidth, elHeight } = fit === true || cover === true ? { elWidth: Math.max(anchorProps.width, origElWidth), elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight } : { elWidth: origElWidth, elHeight: origElHeight };
  let elStyle = { maxWidth, maxHeight };
  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(targetEl.style, elStyle);
  const targetProps = getTargetProps(elWidth, elHeight);
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
  } else {
    const { top, left } = props;
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    let hasChanged = false;
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * offset[1];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * offset[0];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }
    if (hasChanged === true) {
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    }
  }
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(targetEl.style, elStyle);
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop;
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
var QTooltip = createComponent({
  name: "QTooltip",
  inheritAttrs: false,
  props: {
    ...useAnchorStaticProps,
    ...useModelToggleProps,
    ...useTransitionProps,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    transitionShow: {
      ...useTransitionProps.transitionShow,
      default: "jump-down"
    },
    transitionHide: {
      ...useTransitionProps.transitionHide,
      default: "jump-up"
    },
    anchor: {
      type: String,
      default: "bottom middle",
      validator: validatePosition
    },
    self: {
      type: String,
      default: "top middle",
      validator: validatePosition
    },
    offset: {
      type: Array,
      default: () => [14, 14],
      validator: validateOffset
    },
    scrollTarget: scrollTargetProp,
    delay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    persistent: Boolean
  },
  emits: [
    ...useModelToggleEmits
  ],
  setup(props, { slots, emit, attrs }) {
    let unwatchPosition, observer;
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const innerRef = ref(null);
    const showing = ref(false);
    const anchorOrigin = computed(() => parsePosition(props.anchor, $q.lang.rtl));
    const selfOrigin = computed(() => parsePosition(props.self, $q.lang.rtl));
    const hideOnRouteChange = computed(() => props.persistent !== true);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow, anchorEvents } = useAnchor({ showing, configureAnchorEl });
    const { show, hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    Object.assign(anchorEvents, { delayShow, delayHide });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "tooltip");
    if ($q.platform.is.mobile === true) {
      const clickOutsideProps = {
        anchorEl,
        innerRef,
        onClickOutside(e) {
          hide(e);
          if (e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      };
      const hasClickOutside = computed(
        () => props.modelValue === null && props.persistent !== true && showing.value === true
      );
      watch(hasClickOutside, (val) => {
        const fn = val === true ? addClickOutside : removeClickOutside;
        fn(clickOutsideProps);
      });
      onBeforeUnmount(() => {
        removeClickOutside(clickOutsideProps);
      });
    }
    function handleShow(evt) {
      showPortal();
      registerTick(() => {
        observer = new MutationObserver(() => updatePosition());
        observer.observe(innerRef.value, { attributes: false, childList: true, characterData: true, subtree: true });
        updatePosition();
        configureScrollTarget();
      });
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      registerTimeout(() => {
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup();
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup() {
      if (observer !== void 0) {
        observer.disconnect();
        observer = void 0;
      }
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      unconfigureScrollTarget();
      cleanEvt(anchorEvents, "tooltipTemp");
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function delayShow(evt) {
      if ($q.platform.is.mobile === true) {
        clearSelection();
        document.body.classList.add("non-selectable");
        const target = anchorEl.value;
        const evts = ["touchmove", "touchcancel", "touchend", "click"].map((e) => [target, e, "delayHide", "passiveCapture"]);
        addEvt(anchorEvents, "tooltipTemp", evts);
      }
      registerTimeout(() => {
        show(evt);
      }, props.delay);
    }
    function delayHide(evt) {
      if ($q.platform.is.mobile === true) {
        cleanEvt(anchorEvents, "tooltipTemp");
        clearSelection();
        setTimeout(() => {
          document.body.classList.remove("non-selectable");
        }, 10);
      }
      registerTimeout(() => {
        hide(evt);
      }, props.hideDelay);
    }
    function configureAnchorEl() {
      if (props.noParentEvent === true || anchorEl.value === null)
        return;
      const evts = $q.platform.is.mobile === true ? [
        [anchorEl.value, "touchstart", "delayShow", "passive"]
      ] : [
        [anchorEl.value, "mouseenter", "delayShow", "passive"],
        [anchorEl.value, "mouseleave", "delayHide", "passive"]
      ];
      addEvt(anchorEvents, "anchor", evts);
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        const fn = props.noParentEvent === true ? updatePosition : hide;
        changeScrollEvent(localScrollTarget.value, fn);
      }
    }
    function getTooltipContent() {
      return showing.value === true ? h("div", {
        ...attrs,
        ref: innerRef,
        class: [
          "q-tooltip q-tooltip--style q-position-engine no-pointer-events",
          attrs.class
        ],
        style: [
          attrs.style,
          transitionStyle.value
        ],
        role: "tooltip"
      }, hSlot(slots.default)) : null;
    }
    function renderPortalContent() {
      return h(Transition, transitionProps.value, getTooltipContent);
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(vm.proxy, { updatePosition });
    return renderPortal;
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
const markerPrefixClass = "q-slider__marker-labels";
const defaultMarkerConvertFn = (v) => ({ value: v });
const defaultMarkerLabelRenderFn = ({ marker }) => h("div", {
  key: marker.value,
  style: marker.style,
  class: marker.classes
}, marker.label);
const keyCodes = [34, 37, 40, 33, 39, 38];
const useSliderProps = {
  ...useDarkProps,
  ...useFormProps,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  innerMin: Number,
  innerMax: Number,
  step: {
    type: Number,
    default: 1,
    validator: (v) => v >= 0
  },
  snap: Boolean,
  vertical: Boolean,
  reverse: Boolean,
  color: String,
  markerLabelsClass: String,
  label: Boolean,
  labelColor: String,
  labelTextColor: String,
  labelAlways: Boolean,
  switchLabelSide: Boolean,
  markers: [Boolean, Number],
  markerLabels: [Boolean, Array, Object, Function],
  switchMarkerLabelsSide: Boolean,
  trackImg: String,
  trackColor: String,
  innerTrackImg: String,
  innerTrackColor: String,
  selectionColor: String,
  selectionImg: String,
  thumbSize: {
    type: String,
    default: "20px"
  },
  trackSize: {
    type: String,
    default: "4px"
  },
  disable: Boolean,
  readonly: Boolean,
  dense: Boolean,
  tabindex: [String, Number],
  thumbColor: String,
  thumbPath: {
    type: String,
    default: "M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"
  }
};
const useSliderEmits = ["pan", "update:modelValue", "change"];
function useSlider({ updateValue, updatePosition, getDragging, formAttrs }) {
  const { props, emit, slots, proxy: { $q } } = getCurrentInstance();
  const isDark = useDark(props, $q);
  const injectFormInput = useFormInject(formAttrs);
  const active = ref(false);
  const preventFocus = ref(false);
  const focus = ref(false);
  const dragging = ref(false);
  const axis = computed(() => props.vertical === true ? "--v" : "--h");
  const labelSide = computed(() => "-" + (props.switchLabelSide === true ? "switched" : "standard"));
  const isReversed = computed(() => props.vertical === true ? props.reverse === true : props.reverse !== ($q.lang.rtl === true));
  const innerMin = computed(() => isNaN(props.innerMin) === true || props.innerMin < props.min ? props.min : props.innerMin);
  const innerMax = computed(() => isNaN(props.innerMax) === true || props.innerMax > props.max ? props.max : props.innerMax);
  const editable = computed(() => props.disable !== true && props.readonly !== true && innerMin.value < innerMax.value);
  const roundValueFn = computed(() => {
    if (props.step === 0) {
      return (v) => v;
    }
    const decimals = (String(props.step).trim().split(".")[1] || "").length;
    return (v) => parseFloat(v.toFixed(decimals));
  });
  const keyStep = computed(() => props.step === 0 ? 1 : props.step);
  const tabindex = computed(() => editable.value === true ? props.tabindex || 0 : -1);
  const trackLen = computed(() => props.max - props.min);
  const innerBarLen = computed(() => innerMax.value - innerMin.value);
  const innerMinRatio = computed(() => convertModelToRatio(innerMin.value));
  const innerMaxRatio = computed(() => convertModelToRatio(innerMax.value));
  const positionProp = computed(() => props.vertical === true ? isReversed.value === true ? "bottom" : "top" : isReversed.value === true ? "right" : "left");
  const sizeProp = computed(() => props.vertical === true ? "height" : "width");
  const thicknessProp = computed(() => props.vertical === true ? "width" : "height");
  const orientation = computed(() => props.vertical === true ? "vertical" : "horizontal");
  const attributes = computed(() => {
    const acc = {
      role: "slider",
      "aria-valuemin": innerMin.value,
      "aria-valuemax": innerMax.value,
      "aria-orientation": orientation.value,
      "data-step": props.step
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  const classes = computed(
    () => `q-slider q-slider${axis.value} q-slider--${active.value === true ? "" : "in"}active inline no-wrap ` + (props.vertical === true ? "row" : "column") + (props.disable === true ? " disabled" : " q-slider--enabled" + (editable.value === true ? " q-slider--editable" : "")) + (focus.value === "both" ? " q-slider--focus" : "") + (props.label || props.labelAlways === true ? " q-slider--label" : "") + (props.labelAlways === true ? " q-slider--label-always" : "") + (isDark.value === true ? " q-slider--dark" : "") + (props.dense === true ? " q-slider--dense q-slider--dense" + axis.value : "")
  );
  function getPositionClass(name) {
    const cls = "q-slider__" + name;
    return `${cls} ${cls}${axis.value} ${cls}${axis.value}${labelSide.value}`;
  }
  function getAxisClass(name) {
    const cls = "q-slider__" + name;
    return `${cls} ${cls}${axis.value}`;
  }
  const selectionBarClass = computed(() => {
    const color = props.selectionColor || props.color;
    return "q-slider__selection absolute" + (color !== void 0 ? ` text-${color}` : "");
  });
  const markerClass = computed(() => getAxisClass("markers") + " absolute overflow-hidden");
  const trackContainerClass = computed(() => getAxisClass("track-container"));
  const pinClass = computed(() => getPositionClass("pin"));
  const labelClass = computed(() => getPositionClass("label"));
  const textContainerClass = computed(() => getPositionClass("text-container"));
  const markerLabelsContainerClass = computed(
    () => getPositionClass("marker-labels-container") + (props.markerLabelsClass !== void 0 ? ` ${props.markerLabelsClass}` : "")
  );
  const trackClass = computed(
    () => "q-slider__track relative-position no-outline" + (props.trackColor !== void 0 ? ` bg-${props.trackColor}` : "")
  );
  const trackStyle = computed(() => {
    const acc = { [thicknessProp.value]: props.trackSize };
    if (props.trackImg !== void 0) {
      acc.backgroundImage = `url(${props.trackImg}) !important`;
    }
    return acc;
  });
  const innerBarClass = computed(
    () => "q-slider__inner absolute" + (props.innerTrackColor !== void 0 ? ` bg-${props.innerTrackColor}` : "")
  );
  const innerBarStyle = computed(() => {
    const innerDiff = innerMaxRatio.value - innerMinRatio.value;
    const acc = {
      [positionProp.value]: `${100 * innerMinRatio.value}%`,
      [sizeProp.value]: innerDiff === 0 ? "2px" : `${100 * innerDiff}%`
    };
    if (props.innerTrackImg !== void 0) {
      acc.backgroundImage = `url(${props.innerTrackImg}) !important`;
    }
    return acc;
  });
  function convertRatioToModel(ratio) {
    const { min, max, step } = props;
    let model = min + ratio * (max - min);
    if (step > 0) {
      const modulo = (model - innerMin.value) % step;
      model += (Math.abs(modulo) >= step / 2 ? (modulo < 0 ? -1 : 1) * step : 0) - modulo;
    }
    model = roundValueFn.value(model);
    return between(model, innerMin.value, innerMax.value);
  }
  function convertModelToRatio(model) {
    return trackLen.value === 0 ? 0 : (model - props.min) / trackLen.value;
  }
  function getDraggingRatio(evt, dragging2) {
    const pos = position(evt), val = props.vertical === true ? between((pos.top - dragging2.top) / dragging2.height, 0, 1) : between((pos.left - dragging2.left) / dragging2.width, 0, 1);
    return between(
      isReversed.value === true ? 1 - val : val,
      innerMinRatio.value,
      innerMaxRatio.value
    );
  }
  const markerStep = computed(
    () => isNumber(props.markers) === true ? props.markers : keyStep.value
  );
  const markerTicks = computed(() => {
    const acc = [];
    const step = markerStep.value;
    const max = props.max;
    let value = props.min;
    do {
      acc.push(value);
      value += step;
    } while (value < max);
    acc.push(max);
    return acc;
  });
  const markerLabelClass = computed(() => {
    const prefix = ` ${markerPrefixClass}${axis.value}-`;
    return markerPrefixClass + `${prefix}${props.switchMarkerLabelsSide === true ? "switched" : "standard"}${prefix}${isReversed.value === true ? "rtl" : "ltr"}`;
  });
  const markerLabelsList = computed(() => {
    if (props.markerLabels === false) {
      return null;
    }
    return getMarkerList(props.markerLabels).map((entry, index) => ({
      index,
      value: entry.value,
      label: entry.label || entry.value,
      classes: markerLabelClass.value + (entry.classes !== void 0 ? " " + entry.classes : ""),
      style: {
        ...getMarkerLabelStyle(entry.value),
        ...entry.style || {}
      }
    }));
  });
  const markerScope = computed(() => ({
    markerList: markerLabelsList.value,
    markerMap: markerLabelsMap.value,
    classes: markerLabelClass.value,
    getStyle: getMarkerLabelStyle
  }));
  const markerStyle = computed(() => {
    const size = innerBarLen.value === 0 ? "2px" : 100 * markerStep.value / innerBarLen.value;
    return {
      ...innerBarStyle.value,
      backgroundSize: props.vertical === true ? `2px ${size}%` : `${size}% 2px`
    };
  });
  function getMarkerList(def) {
    if (def === false) {
      return null;
    }
    if (def === true) {
      return markerTicks.value.map(defaultMarkerConvertFn);
    }
    if (typeof def === "function") {
      return markerTicks.value.map((value) => {
        const item = def(value);
        return isObject(item) === true ? { ...item, value } : { value, label: item };
      });
    }
    const filterFn = ({ value }) => value >= props.min && value <= props.max;
    if (Array.isArray(def) === true) {
      return def.map((item) => isObject(item) === true ? item : { value: item }).filter(filterFn);
    }
    return Object.keys(def).map((key) => {
      const item = def[key];
      const value = Number(key);
      return isObject(item) === true ? { ...item, value } : { value, label: item };
    }).filter(filterFn);
  }
  function getMarkerLabelStyle(val) {
    return { [positionProp.value]: `${100 * (val - props.min) / trackLen.value}%` };
  }
  const markerLabelsMap = computed(() => {
    if (props.markerLabels === false) {
      return null;
    }
    const acc = {};
    markerLabelsList.value.forEach((entry) => {
      acc[entry.value] = entry;
    });
    return acc;
  });
  function getMarkerLabelsContent() {
    if (slots["marker-label-group"] !== void 0) {
      return slots["marker-label-group"](markerScope.value);
    }
    const fn = slots["marker-label"] || defaultMarkerLabelRenderFn;
    return markerLabelsList.value.map((marker) => fn({
      marker,
      ...markerScope.value
    }));
  }
  const panDirective = computed(() => {
    return [[
      TouchPan,
      onPan,
      void 0,
      {
        [orientation.value]: true,
        prevent: true,
        stop: true,
        mouse: true,
        mouseAllDir: true
      }
    ]];
  });
  function onPan(event) {
    if (event.isFinal === true) {
      if (dragging.value !== void 0) {
        updatePosition(event.evt);
        event.touch === true && updateValue(true);
        dragging.value = void 0;
        emit("pan", "end");
      }
      active.value = false;
      focus.value = false;
    } else if (event.isFirst === true) {
      dragging.value = getDragging(event.evt);
      updatePosition(event.evt);
      updateValue();
      active.value = true;
      emit("pan", "start");
    } else {
      updatePosition(event.evt);
      updateValue();
    }
  }
  function onBlur() {
    focus.value = false;
  }
  function onActivate(evt) {
    updatePosition(evt, getDragging(evt));
    updateValue();
    preventFocus.value = true;
    active.value = true;
    document.addEventListener("mouseup", onDeactivate, true);
  }
  function onDeactivate() {
    preventFocus.value = false;
    active.value = false;
    updateValue(true);
    onBlur();
    document.removeEventListener("mouseup", onDeactivate, true);
  }
  function onMobileClick(evt) {
    updatePosition(evt, getDragging(evt));
    updateValue(true);
  }
  function onKeyup(evt) {
    if (keyCodes.includes(evt.keyCode)) {
      updateValue(true);
    }
  }
  function getTextContainerStyle(ratio) {
    if (props.vertical === true) {
      return null;
    }
    const p = $q.lang.rtl !== props.reverse ? 1 - ratio : ratio;
    return {
      transform: `translateX(calc(${2 * p - 1} * ${props.thumbSize} / 2 + ${50 - 100 * p}%))`
    };
  }
  function getThumbRenderFn(thumb) {
    const focusClass = computed(() => preventFocus.value === false && (focus.value === thumb.focusValue || focus.value === "both") ? " q-slider--focus" : "");
    const classes2 = computed(
      () => `q-slider__thumb q-slider__thumb${axis.value} q-slider__thumb${axis.value}-${isReversed.value === true ? "rtl" : "ltr"} absolute non-selectable` + focusClass.value + (thumb.thumbColor.value !== void 0 ? ` text-${thumb.thumbColor.value}` : "")
    );
    const style = computed(() => ({
      width: props.thumbSize,
      height: props.thumbSize,
      [positionProp.value]: `${100 * thumb.ratio.value}%`,
      zIndex: focus.value === thumb.focusValue ? 2 : void 0
    }));
    const pinColor = computed(() => thumb.labelColor.value !== void 0 ? ` text-${thumb.labelColor.value}` : "");
    const textContainerStyle = computed(() => getTextContainerStyle(thumb.ratio.value));
    const textClass = computed(() => "q-slider__text" + (thumb.labelTextColor.value !== void 0 ? ` text-${thumb.labelTextColor.value}` : ""));
    return () => {
      const thumbContent = [
        h("svg", {
          class: "q-slider__thumb-shape absolute-full",
          viewBox: "0 0 20 20",
          "aria-hidden": "true"
        }, [
          h("path", { d: props.thumbPath })
        ]),
        h("div", { class: "q-slider__focus-ring fit" })
      ];
      if (props.label === true || props.labelAlways === true) {
        thumbContent.push(
          h("div", {
            class: pinClass.value + " absolute fit no-pointer-events" + pinColor.value
          }, [
            h("div", {
              class: labelClass.value,
              style: { minWidth: props.thumbSize }
            }, [
              h("div", {
                class: textContainerClass.value,
                style: textContainerStyle.value
              }, [
                h("span", { class: textClass.value }, thumb.label.value)
              ])
            ])
          ])
        );
        if (props.name !== void 0 && props.disable !== true) {
          injectFormInput(thumbContent, "push");
        }
      }
      return h("div", {
        class: classes2.value,
        style: style.value,
        ...thumb.getNodeData()
      }, thumbContent);
    };
  }
  function getContent(selectionBarStyle, trackContainerTabindex, trackContainerEvents, injectThumb) {
    const trackContent = [];
    props.innerTrackColor !== "transparent" && trackContent.push(
      h("div", {
        key: "inner",
        class: innerBarClass.value,
        style: innerBarStyle.value
      })
    );
    props.selectionColor !== "transparent" && trackContent.push(
      h("div", {
        key: "selection",
        class: selectionBarClass.value,
        style: selectionBarStyle.value
      })
    );
    props.markers !== false && trackContent.push(
      h("div", {
        key: "marker",
        class: markerClass.value,
        style: markerStyle.value
      })
    );
    injectThumb(trackContent);
    const content = [
      hDir(
        "div",
        {
          key: "trackC",
          class: trackContainerClass.value,
          tabindex: trackContainerTabindex.value,
          ...trackContainerEvents.value
        },
        [
          h("div", {
            class: trackClass.value,
            style: trackStyle.value
          }, trackContent)
        ],
        "slide",
        editable.value,
        () => panDirective.value
      )
    ];
    if (props.markerLabels !== false) {
      const action = props.switchMarkerLabelsSide === true ? "unshift" : "push";
      content[action](
        h("div", {
          key: "markerL",
          class: markerLabelsContainerClass.value
        }, getMarkerLabelsContent())
      );
    }
    return content;
  }
  onBeforeUnmount(() => {
    document.removeEventListener("mouseup", onDeactivate, true);
  });
  return {
    state: {
      active,
      focus,
      preventFocus,
      dragging,
      editable,
      classes,
      tabindex,
      attributes,
      roundValueFn,
      keyStep,
      trackLen,
      innerMin,
      innerMinRatio,
      innerMax,
      innerMaxRatio,
      positionProp,
      sizeProp,
      isReversed
    },
    methods: {
      onActivate,
      onMobileClick,
      onBlur,
      onKeyup,
      getContent,
      getThumbRenderFn,
      convertRatioToModel,
      convertModelToRatio,
      getDraggingRatio
    }
  };
}
const getNodeData = () => ({});
var QSlider = createComponent({
  name: "QSlider",
  props: {
    ...useSliderProps,
    modelValue: {
      required: true,
      default: null,
      validator: (v) => typeof v === "number" || v === null
    },
    labelValue: [String, Number]
  },
  emits: useSliderEmits,
  setup(props, { emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const { state, methods } = useSlider({
      updateValue,
      updatePosition,
      getDragging,
      formAttrs: useFormAttrs(props)
    });
    const rootRef = ref(null);
    const curRatio = ref(0);
    const model = ref(0);
    function normalizeModel() {
      model.value = props.modelValue === null ? state.innerMin.value : between(props.modelValue, state.innerMin.value, state.innerMax.value);
    }
    watch(
      () => `${props.modelValue}|${state.innerMin.value}|${state.innerMax.value}`,
      normalizeModel
    );
    normalizeModel();
    const modelRatio = computed(() => methods.convertModelToRatio(model.value));
    const ratio = computed(() => state.active.value === true ? curRatio.value : modelRatio.value);
    const selectionBarStyle = computed(() => {
      const acc = {
        [state.positionProp.value]: `${100 * state.innerMinRatio.value}%`,
        [state.sizeProp.value]: `${100 * (ratio.value - state.innerMinRatio.value)}%`
      };
      if (props.selectionImg !== void 0) {
        acc.backgroundImage = `url(${props.selectionImg}) !important`;
      }
      return acc;
    });
    const getThumb = methods.getThumbRenderFn({
      focusValue: true,
      getNodeData,
      ratio,
      label: computed(() => props.labelValue !== void 0 ? props.labelValue : model.value),
      thumbColor: computed(() => props.thumbColor || props.color),
      labelColor: computed(() => props.labelColor),
      labelTextColor: computed(() => props.labelTextColor)
    });
    const trackContainerEvents = computed(() => {
      if (state.editable.value !== true) {
        return {};
      }
      return $q.platform.is.mobile === true ? { onClick: methods.onMobileClick } : {
        onMousedown: methods.onActivate,
        onFocus,
        onBlur: methods.onBlur,
        onKeydown,
        onKeyup: methods.onKeyup
      };
    });
    function updateValue(change) {
      if (model.value !== props.modelValue) {
        emit("update:modelValue", model.value);
      }
      change === true && emit("change", model.value);
    }
    function getDragging() {
      return rootRef.value.getBoundingClientRect();
    }
    function updatePosition(event, dragging = state.dragging.value) {
      const ratio2 = methods.getDraggingRatio(event, dragging);
      model.value = methods.convertRatioToModel(ratio2);
      curRatio.value = props.snap !== true || props.step === 0 ? ratio2 : methods.convertModelToRatio(model.value);
    }
    function onFocus() {
      state.focus.value = true;
    }
    function onKeydown(evt) {
      if (!keyCodes.includes(evt.keyCode)) {
        return;
      }
      stopAndPrevent(evt);
      const stepVal = ([34, 33].includes(evt.keyCode) ? 10 : 1) * state.keyStep.value, offset = ([34, 37, 40].includes(evt.keyCode) ? -1 : 1) * (state.isReversed.value === true ? -1 : 1) * (props.vertical === true ? -1 : 1) * stepVal;
      model.value = between(
        state.roundValueFn.value(model.value + offset),
        state.innerMin.value,
        state.innerMax.value
      );
      updateValue();
    }
    return () => {
      const content = methods.getContent(
        selectionBarStyle,
        state.tabindex,
        trackContainerEvents,
        (node) => {
          node.push(getThumb());
        }
      );
      return h("div", {
        ref: rootRef,
        class: state.classes.value + (props.modelValue === null ? " q-slider--no-value" : ""),
        ...state.attributes.value,
        "aria-valuenow": props.modelValue
      }, content);
    };
  }
});
var LightpainterControls_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = { class: "controls" };
const _sfc_main$2 = {
  __name: "LightpainterControls",
  props: {
    "video_active": { type: Boolean, required: true },
    "video_activeModifiers": {},
    "tweak_active": { type: Boolean, required: true },
    "tweak_activeModifiers": {},
    "paint_active": { type: Boolean, required: true },
    "paint_activeModifiers": {},
    "tweak_lum": { type: Number, required: true },
    "tweak_lumModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["clear", "save"], ["update:video_active", "update:tweak_active", "update:paint_active", "update:tweak_lum"]),
  setup(__props, { emit: __emit }) {
    const $q = useQuasar();
    const video_active = useModel(__props, "video_active");
    const tweak_active = useModel(__props, "tweak_active");
    const paint_active = useModel(__props, "paint_active");
    const tweak_lum = useModel(__props, "tweak_lum");
    $q.fullscreen.request().then(() => {
    }).catch((err) => {
    });
    $q.fullscreen.exit().then(() => {
    }).catch((err) => {
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(QToggle, {
          size: "5vh",
          dense: "",
          modelValue: video_active.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => video_active.value = $event),
          icon: "videocam"
        }, null, 8, ["modelValue"]),
        createVNode(QToggle, {
          size: "5vh",
          dense: "",
          modelValue: tweak_active.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tweak_active.value = $event),
          icon: "tonality"
        }, null, 8, ["modelValue"]),
        createVNode(QToggle, {
          size: "5vh",
          dense: "",
          modelValue: paint_active.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => paint_active.value = $event),
          color: "pink",
          icon: "emergency_recording"
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, null, {
              default: withCtx(() => [
                createTextVNode(" 'r' to toggle painting")
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(QBtn, {
          size: "2.5vh",
          padding: "xs",
          color: "negative",
          round: "",
          icon: "fiber_manual_record",
          loading: paint_active.value,
          onMousedown: _cache[3] || (_cache[3] = ($event) => paint_active.value = true),
          onMouseup: _cache[4] || (_cache[4] = ($event) => paint_active.value = false),
          onTouchstart: _cache[5] || (_cache[5] = ($event) => paint_active.value = true),
          onTouchend: _cache[6] || (_cache[6] = ($event) => paint_active.value = false)
        }, {
          loading: withCtx(() => [
            createVNode(QSpinnerRings)
          ]),
          _: 1
        }, 8, ["loading"]),
        createVNode(QBtn, {
          size: "2.5vh",
          padding: "xs",
          color: "primary",
          round: "",
          icon: "delete_forever",
          onClick: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("clear"))
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, null, {
              default: withCtx(() => [
                createTextVNode("'c' to clear painting")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QBtn, {
          size: "2.5vh",
          padding: "xs",
          color: "primary",
          round: "",
          icon: "save",
          onClick: _cache[8] || (_cache[8] = ($event) => _ctx.$emit("save"))
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, null, {
              default: withCtx(() => [
                createTextVNode("'s' to save current painting to memory")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QBtn, {
          size: "2.5vh",
          padding: "xs",
          round: "",
          onClick: _cache[9] || (_cache[9] = ($event) => unref($q).fullscreen.toggle()),
          icon: unref($q).fullscreen.isActive ? "fullscreen_exit" : "fullscreen"
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, null, {
              default: withCtx(() => [
                createTextVNode("toggle full screen mode")
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["icon"]),
        createVNode(QSlider, {
          modelValue: tweak_lum.value,
          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => tweak_lum.value = $event),
          min: -5,
          max: 2,
          step: 0,
          disable: !tweak_active.value
        }, null, 8, ["modelValue", "disable"])
      ]);
    };
  }
};
var LightpainterControls = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-112e8150"], ["__file", "LightpainterControls.vue"]]);
var LightPaint_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-0760386c"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("section", { class: "flex-container" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "flex-container flex-column" }, [
    /* @__PURE__ */ createBaseVNode("video"),
    /* @__PURE__ */ createBaseVNode("canvas", { id: "tweak" })
  ]),
  /* @__PURE__ */ createBaseVNode("canvas", { id: "result" })
], -1));
const _sfc_main$1 = {
  __name: "LightPaint",
  setup(__props) {
    const $q = useQuasar();
    const el = ref();
    const animation_handle = ref(null);
    const video = ref();
    const media_stream = ref();
    const video_track = ref();
    const video_active = ref(true);
    const video_is_portrait = ref(false);
    const device_is_landscape = ref(true);
    ref([]);
    const canvas_result = ref();
    const ctx_result = ref();
    const canvas_tweak = ref();
    const ctx_tweak = ref();
    const tweak_active = ref(false);
    const tweak_lum = ref(0.8);
    const paint_active = ref(false);
    const saved_visuals = ref([]);
    const video_constraints = {
      width: { min: 800, ideal: 1920 },
      height: { min: 600, ideal: 1080 },
      frameRate: { max: 30 },
      facingMode: { ideal: "environment" }
    };
    function generate_filename(title = "lightpainting", ext = "png") {
      const formattedString = date.formatDate(Date.now(), "YYYY-MM-DD - HH:mm:ss.SSS");
      const filename = `${formattedString} - ${title}.${ext}`;
      return filename;
    }
    onMounted(() => {
      setup_canvas();
      setup_cam();
      start_cam();
      document.addEventListener("keydown", handleGlobalKeydown);
      screen.orientation.addEventListener("change", handleScreenOrientationChange);
      update_device_is_landscape();
    });
    onUnmounted(() => {
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
      }
    }
    function setup_canvas() {
      console.log("setup_canvas");
      canvas_tweak.value = document.querySelector("canvas");
      ctx_tweak.value = canvas_tweak.value.getContext("2d");
      canvas_result.value = document.querySelector("canvas#result");
      ctx_result.value = canvas_result.value.getContext("2d");
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
          blob
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
        canvas_tweak.value.height = track_settings.height;
        canvas_tweak.value.width = track_settings.width;
        canvas_result.value.height = track_settings.height;
        canvas_result.value.width = track_settings.width;
      }
      ctx_result.value.globalCompositeOperation = "lighten";
      clear_canvas();
      step();
    }
    function step() {
      if (tweak_active.value) {
        if (video_is_portrait.value && device_is_landscape.value) {
          ctx_tweak.value.save();
          ctx_tweak.value.translate(0, canvas_tweak.value.height);
          ctx_tweak.value.rotate(-90 * Math.PI / 180);
          ctx_tweak.value.drawImage(video.value, 0, 0);
          ctx_tweak.value.restore();
        } else {
          ctx_tweak.value.drawImage(video.value, 0, 0);
        }
        tweakContrast();
      } else if (paint_active.value) {
        if (video_is_portrait.value && device_is_landscape.value) {
          ctx_result.value.save();
          ctx_result.value.translate(0, canvas_result.value.height);
          ctx_result.value.rotate(-90 * Math.PI / 180);
          ctx_result.value.drawImage(video.value, 0, 0);
          ctx_result.value.restore();
        } else {
          ctx_result.value.drawImage(video.value, 0, 0);
        }
      }
      animation_handle.value = video.value.requestVideoFrameCallback(step);
    }
    function bezierSimple(t, p1) {
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
        r = r / 255;
        g = g / 255;
        b = b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const lum = (max + min) / 2;
        data[i + 1] = g * bezierSimple(lum, tweak_lum.value) * 255;
        data[i + 0] = r * bezierSimple(lum, tweak_lum.value) * 255;
        data[i + 2] = b * bezierSimple(lum, tweak_lum.value) * 255;
      }
      ctx_tweak.value.putImageData(imageData, 0, 0);
      if (paint_active.value) {
        ctx_result.value.drawImage(canvas_tweak.value, 0, 0);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "el",
        ref: el,
        class: normalizeClass(["flex-container flex-column", { "video-portrait": video_is_portrait.value }])
      }, [
        _hoisted_1,
        createVNode(LightpainterControls, {
          onClear: clear_canvas,
          onSave: save_canvas,
          paint_active: paint_active.value,
          "onUpdate:paint_active": _cache[0] || (_cache[0] = ($event) => paint_active.value = $event),
          tweak_active: tweak_active.value,
          "onUpdate:tweak_active": _cache[1] || (_cache[1] = ($event) => tweak_active.value = $event),
          tweak_lum: tweak_lum.value,
          "onUpdate:tweak_lum": _cache[2] || (_cache[2] = ($event) => tweak_lum.value = $event),
          video_active: video_active.value,
          "onUpdate:video_active": _cache[3] || (_cache[3] = ($event) => video_active.value = $event)
        }, null, 8, ["paint_active", "tweak_active", "tweak_lum", "video_active"]),
        createVNode(SavedVisuals, { visuals: saved_visuals.value }, {
          default: withCtx(() => [
            createTextVNode("Saved images:")
          ]),
          _: 1
        }, 8, ["visuals"])
      ], 2);
    };
  }
};
var LightPaint = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0760386c"], ["__file", "LightPaint.vue"]]);
const _sfc_main = {
  __name: "IndexPage",
  setup(__props) {
    const $q = useQuasar();
    $q.dark.set(true);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "flex flex-center content-stretch" }, {
        default: withCtx(() => [
          createVNode(LightPaint)
        ]),
        _: 1
      });
    };
  }
};
var IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "IndexPage.vue"]]);
export { IndexPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLmZiMDkyZmFjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtcXVhc2FyL3VzZS1xdWFzYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9kYXRlL3ByaXZhdGUucGVyc2lhbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2RhdGUvZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9ydmZjLXBvbHlmaWxsL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZpbGUtc2F2ZXIvZGlzdC9GaWxlU2F2ZXIubWluLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvU2F2ZWRWaXN1YWxzLnZ1ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXJlZm9jdXMtdGFyZ2V0L3VzZS1yZWZvY3VzLXRhcmdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1mb3JtL3ByaXZhdGUudXNlLWZvcm0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLm9wdGlvbi1zaXplcy9vcHRpb24tc2l6ZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NoZWNrYm94L3VzZS1jaGVja2JveC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdG9nZ2xlL1FUb2dnbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNjcm9sbC10YXJnZXQvdXNlLXNjcm9sbC10YXJnZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnBvcnRhbC9wb3J0YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wb3J0YWwvdXNlLXBvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtdGljay91c2UtdGljay5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUuY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5wb3NpdGlvbi1lbmdpbmUvcG9zaXRpb24tZW5naW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sdGlwL1FUb29sdGlwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zcGlubmVyL1FTcGlubmVyUmluZ3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NsaWRlci91c2Utc2xpZGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZXIvUVNsaWRlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0xpZ2h0cGFpbnRlckNvbnRyb2xzLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0xpZ2h0UGFpbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL0luZGV4UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBxdWFzYXJLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSAkcSBpbnN0YW5jZS5cbiAqIEVxdWl2YWxlbnQgdG8gYHRoaXMuJHFgIGluc2lkZSB0ZW1wbGF0ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVF1YXNhciAoKSB7XG4gIHJldHVybiBpbmplY3QocXVhc2FyS2V5KVxufVxuIiwiLy8gdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vamFsYWFsaS9qYWxhYWxpLWpzXG5cbi8qXG4gIEphbGFhbGkgeWVhcnMgc3RhcnRpbmcgdGhlIDMzLXllYXIgcnVsZS5cbiovXG5jb25zdCBicmVha3MgPSBbXG4gIC02MSwgOSwgMzgsIDE5OSwgNDI2LCA2ODYsIDc1NiwgODE4LCAxMTExLCAxMTgxLCAxMjEwLFxuICAxNjM1LCAyMDYwLCAyMDk3LCAyMTkyLCAyMjYyLCAyMzI0LCAyMzk0LCAyNDU2LCAzMTc4XG5dXG5cbi8qXG4gIENvbnZlcnRzIGEgR3JlZ29yaWFuIGRhdGUgdG8gSmFsYWFsaS5cbiovXG5leHBvcnQgZnVuY3Rpb24gdG9KYWxhYWxpIChneSwgZ20sIGdkKSB7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZ3kpID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICBnZCA9IGd5LmdldERhdGUoKVxuICAgIGdtID0gZ3kuZ2V0TW9udGgoKSArIDFcbiAgICBneSA9IGd5LmdldEZ1bGxZZWFyKClcbiAgfVxuICByZXR1cm4gZDJqKGcyZChneSwgZ20sIGdkKSlcbn1cblxuLypcbiAgQ29udmVydHMgYSBKYWxhYWxpIGRhdGUgdG8gR3JlZ29yaWFuLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbiAoanksIGptLCBqZCkge1xuICByZXR1cm4gZDJnKGoyZChqeSwgam0sIGpkKSlcbn1cblxuLypcbiAgSXMgdGhpcyBhIGxlYXAgeWVhciBvciBub3Q/XG4qL1xuZnVuY3Rpb24gaXNMZWFwSmFsYWFsaVllYXIgKGp5KSB7XG4gIHJldHVybiBqYWxDYWxMZWFwKGp5KSA9PT0gMFxufVxuXG4vKlxuICBOdW1iZXIgb2YgZGF5cyBpbiBhIGdpdmVuIG1vbnRoIGluIGEgSmFsYWFsaSB5ZWFyLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBqYWxhYWxpTW9udGhMZW5ndGggKGp5LCBqbSkge1xuICBpZiAoam0gPD0gNikgcmV0dXJuIDMxXG4gIGlmIChqbSA8PSAxMSkgcmV0dXJuIDMwXG4gIGlmIChpc0xlYXBKYWxhYWxpWWVhcihqeSkpIHJldHVybiAzMFxuICByZXR1cm4gMjlcbn1cblxuLypcbiAgICBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgdGhlIEphbGFhbGkgKFBlcnNpYW4pIHllYXIgaXNcbiAgICBsZWFwICgzNjYtZGF5IGxvbmcpIG9yIGlzIHRoZSBjb21tb24geWVhciAoMzY1IGRheXMpXG5cbiAgICBAcGFyYW0gankgSmFsYWFsaSBjYWxlbmRhciB5ZWFyICgtNjEgdG8gMzE3NylcbiAgICBAcmV0dXJucyBudW1iZXIgb2YgeWVhcnMgc2luY2UgdGhlIGxhc3QgbGVhcCB5ZWFyICgwIHRvIDQpXG4gKi9cbmZ1bmN0aW9uIGphbENhbExlYXAgKGp5KSB7XG4gIGNvbnN0IGJsID0gYnJlYWtzLmxlbmd0aFxuICBsZXRcbiAgICBqcCA9IGJyZWFrc1sgMCBdLFxuICAgIGptLFxuICAgIGp1bXAsXG4gICAgbGVhcCxcbiAgICBuLFxuICAgIGlcblxuICBpZiAoankgPCBqcCB8fCBqeSA+PSBicmVha3NbIGJsIC0gMSBdKSB7IHRocm93IG5ldyBFcnJvcignSW52YWxpZCBKYWxhYWxpIHllYXIgJyArIGp5KSB9XG5cbiAgZm9yIChpID0gMTsgaSA8IGJsOyBpICs9IDEpIHtcbiAgICBqbSA9IGJyZWFrc1sgaSBdXG4gICAganVtcCA9IGptIC0ganBcbiAgICBpZiAoankgPCBqbSkgeyBicmVhayB9XG4gICAganAgPSBqbVxuICB9XG4gIG4gPSBqeSAtIGpwXG5cbiAgaWYgKGp1bXAgLSBuIDwgNikgeyBuID0gbiAtIGp1bXAgKyBkaXYoanVtcCArIDQsIDMzKSAqIDMzIH1cbiAgbGVhcCA9IG1vZChtb2QobiArIDEsIDMzKSAtIDEsIDQpXG4gIGlmIChsZWFwID09PSAtMSkge1xuICAgIGxlYXAgPSA0XG4gIH1cblxuICByZXR1cm4gbGVhcFxufVxuXG4vKlxuICBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgdGhlIEphbGFhbGkgKFBlcnNpYW4pIHllYXIgaXNcbiAgbGVhcCAoMzY2LWRheSBsb25nKSBvciBpcyB0aGUgY29tbW9uIHllYXIgKDM2NSBkYXlzKSwgYW5kXG4gIGZpbmRzIHRoZSBkYXkgaW4gTWFyY2ggKEdyZWdvcmlhbiBjYWxlbmRhcikgb2YgdGhlIGZpcnN0XG4gIGRheSBvZiB0aGUgSmFsYWFsaSB5ZWFyIChqeSkuXG5cbiAgQHBhcmFtIGp5IEphbGFhbGkgY2FsZW5kYXIgeWVhciAoLTYxIHRvIDMxNzcpXG4gIEBwYXJhbSB3aXRob3V0TGVhcCB3aGVuIGRvbid0IG5lZWQgbGVhcCAodHJ1ZSBvciBmYWxzZSkgZGVmYXVsdCBpcyBmYWxzZVxuICBAcmV0dXJuXG4gICAgbGVhcDogbnVtYmVyIG9mIHllYXJzIHNpbmNlIHRoZSBsYXN0IGxlYXAgeWVhciAoMCB0byA0KVxuICAgIGd5OiBHcmVnb3JpYW4geWVhciBvZiB0aGUgYmVnaW5uaW5nIG9mIEphbGFhbGkgeWVhclxuICAgIG1hcmNoOiB0aGUgTWFyY2ggZGF5IG9mIEZhcnZhcmRpbiB0aGUgMXN0ICgxc3QgZGF5IG9mIGp5KVxuICBAc2VlOiBodHRwOi8vd3d3LmFzdHJvLnVuaS50b3J1bi5wbC9+a2IvUGFwZXJzL0VNUC9QZXJzaWFuQy1FTVAuaHRtXG4gIEBzZWU6IGh0dHA6Ly93d3cuZm91cm1pbGFiLmNoL2RvY3VtZW50cy9jYWxlbmRhci9cbiovXG5mdW5jdGlvbiBqYWxDYWwgKGp5LCB3aXRob3V0TGVhcCkge1xuICBjb25zdFxuICAgIGJsID0gYnJlYWtzLmxlbmd0aCxcbiAgICBneSA9IGp5ICsgNjIxXG4gIGxldFxuICAgIGxlYXBKID0gLTE0LFxuICAgIGpwID0gYnJlYWtzWyAwIF0sXG4gICAgam0sXG4gICAganVtcCxcbiAgICBsZWFwLFxuICAgIG4sXG4gICAgaVxuXG4gIGlmIChqeSA8IGpwIHx8IGp5ID49IGJyZWFrc1sgYmwgLSAxIF0pIHsgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEphbGFhbGkgeWVhciAnICsgankpIH1cblxuICAvLyBGaW5kIHRoZSBsaW1pdGluZyB5ZWFycyBmb3IgdGhlIEphbGFhbGkgeWVhciBqeS5cbiAgZm9yIChpID0gMTsgaSA8IGJsOyBpICs9IDEpIHtcbiAgICBqbSA9IGJyZWFrc1sgaSBdXG4gICAganVtcCA9IGptIC0ganBcbiAgICBpZiAoankgPCBqbSkgeyBicmVhayB9XG4gICAgbGVhcEogPSBsZWFwSiArIGRpdihqdW1wLCAzMykgKiA4ICsgZGl2KG1vZChqdW1wLCAzMyksIDQpXG4gICAganAgPSBqbVxuICB9XG4gIG4gPSBqeSAtIGpwXG5cbiAgLy8gRmluZCB0aGUgbnVtYmVyIG9mIGxlYXAgeWVhcnMgZnJvbSBBRCA2MjEgdG8gdGhlIGJlZ2lubmluZ1xuICAvLyBvZiB0aGUgY3VycmVudCBKYWxhYWxpIHllYXIgaW4gdGhlIFBlcnNpYW4gY2FsZW5kYXIuXG4gIGxlYXBKID0gbGVhcEogKyBkaXYobiwgMzMpICogOCArIGRpdihtb2QobiwgMzMpICsgMywgNClcbiAgaWYgKG1vZChqdW1wLCAzMykgPT09IDQgJiYganVtcCAtIG4gPT09IDQpIHsgbGVhcEogKz0gMSB9XG5cbiAgLy8gQW5kIHRoZSBzYW1lIGluIHRoZSBHcmVnb3JpYW4gY2FsZW5kYXIgKHVudGlsIHRoZSB5ZWFyIGd5KS5cbiAgY29uc3QgbGVhcEcgPSBkaXYoZ3ksIDQpIC0gZGl2KChkaXYoZ3ksIDEwMCkgKyAxKSAqIDMsIDQpIC0gMTUwXG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBHcmVnb3JpYW4gZGF0ZSBvZiBGYXJ2YXJkaW4gdGhlIDFzdC5cbiAgY29uc3QgbWFyY2ggPSAyMCArIGxlYXBKIC0gbGVhcEdcblxuICAvLyBGaW5kIGhvdyBtYW55IHllYXJzIGhhdmUgcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGxlYXAgeWVhci5cbiAgaWYgKCF3aXRob3V0TGVhcCkge1xuICAgIGlmIChqdW1wIC0gbiA8IDYpIHsgbiA9IG4gLSBqdW1wICsgZGl2KGp1bXAgKyA0LCAzMykgKiAzMyB9XG4gICAgbGVhcCA9IG1vZChtb2QobiArIDEsIDMzKSAtIDEsIDQpXG4gICAgaWYgKGxlYXAgPT09IC0xKSB7XG4gICAgICBsZWFwID0gNFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbGVhcCxcbiAgICBneSxcbiAgICBtYXJjaFxuICB9XG59XG5cbi8qXG4gIENvbnZlcnRzIGEgZGF0ZSBvZiB0aGUgSmFsYWFsaSBjYWxlbmRhciB0byB0aGUgSnVsaWFuIERheSBudW1iZXIuXG5cbiAgQHBhcmFtIGp5IEphbGFhbGkgeWVhciAoMSB0byAzMTAwKVxuICBAcGFyYW0gam0gSmFsYWFsaSBtb250aCAoMSB0byAxMilcbiAgQHBhcmFtIGpkIEphbGFhbGkgZGF5ICgxIHRvIDI5LzMxKVxuICBAcmV0dXJuIEp1bGlhbiBEYXkgbnVtYmVyXG4qL1xuZnVuY3Rpb24gajJkIChqeSwgam0sIGpkKSB7XG4gIGNvbnN0IHIgPSBqYWxDYWwoanksIHRydWUpXG4gIHJldHVybiBnMmQoci5neSwgMywgci5tYXJjaCkgKyAoam0gLSAxKSAqIDMxIC0gZGl2KGptLCA3KSAqIChqbSAtIDcpICsgamQgLSAxXG59XG5cbi8qXG4gIENvbnZlcnRzIHRoZSBKdWxpYW4gRGF5IG51bWJlciB0byBhIGRhdGUgaW4gdGhlIEphbGFhbGkgY2FsZW5kYXIuXG5cbiAgQHBhcmFtIGpkbiBKdWxpYW4gRGF5IG51bWJlclxuICBAcmV0dXJuXG4gICAgank6IEphbGFhbGkgeWVhciAoMSB0byAzMTAwKVxuICAgIGptOiBKYWxhYWxpIG1vbnRoICgxIHRvIDEyKVxuICAgIGpkOiBKYWxhYWxpIGRheSAoMSB0byAyOS8zMSlcbiovXG5mdW5jdGlvbiBkMmogKGpkbikge1xuICBjb25zdCBneSA9IGQyZyhqZG4pLmd5IC8vIENhbGN1bGF0ZSBHcmVnb3JpYW4geWVhciAoZ3kpLlxuICBsZXRcbiAgICBqeSA9IGd5IC0gNjIxLFxuICAgIGpkLFxuICAgIGptLFxuICAgIGtcbiAgY29uc3RcbiAgICByID0gamFsQ2FsKGp5LCBmYWxzZSksXG4gICAgamRuMWYgPSBnMmQoZ3ksIDMsIHIubWFyY2gpXG5cbiAgLy8gRmluZCBudW1iZXIgb2YgZGF5cyB0aGF0IHBhc3NlZCBzaW5jZSAxIEZhcnZhcmRpbi5cbiAgayA9IGpkbiAtIGpkbjFmXG4gIGlmIChrID49IDApIHtcbiAgICBpZiAoayA8PSAxODUpIHtcbiAgICAgIC8vIFRoZSBmaXJzdCA2IG1vbnRocy5cbiAgICAgIGptID0gMSArIGRpdihrLCAzMSlcbiAgICAgIGpkID0gbW9kKGssIDMxKSArIDFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGp5LFxuICAgICAgICBqbSxcbiAgICAgICAgamRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBUaGUgcmVtYWluaW5nIG1vbnRocy5cbiAgICAgIGsgLT0gMTg2XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIFByZXZpb3VzIEphbGFhbGkgeWVhci5cbiAgICBqeSAtPSAxXG4gICAgayArPSAxNzlcbiAgICBpZiAoci5sZWFwID09PSAxKSB7IGsgKz0gMSB9XG4gIH1cbiAgam0gPSA3ICsgZGl2KGssIDMwKVxuICBqZCA9IG1vZChrLCAzMCkgKyAxXG4gIHJldHVybiB7XG4gICAganksXG4gICAgam0sXG4gICAgamRcbiAgfVxufVxuXG4vKlxuICBDYWxjdWxhdGVzIHRoZSBKdWxpYW4gRGF5IG51bWJlciBmcm9tIEdyZWdvcmlhbiBvciBKdWxpYW5cbiAgY2FsZW5kYXIgZGF0ZXMuIFRoaXMgaW50ZWdlciBudW1iZXIgY29ycmVzcG9uZHMgdG8gdGhlIG5vb24gb2ZcbiAgdGhlIGRhdGUgKGkuZS4gMTIgaG91cnMgb2YgVW5pdmVyc2FsIFRpbWUpLlxuICBUaGUgcHJvY2VkdXJlIHdhcyB0ZXN0ZWQgdG8gYmUgZ29vZCBzaW5jZSAxIE1hcmNoLCAtMTAwMTAwIChvZiBib3RoXG4gIGNhbGVuZGFycykgdXAgdG8gYSBmZXcgbWlsbGlvbiB5ZWFycyBpbnRvIHRoZSBmdXR1cmUuXG5cbiAgQHBhcmFtIGd5IENhbGVuZGFyIHllYXIgKHllYXJzIEJDIG51bWJlcmVkIDAsIC0xLCAtMiwgLi4uKVxuICBAcGFyYW0gZ20gQ2FsZW5kYXIgbW9udGggKDEgdG8gMTIpXG4gIEBwYXJhbSBnZCBDYWxlbmRhciBkYXkgb2YgdGhlIG1vbnRoICgxIHRvIDI4LzI5LzMwLzMxKVxuICBAcmV0dXJuIEp1bGlhbiBEYXkgbnVtYmVyXG4qL1xuZnVuY3Rpb24gZzJkIChneSwgZ20sIGdkKSB7XG4gIGxldCBkID0gZGl2KChneSArIGRpdihnbSAtIDgsIDYpICsgMTAwMTAwKSAqIDE0NjEsIDQpXG4gICAgICArIGRpdigxNTMgKiBtb2QoZ20gKyA5LCAxMikgKyAyLCA1KVxuICAgICAgKyBnZCAtIDM0ODQwNDA4XG4gIGQgPSBkIC0gZGl2KGRpdihneSArIDEwMDEwMCArIGRpdihnbSAtIDgsIDYpLCAxMDApICogMywgNCkgKyA3NTJcbiAgcmV0dXJuIGRcbn1cblxuLypcbiAgQ2FsY3VsYXRlcyBHcmVnb3JpYW4gYW5kIEp1bGlhbiBjYWxlbmRhciBkYXRlcyBmcm9tIHRoZSBKdWxpYW4gRGF5IG51bWJlclxuICAoamRuKSBmb3IgdGhlIHBlcmlvZCBzaW5jZSBqZG49LTM0ODM5NjU1IChpLmUuIHRoZSB5ZWFyIC0xMDAxMDAgb2YgYm90aFxuICBjYWxlbmRhcnMpIHRvIHNvbWUgbWlsbGlvbnMgeWVhcnMgYWhlYWQgb2YgdGhlIHByZXNlbnQuXG5cbiAgQHBhcmFtIGpkbiBKdWxpYW4gRGF5IG51bWJlclxuICBAcmV0dXJuXG4gICAgZ3k6IENhbGVuZGFyIHllYXIgKHllYXJzIEJDIG51bWJlcmVkIDAsIC0xLCAtMiwgLi4uKVxuICAgIGdtOiBDYWxlbmRhciBtb250aCAoMSB0byAxMilcbiAgICBnZDogQ2FsZW5kYXIgZGF5IG9mIHRoZSBtb250aCBNICgxIHRvIDI4LzI5LzMwLzMxKVxuKi9cbmZ1bmN0aW9uIGQyZyAoamRuKSB7XG4gIGxldCBqID0gNCAqIGpkbiArIDEzOTM2MTYzMVxuICBqID0gaiArIGRpdihkaXYoNCAqIGpkbiArIDE4MzE4NzcyMCwgMTQ2MDk3KSAqIDMsIDQpICogNCAtIDM5MDhcbiAgY29uc3RcbiAgICBpID0gZGl2KG1vZChqLCAxNDYxKSwgNCkgKiA1ICsgMzA4LFxuICAgIGdkID0gZGl2KG1vZChpLCAxNTMpLCA1KSArIDEsXG4gICAgZ20gPSBtb2QoZGl2KGksIDE1MyksIDEyKSArIDEsXG4gICAgZ3kgPSBkaXYoaiwgMTQ2MSkgLSAxMDAxMDAgKyBkaXYoOCAtIGdtLCA2KVxuICByZXR1cm4ge1xuICAgIGd5LFxuICAgIGdtLFxuICAgIGdkXG4gIH1cbn1cblxuLypcbiAgVXRpbGl0eSBoZWxwZXIgZnVuY3Rpb25zLlxuKi9cblxuZnVuY3Rpb24gZGl2IChhLCBiKSB7XG4gIHJldHVybiB+fihhIC8gYilcbn1cblxuZnVuY3Rpb24gbW9kIChhLCBiKSB7XG4gIHJldHVybiBhIC0gfn4oYSAvIGIpICogYlxufVxuIiwiLyogZXNsaW50IG5vLWZhbGx0aHJvdWdoOiAwICovXG5cbmltcG9ydCB7IGlzRGF0ZSB9IGZyb20gJy4uL2lzL2lzLmpzJ1xuaW1wb3J0IHsgcGFkLCBjYXBpdGFsaXplIH0gZnJvbSAnLi4vZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IGphbGFhbGlNb250aExlbmd0aCB9IGZyb20gJy4vcHJpdmF0ZS5wZXJzaWFuLmpzJ1xuaW1wb3J0IExhbmcsIHsgZGVmYXVsdExhbmcgfSBmcm9tICcuLi8uLi9wbHVnaW5zL2xhbmcvTGFuZy5qcydcblxuY29uc3RcbiAgTUlMTElTRUNPTkRTX0lOX0RBWSA9IDg2NDAwMDAwLFxuICBNSUxMSVNFQ09ORFNfSU5fSE9VUiA9IDM2MDAwMDAsXG4gIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMCxcbiAgZGVmYXVsdE1hc2sgPSAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJyxcbiAgdG9rZW4gPSAvXFxbKCg/OlteXFxdXFxcXF18XFxcXF18XFxcXCkqKVxcXXxkezEsNH18TXsxLDR9fG17MSwyfXx3ezEsMn18UW98RG98RHsxLDR9fFlZKD86WVkpP3xIezEsMn18aHsxLDJ9fHN7MSwyfXxTezEsM318WnsxLDJ9fGF7MSwyfXxbQVFFeFhdL2csXG4gIHJldmVyc2VUb2tlbiA9IC8oXFxbW15cXF1dKlxcXSl8ZHsxLDR9fE17MSw0fXxtezEsMn18d3sxLDJ9fFFvfERvfER7MSw0fXxZWSg/OllZKT98SHsxLDJ9fGh7MSwyfXxzezEsMn18U3sxLDN9fFp7MSwyfXxhezEsMn18W0FRRXhYXXwoWy4qKzo/XixcXHMke30oKXxcXFxcXSspL2csXG4gIHJlZ2V4U3RvcmUgPSB7fVxuXG5mdW5jdGlvbiBnZXRSZWdleERhdGEgKG1hc2ssIGRhdGVMb2NhbGUpIHtcbiAgY29uc3RcbiAgICBkYXlzID0gJygnICsgZGF0ZUxvY2FsZS5kYXlzLmpvaW4oJ3wnKSArICcpJyxcbiAgICBrZXkgPSBtYXNrICsgZGF5c1xuXG4gIGlmIChyZWdleFN0b3JlWyBrZXkgXSAhPT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHJlZ2V4U3RvcmVbIGtleSBdXG4gIH1cblxuICBjb25zdFxuICAgIGRheXNTaG9ydCA9ICcoJyArIGRhdGVMb2NhbGUuZGF5c1Nob3J0LmpvaW4oJ3wnKSArICcpJyxcbiAgICBtb250aHMgPSAnKCcgKyBkYXRlTG9jYWxlLm1vbnRocy5qb2luKCd8JykgKyAnKScsXG4gICAgbW9udGhzU2hvcnQgPSAnKCcgKyBkYXRlTG9jYWxlLm1vbnRoc1Nob3J0LmpvaW4oJ3wnKSArICcpJ1xuXG4gIGNvbnN0IG1hcCA9IHt9XG4gIGxldCBpbmRleCA9IDBcblxuICBjb25zdCByZWdleFRleHQgPSBtYXNrLnJlcGxhY2UocmV2ZXJzZVRva2VuLCBtYXRjaCA9PiB7XG4gICAgaW5kZXgrK1xuICAgIHN3aXRjaCAobWF0Y2gpIHtcbiAgICAgIGNhc2UgJ1lZJzpcbiAgICAgICAgbWFwLllZID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ1lZWVknOlxuICAgICAgICBtYXAuWVlZWSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKC0/XFxcXGR7MSw0fSknXG4gICAgICBjYXNlICdNJzpcbiAgICAgICAgbWFwLk0gPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgbWFwLk0gPSBpbmRleCAvLyBidW1waW5nIHRvIE1cbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnTU1NJzpcbiAgICAgICAgbWFwLk1NTSA9IGluZGV4XG4gICAgICAgIHJldHVybiBtb250aHNTaG9ydFxuICAgICAgY2FzZSAnTU1NTSc6XG4gICAgICAgIG1hcC5NTU1NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuIG1vbnRoc1xuICAgICAgY2FzZSAnRCc6XG4gICAgICAgIG1hcC5EID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdEbyc6XG4gICAgICAgIG1hcC5EID0gaW5kZXgrKyAvLyBidW1waW5nIHRvIERcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfShzdHxuZHxyZHx0aCkpJ1xuICAgICAgY2FzZSAnREQnOlxuICAgICAgICBtYXAuRCA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gRFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdIJzpcbiAgICAgICAgbWFwLkggPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ0hIJzpcbiAgICAgICAgbWFwLkggPSBpbmRleCAvLyBidW1waW5nIHRvIEhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnaCc6XG4gICAgICAgIG1hcC5oID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdoaCc6XG4gICAgICAgIG1hcC5oID0gaW5kZXggLy8gYnVtcGluZyB0byBoXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ20nOlxuICAgICAgICBtYXAubSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnbW0nOlxuICAgICAgICBtYXAubSA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gbVxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdzJzpcbiAgICAgICAgbWFwLnMgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ3NzJzpcbiAgICAgICAgbWFwLnMgPSBpbmRleCAvLyBidW1waW5nIHRvIHNcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MX0pJ1xuICAgICAgY2FzZSAnU1MnOlxuICAgICAgICBtYXAuUyA9IGluZGV4IC8vIGJ1bXAgdG8gU1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdTU1MnOlxuICAgICAgICBtYXAuUyA9IGluZGV4IC8vIGJ1bXAgdG8gU1xuICAgICAgICByZXR1cm4gJyhcXFxcZHszfSknXG4gICAgICBjYXNlICdBJzpcbiAgICAgICAgbWFwLkEgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhBTXxQTSknXG4gICAgICBjYXNlICdhJzpcbiAgICAgICAgbWFwLmEgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhhbXxwbSknXG4gICAgICBjYXNlICdhYSc6XG4gICAgICAgIG1hcC5hYSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKGFcXFxcLm1cXFxcLnxwXFxcXC5tXFxcXC4pJ1xuXG4gICAgICBjYXNlICdkZGQnOlxuICAgICAgICByZXR1cm4gZGF5c1Nob3J0XG4gICAgICBjYXNlICdkZGRkJzpcbiAgICAgICAgcmV0dXJuIGRheXNcbiAgICAgIGNhc2UgJ1EnOlxuICAgICAgY2FzZSAnZCc6XG4gICAgICBjYXNlICdFJzpcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MX0pJ1xuICAgICAgY2FzZSAnUW8nOlxuICAgICAgICByZXR1cm4gJygxc3R8Mm5kfDNyZHw0dGgpJ1xuICAgICAgY2FzZSAnREREJzpcbiAgICAgIGNhc2UgJ0REREQnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDN9KSdcbiAgICAgIGNhc2UgJ3cnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ3d3JzpcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuXG4gICAgICBjYXNlICdaJzogLy8gdG8gc3BsaXQ6ICg/OihaKSgpKCl8KFsrLV0pPyhcXFxcZHsyfSk6PyhcXFxcZHsyfSkpXG4gICAgICAgIG1hcC5aID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoWnxbKy1dXFxcXGR7Mn06XFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnWlonOlxuICAgICAgICBtYXAuWlogPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhafFsrLV1cXFxcZHsyfVxcXFxkezJ9KSdcblxuICAgICAgY2FzZSAnWCc6XG4gICAgICAgIG1hcC5YID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZCspJ1xuICAgICAgY2FzZSAneCc6XG4gICAgICAgIG1hcC54ID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZHs0LH0pJ1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpbmRleC0tXG4gICAgICAgIGlmIChtYXRjaFsgMCBdID09PSAnWycpIHtcbiAgICAgICAgICBtYXRjaCA9IG1hdGNoLnN1YnN0cmluZygxLCBtYXRjaC5sZW5ndGggLSAxKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaC5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHJlcyA9IHsgbWFwLCByZWdleDogbmV3IFJlZ0V4cCgnXicgKyByZWdleFRleHQpIH1cbiAgcmVnZXhTdG9yZVsga2V5IF0gPSByZXNcblxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGdldERhdGVMb2NhbGUgKHBhcmFtRGF0ZUxvY2FsZSwgbGFuZ1Byb3BzKSB7XG4gIHJldHVybiBwYXJhbURhdGVMb2NhbGUgIT09IHZvaWQgMFxuICAgID8gcGFyYW1EYXRlTG9jYWxlXG4gICAgOiAoXG4gICAgICAgIGxhbmdQcm9wcyAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBsYW5nUHJvcHMuZGF0ZVxuICAgICAgICAgIDogZGVmYXVsdExhbmcuZGF0ZVxuICAgICAgKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZSAob2Zmc2V0LCBkZWxpbWV0ZXIgPSAnJykge1xuICBjb25zdFxuICAgIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnLFxuICAgIGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCksXG4gICAgaG91cnMgPSBNYXRoLmZsb29yKGFic09mZnNldCAvIDYwKSxcbiAgICBtaW51dGVzID0gYWJzT2Zmc2V0ICUgNjBcblxuICByZXR1cm4gc2lnbiArIHBhZChob3VycykgKyBkZWxpbWV0ZXIgKyBwYWQobWludXRlcylcbn1cblxuZnVuY3Rpb24gYXBwbHlZZWFyTW9udGhEYXlDaGFuZ2UgKGRhdGUsIG1vZCwgc2lnbikge1xuICBsZXRcbiAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG5cbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcblxuICBpZiAobW9kLnllYXIgIT09IHZvaWQgMCkge1xuICAgIHllYXIgKz0gc2lnbiAqIG1vZC55ZWFyXG4gICAgZGVsZXRlIG1vZC55ZWFyXG4gIH1cblxuICBpZiAobW9kLm1vbnRoICE9PSB2b2lkIDApIHtcbiAgICBtb250aCArPSBzaWduICogbW9kLm1vbnRoXG4gICAgZGVsZXRlIG1vZC5tb250aFxuICB9XG5cbiAgZGF0ZS5zZXREYXRlKDEpXG4gIGRhdGUuc2V0TW9udGgoMilcblxuICBkYXRlLnNldEZ1bGxZZWFyKHllYXIpXG4gIGRhdGUuc2V0TW9udGgobW9udGgpXG4gIGRhdGUuc2V0RGF0ZShNYXRoLm1pbihkYXksIGRheXNJbk1vbnRoKGRhdGUpKSlcblxuICBpZiAobW9kLmRhdGUgIT09IHZvaWQgMCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHNpZ24gKiBtb2QuZGF0ZSlcbiAgICBkZWxldGUgbW9kLmRhdGVcbiAgfVxuXG4gIHJldHVybiBkYXRlXG59XG5cbmZ1bmN0aW9uIGFwcGx5WWVhck1vbnRoRGF5IChkYXRlLCBtb2QsIG1pZGRsZSkge1xuICBjb25zdFxuICAgIHllYXIgPSBtb2QueWVhciAhPT0gdm9pZCAwID8gbW9kLnllYXIgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1GdWxsWWVhcmAgXSgpLFxuICAgIG1vbnRoID0gbW9kLm1vbnRoICE9PSB2b2lkIDAgPyBtb2QubW9udGggLSAxIDogZGF0ZVsgYGdldCR7IG1pZGRsZSB9TW9udGhgIF0oKSxcbiAgICBtYXhEYXkgPSAobmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKSkuZ2V0RGF0ZSgpLFxuICAgIGRheSA9IE1hdGgubWluKG1heERheSwgbW9kLmRhdGUgIT09IHZvaWQgMCA/IG1vZC5kYXRlIDogZGF0ZVsgYGdldCR7IG1pZGRsZSB9RGF0ZWAgXSgpKVxuXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfURhdGVgIF0oMSlcbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9TW9udGhgIF0oMilcblxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1GdWxsWWVhcmAgXSh5ZWFyKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1Nb250aGAgXShtb250aClcbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9RGF0ZWAgXShkYXkpXG5cbiAgZGVsZXRlIG1vZC55ZWFyXG4gIGRlbGV0ZSBtb2QubW9udGhcbiAgZGVsZXRlIG1vZC5kYXRlXG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZnVuY3Rpb24gZ2V0Q2hhbmdlIChkYXRlLCByYXdNb2QsIHNpZ24pIHtcbiAgY29uc3RcbiAgICBtb2QgPSBub3JtYWxpemVNb2QocmF3TW9kKSxcbiAgICBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgdCA9IG1vZC55ZWFyICE9PSB2b2lkIDAgfHwgbW9kLm1vbnRoICE9PSB2b2lkIDAgfHwgbW9kLmRhdGUgIT09IHZvaWQgMFxuICAgICAgPyBhcHBseVllYXJNb250aERheUNoYW5nZShkLCBtb2QsIHNpZ24pIC8vIHJlbW92ZXMgeWVhci9tb250aC9kYXlcbiAgICAgIDogZFxuXG4gIGZvciAoY29uc3Qga2V5IGluIG1vZCkge1xuICAgIGNvbnN0IG9wID0gY2FwaXRhbGl6ZShrZXkpXG4gICAgdFsgYHNldCR7IG9wIH1gIF0odFsgYGdldCR7IG9wIH1gIF0oKSArIHNpZ24gKiBtb2RbIGtleSBdKVxuICB9XG5cbiAgcmV0dXJuIHRcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTW9kIChtb2QpIHtcbiAgY29uc3QgYWNjID0geyAuLi5tb2QgfVxuXG4gIGlmIChtb2QueWVhcnMgIT09IHZvaWQgMCkge1xuICAgIGFjYy55ZWFyID0gbW9kLnllYXJzXG4gICAgZGVsZXRlIGFjYy55ZWFyc1xuICB9XG5cbiAgaWYgKG1vZC5tb250aHMgIT09IHZvaWQgMCkge1xuICAgIGFjYy5tb250aCA9IG1vZC5tb250aHNcbiAgICBkZWxldGUgYWNjLm1vbnRoc1xuICB9XG5cbiAgaWYgKG1vZC5kYXlzICE9PSB2b2lkIDApIHtcbiAgICBhY2MuZGF0ZSA9IG1vZC5kYXlzXG4gICAgZGVsZXRlIGFjYy5kYXlzXG4gIH1cbiAgaWYgKG1vZC5kYXkgIT09IHZvaWQgMCkge1xuICAgIGFjYy5kYXRlID0gbW9kLmRheVxuICAgIGRlbGV0ZSBhY2MuZGF5XG4gIH1cblxuICBpZiAobW9kLmhvdXIgIT09IHZvaWQgMCkge1xuICAgIGFjYy5ob3VycyA9IG1vZC5ob3VyXG4gICAgZGVsZXRlIGFjYy5ob3VyXG4gIH1cblxuICBpZiAobW9kLm1pbnV0ZSAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1pbnV0ZXMgPSBtb2QubWludXRlXG4gICAgZGVsZXRlIGFjYy5taW51dGVcbiAgfVxuXG4gIGlmIChtb2Quc2Vjb25kICE9PSB2b2lkIDApIHtcbiAgICBhY2Muc2Vjb25kcyA9IG1vZC5zZWNvbmRcbiAgICBkZWxldGUgYWNjLnNlY29uZFxuICB9XG5cbiAgaWYgKG1vZC5taWxsaXNlY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1pbGxpc2Vjb25kcyA9IG1vZC5taWxsaXNlY29uZFxuICAgIGRlbGV0ZSBhY2MubWlsbGlzZWNvbmRcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkanVzdERhdGUgKGRhdGUsIHJhd01vZCwgdXRjKSB7XG4gIGNvbnN0XG4gICAgbW9kID0gbm9ybWFsaXplTW9kKHJhd01vZCksXG4gICAgbWlkZGxlID0gdXRjID09PSB0cnVlID8gJ1VUQycgOiAnJyxcbiAgICBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgdCA9IG1vZC55ZWFyICE9PSB2b2lkIDAgfHwgbW9kLm1vbnRoICE9PSB2b2lkIDAgfHwgbW9kLmRhdGUgIT09IHZvaWQgMFxuICAgICAgPyBhcHBseVllYXJNb250aERheShkLCBtb2QsIG1pZGRsZSkgLy8gcmVtb3ZlcyB5ZWFyL21vbnRoL2RheVxuICAgICAgOiBkXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gbW9kKSB7XG4gICAgY29uc3Qgb3AgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSlcbiAgICB0WyBgc2V0JHsgbWlkZGxlIH0keyBvcCB9YCBdKG1vZFsga2V5IF0pXG4gIH1cblxuICByZXR1cm4gdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdERhdGUgKHN0ciwgbWFzaywgZGF0ZUxvY2FsZSkge1xuICBjb25zdCBkID0gX19zcGxpdERhdGUoc3RyLCBtYXNrLCBkYXRlTG9jYWxlKVxuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShcbiAgICBkLnllYXIsXG4gICAgZC5tb250aCA9PT0gbnVsbCA/IG51bGwgOiBkLm1vbnRoIC0gMSxcbiAgICBkLmRheSA9PT0gbnVsbCA/IDEgOiBkLmRheSxcbiAgICBkLmhvdXIsXG4gICAgZC5taW51dGUsXG4gICAgZC5zZWNvbmQsXG4gICAgZC5taWxsaXNlY29uZFxuICApXG5cbiAgY29uc3QgdHpPZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcblxuICByZXR1cm4gZC50aW1lem9uZU9mZnNldCA9PT0gbnVsbCB8fCBkLnRpbWV6b25lT2Zmc2V0ID09PSB0ek9mZnNldFxuICAgID8gZGF0ZVxuICAgIDogZ2V0Q2hhbmdlKGRhdGUsIHsgbWludXRlczogZC50aW1lem9uZU9mZnNldCAtIHR6T2Zmc2V0IH0sIDEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwbGl0RGF0ZSAoc3RyLCBtYXNrLCBkYXRlTG9jYWxlLCBjYWxlbmRhciwgZGVmYXVsdE1vZGVsKSB7XG4gIGNvbnN0IGRhdGUgPSB7XG4gICAgeWVhcjogbnVsbCxcbiAgICBtb250aDogbnVsbCxcbiAgICBkYXk6IG51bGwsXG4gICAgaG91cjogbnVsbCxcbiAgICBtaW51dGU6IG51bGwsXG4gICAgc2Vjb25kOiBudWxsLFxuICAgIG1pbGxpc2Vjb25kOiBudWxsLFxuICAgIHRpbWV6b25lT2Zmc2V0OiBudWxsLFxuICAgIGRhdGVIYXNoOiBudWxsLFxuICAgIHRpbWVIYXNoOiBudWxsXG4gIH1cblxuICBkZWZhdWx0TW9kZWwgIT09IHZvaWQgMCAmJiBPYmplY3QuYXNzaWduKGRhdGUsIGRlZmF1bHRNb2RlbClcblxuICBpZiAoXG4gICAgc3RyID09PSB2b2lkIDBcbiAgICB8fCBzdHIgPT09IG51bGxcbiAgICB8fCBzdHIgPT09ICcnXG4gICAgfHwgdHlwZW9mIHN0ciAhPT0gJ3N0cmluZydcbiAgKSB7XG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIGlmIChtYXNrID09PSB2b2lkIDApIHtcbiAgICBtYXNrID0gZGVmYXVsdE1hc2tcbiAgfVxuXG4gIGNvbnN0XG4gICAgbGFuZ09wdHMgPSBnZXREYXRlTG9jYWxlKGRhdGVMb2NhbGUsIExhbmcucHJvcHMpLFxuICAgIG1vbnRocyA9IGxhbmdPcHRzLm1vbnRocyxcbiAgICBtb250aHNTaG9ydCA9IGxhbmdPcHRzLm1vbnRoc1Nob3J0XG5cbiAgY29uc3QgeyByZWdleCwgbWFwIH0gPSBnZXRSZWdleERhdGEobWFzaywgbGFuZ09wdHMpXG5cbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2gocmVnZXgpXG5cbiAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIGxldCB0elN0cmluZyA9ICcnXG5cbiAgaWYgKG1hcC5YICE9PSB2b2lkIDAgfHwgbWFwLnggIT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHN0YW1wID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5YICE9PSB2b2lkIDAgPyBtYXAuWCA6IG1hcC54IF0sIDEwKVxuXG4gICAgaWYgKGlzTmFOKHN0YW1wKSA9PT0gdHJ1ZSB8fCBzdGFtcCA8IDApIHtcbiAgICAgIHJldHVybiBkYXRlXG4gICAgfVxuXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHN0YW1wICogKG1hcC5YICE9PSB2b2lkIDAgPyAxMDAwIDogMSkpXG5cbiAgICBkYXRlLnllYXIgPSBkLmdldEZ1bGxZZWFyKClcbiAgICBkYXRlLm1vbnRoID0gZC5nZXRNb250aCgpICsgMVxuICAgIGRhdGUuZGF5ID0gZC5nZXREYXRlKClcbiAgICBkYXRlLmhvdXIgPSBkLmdldEhvdXJzKClcbiAgICBkYXRlLm1pbnV0ZSA9IGQuZ2V0TWludXRlcygpXG4gICAgZGF0ZS5zZWNvbmQgPSBkLmdldFNlY29uZHMoKVxuICAgIGRhdGUubWlsbGlzZWNvbmQgPSBkLmdldE1pbGxpc2Vjb25kcygpXG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKG1hcC5ZWVlZICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUueWVhciA9IHBhcnNlSW50KG1hdGNoWyBtYXAuWVlZWSBdLCAxMClcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLllZICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChtYXRjaFsgbWFwLllZIF0sIDEwKVxuICAgICAgZGF0ZS55ZWFyID0geSA8IDAgPyB5IDogMjAwMCArIHlcbiAgICB9XG5cbiAgICBpZiAobWFwLk0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5tb250aCA9IHBhcnNlSW50KG1hdGNoWyBtYXAuTSBdLCAxMClcbiAgICAgIGlmIChkYXRlLm1vbnRoIDwgMSB8fCBkYXRlLm1vbnRoID4gMTIpIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLk1NTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gbW9udGhzU2hvcnQuaW5kZXhPZihtYXRjaFsgbWFwLk1NTSBdKSArIDFcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLk1NTU0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5tb250aCA9IG1vbnRocy5pbmRleE9mKG1hdGNoWyBtYXAuTU1NTSBdKSArIDFcbiAgICB9XG5cbiAgICBpZiAobWFwLkQgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5kYXkgPSBwYXJzZUludChtYXRjaFsgbWFwLkQgXSwgMTApXG5cbiAgICAgIGlmIChkYXRlLnllYXIgPT09IG51bGwgfHwgZGF0ZS5tb250aCA9PT0gbnVsbCB8fCBkYXRlLmRheSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWF4RGF5ID0gY2FsZW5kYXIgIT09ICdwZXJzaWFuJ1xuICAgICAgICA/IChuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIDApKS5nZXREYXRlKClcbiAgICAgICAgOiBqYWxhYWxpTW9udGhMZW5ndGgoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoKVxuXG4gICAgICBpZiAoZGF0ZS5kYXkgPiBtYXhEYXkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWFwLkggIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5ob3VyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5IIF0sIDEwKSAlIDI0XG4gICAgfVxuICAgIGVsc2UgaWYgKG1hcC5oICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUuaG91ciA9IHBhcnNlSW50KG1hdGNoWyBtYXAuaCBdLCAxMCkgJSAxMlxuICAgICAgaWYgKFxuICAgICAgICAobWFwLkEgJiYgbWF0Y2hbIG1hcC5BIF0gPT09ICdQTScpXG4gICAgICAgIHx8IChtYXAuYSAmJiBtYXRjaFsgbWFwLmEgXSA9PT0gJ3BtJylcbiAgICAgICAgfHwgKG1hcC5hYSAmJiBtYXRjaFsgbWFwLmFhIF0gPT09ICdwLm0uJylcbiAgICAgICkge1xuICAgICAgICBkYXRlLmhvdXIgKz0gMTJcbiAgICAgIH1cbiAgICAgIGRhdGUuaG91ciA9IGRhdGUuaG91ciAlIDI0XG4gICAgfVxuXG4gICAgaWYgKG1hcC5tICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubWludXRlID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5tIF0sIDEwKSAlIDYwXG4gICAgfVxuXG4gICAgaWYgKG1hcC5zICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUuc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5zIF0sIDEwKSAlIDYwXG4gICAgfVxuXG4gICAgaWYgKG1hcC5TICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubWlsbGlzZWNvbmQgPSBwYXJzZUludChtYXRjaFsgbWFwLlMgXSwgMTApICogMTAgKiogKDMgLSBtYXRjaFsgbWFwLlMgXS5sZW5ndGgpXG4gICAgfVxuXG4gICAgaWYgKG1hcC5aICE9PSB2b2lkIDAgfHwgbWFwLlpaICE9PSB2b2lkIDApIHtcbiAgICAgIHR6U3RyaW5nID0gKG1hcC5aICE9PSB2b2lkIDAgPyBtYXRjaFsgbWFwLlogXS5yZXBsYWNlKCc6JywgJycpIDogbWF0Y2hbIG1hcC5aWiBdKVxuICAgICAgZGF0ZS50aW1lem9uZU9mZnNldCA9ICh0elN0cmluZ1sgMCBdID09PSAnKycgPyAtMSA6IDEpICogKDYwICogdHpTdHJpbmcuc2xpY2UoMSwgMykgKyAxICogdHpTdHJpbmcuc2xpY2UoMywgNSkpXG4gICAgfVxuICB9XG5cbiAgZGF0ZS5kYXRlSGFzaCA9IHBhZChkYXRlLnllYXIsIDYpICsgJy8nICsgcGFkKGRhdGUubW9udGgpICsgJy8nICsgcGFkKGRhdGUuZGF5KVxuICBkYXRlLnRpbWVIYXNoID0gcGFkKGRhdGUuaG91cikgKyAnOicgKyBwYWQoZGF0ZS5taW51dGUpICsgJzonICsgcGFkKGRhdGUuc2Vjb25kKSArIHR6U3RyaW5nXG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQgKGRhdGUpIHtcbiAgcmV0dXJuIHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJ1xuICAgID8gdHJ1ZVxuICAgIDogaXNOYU4oRGF0ZS5wYXJzZShkYXRlKSkgPT09IGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZERhdGUgKG1vZCwgdXRjKSB7XG4gIHJldHVybiBhZGp1c3REYXRlKG5ldyBEYXRlKCksIG1vZCwgdXRjKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrIChkYXRlKSB7XG4gIGNvbnN0IGRvdyA9IG5ldyBEYXRlKGRhdGUpLmdldERheSgpXG4gIHJldHVybiBkb3cgPT09IDAgPyA3IDogZG93XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrT2ZZZWFyIChkYXRlKSB7XG4gIC8vIFJlbW92ZSB0aW1lIGNvbXBvbmVudHMgb2YgZGF0ZVxuICBjb25zdCB0aHVyc2RheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSlcblxuICAvLyBDaGFuZ2UgZGF0ZSB0byBUaHVyc2RheSBzYW1lIHdlZWtcbiAgdGh1cnNkYXkuc2V0RGF0ZSh0aHVyc2RheS5nZXREYXRlKCkgLSAoKHRodXJzZGF5LmdldERheSgpICsgNikgJSA3KSArIDMpXG5cbiAgLy8gVGFrZSBKYW51YXJ5IDR0aCBhcyBpdCBpcyBhbHdheXMgaW4gd2VlayAxIChzZWUgSVNPIDg2MDEpXG4gIGNvbnN0IGZpcnN0VGh1cnNkYXkgPSBuZXcgRGF0ZSh0aHVyc2RheS5nZXRGdWxsWWVhcigpLCAwLCA0KVxuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICBmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCkgLSAoKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMylcblxuICAvLyBDaGVjayBpZiBkYXlsaWdodC1zYXZpbmctdGltZS1zd2l0Y2ggb2NjdXJyZWQgYW5kIGNvcnJlY3QgZm9yIGl0XG4gIGNvbnN0IGRzID0gdGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIGZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKVxuICB0aHVyc2RheS5zZXRIb3Vycyh0aHVyc2RheS5nZXRIb3VycygpIC0gZHMpXG5cbiAgLy8gTnVtYmVyIG9mIHdlZWtzIGJldHdlZW4gdGFyZ2V0IFRodXJzZGF5IGFuZCBmaXJzdCBUaHVyc2RheVxuICBjb25zdCB3ZWVrRGlmZiA9ICh0aHVyc2RheSAtIGZpcnN0VGh1cnNkYXkpIC8gKE1JTExJU0VDT05EU19JTl9EQVkgKiA3KVxuICByZXR1cm4gMSArIE1hdGguZmxvb3Iod2Vla0RpZmYpXG59XG5cbmZ1bmN0aW9uIGdldERheUlkZW50aWZpZXIgKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKSAqIDEwMDAwICsgZGF0ZS5nZXRNb250aCgpICogMTAwICsgZGF0ZS5nZXREYXRlKClcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZUlkZW50aWZpZXIgKGRhdGUsIG9ubHlEYXRlIC8qID0gZmFsc2UgKi8pIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpXG4gIHJldHVybiBvbmx5RGF0ZSA9PT0gdHJ1ZSA/IGdldERheUlkZW50aWZpZXIoZCkgOiBkLmdldFRpbWUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCZXR3ZWVuRGF0ZXMgKGRhdGUsIGZyb20sIHRvLCBvcHRzID0ge30pIHtcbiAgY29uc3RcbiAgICBkMSA9IGdldERhdGVJZGVudGlmaWVyKGZyb20sIG9wdHMub25seURhdGUpLFxuICAgIGQyID0gZ2V0RGF0ZUlkZW50aWZpZXIodG8sIG9wdHMub25seURhdGUpLFxuICAgIGN1ciA9IGdldERhdGVJZGVudGlmaWVyKGRhdGUsIG9wdHMub25seURhdGUpXG5cbiAgcmV0dXJuIChjdXIgPiBkMSB8fCAob3B0cy5pbmNsdXNpdmVGcm9tID09PSB0cnVlICYmIGN1ciA9PT0gZDEpKVxuICAgICYmIChjdXIgPCBkMiB8fCAob3B0cy5pbmNsdXNpdmVUbyA9PT0gdHJ1ZSAmJiBjdXIgPT09IGQyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRGF0ZSAoZGF0ZSwgbW9kKSB7XG4gIHJldHVybiBnZXRDaGFuZ2UoZGF0ZSwgbW9kLCAxKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0RnJvbURhdGUgKGRhdGUsIG1vZCkge1xuICByZXR1cm4gZ2V0Q2hhbmdlKGRhdGUsIG1vZCwgLTEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF0ZSAoZGF0ZSwgdW5pdCwgdXRjKSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIHByZWZpeCA9IGBzZXQkeyB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnIH1gXG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9TW9udGhgIF0oMClcbiAgICBjYXNlICdtb250aCc6XG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfURhdGVgIF0oMSlcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9SG91cnNgIF0oMClcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaW51dGVzYCBdKDApXG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfVNlY29uZHNgIF0oMClcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9TWlsbGlzZWNvbmRzYCBdKDApXG4gIH1cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuZE9mRGF0ZSAoZGF0ZSwgdW5pdCwgdXRjKSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIHByZWZpeCA9IGBzZXQkeyB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnIH1gXG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9TW9udGhgIF0oMTEpXG4gICAgY2FzZSAnbW9udGgnOlxuICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1EYXRlYCBdKGRheXNJbk1vbnRoKHQpKVxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Ib3Vyc2AgXSgyMylcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaW51dGVzYCBdKDU5KVxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1TZWNvbmRzYCBdKDU5KVxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaWxsaXNlY29uZHNgIF0oOTk5KVxuICB9XG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXhEYXRlIChkYXRlIC8qICwgLi4uYXJncyAqLykge1xuICBsZXQgdCA9IG5ldyBEYXRlKGRhdGUpXG4gIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaChkID0+IHtcbiAgICB0ID0gTWF0aC5tYXgodCwgbmV3IERhdGUoZCkpXG4gIH0pXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW5EYXRlIChkYXRlIC8qLCAuLi5hcmdzICovKSB7XG4gIGxldCB0ID0gbmV3IERhdGUoZGF0ZSlcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGQgPT4ge1xuICAgIHQgPSBNYXRoLm1pbih0LCBuZXcgRGF0ZShkKSlcbiAgfSlcbiAgcmV0dXJuIHRcbn1cblxuZnVuY3Rpb24gZ2V0RGlmZiAodCwgc3ViLCBpbnRlcnZhbCkge1xuICByZXR1cm4gKFxuICAgICh0LmdldFRpbWUoKSAtIHQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIE1JTExJU0VDT05EU19JTl9NSU5VVEUpXG4gICAgLSAoc3ViLmdldFRpbWUoKSAtIHN1Yi5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgKSAvIGludGVydmFsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRlRGlmZiAoZGF0ZSwgc3VidHJhY3QsIHVuaXQgPSAnZGF5cycpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgc3ViID0gbmV3IERhdGUoc3VidHJhY3QpXG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgICAgcmV0dXJuICh0LmdldEZ1bGxZZWFyKCkgLSBzdWIuZ2V0RnVsbFllYXIoKSlcblxuICAgIGNhc2UgJ21vbnRocyc6XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgcmV0dXJuICh0LmdldEZ1bGxZZWFyKCkgLSBzdWIuZ2V0RnVsbFllYXIoKSkgKiAxMiArIHQuZ2V0TW9udGgoKSAtIHN1Yi5nZXRNb250aCgpXG5cbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ2RheScpLCBzdGFydE9mRGF0ZShzdWIsICdkYXknKSwgTUlMTElTRUNPTkRTX0lOX0RBWSlcblxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICAgIHJldHVybiBnZXREaWZmKHN0YXJ0T2ZEYXRlKHQsICdob3VyJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ2hvdXInKSwgTUlMTElTRUNPTkRTX0lOX0hPVVIpXG5cbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ21pbnV0ZScpLCBzdGFydE9mRGF0ZShzdWIsICdtaW51dGUnKSwgTUlMTElTRUNPTkRTX0lOX01JTlVURSlcblxuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnc2Vjb25kJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ3NlY29uZCcpLCAxMDAwKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZlllYXIgKGRhdGUpIHtcbiAgcmV0dXJuIGdldERhdGVEaWZmKGRhdGUsIHN0YXJ0T2ZEYXRlKGRhdGUsICd5ZWFyJyksICdkYXlzJykgKyAxXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmZlckRhdGVGb3JtYXQgKGRhdGUpIHtcbiAgcmV0dXJuIGlzRGF0ZShkYXRlKSA9PT0gdHJ1ZVxuICAgID8gJ2RhdGUnXG4gICAgOiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAnc3RyaW5nJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVCZXR3ZWVuIChkYXRlLCBtaW4sIG1heCkge1xuICBjb25zdCB0ID0gbmV3IERhdGUoZGF0ZSlcblxuICBpZiAobWluKSB7XG4gICAgY29uc3QgbG93ID0gbmV3IERhdGUobWluKVxuICAgIGlmICh0IDwgbG93KSB7XG4gICAgICByZXR1cm4gbG93XG4gICAgfVxuICB9XG5cbiAgaWYgKG1heCkge1xuICAgIGNvbnN0IGhpZ2ggPSBuZXcgRGF0ZShtYXgpXG4gICAgaWYgKHQgPiBoaWdoKSB7XG4gICAgICByZXR1cm4gaGlnaFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXRlIChkYXRlLCBkYXRlMiwgdW5pdCkge1xuICBjb25zdFxuICAgIHQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBkID0gbmV3IERhdGUoZGF0ZTIpXG5cbiAgaWYgKHVuaXQgPT09IHZvaWQgMCkge1xuICAgIHJldHVybiB0LmdldFRpbWUoKSA9PT0gZC5nZXRUaW1lKClcbiAgfVxuXG4gIHN3aXRjaCAodW5pdCkge1xuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICBpZiAodC5nZXRTZWNvbmRzKCkgIT09IGQuZ2V0U2Vjb25kcygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ21pbnV0ZSc6IC8vIGludGVudGlvbmFsIGZhbGwtdGhyb3VnaFxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgaWYgKHQuZ2V0TWludXRlcygpICE9PSBkLmdldE1pbnV0ZXMoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICdob3VyJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnaG91cnMnOlxuICAgICAgaWYgKHQuZ2V0SG91cnMoKSAhPT0gZC5nZXRIb3VycygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ2RheSc6IC8vIGludGVudGlvbmFsIGZhbGwtdGhyb3VnaFxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgaWYgKHQuZ2V0RGF0ZSgpICE9PSBkLmdldERhdGUoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICdtb250aCc6IC8vIGludGVudGlvbmFsIGZhbGwtdGhyb3VnaFxuICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICBpZiAodC5nZXRNb250aCgpICE9PSBkLmdldE1vbnRoKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAneWVhcic6IC8vIGludGVudGlvbmFsIGZhbGwtdGhyb3VnaFxuICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgIGlmICh0LmdldEZ1bGxZZWFyKCkgIT09IGQuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZGF0ZSBpc1NhbWVEYXRlIHVua25vd24gdW5pdCAkeyB1bml0IH1gKVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRheXNJbk1vbnRoIChkYXRlKSB7XG4gIHJldHVybiAobmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAwKSkuZ2V0RGF0ZSgpXG59XG5cbmZ1bmN0aW9uIGdldE9yZGluYWwgKG4pIHtcbiAgaWYgKG4gPj0gMTEgJiYgbiA8PSAxMykge1xuICAgIHJldHVybiBgJHsgbiB9dGhgXG4gIH1cbiAgc3dpdGNoIChuICUgMTApIHtcbiAgICBjYXNlIDE6IHJldHVybiBgJHsgbiB9c3RgXG4gICAgY2FzZSAyOiByZXR1cm4gYCR7IG4gfW5kYFxuICAgIGNhc2UgMzogcmV0dXJuIGAkeyBuIH1yZGBcbiAgfVxuICByZXR1cm4gYCR7IG4gfXRoYFxufVxuXG5jb25zdCBmb3JtYXR0ZXIgPSB7XG4gIC8vIFllYXI6IDAwLCAwMSwgLi4uLCA5OVxuICBZWSAoZGF0ZSwgZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikge1xuICAgIC8vIHdvcmthcm91bmQgZm9yIDwgMTkwMCB3aXRoIG5ldyBEYXRlKClcbiAgICBjb25zdCB5ID0gdGhpcy5ZWVlZKGRhdGUsIGRhdGVMb2NhbGUsIGZvcmNlZFllYXIpICUgMTAwXG4gICAgcmV0dXJuIHkgPj0gMFxuICAgICAgPyBwYWQoeSlcbiAgICAgIDogJy0nICsgcGFkKE1hdGguYWJzKHkpKVxuICB9LFxuXG4gIC8vIFllYXI6IDE5MDAsIDE5MDEsIC4uLiwgMjA5OVxuICBZWVlZIChkYXRlLCBfZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikge1xuICAgIC8vIHdvcmthcm91bmQgZm9yIDwgMTkwMCB3aXRoIG5ldyBEYXRlKClcbiAgICByZXR1cm4gZm9yY2VkWWVhciAhPT0gdm9pZCAwICYmIGZvcmNlZFllYXIgIT09IG51bGxcbiAgICAgID8gZm9yY2VkWWVhclxuICAgICAgOiBkYXRlLmdldEZ1bGxZZWFyKClcbiAgfSxcblxuICAvLyBNb250aDogMSwgMiwgLi4uLCAxMlxuICBNIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgfSxcblxuICAvLyBNb250aDogMDEsIDAyLCAuLi4sIDEyXG4gIE1NIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldE1vbnRoKCkgKyAxKVxuICB9LFxuXG4gIC8vIE1vbnRoIFNob3J0IE5hbWU6IEphbiwgRmViLCAuLi5cbiAgTU1NIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUubW9udGhzU2hvcnRbIGRhdGUuZ2V0TW9udGgoKSBdXG4gIH0sXG5cbiAgLy8gTW9udGggTmFtZTogSmFudWFyeSwgRmVicnVhcnksIC4uLlxuICBNTU1NIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUubW9udGhzWyBkYXRlLmdldE1vbnRoKCkgXVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDEsIDIsIDMsIDRcbiAgUSAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmNlaWwoKGRhdGUuZ2V0TW9udGgoKSArIDEpIC8gMylcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgUW8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbCh0aGlzLlEoZGF0ZSkpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIG1vbnRoOiAxLCAyLCAuLi4sIDMxXG4gIEQgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKClcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDFzdCwgMm5kLCAuLi4sIDMxc3RcbiAgRG8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDAxLCAwMiwgLi4uLCAzMVxuICBERCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXREYXRlKCkpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDEsIDIsIC4uLiwgMzY2XG4gIERERCAoZGF0ZSkge1xuICAgIHJldHVybiBnZXREYXlPZlllYXIoZGF0ZSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMDAxLCAwMDIsIC4uLiwgMzY2XG4gIEREREQgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGdldERheU9mWWVhcihkYXRlKSwgMylcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogMCwgMSwgLi4uLCA2XG4gIGQgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdSwgTW8sIC4uLlxuICBkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiB0aGlzLmRkZGQoZGF0ZSwgZGF0ZUxvY2FsZSkuc2xpY2UoMCwgMilcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuLCBNb24sIC4uLlxuICBkZGQgKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5kYXlzU2hvcnRbIGRhdGUuZ2V0RGF5KCkgXVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdW5kYXksIE1vbmRheSwgLi4uXG4gIGRkZGQgKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5kYXlzWyBkYXRlLmdldERheSgpIF1cbiAgfSxcblxuICAvLyBEYXkgb2YgSVNPIHdlZWs6IDEsIDIsIC4uLiwgN1xuICBFIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF5KCkgfHwgN1xuICB9LFxuXG4gIC8vIFdlZWsgb2YgWWVhcjogMSAyIC4uLiA1MiA1M1xuICB3IChkYXRlKSB7XG4gICAgcmV0dXJuIGdldFdlZWtPZlllYXIoZGF0ZSlcbiAgfSxcblxuICAvLyBXZWVrIG9mIFllYXI6IDAxIDAyIC4uLiA1MiA1M1xuICB3dyAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZ2V0V2Vla09mWWVhcihkYXRlKSlcbiAgfSxcblxuICAvLyBIb3VyOiAwLCAxLCAuLi4gMjNcbiAgSCAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKClcbiAgfSxcblxuICAvLyBIb3VyOiAwMCwgMDEsIC4uLiwgMjNcbiAgSEggKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0SG91cnMoKSlcbiAgfSxcblxuICAvLyBIb3VyOiAxLCAyLCAuLi4sIDEyXG4gIGggKGRhdGUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKVxuICAgIHJldHVybiBob3VycyA9PT0gMFxuICAgICAgPyAxMlxuICAgICAgOiAoaG91cnMgPiAxMiA/IGhvdXJzICUgMTIgOiBob3VycylcbiAgfSxcblxuICAvLyBIb3VyOiAwMSwgMDIsIC4uLiwgMTJcbiAgaGggKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKHRoaXMuaChkYXRlKSlcbiAgfSxcblxuICAvLyBNaW51dGU6IDAsIDEsIC4uLiwgNTlcbiAgbSAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMDAsIDAxLCAuLi4sIDU5XG4gIG1tIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldE1pbnV0ZXMoKSlcbiAgfSxcblxuICAvLyBTZWNvbmQ6IDAsIDEsIC4uLiwgNTlcbiAgcyAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKVxuICB9LFxuXG4gIC8vIFNlY29uZDogMDAsIDAxLCAuLi4sIDU5XG4gIHNzIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldFNlY29uZHMoKSlcbiAgfSxcblxuICAvLyAxLzEwIG9mIHNlY29uZDogMCwgMSwgLi4uLCA5XG4gIFMgKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwKVxuICB9LFxuXG4gIC8vIDEvMTAwIG9mIHNlY29uZDogMDAsIDAxLCAuLi4sIDk5XG4gIFNTIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChNYXRoLmZsb29yKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMCkpXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmQ6IDAwMCwgMDAxLCAuLi4sIDk5OVxuICBTU1MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCksIDMpXG4gIH0sXG5cbiAgLy8gTWVyaWRpZW06IEFNLCBQTVxuICBBIChkYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuSChkYXRlKSA8IDEyID8gJ0FNJyA6ICdQTSdcbiAgfSxcblxuICAvLyBNZXJpZGllbTogYW0sIHBtXG4gIGEgKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5IKGRhdGUpIDwgMTIgPyAnYW0nIDogJ3BtJ1xuICB9LFxuXG4gIC8vIE1lcmlkaWVtOiBhLm0uLCBwLm0uXG4gIGFhIChkYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuSChkYXRlKSA8IDEyID8gJ2EubS4nIDogJ3AubS4nXG4gIH0sXG5cbiAgLy8gVGltZXpvbmU6IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwXG4gIFogKGRhdGUsIF9kYXRlTG9jYWxlLCBfZm9yY2VkWWVhciwgZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgICBjb25zdCB0ek9mZnNldCA9IGZvcmNlZFRpbWV6b25lT2Zmc2V0ID09PSB2b2lkIDAgfHwgZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IG51bGxcbiAgICAgID8gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpXG4gICAgICA6IGZvcmNlZFRpbWV6b25lT2Zmc2V0XG5cbiAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodHpPZmZzZXQsICc6JylcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxMDAsICswMDAwLCAuLi4gKzEyMDBcbiAgWlogKGRhdGUsIF9kYXRlTG9jYWxlLCBfZm9yY2VkWWVhciwgZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgICBjb25zdCB0ek9mZnNldCA9IGZvcmNlZFRpbWV6b25lT2Zmc2V0ID09PSB2b2lkIDAgfHwgZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IG51bGxcbiAgICAgID8gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpXG4gICAgICA6IGZvcmNlZFRpbWV6b25lT2Zmc2V0XG5cbiAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodHpPZmZzZXQpXG4gIH0sXG5cbiAgLy8gU2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMFxuICBYIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKVxuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMDkwMFxuICB4IChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUgKHZhbCwgbWFzaywgZGF0ZUxvY2FsZSwgX19mb3JjZWRZZWFyLCBfX2ZvcmNlZFRpbWV6b25lT2Zmc2V0KSB7XG4gIGlmIChcbiAgICAodmFsICE9PSAwICYmICF2YWwpXG4gICAgfHwgdmFsID09PSBJbmZpbml0eVxuICAgIHx8IHZhbCA9PT0gLUluZmluaXR5XG4gICkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbClcblxuICBpZiAoaXNOYU4oZGF0ZSkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChtYXNrID09PSB2b2lkIDApIHtcbiAgICBtYXNrID0gZGVmYXVsdE1hc2tcbiAgfVxuXG4gIGNvbnN0IGxvY2FsZSA9IGdldERhdGVMb2NhbGUoZGF0ZUxvY2FsZSwgTGFuZy5wcm9wcylcblxuICByZXR1cm4gbWFzay5yZXBsYWNlKFxuICAgIHRva2VuLFxuICAgIChtYXRjaCwgdGV4dCkgPT4gKFxuICAgICAgbWF0Y2ggaW4gZm9ybWF0dGVyXG4gICAgICAgID8gZm9ybWF0dGVyWyBtYXRjaCBdKGRhdGUsIGxvY2FsZSwgX19mb3JjZWRZZWFyLCBfX2ZvcmNlZFRpbWV6b25lT2Zmc2V0KVxuICAgICAgICA6ICh0ZXh0ID09PSB2b2lkIDAgPyBtYXRjaCA6IHRleHQuc3BsaXQoJ1xcXFxdJykuam9pbignXScpKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUgKGRhdGUpIHtcbiAgcmV0dXJuIGlzRGF0ZShkYXRlKSA9PT0gdHJ1ZVxuICAgID8gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpXG4gICAgOiBkYXRlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNWYWxpZCxcbiAgZXh0cmFjdERhdGUsXG4gIGJ1aWxkRGF0ZSxcbiAgZ2V0RGF5T2ZXZWVrLFxuICBnZXRXZWVrT2ZZZWFyLFxuICBpc0JldHdlZW5EYXRlcyxcbiAgYWRkVG9EYXRlLFxuICBzdWJ0cmFjdEZyb21EYXRlLFxuICBhZGp1c3REYXRlLFxuICBzdGFydE9mRGF0ZSxcbiAgZW5kT2ZEYXRlLFxuICBnZXRNYXhEYXRlLFxuICBnZXRNaW5EYXRlLFxuICBnZXREYXRlRGlmZixcbiAgZ2V0RGF5T2ZZZWFyLFxuICBpbmZlckRhdGVGb3JtYXQsXG4gIGdldERhdGVCZXR3ZWVuLFxuICBpc1NhbWVEYXRlLFxuICBkYXlzSW5Nb250aCxcbiAgZm9ybWF0RGF0ZSxcbiAgY2xvbmVcbn1cbiIsImlmICh0eXBlb2YgSFRNTFZpZGVvRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgISgncmVxdWVzdFZpZGVvRnJhbWVDYWxsYmFjaycgaW4gSFRNTFZpZGVvRWxlbWVudC5wcm90b3R5cGUpICYmICdnZXRWaWRlb1BsYXliYWNrUXVhbGl0eScgaW4gSFRNTFZpZGVvRWxlbWVudC5wcm90b3R5cGUpIHtcclxuICBIVE1MVmlkZW9FbGVtZW50LnByb3RvdHlwZS5fcnZmY3BvbHlmaWxsbWFwID0ge31cclxuICBIVE1MVmlkZW9FbGVtZW50LnByb3RvdHlwZS5yZXF1ZXN0VmlkZW9GcmFtZUNhbGxiYWNrID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBoYW5kbGUgPSBwZXJmb3JtYW5jZS5ub3coKVxyXG4gICAgY29uc3QgcXVhbGl0eSA9IHRoaXMuZ2V0VmlkZW9QbGF5YmFja1F1YWxpdHkoKVxyXG4gICAgY29uc3QgYmFzZWxpbmUgPSB0aGlzLm1velByZXNlbnRlZEZyYW1lcyB8fCB0aGlzLm1velBhaW50ZWRGcmFtZXMgfHwgcXVhbGl0eS50b3RhbFZpZGVvRnJhbWVzIC0gcXVhbGl0eS5kcm9wcGVkVmlkZW9GcmFtZXNcclxuXHJcbiAgICBjb25zdCBjaGVjayA9IChvbGQsIG5vdykgPT4ge1xyXG4gICAgICBjb25zdCBuZXdxdWFsaXR5ID0gdGhpcy5nZXRWaWRlb1BsYXliYWNrUXVhbGl0eSgpXHJcbiAgICAgIGNvbnN0IHByZXNlbnRlZEZyYW1lcyA9IHRoaXMubW96UHJlc2VudGVkRnJhbWVzIHx8IHRoaXMubW96UGFpbnRlZEZyYW1lcyB8fCBuZXdxdWFsaXR5LnRvdGFsVmlkZW9GcmFtZXMgLSBuZXdxdWFsaXR5LmRyb3BwZWRWaWRlb0ZyYW1lc1xyXG4gICAgICBpZiAocHJlc2VudGVkRnJhbWVzID4gYmFzZWxpbmUpIHtcclxuICAgICAgICBjb25zdCBwcm9jZXNzaW5nRHVyYXRpb24gPSB0aGlzLm1vekZyYW1lRGVsYXkgfHwgKG5ld3F1YWxpdHkudG90YWxGcmFtZURlbGF5IC0gcXVhbGl0eS50b3RhbEZyYW1lRGVsYXkpIHx8IDBcclxuICAgICAgICBjb25zdCB0aW1lZGlmZiA9IG5vdyAtIG9sZCAvLyBIaWdoUmVzIGRpZmZcclxuICAgICAgICBjYWxsYmFjayhub3csIHtcclxuICAgICAgICAgIHByZXNlbnRhdGlvblRpbWU6IG5vdyArIHByb2Nlc3NpbmdEdXJhdGlvbiAqIDEwMDAsXHJcbiAgICAgICAgICBleHBlY3RlZERpc3BsYXlUaW1lOiBub3cgKyB0aW1lZGlmZixcclxuICAgICAgICAgIHdpZHRoOiB0aGlzLnZpZGVvV2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMudmlkZW9IZWlnaHQsXHJcbiAgICAgICAgICBtZWRpYVRpbWU6IE1hdGgubWF4KDAsIHRoaXMuY3VycmVudFRpbWUgfHwgMCkgKyB0aW1lZGlmZiAvIDEwMDAsXHJcbiAgICAgICAgICBwcmVzZW50ZWRGcmFtZXMsXHJcbiAgICAgICAgICBwcm9jZXNzaW5nRHVyYXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9ydmZjcG9seWZpbGxtYXBbaGFuZGxlXVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3J2ZmNwb2x5ZmlsbG1hcFtoYW5kbGVdID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG5ld2VyID0+IGNoZWNrKG5vdywgbmV3ZXIpKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9ydmZjcG9seWZpbGxtYXBbaGFuZGxlXSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShuZXdlciA9PiBjaGVjayhoYW5kbGUsIG5ld2VyKSlcclxuICAgIHJldHVybiBoYW5kbGVcclxuICB9XHJcblxyXG4gIEhUTUxWaWRlb0VsZW1lbnQucHJvdG90eXBlLmNhbmNlbFZpZGVvRnJhbWVDYWxsYmFjayA9IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3J2ZmNwb2x5ZmlsbG1hcFtoYW5kbGVdKVxyXG4gICAgZGVsZXRlIHRoaXMuX3J2ZmNwb2x5ZmlsbG1hcFtoYW5kbGVdXHJcbiAgfVxyXG59XHJcbiIsIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhhLGIsYyl7dmFyIGQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2Qub3BlbihcIkdFVFwiLGEpLGQucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGQub25sb2FkPWZ1bmN0aW9uKCl7ZyhkLnJlc3BvbnNlLGIsYyl9LGQub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZC5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiSEVBRFwiLGEsITEpO3RyeXtiLnNlbmQoKX1jYXRjaChhKXt9cmV0dXJuIDIwMDw9Yi5zdGF0dXMmJjI5OT49Yi5zdGF0dXN9ZnVuY3Rpb24gZShhKXt0cnl7YS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpfWNhdGNoKGMpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7Yi5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsd2luZG93LDAsMCwwLDgwLDIwLCExLCExLCExLCExLDAsbnVsbCksYS5kaXNwYXRjaEV2ZW50KGIpfX12YXIgZj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cud2luZG93PT09d2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZj9zZWxmOlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWw/Z2xvYmFsOnZvaWQgMCxhPWYubmF2aWdhdG9yJiYvTWFjaW50b3NoLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpJiYvQXBwbGVXZWJLaXQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkmJiEvU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGc9Zi5zYXZlQXN8fChcIm9iamVjdFwiIT10eXBlb2Ygd2luZG93fHx3aW5kb3chPT1mP2Z1bmN0aW9uKCl7fTpcImRvd25sb2FkXCJpbiBIVE1MQW5jaG9yRWxlbWVudC5wcm90b3R5cGUmJiFhP2Z1bmN0aW9uKGIsZyxoKXt2YXIgaT1mLlVSTHx8Zi53ZWJraXRVUkwsaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtnPWd8fGIubmFtZXx8XCJkb3dubG9hZFwiLGouZG93bmxvYWQ9ZyxqLnJlbD1cIm5vb3BlbmVyXCIsXCJzdHJpbmdcIj09dHlwZW9mIGI/KGouaHJlZj1iLGoub3JpZ2luPT09bG9jYXRpb24ub3JpZ2luP2Uoaik6ZChqLmhyZWYpP2MoYixnLGgpOmUoaixqLnRhcmdldD1cIl9ibGFua1wiKSk6KGouaHJlZj1pLmNyZWF0ZU9iamVjdFVSTChiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5yZXZva2VPYmplY3RVUkwoai5ocmVmKX0sNEU0KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShqKX0sMCkpfTpcIm1zU2F2ZU9yT3BlbkJsb2JcImluIG5hdmlnYXRvcj9mdW5jdGlvbihmLGcsaCl7aWYoZz1nfHxmLm5hbWV8fFwiZG93bmxvYWRcIixcInN0cmluZ1wiIT10eXBlb2YgZiluYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihiKGYsaCksZyk7ZWxzZSBpZihkKGYpKWMoZixnLGgpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7aS5ocmVmPWYsaS50YXJnZXQ9XCJfYmxhbmtcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShpKX0pfX06ZnVuY3Rpb24oYixkLGUsZyl7aWYoZz1nfHxvcGVuKFwiXCIsXCJfYmxhbmtcIiksZyYmKGcuZG9jdW1lbnQudGl0bGU9Zy5kb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImRvd25sb2FkaW5nLi4uXCIpLFwic3RyaW5nXCI9PXR5cGVvZiBiKXJldHVybiBjKGIsZCxlKTt2YXIgaD1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiPT09Yi50eXBlLGk9L2NvbnN0cnVjdG9yL2kudGVzdChmLkhUTUxFbGVtZW50KXx8Zi5zYWZhcmksaj0vQ3JpT1NcXC9bXFxkXSsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoKGp8fGgmJml8fGEpJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcil7dmFyIGs9bmV3IEZpbGVSZWFkZXI7ay5vbmxvYWRlbmQ9ZnVuY3Rpb24oKXt2YXIgYT1rLnJlc3VsdDthPWo/YTphLnJlcGxhY2UoL15kYXRhOlteO10qOy8sXCJkYXRhOmF0dGFjaG1lbnQvZmlsZTtcIiksZz9nLmxvY2F0aW9uLmhyZWY9YTpsb2NhdGlvbj1hLGc9bnVsbH0say5yZWFkQXNEYXRhVVJMKGIpfWVsc2V7dmFyIGw9Zi5VUkx8fGYud2Via2l0VVJMLG09bC5jcmVhdGVPYmplY3RVUkwoYik7Zz9nLmxvY2F0aW9uPW06bG9jYXRpb24uaHJlZj1tLGc9bnVsbCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bC5yZXZva2VPYmplY3RVUkwobSl9LDRFNCl9fSk7Zi5zYXZlQXM9Zy5zYXZlQXM9ZyxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9Zyl9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsZVNhdmVyLm1pbi5qcy5tYXAiLCI8dGVtcGxhdGU+XG4gICAgPHVsPlxuICAgICAgICA8bGkgdi1mb3I9XCJpdGVtIGluIHZpc3VhbHNcIiA6a2V5PVwiaXRlbS5maWxlbmFtZVwiPlxuICAgICAgICAgICAgPCEtLVxuICAgICAgICAgICAgICAgIHNpemU9XCIzdmhcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAtLT5cbiAgICAgICAgICAgIDxxLWJ0biBwYWRkaW5nPVwieHNcIiByb3VuZCBpY29uPVwiZGVsZXRlX2ZvcmV2ZXJcIiBAY2xpY2s9XCJpdGVtX2RlbGV0ZShpdGVtKVwiPjwvcS1idG4+XG4gICAgICAgICAgICA8cS1idG4gcGFkZGluZz1cInhzXCIgcm91bmQgaWNvbj1cInNhdmVcIiBAY2xpY2s9XCJpdGVtX3NhdmUoaXRlbSlcIj48L3EtYnRuPlxuICAgICAgICAgICAgPGltZyB2LWlmPVwiaXRlbS50eXBlID09ICdpbWFnZSdcIiA6c3JjPVwiaXRlbS5kYXRhXCIgYWx0PVwiXCIgQGNsaWNrPVwiaXRlbV9jb3B5KGl0ZW0pXCIgLz5cbiAgICAgICAgICAgIDx2aWRlbyB2LWVsc2UtaWY9XCJpdGVtLnR5cGUgPT0gJ3ZpZGVvJ1wiIDpzcmM9XCJpdGVtLmRhdGFcIiBhbHQ9XCJcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm9cIj57eyBpdGVtLmZpbGVuYW1lIH19PC9kaXY+XG4gICAgICAgIDwvbGk+XG4gICAgPC91bD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG51bCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1jb250ZW50OiBzdHJldGNoO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICBsaXN0LXN0eWxlOiBpbnNpZGUgbm9uZSBub25lO1xuICAgIG1hcmdpbjogMXJlbTtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG51bCBsaSB7XG4gICAgb3JkZXI6IDA7XG4gICAgZmxleDogMCAxIGF1dG87XG4gICAgYWxpZ24tc2VsZjogYXV0bztcblxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW46IDAuNXJlbTtcblxuICAgIGJvcmRlcjogc29saWQgMXB4IGhzbCgyNTAsIDEwMCUsIDUwJSk7XG59XG5cbnVsIGxpIGJ1dHRvbi5xLWJ0biB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMC41cmVtO1xufVxuXG51bCBsaSBidXR0b24ucS1idG46bnRoLWNoaWxkKDEpIHtcbiAgICByaWdodDogMC41cmVtO1xufVxuXG51bCBsaSBidXR0b24ucS1idG46bnRoLWNoaWxkKDIpIHtcbiAgICByaWdodDogYXV0bztcbiAgICBsZWZ0OiAwLjVyZW07XG59XG5cbnVsIGxpIHZpZGVvLFxudWwgbGkgaW1nIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXgtaGVpZ2h0OiA0MHZoO1xuICAgIC8qIGFsbG93IDUgaW4gYSByb3cgKi9cbiAgICBtYXgtd2lkdGg6IGNhbGMoMjV2dyAtIDEuMXJlbSk7XG59XG5cbnVsIGxpIC5pbmZvIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAxcHg7XG4gICAgbGVmdDogMXB4O1xuICAgIHRleHQtc2hhZG93OiAwIDAgMC4xcmVtIGhzbCgwLCAwJSwgMCUpLCAwIDAgMC4ycmVtIGhzbCgwLCAwJSwgMCUpLCAwIDAgMC4zcmVtIGhzbCgwLCAwJSwgMCUpLFxuICAgICAgICAwIDAgMC40cmVtIGhzbCgwLCAwJSwgMCUpLCAwIDAgMC40cmVtIGhzbCgwLCAwJSwgMCUpLCAwIDAgMC40cmVtIGhzbCgwLCAwJSwgMCUpLFxuICAgICAgICAwIDAgMC44cmVtIGhzbCgwLCAwJSwgMCUpO1xuICAgIC8qIGJveC1zaGFkb3c6IDAgMCAwLjFyZW0gaHNsKDAsIDEwMCUsIDUwJSkgaW5zZXQ7ICovXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtICgyICogMXB4KSk7XG4gICAgcGFkZGluZzogMC4zZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsYSgyNTAsIDEwMCUsIDUwJSwgMC42KTtcbiAgICBmb250LXNpemU6IDF2aDtcbn1cbjwvc3R5bGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tIFwiZmlsZS1zYXZlclwiO1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyh7XG4gICAgdmlzdWFsczoge1xuICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbn0pO1xuXG5jb25zdCB2aXN1YWxzID0gcHJvcHMudmlzdWFscztcblxuZnVuY3Rpb24gaXRlbV9kZWxldGUoaXRlbTJyZW1vdmUpIHtcbiAgICBjb25zb2xlLmxvZyhcImRlbGV0ZSBpdGVtXCIsIGl0ZW0ycmVtb3ZlKTtcbiAgICBjb25zdCBpbmRleCA9IHZpc3VhbHMuaW5kZXhPZihpdGVtMnJlbW92ZSk7XG4gICAgLy8gb25seSBzcGxpY2UgYXJyYXkgd2hlbiBpdGVtIGlzIGZvdW5kXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgLy8gMm5kIHBhcmFtZXRlciBtZWFucyByZW1vdmUgb25lIGl0ZW0gb25seVxuICAgICAgICB2aXN1YWxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIC8vIGFyciA9IGFyci5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBpdGVtMnJlbW92ZSlcbn1cblxuZnVuY3Rpb24gaXRlbV9zYXZlKGl0ZW0pIHtcbiAgICBjb25zb2xlLmxvZyhcInNhdmUgaXRlbVwiLCBpdGVtKTtcbiAgICBzYXZlQXMoaXRlbS5kYXRhLCBpdGVtLmZpbGVuYW1lKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaXRlbV9jb3B5KGl0ZW0pIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBDcmVhdGUgQ2xpcGJvYXJkSXRlbSB3aXRoIGJsb2IgYW5kIGl0cyB0eXBlLCBhbmQgYWRkIHRvIGFuIGFycmF5XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbbmV3IENsaXBib2FyZEl0ZW0oeyBbaXRlbS5ibG9iLnR5cGVdOiBpdGVtLmJsb2IgfSldO1xuICAgICAgICAvLyBXcml0ZSB0aGUgZGF0YSB0byB0aGUgY2xpcGJvYXJkXG4gICAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGUoZGF0YSk7XG4gICAgICAgICRxLm5vdGlmeShgaW1hZ2UgJyR7aXRlbS5maWxlbmFtZX0nIGNvcGllZCB0byBjbGlwYm9hcmQuYCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1fY29weSBmYWlsZWQ6XCIsIGUpO1xuICAgIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIHJlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByb290UmVmKSB7XG4gIGNvbnN0IHJlZm9jdXNSZWYgPSByZWYobnVsbClcblxuICBjb25zdCByZWZvY3VzVGFyZ2V0RWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIGgoJ3NwYW4nLCB7XG4gICAgICByZWY6IHJlZm9jdXNSZWYsXG4gICAgICBjbGFzczogJ25vLW91dGxpbmUnLFxuICAgICAgdGFiaW5kZXg6IC0xXG4gICAgfSlcbiAgfSlcblxuICBmdW5jdGlvbiByZWZvY3VzVGFyZ2V0IChlKSB7XG4gICAgY29uc3Qgcm9vdCA9IHJvb3RSZWYudmFsdWVcblxuICAgIGlmIChlICE9PSB2b2lkIDAgJiYgZS50eXBlLmluZGV4T2YoJ2tleScpID09PSAwKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHJvb3QgIT09IG51bGxcbiAgICAgICAgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gcm9vdFxuICAgICAgICAmJiByb290LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID09PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgcm9vdC5mb2N1cygpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgcmVmb2N1c1JlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgJiYgKGUgPT09IHZvaWQgMCB8fCAocm9vdCAhPT0gbnVsbCAmJiByb290LmNvbnRhaW5zKGUudGFyZ2V0KSA9PT0gdHJ1ZSkpXG4gICAgKSB7XG4gICAgICByZWZvY3VzUmVmLnZhbHVlLmZvY3VzKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlZm9jdXNUYXJnZXRFbCxcbiAgICByZWZvY3VzVGFyZ2V0XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlRm9ybVByb3BzID0ge1xuICBuYW1lOiBTdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1BdHRycyAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+ICh7XG4gICAgdHlwZTogJ2hpZGRlbicsXG4gICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICB2YWx1ZTogcHJvcHMubW9kZWxWYWx1ZVxuICB9KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1JbmplY3QgKGZvcm1BdHRycyA9IHt9KSB7XG4gIHJldHVybiAoY2hpbGQsIGFjdGlvbiwgY2xhc3NOYW1lKSA9PiB7XG4gICAgY2hpbGRbIGFjdGlvbiBdKFxuICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgIGNsYXNzOiAnaGlkZGVuJyArIChjbGFzc05hbWUgfHwgJycpLFxuICAgICAgICAuLi5mb3JtQXR0cnMudmFsdWVcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5wdXROYW1lQXR0ciAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHByb3BzLm5hbWUgfHwgcHJvcHMuZm9yKVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICB4czogMzAsXG4gIHNtOiAzNSxcbiAgbWQ6IDQwLFxuICBsZzogNTAsXG4gIHhsOiA2MFxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlLCB0b1JhdyB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNpemUvdXNlLXNpemUuanMnXG5pbXBvcnQgdXNlUmVmb2N1c1RhcmdldCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yZWZvY3VzLXRhcmdldC91c2UtcmVmb2N1cy10YXJnZXQuanMnXG5pbXBvcnQgeyB1c2VGb3JtSW5qZWN0LCB1c2VGb3JtUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzJ1xuXG5pbXBvcnQgb3B0aW9uU2l6ZXMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5vcHRpb24tc2l6ZXMvb3B0aW9uLXNpemVzLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90LCBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlQ2hlY2tib3hQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VTaXplUHJvcHMsXG4gIC4uLnVzZUZvcm1Qcm9wcyxcblxuICBtb2RlbFZhbHVlOiB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICB2YWw6IHt9LFxuXG4gIHRydWVWYWx1ZTogeyBkZWZhdWx0OiB0cnVlIH0sXG4gIGZhbHNlVmFsdWU6IHsgZGVmYXVsdDogZmFsc2UgfSxcbiAgaW5kZXRlcm1pbmF0ZVZhbHVlOiB7IGRlZmF1bHQ6IG51bGwgfSxcblxuICBjaGVja2VkSWNvbjogU3RyaW5nLFxuICB1bmNoZWNrZWRJY29uOiBTdHJpbmcsXG4gIGluZGV0ZXJtaW5hdGVJY29uOiBTdHJpbmcsXG5cbiAgdG9nZ2xlT3JkZXI6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYgPT09ICd0ZicgfHwgdiA9PT0gJ2Z0J1xuICB9LFxuICB0b2dnbGVJbmRldGVybWluYXRlOiBCb29sZWFuLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG4gIGxlZnRMYWJlbDogQm9vbGVhbixcblxuICBjb2xvcjogU3RyaW5nLFxuICBrZWVwQ29sb3I6IEJvb2xlYW4sXG4gIGRlbnNlOiBCb29sZWFuLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUNoZWNrYm94RW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodHlwZSwgZ2V0SW5uZXIpIHtcbiAgY29uc3QgeyBwcm9wcywgc2xvdHMsIGVtaXQsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgY29uc3QgeyByZWZvY3VzVGFyZ2V0RWwsIHJlZm9jdXNUYXJnZXQgfSA9IHVzZVJlZm9jdXNUYXJnZXQocHJvcHMsIHJvb3RSZWYpXG4gIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIG9wdGlvblNpemVzKVxuXG4gIGNvbnN0IG1vZGVsSXNBcnJheSA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMudmFsICE9PSB2b2lkIDAgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKVxuICApXG5cbiAgY29uc3QgaW5kZXggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdG9SYXcocHJvcHMudmFsKVxuICAgIHJldHVybiBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgID8gcHJvcHMubW9kZWxWYWx1ZS5maW5kSW5kZXgob3B0ID0+IHRvUmF3KG9wdCkgPT09IHZhbClcbiAgICAgIDogLTFcbiAgfSlcblxuICBjb25zdCBpc1RydWUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgbW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlXG4gICAgICA/IGluZGV4LnZhbHVlICE9PSAtMVxuICAgICAgOiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMudHJ1ZVZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGlzRmFsc2UgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgbW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlXG4gICAgICA/IGluZGV4LnZhbHVlID09PSAtMVxuICAgICAgOiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMuZmFsc2VWYWx1ZSlcbiAgKSlcblxuICBjb25zdCBpc0luZGV0ZXJtaW5hdGUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGlzVHJ1ZS52YWx1ZSA9PT0gZmFsc2UgJiYgaXNGYWxzZS52YWx1ZSA9PT0gZmFsc2VcbiAgKVxuXG4gIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAtMSA6IHByb3BzLnRhYmluZGV4IHx8IDBcbiAgKSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBgcS0keyB0eXBlIH0gY3Vyc29yLXBvaW50ZXIgbm8tb3V0bGluZSByb3cgaW5saW5lIG5vLXdyYXAgaXRlbXMtY2VudGVyYFxuICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcnKVxuICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/IGAgcS0keyB0eXBlIH0tLWRhcmtgIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyBgIHEtJHsgdHlwZSB9LS1kZW5zZWAgOiAnJylcbiAgICArIChwcm9wcy5sZWZ0TGFiZWwgPT09IHRydWUgPyAnIHJldmVyc2UnIDogJycpXG4gIClcblxuICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydXRoeScgOiAoaXNGYWxzZS52YWx1ZSA9PT0gdHJ1ZSA/ICdmYWxzeScgOiAnaW5kZXQnKVxuICAgIGNvbnN0IGNvbG9yID0gcHJvcHMuY29sb3IgIT09IHZvaWQgMCAmJiAoXG4gICAgICBwcm9wcy5rZWVwQ29sb3IgPT09IHRydWVcbiAgICAgIHx8ICh0eXBlID09PSAndG9nZ2xlJyA/IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSA6IGlzRmFsc2UudmFsdWUgIT09IHRydWUpXG4gICAgKVxuICAgICAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWBcbiAgICAgIDogJydcblxuICAgIHJldHVybiBgcS0keyB0eXBlIH1fX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIG5vbi1zZWxlY3RhYmxlIHEtJHsgdHlwZSB9X19pbm5lci0tJHsgc3RhdGUgfSR7IGNvbG9yIH1gXG4gIH0pXG5cbiAgY29uc3QgZm9ybUF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHByb3AgPSB7IHR5cGU6ICdjaGVja2JveCcgfVxuXG4gICAgcHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24ocHJvcCwge1xuICAgICAgLy8gc2VlIGh0dHBzOi8vdnVlanMub3JnL2d1aWRlL2V4dHJhcy9yZW5kZXItZnVuY3Rpb24uaHRtbCNjcmVhdGluZy12bm9kZXMgKC5wcm9wKVxuICAgICAgJy5jaGVja2VkJzogaXNUcnVlLnZhbHVlLFxuICAgICAgJ15jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ2NoZWNrZWQnIDogdm9pZCAwLFxuICAgICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICAgIHZhbHVlOiBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy52YWxcbiAgICAgICAgOiBwcm9wcy50cnVlVmFsdWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIHByb3BcbiAgfSlcblxuICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgcm9sZTogdHlwZSA9PT0gJ3RvZ2dsZScgPyAnc3dpdGNoJyA6ICdjaGVja2JveCcsXG4gICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgJ2FyaWEtY2hlY2tlZCc6IGlzSW5kZXRlcm1pbmF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICdtaXhlZCdcbiAgICAgICAgOiAoaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJylcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYXR0cnNbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJzXG4gIH0pXG5cbiAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICByZWZvY3VzVGFyZ2V0KGUpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZ2V0TmV4dFZhbHVlKCksIGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmV4dFZhbHVlICgpIHtcbiAgICBpZiAobW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAoaXNUcnVlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuICAgICAgICB2YWwuc3BsaWNlKGluZGV4LnZhbHVlLCAxKVxuICAgICAgICByZXR1cm4gdmFsXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlLmNvbmNhdChbIHByb3BzLnZhbCBdKVxuICAgIH1cblxuICAgIGlmIChpc1RydWUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy50b2dnbGVPcmRlciAhPT0gJ2Z0JyB8fCBwcm9wcy50b2dnbGVJbmRldGVybWluYXRlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMuZmFsc2VWYWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc0ZhbHNlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMudG9nZ2xlT3JkZXIgPT09ICdmdCcgfHwgcHJvcHMudG9nZ2xlSW5kZXRlcm1pbmF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb3BzLnRydWVWYWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBwcm9wcy50b2dnbGVPcmRlciAhPT0gJ2Z0J1xuICAgICAgICA/IHByb3BzLnRydWVWYWx1ZVxuICAgICAgICA6IHByb3BzLmZhbHNlVmFsdWVcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMuaW5kZXRlcm1pbmF0ZVZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24gKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICBvbkNsaWNrKGUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0SW5uZXJDb250ZW50ID0gZ2V0SW5uZXIoaXNUcnVlLCBpc0luZGV0ZXJtaW5hdGUpXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgdG9nZ2xlOiBvbkNsaWNrIH0pXG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCBpbm5lciA9IGdldElubmVyQ29udGVudCgpXG5cbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGluamVjdEZvcm1JbnB1dChcbiAgICAgIGlubmVyLFxuICAgICAgJ3Vuc2hpZnQnLFxuICAgICAgYCBxLSR7IHR5cGUgfV9fbmF0aXZlIGFic29sdXRlIHEtbWEtbm9uZSBxLXBhLW5vbmVgXG4gICAgKVxuXG4gICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBpbm5lckNsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgIH0sIGlubmVyKVxuICAgIF1cblxuICAgIGlmIChyZWZvY3VzVGFyZ2V0RWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGNoaWxkLnB1c2gocmVmb2N1c1RhcmdldEVsLnZhbHVlKVxuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgPyBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFsgcHJvcHMubGFiZWwgXSlcbiAgICAgIDogaFNsb3Qoc2xvdHMuZGVmYXVsdClcblxuICAgIGxhYmVsICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGBxLSR7IHR5cGUgfV9fbGFiZWwgcS1hbmNob3ItLXNraXBgXG4gICAgICB9LCBsYWJlbClcbiAgICApXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgb25DbGljayxcbiAgICAgIG9uS2V5ZG93bixcbiAgICAgIG9uS2V5dXBcbiAgICB9LCBjaGlsZClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgdXNlQ2hlY2tib3gsIHsgdXNlQ2hlY2tib3hQcm9wcywgdXNlQ2hlY2tib3hFbWl0cyB9IGZyb20gJy4uL2NoZWNrYm94L3VzZS1jaGVja2JveC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvZ2dsZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VDaGVja2JveFByb3BzLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25Db2xvcjogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IHVzZUNoZWNrYm94RW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgZnVuY3Rpb24gZ2V0SW5uZXIgKGlzVHJ1ZSwgaXNJbmRldGVybWluYXRlKSB7XG4gICAgICBjb25zdCBpY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gcHJvcHMuY2hlY2tlZEljb25cbiAgICAgICAgICA6IChpc0luZGV0ZXJtaW5hdGUudmFsdWUgPT09IHRydWUgPyBwcm9wcy5pbmRldGVybWluYXRlSWNvbiA6IHByb3BzLnVuY2hlY2tlZEljb24pXG4gICAgICAgICkgfHwgcHJvcHMuaWNvblxuICAgICAgKVxuXG4gICAgICBjb25zdCBjb2xvciA9IGNvbXB1dGVkKCgpID0+IChpc1RydWUudmFsdWUgPT09IHRydWUgPyBwcm9wcy5pY29uQ29sb3IgOiBudWxsKSlcblxuICAgICAgcmV0dXJuICgpID0+IFtcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdG9nZ2xlX190cmFjaycgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10b2dnbGVfX3RodW1iIGFic29sdXRlIGZsZXggZmxleC1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgfSwgaWNvbi52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpY29uLnZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvci52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9XG5cbiAgICByZXR1cm4gdXNlQ2hlY2tib3goJ3RvZ2dsZScsIGdldElubmVyKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JTdGF0aWNQcm9wcyA9IHtcbiAgLyogU1NSIGRvZXMgbm90IGtub3cgYWJvdXQgRWxlbWVudCAqL1xuICB0YXJnZXQ6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgID8geyBkZWZhdWx0OiB0cnVlIH1cbiAgICA6IHtcbiAgICAgICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcsIEVsZW1lbnQgXSxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgfSxcblxuICBub1BhcmVudEV2ZW50OiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JQcm9wcyA9IHtcbiAgLi4udXNlQW5jaG9yU3RhdGljUHJvcHMsXG4gIGNvbnRleHRNZW51OiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGF2b2lkRW1pdCwgLy8gcmVxdWlyZWQgZm9yIFFQb3B1cFByb3h5ICh0cnVlKVxuICBjb25maWd1cmVBbmNob3JFbCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSwgZW1pdCB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBhbmNob3JFbCA9IHJlZihudWxsKVxuXG4gIGxldCB0b3VjaFRpbWVyID0gbnVsbFxuXG4gIGZ1bmN0aW9uIGNhblNob3cgKGV2dCkge1xuICAgIC8vIGFib3J0IHdpdGggbm8gcGFyZW50IGNvbmZpZ3VyZWQgb3Igb24gbXVsdGktdG91Y2hcbiAgICByZXR1cm4gYW5jaG9yRWwudmFsdWUgPT09IG51bGxcbiAgICAgID8gZmFsc2VcbiAgICAgIDogKGV2dCA9PT0gdm9pZCAwIHx8IGV2dC50b3VjaGVzID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoIDw9IDEpXG4gIH1cblxuICBjb25zdCBhbmNob3JFdmVudHMgPSB7fVxuXG4gIGlmIChjb25maWd1cmVBbmNob3JFbCA9PT0gdm9pZCAwKSB7XG4gICAgLy8gZGVmYXVsdCBjb25maWd1cmVBbmNob3JFbCBpcyBkZXNpZ25lZCBmb3JcbiAgICAvLyBRTWVudSAmIFFQb3B1cFByb3h5ICh3aGljaCBpcyB3aHkgaXQncyBoYW5kbGVkIGhlcmUpXG5cbiAgICBPYmplY3QuYXNzaWduKGFuY2hvckV2ZW50cywge1xuICAgICAgaGlkZSAoZXZ0KSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlIChldnQpIHtcbiAgICAgICAgcHJveHkudG9nZ2xlKGV2dClcbiAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlS2V5IChldnQpIHtcbiAgICAgICAgaXNLZXlDb2RlKGV2dCwgMTMpID09PSB0cnVlICYmIGFuY2hvckV2ZW50cy50b2dnbGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgY29udGV4dENsaWNrIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHByZXZlbnQoZXZ0KVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgcHJveHkuc2hvdyhldnQpXG4gICAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgcHJldmVudCxcblxuICAgICAgbW9iaWxlVG91Y2ggKGV2dCkge1xuICAgICAgICBhbmNob3JFdmVudHMubW9iaWxlQ2xlYW51cChldnQpXG5cbiAgICAgICAgaWYgKGNhblNob3coZXZ0KSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBbXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdwcmV2ZW50JywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgXSlcblxuICAgICAgICB0b3VjaFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdG91Y2hUaW1lciA9IG51bGxcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0sIDMwMClcbiAgICAgIH0sXG5cbiAgICAgIG1vYmlsZUNsZWFudXAgKGV2dCkge1xuICAgICAgICBhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgaWYgKHRvdWNoVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodG91Y2hUaW1lcilcbiAgICAgICAgICB0b3VjaFRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgZXZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uZmlndXJlQW5jaG9yRWwgPSBmdW5jdGlvbiAoY29udGV4dCA9IHByb3BzLmNvbnRleHRNZW51KSB7XG4gICAgICBpZiAocHJvcHMubm9QYXJlbnRFdmVudCA9PT0gdHJ1ZSB8fCBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGxldCBldnRzXG5cbiAgICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm94eS4kcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnbW9iaWxlVG91Y2gnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZG93bicsICdoaWRlJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY29udGV4dG1lbnUnLCAnY29udGV4dENsaWNrJywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldnRzID0gW1xuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjbGljaycsICd0b2dnbGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAna2V5dXAnLCAndG9nZ2xlS2V5JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZUFuY2hvckVsICgpIHtcbiAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICdhbmNob3InKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yRWwgKGVsKSB7XG4gICAgYW5jaG9yRWwudmFsdWUgPSBlbFxuICAgIHdoaWxlIChhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtYW5jaG9yLS1za2lwJykpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gYW5jaG9yRWwudmFsdWUucGFyZW50Tm9kZVxuICAgIH1cbiAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gIH1cblxuICBmdW5jdGlvbiBwaWNrQW5jaG9yRWwgKCkge1xuICAgIGlmIChwcm9wcy50YXJnZXQgPT09IGZhbHNlIHx8IHByb3BzLnRhcmdldCA9PT0gJycgfHwgcHJveHkuJGVsLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgIHNldEFuY2hvckVsKHByb3h5LiRlbC5wYXJlbnROb2RlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBlbCA9IHByb3BzLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvcHMudGFyZ2V0KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBlbCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbCAhPT0gdm9pZCAwICYmIGVsICE9PSBudWxsKSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gZWwuJGVsIHx8IGVsXG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhbmNob3JFbC52YWx1ZSA9IG51bGxcbiAgICAgICAgY29uc29sZS5lcnJvcihgQW5jaG9yOiB0YXJnZXQgXCIkeyBwcm9wcy50YXJnZXQgfVwiIG5vdCBmb3VuZGApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuY29udGV4dE1lbnUsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudGFyZ2V0LCAoKSA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICB9XG5cbiAgICBwaWNrQW5jaG9yRWwoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwaWNrQW5jaG9yRWwoKVxuXG4gICAgaWYgKGF2b2lkRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgIH1cbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHRvdWNoVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhbmNob3JFbCxcbiAgICBjYW5TaG93LFxuICAgIGFuY2hvckV2ZW50c1xuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpIHtcbiAgY29uc3QgbG9jYWxTY3JvbGxUYXJnZXQgPSByZWYobnVsbClcbiAgbGV0IHNjcm9sbEZuXG5cbiAgZnVuY3Rpb24gY2hhbmdlU2Nyb2xsRXZlbnQgKHNjcm9sbFRhcmdldCwgZm4pIHtcbiAgICBjb25zdCBmblByb3AgPSBgJHsgZm4gIT09IHZvaWQgMCA/ICdhZGQnIDogJ3JlbW92ZScgfUV2ZW50TGlzdGVuZXJgXG4gICAgY29uc3QgZm5IYW5kbGVyID0gZm4gIT09IHZvaWQgMCA/IGZuIDogc2Nyb2xsRm5cblxuICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IHdpbmRvdykge1xuICAgICAgc2Nyb2xsVGFyZ2V0WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgd2luZG93WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG5cbiAgICBzY3JvbGxGbiA9IGZuXG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSlcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vUGFyZW50RXZlbnRXYXRjaGVyID0gd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgKCkgPT4ge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KG5vUGFyZW50RXZlbnRXYXRjaGVyKVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxTY3JvbGxUYXJnZXQsXG4gICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQsXG4gICAgY2hhbmdlU2Nyb2xsRXZlbnRcbiAgfVxufVxuIiwibGV0IHF1ZXVlID0gW11cbmxldCB3YWl0RmxhZ3MgPSBbXVxuXG5mdW5jdGlvbiBjbGVhckZsYWcgKGZsYWcpIHtcbiAgd2FpdEZsYWdzID0gd2FpdEZsYWdzLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZmxhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzV2FpdEZsYWcgKGZsYWcpIHtcbiAgY2xlYXJGbGFnKGZsYWcpXG4gIHdhaXRGbGFncy5wdXNoKGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuXG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwICYmIHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vIG9ubHkgY2FsbCBsYXN0IGZvY3VzIGhhbmRsZXIgKGNhbid0IGZvY3VzIG11bHRpcGxlIHRoaW5ncyBhdCBvbmNlKVxuICAgIHF1ZXVlWyBxdWV1ZS5sZW5ndGggLSAxIF0oKVxuICAgIHF1ZXVlID0gW11cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9jdXNGbiAoZm4pIHtcbiAgaWYgKHdhaXRGbGFncy5sZW5ndGggPT09IDApIHtcbiAgICBmbigpXG4gIH1cbiAgZWxzZSB7XG4gICAgcXVldWUucHVzaChmbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNGbiAoZm4pIHtcbiAgcXVldWUgPSBxdWV1ZS5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZuKVxufVxuIiwiaW1wb3J0IHsgZ2V0UGFyZW50UHJveHkgfSBmcm9tICcuLi9wcml2YXRlLnZtL3ZtLmpzJ1xuXG5leHBvcnQgY29uc3QgcG9ydGFsUHJveHlMaXN0ID0gW11cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvcnRhbFByb3h5IChlbCkge1xuICByZXR1cm4gcG9ydGFsUHJveHlMaXN0LmZpbmQocHJveHkgPT5cbiAgICBwcm94eS5jb250ZW50RWwgIT09IG51bGxcbiAgICAmJiBwcm94eS5jb250ZW50RWwuY29udGFpbnMoZWwpXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUG9ydGFsTWVudXMgKHByb3h5LCBldnQpIHtcbiAgZG8ge1xuICAgIGlmIChwcm94eS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICBwcm94eS5oaWRlKGV2dClcblxuICAgICAgLy8gaXMgdGhpcyBhIHBvaW50IG9mIHNlcGFyYXRpb24/XG4gICAgICBpZiAocHJveHkuJHByb3BzLnNlcGFyYXRlQ2xvc2VQb3B1cCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZ2V0UGFyZW50UHJveHkocHJveHkpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3h5Ll9fcVBvcnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gdHJlYXQgaXQgYXMgcG9pbnQgb2Ygc2VwYXJhdGlvbiBpZiBwYXJlbnQgaXMgUVBvcHVwUHJveHlcbiAgICAgIC8vIChzbyBtb2JpbGUgbWF0Y2hlcyBkZXNrdG9wIGJlaGF2aW9yKVxuICAgICAgLy8gYW5kIGhpZGUgaXQgdG9vXG4gICAgICBjb25zdCBwYXJlbnQgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcblxuICAgICAgaWYgKHBhcmVudCAhPT0gdm9pZCAwICYmIHBhcmVudC4kb3B0aW9ucy5uYW1lID09PSAnUVBvcHVwUHJveHknKSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb3h5XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJveHkgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgfSB3aGlsZSAocHJveHkgIT09IHZvaWQgMCAmJiBwcm94eSAhPT0gbnVsbClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUG9ydGFscyAocHJveHksIGV2dCwgZGVwdGgpIHtcbiAgd2hpbGUgKGRlcHRoICE9PSAwICYmIHByb3h5ICE9PSB2b2lkIDAgJiYgcHJveHkgIT09IG51bGwpIHtcbiAgICBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICBkZXB0aC0tXG5cbiAgICAgIGlmIChwcm94eS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICAgIHByb3h5ID0gY2xvc2VQb3J0YWxNZW51cyhwcm94eSwgZXZ0KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBwcm94eS5oaWRlKGV2dClcbiAgICB9XG5cbiAgICBwcm94eSA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIG9uVW5tb3VudGVkLCBUZWxlcG9ydCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNXYWl0RmxhZywgcmVtb3ZlRm9jdXNXYWl0RmxhZyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbE5vZGUsIHJlbW92ZUdsb2JhbE5vZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNvbmZpZy9ub2Rlcy5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbi8qKlxuICogTm9vcCBpbnRlcm5hbCBjb21wb25lbnQgdG8gZWFzZSB0ZXN0aW5nXG4gKiBvZiB0aGUgdGVsZXBvcnRlZCBjb250ZW50LlxuICpcbiAqIGNvbnN0IHdyYXBwZXIgPSBtb3VudChRRGlhbG9nLCB7IC4uLiB9KVxuICogY29uc3QgdGVsZXBvcnRlZFdyYXBwZXIgPSB3cmFwcGVyLmZpbmRDb21wb25lbnQoeyBuYW1lOiAnUVBvcnRhbCcgfSlcbiAqL1xuY29uc3QgUVBvcnRhbCA9IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUG9ydGFsJyxcbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBzbG90cy5kZWZhdWx0KClcbiAgfVxufSlcblxuZnVuY3Rpb24gaXNPbkdsb2JhbERpYWxvZyAodm0pIHtcbiAgdm0gPSB2bS5wYXJlbnRcblxuICB3aGlsZSAodm0gIT09IHZvaWQgMCAmJiB2bSAhPT0gbnVsbCkge1xuICAgIGlmICh2bS50eXBlLm5hbWUgPT09ICdRR2xvYmFsRGlhbG9nJykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHZtLnR5cGUubmFtZSA9PT0gJ1FEaWFsb2cnIHx8IHZtLnR5cGUubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdm0gPSB2bS5wYXJlbnRcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBXYXJuaW5nIVxuLy8gWW91IE1VU1Qgc3BlY2lmeSBcImluaGVyaXRBdHRyczogZmFsc2VcIiBpbiB5b3VyIGNvbXBvbmVudFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCB0eXBlKSB7XG4gIC8vIHNob3dpbmcsIGluY2x1ZGluZyB3aGlsZSBpbiBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjdGl2ZSA9IHJlZihmYWxzZSlcblxuICAvLyBzaG93aW5nICYgbm90IGluIGFueSBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjY2Vzc2libGUgPSByZWYoZmFsc2UpXG5cbiAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0YWxJc0FjdGl2ZSxcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZSxcblxuICAgICAgc2hvd1BvcnRhbDogbm9vcCxcbiAgICAgIGhpZGVQb3J0YWw6IG5vb3AsXG4gICAgICByZW5kZXJQb3J0YWw6IG5vb3BcbiAgICB9XG4gIH1cblxuICBsZXQgcG9ydGFsRWwgPSBudWxsXG4gIGNvbnN0IGZvY3VzT2JqID0ge31cbiAgY29uc3Qgb25HbG9iYWxEaWFsb2cgPSB0eXBlID09PSAnZGlhbG9nJyAmJiBpc09uR2xvYmFsRGlhbG9nKHZtKVxuXG4gIGZ1bmN0aW9uIHNob3dQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBpZiAoaXNSZWFkeSA9PT0gdHJ1ZSkge1xuICAgICAgcmVtb3ZlRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAocG9ydGFsSXNBY3RpdmUudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBpZiAob25HbG9iYWxEaWFsb2cgPT09IGZhbHNlICYmIHBvcnRhbEVsID09PSBudWxsKSB7XG4gICAgICAgIHBvcnRhbEVsID0gY3JlYXRlR2xvYmFsTm9kZShmYWxzZSwgdHlwZSlcbiAgICAgIH1cblxuICAgICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPSB0cnVlXG5cbiAgICAgIC8vIHJlZ2lzdGVyIHBvcnRhbFxuICAgICAgcG9ydGFsUHJveHlMaXN0LnB1c2godm0ucHJveHkpXG5cbiAgICAgIGFkZEZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZVBvcnRhbCAoaXNSZWFkeSkge1xuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAoaXNSZWFkeSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICByZW1vdmVGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID0gZmFsc2VcblxuICAgIC8vIHVucmVnaXN0ZXIgcG9ydGFsXG4gICAgY29uc3QgaW5kZXggPSBwb3J0YWxQcm94eUxpc3QuaW5kZXhPZih2bS5wcm94eSlcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBwb3J0YWxQcm94eUxpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cblxuICAgIGlmIChwb3J0YWxFbCAhPT0gbnVsbCkge1xuICAgICAgcmVtb3ZlR2xvYmFsTm9kZShwb3J0YWxFbClcbiAgICAgIHBvcnRhbEVsID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG9uVW5tb3VudGVkKCgpID0+IHsgaGlkZVBvcnRhbCh0cnVlKSB9KVxuXG4gIC8vIG5lZWRlZCBmb3IgcG9ydGFsIHZtIGRldGVjdGlvblxuICB2bS5wcm94eS5fX3FQb3J0YWwgPSB0cnVlXG5cbiAgLy8gcHVibGljIHdheSBvZiBhY2Nlc3NpbmcgdGhlIHJlbmRlcmVkIGNvbnRlbnRcbiAgaW5qZWN0UHJvcCh2bS5wcm94eSwgJ2NvbnRlbnRFbCcsICgpID0+IGlubmVyUmVmLnZhbHVlKVxuXG4gIHJldHVybiB7XG4gICAgc2hvd1BvcnRhbCxcbiAgICBoaWRlUG9ydGFsLFxuXG4gICAgcG9ydGFsSXNBY3RpdmUsXG4gICAgcG9ydGFsSXNBY2Nlc3NpYmxlLFxuXG4gICAgcmVuZGVyUG9ydGFsOiAoKSA9PiAoXG4gICAgICBvbkdsb2JhbERpYWxvZyA9PT0gdHJ1ZVxuICAgICAgICA/IHJlbmRlclBvcnRhbENvbnRlbnQoKVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gWyBoKFRlbGVwb3J0LCB7IHRvOiBwb3J0YWxFbCB9LCBoKFFQb3J0YWwsIHJlbmRlclBvcnRhbENvbnRlbnQpKSBdXG4gICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUcmFuc2l0aW9uUHJvcHMgPSB7XG4gIHRyYW5zaXRpb25TaG93OiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25IaWRlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25EdXJhdGlvbjoge1xuICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkZWZhdWx0OiAzMDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGRlZmF1bHRTaG93Rm4gPSAoKSA9PiB7fSwgZGVmYXVsdEhpZGVGbiA9ICgpID0+IHt9KSB7XG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvblByb3BzOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzaG93ID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvblNob3cgfHwgZGVmYXVsdFNob3dGbigpIH1gXG4gICAgICBjb25zdCBoaWRlID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvbkhpZGUgfHwgZGVmYXVsdEhpZGVGbigpIH1gXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwcGVhcjogdHJ1ZSxcblxuICAgICAgICBlbnRlckZyb21DbGFzczogYCR7IHNob3cgfS1lbnRlci1mcm9tYCxcbiAgICAgICAgZW50ZXJBY3RpdmVDbGFzczogYCR7IHNob3cgfS1lbnRlci1hY3RpdmVgLFxuICAgICAgICBlbnRlclRvQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItdG9gLFxuXG4gICAgICAgIGxlYXZlRnJvbUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWZyb21gLFxuICAgICAgICBsZWF2ZUFjdGl2ZUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWFjdGl2ZWAsXG4gICAgICAgIGxlYXZlVG9DbGFzczogYCR7IGhpZGUgfS1sZWF2ZS10b2BcbiAgICAgIH1cbiAgICB9KSxcblxuICAgIHRyYW5zaXRpb25TdHlsZTogY29tcHV0ZWQoKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYClcbiAgfVxufVxuIiwiaW1wb3J0IHsgbmV4dFRpY2ssIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaWNrKGZuKVxuICogICAgcmVtb3ZlVGljaygpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGlja0ZuXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaWNrICgpIHtcbiAgICB0aWNrRm4gPSB2b2lkIDBcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGljaylcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpY2spXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaWNrLFxuXG4gICAgcmVnaXN0ZXJUaWNrIChmbikge1xuICAgICAgdGlja0ZuID0gZm5cblxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAodGlja0ZuID09PSBmbikge1xuICAgICAgICAgIC8vIHdlIGFsc28gY2hlY2sgaWYgVk0gaXMgZGVzdHJveWVkLCBzaW5jZSBpZiBpdFxuICAgICAgICAgIC8vIGdvdCB0byB0cmlnZ2VyIG9uZSBuZXh0VGljaygpIHdlIGNhbm5vdCBzdG9wIGl0XG4gICAgICAgICAgdm1Jc0Rlc3Ryb3llZCh2bSkgPT09IGZhbHNlICYmIHRpY2tGbigpXG4gICAgICAgICAgdGlja0ZuID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBsaXN0ZW5PcHRzIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBwb3J0YWxQcm94eUxpc3QgfSBmcm9tICcuLi9wcml2YXRlLnBvcnRhbC9wb3J0YWwuanMnXG5cbmxldCB0aW1lciA9IG51bGxcblxuY29uc3RcbiAgeyBub3RQYXNzaXZlQ2FwdHVyZSB9ID0gbGlzdGVuT3B0cyxcbiAgcmVnaXN0ZXJlZExpc3QgPSBbXVxuXG5mdW5jdGlvbiBnbG9iYWxIYW5kbGVyIChldnQpIHtcbiAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIHRpbWVyID0gbnVsbFxuICB9XG5cbiAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuXG4gIGlmIChcbiAgICB0YXJnZXQgPT09IHZvaWQgMFxuICAgIHx8IHRhcmdldC5ub2RlVHlwZSA9PT0gOFxuICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25vLXBvaW50ZXItZXZlbnRzJykgPT09IHRydWVcbiAgKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBjaGVjayBsYXN0IHBvcnRhbCB2bSBpZiBpdCdzXG4gIC8vIGEgUURpYWxvZyBhbmQgbm90IGluIHNlYW1sZXNzIG1vZGVcbiAgbGV0IHBvcnRhbEluZGV4ID0gcG9ydGFsUHJveHlMaXN0Lmxlbmd0aCAtIDFcblxuICB3aGlsZSAocG9ydGFsSW5kZXggPj0gMCkge1xuICAgIGNvbnN0IHByb3h5ID0gcG9ydGFsUHJveHlMaXN0WyBwb3J0YWxJbmRleCBdLiRcblxuICAgIC8vIHNraXAgUVRvb2x0aXAgcG9ydGFsc1xuICAgIGlmIChwcm94eS50eXBlLm5hbWUgPT09ICdRVG9vbHRpcCcpIHtcbiAgICAgIHBvcnRhbEluZGV4LS1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKHByb3h5LnR5cGUubmFtZSAhPT0gJ1FEaWFsb2cnKSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGlmIChwcm94eS5wcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcG9ydGFsSW5kZXgtLVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3Qgc3RhdGUgPSByZWdpc3RlcmVkTGlzdFsgaSBdXG5cbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIHN0YXRlLmFuY2hvckVsLnZhbHVlID09PSBudWxsXG4gICAgICAgIHx8IHN0YXRlLmFuY2hvckVsLnZhbHVlLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlXG4gICAgICApXG4gICAgICAmJiAoXG4gICAgICAgIHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgICAgICB8fCAoXG4gICAgICAgICAgc3RhdGUuaW5uZXJSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBzdGF0ZS5pbm5lclJlZi52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICApXG4gICAgKSB7XG4gICAgICAvLyBtYXJrIHRoZSBldmVudCBhcyBiZWluZyBwcm9jZXNzZWQgYnkgY2xpY2tPdXRzaWRlXG4gICAgICAvLyB1c2VkIHRvIHByZXZlbnQgcmVmb2N1cyBhZnRlciBtZW51IGNsb3NlXG4gICAgICBldnQucUNsaWNrT3V0c2lkZSA9IHRydWVcbiAgICAgIHN0YXRlLm9uQ2xpY2tPdXRzaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsaWNrT3V0c2lkZSAoY2xpY2tPdXRzaWRlUHJvcHMpIHtcbiAgcmVnaXN0ZXJlZExpc3QucHVzaChjbGlja091dHNpZGVQcm9wcylcblxuICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIGNvbnN0IGluZGV4ID0gcmVnaXN0ZXJlZExpc3QuZmluZEluZGV4KGggPT4gaCA9PT0gY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJlZ2lzdGVyZWRMaXN0LnNwbGljZShpbmRleCwgMSlcblxuICAgIGlmIChyZWdpc3RlcmVkTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi4vc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmxldCB2cExlZnQsIHZwVG9wXG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVBvc2l0aW9uIChwb3MpIHtcbiAgY29uc3QgcGFydHMgPSBwb3Muc3BsaXQoJyAnKVxuICBpZiAocGFydHMubGVuZ3RoICE9PSAyKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKFsgJ3RvcCcsICdjZW50ZXInLCAnYm90dG9tJyBdLmluY2x1ZGVzKHBhcnRzWyAwIF0pICE9PSB0cnVlKSB7XG4gICAgY29uc29sZS5lcnJvcignQW5jaG9yL1NlbGYgcG9zaXRpb24gbXVzdCBzdGFydCB3aXRoIG9uZSBvZiB0b3AvY2VudGVyL2JvdHRvbScpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKFsgJ2xlZnQnLCAnbWlkZGxlJywgJ3JpZ2h0JywgJ3N0YXJ0JywgJ2VuZCcgXS5pbmNsdWRlcyhwYXJ0c1sgMSBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3QgZW5kIHdpdGggb25lIG9mIGxlZnQvbWlkZGxlL3JpZ2h0L3N0YXJ0L2VuZCcpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlT2Zmc2V0ICh2YWwpIHtcbiAgaWYgKCF2YWwpIHsgcmV0dXJuIHRydWUgfVxuICBpZiAodmFsLmxlbmd0aCAhPT0gMikgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAodHlwZW9mIHZhbFsgMCBdICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsWyAxIF0gIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgaG9yaXpvbnRhbFBvcyA9IHtcbiAgJ3N0YXJ0I2x0cic6ICdsZWZ0JyxcbiAgJ3N0YXJ0I3J0bCc6ICdyaWdodCcsXG4gICdlbmQjbHRyJzogJ3JpZ2h0JyxcbiAgJ2VuZCNydGwnOiAnbGVmdCdcbn1cblxuO1sgJ2xlZnQnLCAnbWlkZGxlJywgJ3JpZ2h0JyBdLmZvckVhY2gocG9zID0+IHtcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I2x0cmAgXSA9IHBvc1xuICBob3Jpem9udGFsUG9zWyBgJHsgcG9zIH0jcnRsYCBdID0gcG9zXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQb3NpdGlvbiAocG9zLCBydGwpIHtcbiAgY29uc3QgcGFydHMgPSBwb3Muc3BsaXQoJyAnKVxuICByZXR1cm4ge1xuICAgIHZlcnRpY2FsOiBwYXJ0c1sgMCBdLFxuICAgIGhvcml6b250YWw6IGhvcml6b250YWxQb3NbIGAkeyBwYXJ0c1sgMSBdIH0jJHsgcnRsID09PSB0cnVlID8gJ3J0bCcgOiAnbHRyJyB9YCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuY2hvclByb3BzIChlbCwgb2Zmc2V0KSB7XG4gIGxldCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICBpZiAob2Zmc2V0ICE9PSB2b2lkIDApIHtcbiAgICB0b3AgLT0gb2Zmc2V0WyAxIF1cbiAgICBsZWZ0IC09IG9mZnNldFsgMCBdXG4gICAgYm90dG9tICs9IG9mZnNldFsgMSBdXG4gICAgcmlnaHQgKz0gb2Zmc2V0WyAwIF1cblxuICAgIHdpZHRoICs9IG9mZnNldFsgMCBdXG4gICAgaGVpZ2h0ICs9IG9mZnNldFsgMSBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcCwgYm90dG9tLCBoZWlnaHQsXG4gICAgbGVmdCwgcmlnaHQsIHdpZHRoLFxuICAgIG1pZGRsZTogbGVmdCArIChyaWdodCAtIGxlZnQpIC8gMixcbiAgICBjZW50ZXI6IHRvcCArIChib3R0b20gLSB0b3ApIC8gMlxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFic29sdXRlQW5jaG9yUHJvcHMgKGVsLCBhYnNvbHV0ZU9mZnNldCwgb2Zmc2V0KSB7XG4gIGxldCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICB0b3AgKz0gYWJzb2x1dGVPZmZzZXQudG9wXG4gIGxlZnQgKz0gYWJzb2x1dGVPZmZzZXQubGVmdFxuXG4gIGlmIChvZmZzZXQgIT09IHZvaWQgMCkge1xuICAgIHRvcCArPSBvZmZzZXRbIDEgXVxuICAgIGxlZnQgKz0gb2Zmc2V0WyAwIF1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wLCBib3R0b206IHRvcCArIDEsIGhlaWdodDogMSxcbiAgICBsZWZ0LCByaWdodDogbGVmdCArIDEsIHdpZHRoOiAxLFxuICAgIG1pZGRsZTogbGVmdCxcbiAgICBjZW50ZXI6IHRvcFxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRhcmdldFByb3BzICh3aWR0aCwgaGVpZ2h0KSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiAwLFxuICAgIGNlbnRlcjogaGVpZ2h0IC8gMixcbiAgICBib3R0b206IGhlaWdodCxcbiAgICBsZWZ0OiAwLFxuICAgIG1pZGRsZTogd2lkdGggLyAyLFxuICAgIHJpZ2h0OiB3aWR0aFxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRvcExlZnRQcm9wcyAoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4udmVydGljYWwgXSAtIHRhcmdldFByb3BzWyBzZWxmT3JpZ2luLnZlcnRpY2FsIF0sXG4gICAgbGVmdDogYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gLSB0YXJnZXRQcm9wc1sgc2VsZk9yaWdpbi5ob3Jpem9udGFsIF1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0UG9zaXRpb24gKGNmZywgcmV0cnlOdW1iZXIgPSAwKSB7XG4gIGlmIChcbiAgICBjZmcudGFyZ2V0RWwgPT09IG51bGxcbiAgICB8fCBjZmcuYW5jaG9yRWwgPT09IG51bGxcbiAgICB8fCByZXRyeU51bWJlciA+IDUgLy8gd2Ugc2hvdWxkIHRyeSBvbmx5IGEgZmV3IHRpbWVzXG4gICkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gc29tZSBicm93c2VycyByZXBvcnQgemVybyBoZWlnaHQgb3Igd2lkdGggYmVjYXVzZVxuICAvLyB3ZSBhcmUgdHJ5aW5nIHRvbyBlYXJseSB0byBnZXQgdGhlc2UgZGltZW5zaW9uc1xuICBpZiAoY2ZnLnRhcmdldEVsLm9mZnNldEhlaWdodCA9PT0gMCB8fCBjZmcudGFyZ2V0RWwub2Zmc2V0V2lkdGggPT09IDApIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFBvc2l0aW9uKGNmZywgcmV0cnlOdW1iZXIgKyAxKVxuICAgIH0sIDEwKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3Qge1xuICAgIHRhcmdldEVsLFxuICAgIG9mZnNldCxcbiAgICBhbmNob3JFbCxcbiAgICBhbmNob3JPcmlnaW4sXG4gICAgc2VsZk9yaWdpbixcbiAgICBhYnNvbHV0ZU9mZnNldCxcbiAgICBmaXQsXG4gICAgY292ZXIsXG4gICAgbWF4SGVpZ2h0LFxuICAgIG1heFdpZHRoXG4gIH0gPSBjZmdcblxuICBpZiAoY2xpZW50LmlzLmlvcyA9PT0gdHJ1ZSAmJiB3aW5kb3cudmlzdWFsVmlld3BvcnQgIT09IHZvaWQgMCkge1xuICAgIC8vIHVzZXMgdGhlIHEtcG9zaXRpb24tZW5naW5lIENTUyBjbGFzc1xuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5LnN0eWxlXG4gICAgY29uc3QgeyBvZmZzZXRMZWZ0OiBsZWZ0LCBvZmZzZXRUb3A6IHRvcCB9ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0XG5cbiAgICBpZiAobGVmdCAhPT0gdnBMZWZ0KSB7XG4gICAgICBlbC5zZXRQcm9wZXJ0eSgnLS1xLXBlLWxlZnQnLCBsZWZ0ICsgJ3B4JylcbiAgICAgIHZwTGVmdCA9IGxlZnRcbiAgICB9XG4gICAgaWYgKHRvcCAhPT0gdnBUb3ApIHtcbiAgICAgIGVsLnNldFByb3BlcnR5KCctLXEtcGUtdG9wJywgdG9wICsgJ3B4JylcbiAgICAgIHZwVG9wID0gdG9wXG4gICAgfVxuICB9XG5cbiAgLy8gc2Nyb2xsIHBvc2l0aW9uIG1pZ2h0IGNoYW5nZVxuICAvLyBpZiBtYXgtaGVpZ2h0Ly13aWR0aCBjaGFuZ2VzLCBzbyB3ZVxuICAvLyBuZWVkIHRvIHJlc3RvcmUgaXQgYWZ0ZXIgd2UgY2FsY3VsYXRlXG4gIC8vIHRoZSBuZXcgcG9zaXRpb25pbmdcbiAgY29uc3QgeyBzY3JvbGxMZWZ0LCBzY3JvbGxUb3AgfSA9IHRhcmdldEVsXG5cbiAgY29uc3QgYW5jaG9yUHJvcHMgPSBhYnNvbHV0ZU9mZnNldCA9PT0gdm9pZCAwXG4gICAgPyBnZXRBbmNob3JQcm9wcyhhbmNob3JFbCwgY292ZXIgPT09IHRydWUgPyBbIDAsIDAgXSA6IG9mZnNldClcbiAgICA6IGdldEFic29sdXRlQW5jaG9yUHJvcHMoYW5jaG9yRWwsIGFic29sdXRlT2Zmc2V0LCBvZmZzZXQpXG5cbiAgLy8gd2UgXCJyZXNldFwiIHRoZSBjcml0aWNhbCBDU1MgcHJvcGVydGllc1xuICAvLyBzbyB3ZSBjYW4gdGFrZSBhbiBhY2N1cmF0ZSBtZWFzdXJlbWVudFxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCB7XG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgbWluV2lkdGg6IG51bGwsXG4gICAgbWluSGVpZ2h0OiBudWxsLFxuICAgIG1heFdpZHRoOiBtYXhXaWR0aCB8fCAnMTAwdncnLFxuICAgIG1heEhlaWdodDogbWF4SGVpZ2h0IHx8ICcxMDB2aCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnXG4gIH0pXG5cbiAgY29uc3QgeyBvZmZzZXRXaWR0aDogb3JpZ0VsV2lkdGgsIG9mZnNldEhlaWdodDogb3JpZ0VsSGVpZ2h0IH0gPSB0YXJnZXRFbFxuICBjb25zdCB7IGVsV2lkdGgsIGVsSGVpZ2h0IH0gPSBmaXQgPT09IHRydWUgfHwgY292ZXIgPT09IHRydWVcbiAgICA/IHsgZWxXaWR0aDogTWF0aC5tYXgoYW5jaG9yUHJvcHMud2lkdGgsIG9yaWdFbFdpZHRoKSwgZWxIZWlnaHQ6IGNvdmVyID09PSB0cnVlID8gTWF0aC5tYXgoYW5jaG9yUHJvcHMuaGVpZ2h0LCBvcmlnRWxIZWlnaHQpIDogb3JpZ0VsSGVpZ2h0IH1cbiAgICA6IHsgZWxXaWR0aDogb3JpZ0VsV2lkdGgsIGVsSGVpZ2h0OiBvcmlnRWxIZWlnaHQgfVxuXG4gIGxldCBlbFN0eWxlID0geyBtYXhXaWR0aCwgbWF4SGVpZ2h0IH1cblxuICBpZiAoZml0ID09PSB0cnVlIHx8IGNvdmVyID09PSB0cnVlKSB7XG4gICAgZWxTdHlsZS5taW5XaWR0aCA9IGFuY2hvclByb3BzLndpZHRoICsgJ3B4J1xuICAgIGlmIChjb3ZlciA9PT0gdHJ1ZSkge1xuICAgICAgZWxTdHlsZS5taW5IZWlnaHQgPSBhbmNob3JQcm9wcy5oZWlnaHQgKyAncHgnXG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbih0YXJnZXRFbC5zdHlsZSwgZWxTdHlsZSlcblxuICBjb25zdCB0YXJnZXRQcm9wcyA9IGdldFRhcmdldFByb3BzKGVsV2lkdGgsIGVsSGVpZ2h0KVxuICBsZXQgcHJvcHMgPSBnZXRUb3BMZWZ0UHJvcHMoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG5cbiAgaWYgKGFic29sdXRlT2Zmc2V0ID09PSB2b2lkIDAgfHwgb2Zmc2V0ID09PSB2b2lkIDApIHtcbiAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuICB9XG4gIGVsc2UgeyAvLyB3ZSBoYXZlIHRvdWNoIHBvc2l0aW9uIG9yIGNvbnRleHQgbWVudSB3aXRoIG9mZnNldFxuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBwcm9wcyAvLyBjYWNoZSBpbml0aWFsIHZhbHVlc1xuXG4gICAgLy8gYXBwbHkgaW5pdGlhbCBib3VuZGFyaWVzXG4gICAgYXBwbHlCb3VuZGFyaWVzKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcblxuICAgIGxldCBoYXNDaGFuZ2VkID0gZmFsc2VcblxuICAgIC8vIGRpZCBpdCBmbGlwIHZlcnRpY2FsbHk/XG4gICAgaWYgKHByb3BzLnRvcCAhPT0gdG9wKSB7XG4gICAgICBoYXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgY29uc3Qgb2Zmc2V0WSA9IDIgKiBvZmZzZXRbIDEgXVxuICAgICAgYW5jaG9yUHJvcHMuY2VudGVyID0gYW5jaG9yUHJvcHMudG9wIC09IG9mZnNldFlcbiAgICAgIGFuY2hvclByb3BzLmJvdHRvbSAtPSBvZmZzZXRZICsgMlxuICAgIH1cblxuICAgIC8vIGRpZCBpdCBmbGlwIGhvcml6b250YWxseT9cbiAgICBpZiAocHJvcHMubGVmdCAhPT0gbGVmdCkge1xuICAgICAgaGFzQ2hhbmdlZCA9IHRydWVcbiAgICAgIGNvbnN0IG9mZnNldFggPSAyICogb2Zmc2V0WyAwIF1cbiAgICAgIGFuY2hvclByb3BzLm1pZGRsZSA9IGFuY2hvclByb3BzLmxlZnQgLT0gb2Zmc2V0WFxuICAgICAgYW5jaG9yUHJvcHMucmlnaHQgLT0gb2Zmc2V0WCArIDJcbiAgICB9XG5cbiAgICBpZiAoaGFzQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gcmUtY2FsY3VsYXRlIHByb3BzIHdpdGggdGhlIG5ldyBhbmNob3JcbiAgICAgIHByb3BzID0gZ2V0VG9wTGVmdFByb3BzKGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuXG4gICAgICAvLyBhbmQgcmUtYXBwbHkgYm91bmRhcmllc1xuICAgICAgYXBwbHlCb3VuZGFyaWVzKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcbiAgICB9XG4gIH1cblxuICBlbFN0eWxlID0ge1xuICAgIHRvcDogcHJvcHMudG9wICsgJ3B4JyxcbiAgICBsZWZ0OiBwcm9wcy5sZWZ0ICsgJ3B4J1xuICB9XG5cbiAgaWYgKHByb3BzLm1heEhlaWdodCAhPT0gdm9pZCAwKSB7XG4gICAgZWxTdHlsZS5tYXhIZWlnaHQgPSBwcm9wcy5tYXhIZWlnaHQgKyAncHgnXG5cbiAgICBpZiAoYW5jaG9yUHJvcHMuaGVpZ2h0ID4gcHJvcHMubWF4SGVpZ2h0KSB7XG4gICAgICBlbFN0eWxlLm1pbkhlaWdodCA9IGVsU3R5bGUubWF4SGVpZ2h0XG4gICAgfVxuICB9XG4gIGlmIChwcm9wcy5tYXhXaWR0aCAhPT0gdm9pZCAwKSB7XG4gICAgZWxTdHlsZS5tYXhXaWR0aCA9IHByb3BzLm1heFdpZHRoICsgJ3B4J1xuXG4gICAgaWYgKGFuY2hvclByb3BzLndpZHRoID4gcHJvcHMubWF4V2lkdGgpIHtcbiAgICAgIGVsU3R5bGUubWluV2lkdGggPSBlbFN0eWxlLm1heFdpZHRoXG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbih0YXJnZXRFbC5zdHlsZSwgZWxTdHlsZSlcblxuICAvLyByZXN0b3JlIHNjcm9sbCBwb3NpdGlvblxuICBpZiAodGFyZ2V0RWwuc2Nyb2xsVG9wICE9PSBzY3JvbGxUb3ApIHtcbiAgICB0YXJnZXRFbC5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcbiAgfVxuICBpZiAodGFyZ2V0RWwuc2Nyb2xsTGVmdCAhPT0gc2Nyb2xsTGVmdCkge1xuICAgIHRhcmdldEVsLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlCb3VuZGFyaWVzIChwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pIHtcbiAgY29uc3RcbiAgICBjdXJyZW50SGVpZ2h0ID0gdGFyZ2V0UHJvcHMuYm90dG9tLFxuICAgIGN1cnJlbnRXaWR0aCA9IHRhcmdldFByb3BzLnJpZ2h0LFxuICAgIG1hcmdpbiA9IGdldFNjcm9sbGJhcldpZHRoKCksXG4gICAgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBtYXJnaW4sXG4gICAgaW5uZXJXaWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGhcblxuICBpZiAocHJvcHMudG9wIDwgMCB8fCBwcm9wcy50b3AgKyBjdXJyZW50SGVpZ2h0ID4gaW5uZXJIZWlnaHQpIHtcbiAgICBpZiAoc2VsZk9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIHByb3BzLnRvcCA9IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4udmVydGljYWwgXSA+IGlubmVySGVpZ2h0IC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVySGVpZ2h0IC0gY3VycmVudEhlaWdodClcbiAgICAgICAgOiAwXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBpbm5lckhlaWdodClcbiAgICB9XG4gICAgZWxzZSBpZiAoYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JZID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVySGVpZ2h0LFxuICAgICAgICBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgICAgPyBhbmNob3JQcm9wcy5jZW50ZXJcbiAgICAgICAgICA6IChhbmNob3JPcmlnaW4udmVydGljYWwgPT09IHNlbGZPcmlnaW4udmVydGljYWwgPyBhbmNob3JQcm9wcy5ib3R0b20gOiBhbmNob3JQcm9wcy50b3ApXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBhbmNob3JZKVxuICAgICAgcHJvcHMudG9wID0gTWF0aC5tYXgoMCwgYW5jaG9yWSAtIGN1cnJlbnRIZWlnaHQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcHJvcHMudG9wID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJ1xuICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICA6IChhbmNob3JPcmlnaW4udmVydGljYWwgPT09IHNlbGZPcmlnaW4udmVydGljYWwgPyBhbmNob3JQcm9wcy50b3AgOiBhbmNob3JQcm9wcy5ib3R0b20pXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBpbm5lckhlaWdodCAtIHByb3BzLnRvcClcbiAgICB9XG4gIH1cblxuICBpZiAocHJvcHMubGVmdCA8IDAgfHwgcHJvcHMubGVmdCArIGN1cnJlbnRXaWR0aCA+IGlubmVyV2lkdGgpIHtcbiAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aClcbiAgICBpZiAoc2VsZk9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJykge1xuICAgICAgcHJvcHMubGVmdCA9IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdID4gaW5uZXJXaWR0aCAvIDJcbiAgICAgICAgPyBNYXRoLm1heCgwLCBpbm5lcldpZHRoIC0gY3VycmVudFdpZHRoKVxuICAgICAgICA6IDBcbiAgICB9XG4gICAgZWxzZSBpZiAoYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMikge1xuICAgICAgY29uc3QgYW5jaG9yWCA9IE1hdGgubWluKFxuICAgICAgICBpbm5lcldpZHRoLFxuICAgICAgICBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gJ21pZGRsZSdcbiAgICAgICAgICA/IGFuY2hvclByb3BzLm1pZGRsZVxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5yaWdodCA6IGFuY2hvclByb3BzLmxlZnQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgYW5jaG9yWClcbiAgICAgIHByb3BzLmxlZnQgPSBNYXRoLm1heCgwLCBhbmNob3JYIC0gcHJvcHMubWF4V2lkdGgpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICA/IGFuY2hvclByb3BzLm1pZGRsZVxuICAgICAgICA6IChhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gc2VsZk9yaWdpbi5ob3Jpem9udGFsID8gYW5jaG9yUHJvcHMubGVmdCA6IGFuY2hvclByb3BzLnJpZ2h0KVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4V2lkdGggPSBNYXRoLm1pbihjdXJyZW50V2lkdGgsIGlubmVyV2lkdGggLSBwcm9wcy5sZWZ0KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgVHJhbnNpdGlvbiwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQW5jaG9yLCB7IHVzZUFuY2hvclN0YXRpY1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtYW5jaG9yL3VzZS1hbmNob3IuanMnXG5pbXBvcnQgdXNlU2Nyb2xsVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNjcm9sbC10YXJnZXQvdXNlLXNjcm9sbC10YXJnZXQuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLW1vZGVsLXRvZ2dsZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuaW1wb3J0IHVzZVBvcnRhbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wb3J0YWwvdXNlLXBvcnRhbC5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGljay91c2UtdGljay5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0L3VzZS10aW1lb3V0LmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQsIHNjcm9sbFRhcmdldFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQsIGFkZEV2dCwgY2xlYW5FdnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBhZGRDbGlja091dHNpZGUsIHJlbW92ZUNsaWNrT3V0c2lkZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLmpzJ1xuaW1wb3J0IHtcbiAgdmFsaWRhdGVQb3NpdGlvbiwgdmFsaWRhdGVPZmZzZXQsIHNldFBvc2l0aW9uLCBwYXJzZVBvc2l0aW9uXG59IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucG9zaXRpb24tZW5naW5lL3Bvc2l0aW9uLWVuZ2luZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUb29sdGlwJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQW5jaG9yU3RhdGljUHJvcHMsXG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICBtYXhIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIG1heFdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIHRyYW5zaXRpb25TaG93OiB7XG4gICAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMudHJhbnNpdGlvblNob3csXG4gICAgICBkZWZhdWx0OiAnanVtcC1kb3duJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbkhpZGU6IHtcbiAgICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgIGRlZmF1bHQ6ICdqdW1wLXVwJ1xuICAgIH0sXG5cbiAgICBhbmNob3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdib3R0b20gbWlkZGxlJyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgc2VsZjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RvcCBtaWRkbGUnLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gWyAxNCwgMTQgXSxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVPZmZzZXRcbiAgICB9LFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiBzY3JvbGxUYXJnZXRQcm9wLFxuXG4gICAgZGVsYXk6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgaGlkZURlbGF5OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHNcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQsIGF0dHJzIH0pIHtcbiAgICBsZXQgdW53YXRjaFBvc2l0aW9uLCBvYnNlcnZlclxuXG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGFuY2hvck9yaWdpbiA9IGNvbXB1dGVkKCgpID0+IHBhcnNlUG9zaXRpb24ocHJvcHMuYW5jaG9yLCAkcS5sYW5nLnJ0bCkpXG4gICAgY29uc3Qgc2VsZk9yaWdpbiA9IGNvbXB1dGVkKCgpID0+IHBhcnNlUG9zaXRpb24ocHJvcHMuc2VsZiwgJHEubGFuZy5ydGwpKVxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSlcblxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyB0cmFuc2l0aW9uUHJvcHMsIHRyYW5zaXRpb25TdHlsZSB9ID0gdXNlVHJhbnNpdGlvbihwcm9wcylcbiAgICBjb25zdCB7IGxvY2FsU2Nyb2xsVGFyZ2V0LCBjaGFuZ2VTY3JvbGxFdmVudCwgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgfSA9IHVzZVNjcm9sbFRhcmdldChwcm9wcywgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KVxuXG4gICAgY29uc3QgeyBhbmNob3JFbCwgY2FuU2hvdywgYW5jaG9yRXZlbnRzIH0gPSB1c2VBbmNob3IoeyBzaG93aW5nLCBjb25maWd1cmVBbmNob3JFbCB9KVxuXG4gICAgY29uc3QgeyBzaG93LCBoaWRlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLCBjYW5TaG93LCBoYW5kbGVTaG93LCBoYW5kbGVIaWRlLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2UsXG4gICAgICBwcm9jZXNzT25Nb3VudDogdHJ1ZVxuICAgIH0pXG5cbiAgICBPYmplY3QuYXNzaWduKGFuY2hvckV2ZW50cywgeyBkZWxheVNob3csIGRlbGF5SGlkZSB9KVxuXG4gICAgY29uc3QgeyBzaG93UG9ydGFsLCBoaWRlUG9ydGFsLCByZW5kZXJQb3J0YWwgfSA9IHVzZVBvcnRhbCh2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQsICd0b29sdGlwJylcblxuICAgIC8vIGlmIHdlJ3JlIG9uIG1vYmlsZSwgbGV0J3MgaW1wcm92ZSB0aGUgZXhwZXJpZW5jZVxuICAgIC8vIGJ5IGNsb3NpbmcgaXQgd2hlbiB1c2VyIHRhcHMgb3V0c2lkZSBvZiBpdFxuICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGNsaWNrT3V0c2lkZVByb3BzID0ge1xuICAgICAgICBhbmNob3JFbCxcbiAgICAgICAgaW5uZXJSZWYsXG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlIChlKSB7XG4gICAgICAgICAgaGlkZShlKVxuXG4gICAgICAgICAgLy8gcHJldmVudCBjbGljayBpZiBpdCdzIG9uIGEgZGlhbG9nIGJhY2tkcm9wXG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncS1kaWFsb2dfX2JhY2tkcm9wJykpIHtcbiAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoYXNDbGlja091dHNpZGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgICAvLyBpdCBkb2Vzbid0IGhhcyBleHRlcm5hbCBtb2RlbFxuICAgICAgICAvLyAobnVsbCBpcyB0aGUgZGVmYXVsdCB2YWx1ZSlcbiAgICAgICAgcHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbFxuICAgICAgICAvLyBhbmQgaXQncyBub3QgcGVyc2lzdGVudFxuICAgICAgICAmJiBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgIClcblxuICAgICAgd2F0Y2goaGFzQ2xpY2tPdXRzaWRlLCB2YWwgPT4ge1xuICAgICAgICBjb25zdCBmbiA9IHZhbCA9PT0gdHJ1ZSA/IGFkZENsaWNrT3V0c2lkZSA6IHJlbW92ZUNsaWNrT3V0c2lkZVxuICAgICAgICBmbihjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH0pXG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICBzaG93UG9ydGFsKClcblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpY2soKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaWNrKCgpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB1cGRhdGVQb3NpdGlvbigpKVxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGlubmVyUmVmLnZhbHVlLCB7IGF0dHJpYnV0ZXM6IGZhbHNlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIHN1YnRyZWU6IHRydWUgfSlcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgfSlcblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHdhdGNoKFxuICAgICAgICAgICgpID0+ICRxLnNjcmVlbi53aWR0aCArICd8JyArICRxLnNjcmVlbi5oZWlnaHQgKyAnfCcgKyBwcm9wcy5zZWxmICsgJ3wnICsgcHJvcHMuYW5jaG9yICsgJ3wnICsgJHEubGFuZy5ydGwsXG4gICAgICAgICAgdXBkYXRlUG9zaXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzaG93UG9ydGFsKHRydWUpIC8vIGRvbmUgc2hvd2luZyBwb3J0YWxcbiAgICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQpIHtcbiAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgaGlkZVBvcnRhbCgpXG5cbiAgICAgIGFuY2hvckNsZWFudXAoKVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuY2hvckNsZWFudXAgKCkge1xuICAgICAgaWYgKG9ic2VydmVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAgIG9ic2VydmVyID0gdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGlmICh1bndhdGNoUG9zaXRpb24gIT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUG9zaXRpb24oKVxuICAgICAgICB1bndhdGNoUG9zaXRpb24gPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY2xlYW5FdnQoYW5jaG9yRXZlbnRzLCAndG9vbHRpcFRlbXAnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgIHNldFBvc2l0aW9uKHtcbiAgICAgICAgdGFyZ2V0RWw6IGlubmVyUmVmLnZhbHVlLFxuICAgICAgICBvZmZzZXQ6IHByb3BzLm9mZnNldCxcbiAgICAgICAgYW5jaG9yRWw6IGFuY2hvckVsLnZhbHVlLFxuICAgICAgICBhbmNob3JPcmlnaW46IGFuY2hvck9yaWdpbi52YWx1ZSxcbiAgICAgICAgc2VsZk9yaWdpbjogc2VsZk9yaWdpbi52YWx1ZSxcbiAgICAgICAgbWF4SGVpZ2h0OiBwcm9wcy5tYXhIZWlnaHQsXG4gICAgICAgIG1heFdpZHRoOiBwcm9wcy5tYXhXaWR0aFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxheVNob3cgKGV2dCkge1xuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGFuY2hvckVsLnZhbHVlXG4gICAgICAgIGNvbnN0IGV2dHMgPSBbICd0b3VjaG1vdmUnLCAndG91Y2hjYW5jZWwnLCAndG91Y2hlbmQnLCAnY2xpY2snIF1cbiAgICAgICAgICAubWFwKGUgPT4gKFsgdGFyZ2V0LCBlLCAnZGVsYXlIaWRlJywgJ3Bhc3NpdmVDYXB0dXJlJyBdKSlcblxuICAgICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAndG9vbHRpcFRlbXAnLCBldnRzKVxuICAgICAgfVxuXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4geyBzaG93KGV2dCkgfSwgcHJvcHMuZGVsYXkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsYXlIaWRlIChldnQpIHtcbiAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgY2xlYW5FdnQoYW5jaG9yRXZlbnRzLCAndG9vbHRpcFRlbXAnKVxuICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIC8vIGRlbGF5IG5lZWRlZCBvdGhlcndpc2Ugc2VsZWN0aW9uIHN0aWxsIG9jY3Vyc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgfSwgMTApXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7IGhpZGUoZXZ0KSB9LCBwcm9wcy5oaWRlRGVsYXkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlQW5jaG9yRWwgKCkge1xuICAgICAgaWYgKHByb3BzLm5vUGFyZW50RXZlbnQgPT09IHRydWUgfHwgYW5jaG9yRWwudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBjb25zdCBldnRzID0gJHEucGxhdGZvcm0uaXMubW9iaWxlID09PSB0cnVlXG4gICAgICAgID8gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnZGVsYXlTaG93JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIDogW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZW50ZXInLCAnZGVsYXlTaG93JywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnbW91c2VsZWF2ZScsICdkZWxheUhpZGUnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cblxuICAgICAgYWRkRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicsIGV2dHMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChhbmNob3JFbC52YWx1ZSAhPT0gbnVsbCB8fCBwcm9wcy5zY3JvbGxUYXJnZXQgIT09IHZvaWQgMCkge1xuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSA9IGdldFNjcm9sbFRhcmdldChhbmNob3JFbC52YWx1ZSwgcHJvcHMuc2Nyb2xsVGFyZ2V0KVxuICAgICAgICBjb25zdCBmbiA9IHByb3BzLm5vUGFyZW50RXZlbnQgPT09IHRydWVcbiAgICAgICAgICA/IHVwZGF0ZVBvc2l0aW9uXG4gICAgICAgICAgOiBoaWRlXG5cbiAgICAgICAgY2hhbmdlU2Nyb2xsRXZlbnQobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUsIGZuKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRvb2x0aXBDb250ZW50ICgpIHtcbiAgICAgIHJldHVybiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICdxLXRvb2x0aXAgcS10b29sdGlwLS1zdHlsZSBxLXBvc2l0aW9uLWVuZ2luZSBuby1wb2ludGVyLWV2ZW50cycsXG4gICAgICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgICAgIF0sXG4gICAgICAgICAgc3R5bGU6IFtcbiAgICAgICAgICAgIGF0dHJzLnN0eWxlLFxuICAgICAgICAgICAgdHJhbnNpdGlvblN0eWxlLnZhbHVlXG4gICAgICAgICAgXSxcbiAgICAgICAgICByb2xlOiAndG9vbHRpcCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoVHJhbnNpdGlvbiwgdHJhbnNpdGlvblByb3BzLnZhbHVlLCBnZXRUb29sdGlwQ29udGVudClcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoYW5jaG9yQ2xlYW51cClcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHsgdXBkYXRlUG9zaXRpb24gfSlcblxuICAgIHJldHVybiByZW5kZXJQb3J0YWxcbiAgfVxufSlcbiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VTcGlubmVyLCB7IHVzZVNwaW5uZXJQcm9wcyB9IGZyb20gJy4vdXNlLXNwaW5uZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuY29uc3Qgc3ZnID0gW1xuICBoKCdnJywge1xuICAgIGZpbGw6ICdub25lJyxcbiAgICAnZmlsbC1ydWxlJzogJ2V2ZW5vZGQnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgxIDEpJyxcbiAgICAnc3Ryb2tlLXdpZHRoJzogJzInXG4gIH0sIFtcbiAgICBoKCdjaXJjbGUnLCB7XG4gICAgICBjeDogJzIyJyxcbiAgICAgIGN5OiAnMjInLFxuICAgICAgcjogJzYnXG4gICAgfSwgW1xuICAgICAgaCgnYW5pbWF0ZScsIHtcbiAgICAgICAgYXR0cmlidXRlTmFtZTogJ3InLFxuICAgICAgICBiZWdpbjogJzEuNXMnLFxuICAgICAgICBkdXI6ICczcycsXG4gICAgICAgIHZhbHVlczogJzY7MjInLFxuICAgICAgICBjYWxjTW9kZTogJ2xpbmVhcicsXG4gICAgICAgIHJlcGVhdENvdW50OiAnaW5kZWZpbml0ZSdcbiAgICAgIH0pLFxuICAgICAgaCgnYW5pbWF0ZScsIHtcbiAgICAgICAgYXR0cmlidXRlTmFtZTogJ3N0cm9rZS1vcGFjaXR5JyxcbiAgICAgICAgYmVnaW46ICcxLjVzJyxcbiAgICAgICAgZHVyOiAnM3MnLFxuICAgICAgICB2YWx1ZXM6ICcxOzAnLFxuICAgICAgICBjYWxjTW9kZTogJ2xpbmVhcicsXG4gICAgICAgIHJlcGVhdENvdW50OiAnaW5kZWZpbml0ZSdcbiAgICAgIH0pLFxuICAgICAgaCgnYW5pbWF0ZScsIHtcbiAgICAgICAgYXR0cmlidXRlTmFtZTogJ3N0cm9rZS13aWR0aCcsXG4gICAgICAgIGJlZ2luOiAnMS41cycsXG4gICAgICAgIGR1cjogJzNzJyxcbiAgICAgICAgdmFsdWVzOiAnMjswJyxcbiAgICAgICAgY2FsY01vZGU6ICdsaW5lYXInLFxuICAgICAgICByZXBlYXRDb3VudDogJ2luZGVmaW5pdGUnXG4gICAgICB9KVxuICAgIF0pLFxuICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgIGN4OiAnMjInLFxuICAgICAgY3k6ICcyMicsXG4gICAgICByOiAnNidcbiAgICB9LCBbXG4gICAgICBoKCdhbmltYXRlJywge1xuICAgICAgICBhdHRyaWJ1dGVOYW1lOiAncicsXG4gICAgICAgIGJlZ2luOiAnM3MnLFxuICAgICAgICBkdXI6ICczcycsXG4gICAgICAgIHZhbHVlczogJzY7MjInLFxuICAgICAgICBjYWxjTW9kZTogJ2xpbmVhcicsXG4gICAgICAgIHJlcGVhdENvdW50OiAnaW5kZWZpbml0ZSdcbiAgICAgIH0pLFxuICAgICAgaCgnYW5pbWF0ZScsIHtcbiAgICAgICAgYXR0cmlidXRlTmFtZTogJ3N0cm9rZS1vcGFjaXR5JyxcbiAgICAgICAgYmVnaW46ICczcycsXG4gICAgICAgIGR1cjogJzNzJyxcbiAgICAgICAgdmFsdWVzOiAnMTswJyxcbiAgICAgICAgY2FsY01vZGU6ICdsaW5lYXInLFxuICAgICAgICByZXBlYXRDb3VudDogJ2luZGVmaW5pdGUnXG4gICAgICB9KSxcbiAgICAgIGgoJ2FuaW1hdGUnLCB7XG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6ICdzdHJva2Utd2lkdGgnLFxuICAgICAgICBiZWdpbjogJzNzJyxcbiAgICAgICAgZHVyOiAnM3MnLFxuICAgICAgICB2YWx1ZXM6ICcyOzAnLFxuICAgICAgICBjYWxjTW9kZTogJ2xpbmVhcicsXG4gICAgICAgIHJlcGVhdENvdW50OiAnaW5kZWZpbml0ZSdcbiAgICAgIH0pXG4gICAgXSksXG4gICAgaCgnY2lyY2xlJywge1xuICAgICAgY3g6ICcyMicsXG4gICAgICBjeTogJzIyJyxcbiAgICAgIHI6ICc4J1xuICAgIH0sIFtcbiAgICAgIGgoJ2FuaW1hdGUnLCB7XG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6ICdyJyxcbiAgICAgICAgYmVnaW46ICcwcycsXG4gICAgICAgIGR1cjogJzEuNXMnLFxuICAgICAgICB2YWx1ZXM6ICc2OzE7MjszOzQ7NTs2JyxcbiAgICAgICAgY2FsY01vZGU6ICdsaW5lYXInLFxuICAgICAgICByZXBlYXRDb3VudDogJ2luZGVmaW5pdGUnXG4gICAgICB9KVxuICAgIF0pXG4gIF0pXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3Bpbm5lclJpbmdzJyxcblxuICBwcm9wczogdXNlU3Bpbm5lclByb3BzLFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGNvbnN0IHsgY1NpemUsIGNsYXNzZXMgfSA9IHVzZVNwaW5uZXIocHJvcHMpXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnc3ZnJywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgd2lkdGg6IGNTaXplLnZhbHVlLFxuICAgICAgaGVpZ2h0OiBjU2l6ZS52YWx1ZSxcbiAgICAgIHZpZXdCb3g6ICcwIDAgNDUgNDUnLFxuICAgICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbiAgICB9LCBzdmcpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFRvdWNoUGFuIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvdG91Y2gtcGFuL1RvdWNoUGFuLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5qZWN0IH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWZvcm0vcHJpdmF0ZS51c2UtZm9ybS5qcydcblxuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5pbXBvcnQgeyBwb3NpdGlvbiB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNOdW1iZXIsIGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMvaXMuanMnXG5pbXBvcnQgeyBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5jb25zdCBtYXJrZXJQcmVmaXhDbGFzcyA9ICdxLXNsaWRlcl9fbWFya2VyLWxhYmVscydcbmNvbnN0IGRlZmF1bHRNYXJrZXJDb252ZXJ0Rm4gPSB2ID0+ICh7IHZhbHVlOiB2IH0pXG5jb25zdCBkZWZhdWx0TWFya2VyTGFiZWxSZW5kZXJGbiA9ICh7IG1hcmtlciB9KSA9PiBoKCdkaXYnLCB7XG4gIGtleTogbWFya2VyLnZhbHVlLFxuICBzdHlsZTogbWFya2VyLnN0eWxlLFxuICBjbGFzczogbWFya2VyLmNsYXNzZXNcbn0sIG1hcmtlci5sYWJlbClcblxuLy8gUEdET1dOLCBMRUZULCBET1dOLCBQR1VQLCBSSUdIVCwgVVBcbmV4cG9ydCBjb25zdCBrZXlDb2RlcyA9IFsgMzQsIDM3LCA0MCwgMzMsIDM5LCAzOCBdXG5cbmV4cG9ydCBjb25zdCB1c2VTbGlkZXJQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgbWluOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcbiAgbWF4OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDEwMFxuICB9LFxuICBpbm5lck1pbjogTnVtYmVyLFxuICBpbm5lck1heDogTnVtYmVyLFxuXG4gIHN0ZXA6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMSxcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA+PSAwXG4gIH0sXG5cbiAgc25hcDogQm9vbGVhbixcblxuICB2ZXJ0aWNhbDogQm9vbGVhbixcbiAgcmV2ZXJzZTogQm9vbGVhbixcblxuICBjb2xvcjogU3RyaW5nLFxuICBtYXJrZXJMYWJlbHNDbGFzczogU3RyaW5nLFxuXG4gIGxhYmVsOiBCb29sZWFuLFxuICBsYWJlbENvbG9yOiBTdHJpbmcsXG4gIGxhYmVsVGV4dENvbG9yOiBTdHJpbmcsXG4gIGxhYmVsQWx3YXlzOiBCb29sZWFuLFxuICBzd2l0Y2hMYWJlbFNpZGU6IEJvb2xlYW4sXG5cbiAgbWFya2VyczogWyBCb29sZWFuLCBOdW1iZXIgXSxcbiAgbWFya2VyTGFiZWxzOiBbIEJvb2xlYW4sIEFycmF5LCBPYmplY3QsIEZ1bmN0aW9uIF0sXG4gIHN3aXRjaE1hcmtlckxhYmVsc1NpZGU6IEJvb2xlYW4sXG5cbiAgdHJhY2tJbWc6IFN0cmluZyxcbiAgdHJhY2tDb2xvcjogU3RyaW5nLFxuICBpbm5lclRyYWNrSW1nOiBTdHJpbmcsXG4gIGlubmVyVHJhY2tDb2xvcjogU3RyaW5nLFxuICBzZWxlY3Rpb25Db2xvcjogU3RyaW5nLFxuICBzZWxlY3Rpb25JbWc6IFN0cmluZyxcblxuICB0aHVtYlNpemU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJzIwcHgnXG4gIH0sXG4gIHRyYWNrU2l6ZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnNHB4J1xuICB9LFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHJlYWRvbmx5OiBCb29sZWFuLFxuICBkZW5zZTogQm9vbGVhbixcblxuICB0YWJpbmRleDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gIHRodW1iQ29sb3I6IFN0cmluZyxcbiAgdGh1bWJQYXRoOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdNIDQsIDEwIGEgNiw2IDAgMSwwIDEyLDAgYSA2LDYgMCAxLDAgLTEyLDAnXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNsaWRlckVtaXRzID0gWyAncGFuJywgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NoYW5nZScgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyB1cGRhdGVWYWx1ZSwgdXBkYXRlUG9zaXRpb24sIGdldERyYWdnaW5nLCBmb3JtQXR0cnMgfSkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBzbG90cywgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgY29uc3QgaW5qZWN0Rm9ybUlucHV0ID0gdXNlRm9ybUluamVjdChmb3JtQXR0cnMpXG5cbiAgY29uc3QgYWN0aXZlID0gcmVmKGZhbHNlKVxuICBjb25zdCBwcmV2ZW50Rm9jdXMgPSByZWYoZmFsc2UpXG4gIGNvbnN0IGZvY3VzID0gcmVmKGZhbHNlKVxuICBjb25zdCBkcmFnZ2luZyA9IHJlZihmYWxzZSlcblxuICBjb25zdCBheGlzID0gY29tcHV0ZWQoKCkgPT4gKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJy0tdicgOiAnLS1oJykpXG4gIGNvbnN0IGxhYmVsU2lkZSA9IGNvbXB1dGVkKCgpID0+ICctJyArIChwcm9wcy5zd2l0Y2hMYWJlbFNpZGUgPT09IHRydWUgPyAnc3dpdGNoZWQnIDogJ3N0YW5kYXJkJykpXG5cbiAgY29uc3QgaXNSZXZlcnNlZCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgPyBwcm9wcy5yZXZlcnNlID09PSB0cnVlXG4gICAgICA6IHByb3BzLnJldmVyc2UgIT09ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSlcbiAgKSlcblxuICBjb25zdCBpbm5lck1pbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBpc05hTihwcm9wcy5pbm5lck1pbikgPT09IHRydWUgfHwgcHJvcHMuaW5uZXJNaW4gPCBwcm9wcy5taW5cbiAgICAgID8gcHJvcHMubWluXG4gICAgICA6IHByb3BzLmlubmVyTWluXG4gICkpXG4gIGNvbnN0IGlubmVyTWF4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGlzTmFOKHByb3BzLmlubmVyTWF4KSA9PT0gdHJ1ZSB8fCBwcm9wcy5pbm5lck1heCA+IHByb3BzLm1heFxuICAgICAgPyBwcm9wcy5tYXhcbiAgICAgIDogcHJvcHMuaW5uZXJNYXhcbiAgKSlcblxuICBjb25zdCBlZGl0YWJsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlXG4gICAgJiYgaW5uZXJNaW4udmFsdWUgPCBpbm5lck1heC52YWx1ZVxuICApKVxuXG4gIGNvbnN0IHJvdW5kVmFsdWVGbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMuc3RlcCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHYgPT4gdlxuICAgIH1cblxuICAgIGNvbnN0IGRlY2ltYWxzID0gKFN0cmluZyhwcm9wcy5zdGVwKS50cmltKCkuc3BsaXQoJy4nKVsgMSBdIHx8ICcnKS5sZW5ndGhcbiAgICByZXR1cm4gdiA9PiBwYXJzZUZsb2F0KHYudG9GaXhlZChkZWNpbWFscykpXG4gIH0pXG5cbiAgY29uc3Qga2V5U3RlcCA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5zdGVwID09PSAwID8gMSA6IHByb3BzLnN0ZXApKVxuICBjb25zdCB0YWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IChlZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSA/IHByb3BzLnRhYmluZGV4IHx8IDAgOiAtMSkpXG5cbiAgY29uc3QgdHJhY2tMZW4gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5tYXggLSBwcm9wcy5taW4pXG4gIGNvbnN0IGlubmVyQmFyTGVuID0gY29tcHV0ZWQoKCkgPT4gaW5uZXJNYXgudmFsdWUgLSBpbm5lck1pbi52YWx1ZSlcblxuICBjb25zdCBpbm5lck1pblJhdGlvID0gY29tcHV0ZWQoKCkgPT4gY29udmVydE1vZGVsVG9SYXRpbyhpbm5lck1pbi52YWx1ZSkpXG4gIGNvbnN0IGlubmVyTWF4UmF0aW8gPSBjb21wdXRlZCgoKSA9PiBjb252ZXJ0TW9kZWxUb1JhdGlvKGlubmVyTWF4LnZhbHVlKSlcblxuICBjb25zdCBwb3NpdGlvblByb3AgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgID8gKGlzUmV2ZXJzZWQudmFsdWUgPT09IHRydWUgPyAnYm90dG9tJyA6ICd0b3AnKVxuICAgICAgOiAoaXNSZXZlcnNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcpXG4gICkpXG5cbiAgY29uc3Qgc2l6ZVByb3AgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnaGVpZ2h0JyA6ICd3aWR0aCcpKVxuICBjb25zdCB0aGlja25lc3NQcm9wID0gY29tcHV0ZWQoKCkgPT4gKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3dpZHRoJyA6ICdoZWlnaHQnKSlcbiAgY29uc3Qgb3JpZW50YXRpb24gPSBjb21wdXRlZCgoKSA9PiAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnKSlcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgIHJvbGU6ICdzbGlkZXInLFxuICAgICAgJ2FyaWEtdmFsdWVtaW4nOiBpbm5lck1pbi52YWx1ZSxcbiAgICAgICdhcmlhLXZhbHVlbWF4JzogaW5uZXJNYXgudmFsdWUsXG4gICAgICAnYXJpYS1vcmllbnRhdGlvbic6IG9yaWVudGF0aW9uLnZhbHVlLFxuICAgICAgJ2RhdGEtc3RlcCc6IHByb3BzLnN0ZXBcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1yZWFkb25seScgXSA9ICd0cnVlJ1xuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBgcS1zbGlkZXIgcS1zbGlkZXIkeyBheGlzLnZhbHVlIH0gcS1zbGlkZXItLSR7IGFjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJ2luJyB9YWN0aXZlIGlubGluZSBuby13cmFwIGBcbiAgICArIChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdyb3cnIDogJ2NvbHVtbicpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJyBxLXNsaWRlci0tZW5hYmxlZCcgKyAoZWRpdGFibGUudmFsdWUgPT09IHRydWUgPyAnIHEtc2xpZGVyLS1lZGl0YWJsZScgOiAnJykpXG4gICAgKyAoZm9jdXMudmFsdWUgPT09ICdib3RoJyA/ICcgcS1zbGlkZXItLWZvY3VzJyA6ICcnKVxuICAgICsgKHByb3BzLmxhYmVsIHx8IHByb3BzLmxhYmVsQWx3YXlzID09PSB0cnVlID8gJyBxLXNsaWRlci0tbGFiZWwnIDogJycpXG4gICAgKyAocHJvcHMubGFiZWxBbHdheXMgPT09IHRydWUgPyAnIHEtc2xpZGVyLS1sYWJlbC1hbHdheXMnIDogJycpXG4gICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNsaWRlci0tZGFyaycgOiAnJylcbiAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1zbGlkZXItLWRlbnNlIHEtc2xpZGVyLS1kZW5zZScgKyBheGlzLnZhbHVlIDogJycpXG4gIClcblxuICBmdW5jdGlvbiBnZXRQb3NpdGlvbkNsYXNzIChuYW1lKSB7XG4gICAgY29uc3QgY2xzID0gJ3Etc2xpZGVyX18nICsgbmFtZVxuICAgIHJldHVybiBgJHsgY2xzIH0gJHsgY2xzIH0keyBheGlzLnZhbHVlIH0gJHsgY2xzIH0keyBheGlzLnZhbHVlIH0keyBsYWJlbFNpZGUudmFsdWUgfWBcbiAgfVxuICBmdW5jdGlvbiBnZXRBeGlzQ2xhc3MgKG5hbWUpIHtcbiAgICBjb25zdCBjbHMgPSAncS1zbGlkZXJfXycgKyBuYW1lXG4gICAgcmV0dXJuIGAkeyBjbHMgfSAkeyBjbHMgfSR7IGF4aXMudmFsdWUgfWBcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdGlvbkJhckNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGNvbG9yID0gcHJvcHMuc2VsZWN0aW9uQ29sb3IgfHwgcHJvcHMuY29sb3JcbiAgICByZXR1cm4gJ3Etc2xpZGVyX19zZWxlY3Rpb24gYWJzb2x1dGUnXG4gICAgICArIChjb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IGNvbG9yIH1gIDogJycpXG4gIH0pXG4gIGNvbnN0IG1hcmtlckNsYXNzID0gY29tcHV0ZWQoKCkgPT4gZ2V0QXhpc0NsYXNzKCdtYXJrZXJzJykgKyAnIGFic29sdXRlIG92ZXJmbG93LWhpZGRlbicpXG4gIGNvbnN0IHRyYWNrQ29udGFpbmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiBnZXRBeGlzQ2xhc3MoJ3RyYWNrLWNvbnRhaW5lcicpKVxuICBjb25zdCBwaW5DbGFzcyA9IGNvbXB1dGVkKCgpID0+IGdldFBvc2l0aW9uQ2xhc3MoJ3BpbicpKVxuICBjb25zdCBsYWJlbENsYXNzID0gY29tcHV0ZWQoKCkgPT4gZ2V0UG9zaXRpb25DbGFzcygnbGFiZWwnKSlcbiAgY29uc3QgdGV4dENvbnRhaW5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT4gZ2V0UG9zaXRpb25DbGFzcygndGV4dC1jb250YWluZXInKSlcbiAgY29uc3QgbWFya2VyTGFiZWxzQ29udGFpbmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgIGdldFBvc2l0aW9uQ2xhc3MoJ21hcmtlci1sYWJlbHMtY29udGFpbmVyJylcbiAgICArIChwcm9wcy5tYXJrZXJMYWJlbHNDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5tYXJrZXJMYWJlbHNDbGFzcyB9YCA6ICcnKVxuICApXG5cbiAgY29uc3QgdHJhY2tDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3Etc2xpZGVyX190cmFjayByZWxhdGl2ZS1wb3NpdGlvbiBuby1vdXRsaW5lJ1xuICAgICsgKHByb3BzLnRyYWNrQ29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMudHJhY2tDb2xvciB9YCA6ICcnKVxuICApXG4gIGNvbnN0IHRyYWNrU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0geyBbIHRoaWNrbmVzc1Byb3AudmFsdWUgXTogcHJvcHMudHJhY2tTaXplIH1cbiAgICBpZiAocHJvcHMudHJhY2tJbWcgIT09IHZvaWQgMCkge1xuICAgICAgYWNjLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHsgcHJvcHMudHJhY2tJbWcgfSkgIWltcG9ydGFudGBcbiAgICB9XG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIGNvbnN0IGlubmVyQmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXNsaWRlcl9faW5uZXIgYWJzb2x1dGUnXG4gICAgKyAocHJvcHMuaW5uZXJUcmFja0NvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmlubmVyVHJhY2tDb2xvciB9YCA6ICcnKVxuICApXG4gIGNvbnN0IGlubmVyQmFyU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgaW5uZXJEaWZmID0gaW5uZXJNYXhSYXRpby52YWx1ZSAtIGlubmVyTWluUmF0aW8udmFsdWVcbiAgICBjb25zdCBhY2MgPSB7XG4gICAgICBbIHBvc2l0aW9uUHJvcC52YWx1ZSBdOiBgJHsgMTAwICogaW5uZXJNaW5SYXRpby52YWx1ZSB9JWAsXG4gICAgICBbIHNpemVQcm9wLnZhbHVlIF06IGlubmVyRGlmZiA9PT0gMFxuICAgICAgICA/ICcycHgnXG4gICAgICAgIDogYCR7IDEwMCAqIGlubmVyRGlmZiB9JWBcbiAgICB9XG4gICAgaWYgKHByb3BzLmlubmVyVHJhY2tJbWcgIT09IHZvaWQgMCkge1xuICAgICAgYWNjLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHsgcHJvcHMuaW5uZXJUcmFja0ltZyB9KSAhaW1wb3J0YW50YFxuICAgIH1cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgZnVuY3Rpb24gY29udmVydFJhdGlvVG9Nb2RlbCAocmF0aW8pIHtcbiAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwIH0gPSBwcm9wc1xuICAgIGxldCBtb2RlbCA9IG1pbiArIHJhdGlvICogKG1heCAtIG1pbilcblxuICAgIGlmIChzdGVwID4gMCkge1xuICAgICAgY29uc3QgbW9kdWxvID0gKG1vZGVsIC0gaW5uZXJNaW4udmFsdWUpICUgc3RlcFxuICAgICAgbW9kZWwgKz0gKE1hdGguYWJzKG1vZHVsbykgPj0gc3RlcCAvIDIgPyAobW9kdWxvIDwgMCA/IC0xIDogMSkgKiBzdGVwIDogMCkgLSBtb2R1bG9cbiAgICB9XG5cbiAgICBtb2RlbCA9IHJvdW5kVmFsdWVGbi52YWx1ZShtb2RlbClcblxuICAgIHJldHVybiBiZXR3ZWVuKG1vZGVsLCBpbm5lck1pbi52YWx1ZSwgaW5uZXJNYXgudmFsdWUpXG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0TW9kZWxUb1JhdGlvIChtb2RlbCkge1xuICAgIHJldHVybiB0cmFja0xlbi52YWx1ZSA9PT0gMFxuICAgICAgPyAwXG4gICAgICA6IChtb2RlbCAtIHByb3BzLm1pbikgLyB0cmFja0xlbi52YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RHJhZ2dpbmdSYXRpbyAoZXZ0LCBkcmFnZ2luZykge1xuICAgIGNvbnN0XG4gICAgICBwb3MgPSBwb3NpdGlvbihldnQpLFxuICAgICAgdmFsID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgPyBiZXR3ZWVuKChwb3MudG9wIC0gZHJhZ2dpbmcudG9wKSAvIGRyYWdnaW5nLmhlaWdodCwgMCwgMSlcbiAgICAgICAgOiBiZXR3ZWVuKChwb3MubGVmdCAtIGRyYWdnaW5nLmxlZnQpIC8gZHJhZ2dpbmcud2lkdGgsIDAsIDEpXG5cbiAgICByZXR1cm4gYmV0d2VlbihcbiAgICAgIGlzUmV2ZXJzZWQudmFsdWUgPT09IHRydWUgPyAxLjAgLSB2YWwgOiB2YWwsXG4gICAgICBpbm5lck1pblJhdGlvLnZhbHVlLFxuICAgICAgaW5uZXJNYXhSYXRpby52YWx1ZVxuICAgIClcbiAgfVxuXG4gIGNvbnN0IG1hcmtlclN0ZXAgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaXNOdW1iZXIocHJvcHMubWFya2VycykgPT09IHRydWUgPyBwcm9wcy5tYXJrZXJzIDoga2V5U3RlcC52YWx1ZSlcbiAgKVxuXG4gIGNvbnN0IG1hcmtlclRpY2tzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IFtdXG4gICAgY29uc3Qgc3RlcCA9IG1hcmtlclN0ZXAudmFsdWVcbiAgICBjb25zdCBtYXggPSBwcm9wcy5tYXhcblxuICAgIGxldCB2YWx1ZSA9IHByb3BzLm1pblxuICAgIGRvIHtcbiAgICAgIGFjYy5wdXNoKHZhbHVlKVxuICAgICAgdmFsdWUgKz0gc3RlcFxuICAgIH0gd2hpbGUgKHZhbHVlIDwgbWF4KVxuXG4gICAgYWNjLnB1c2gobWF4KVxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICBjb25zdCBtYXJrZXJMYWJlbENsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHByZWZpeCA9IGAgJHsgbWFya2VyUHJlZml4Q2xhc3MgfSR7IGF4aXMudmFsdWUgfS1gXG4gICAgcmV0dXJuIG1hcmtlclByZWZpeENsYXNzXG4gICAgICArIGAkeyBwcmVmaXggfSR7IHByb3BzLnN3aXRjaE1hcmtlckxhYmVsc1NpZGUgPT09IHRydWUgPyAnc3dpdGNoZWQnIDogJ3N0YW5kYXJkJyB9YFxuICAgICAgKyBgJHsgcHJlZml4IH0keyBpc1JldmVyc2VkLnZhbHVlID09PSB0cnVlID8gJ3J0bCcgOiAnbHRyJyB9YFxuICB9KVxuXG4gIGNvbnN0IG1hcmtlckxhYmVsc0xpc3QgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLm1hcmtlckxhYmVscyA9PT0gZmFsc2UpIHsgcmV0dXJuIG51bGwgfVxuXG4gICAgcmV0dXJuIGdldE1hcmtlckxpc3QocHJvcHMubWFya2VyTGFiZWxzKS5tYXAoKGVudHJ5LCBpbmRleCkgPT4gKHtcbiAgICAgIGluZGV4LFxuICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlLFxuICAgICAgbGFiZWw6IGVudHJ5LmxhYmVsIHx8IGVudHJ5LnZhbHVlLFxuICAgICAgY2xhc3NlczogbWFya2VyTGFiZWxDbGFzcy52YWx1ZVxuICAgICAgICArIChlbnRyeS5jbGFzc2VzICE9PSB2b2lkIDAgPyAnICcgKyBlbnRyeS5jbGFzc2VzIDogJycpLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgLi4uZ2V0TWFya2VyTGFiZWxTdHlsZShlbnRyeS52YWx1ZSksXG4gICAgICAgIC4uLihlbnRyeS5zdHlsZSB8fCB7fSlcbiAgICAgIH1cbiAgICB9KSlcbiAgfSlcblxuICBjb25zdCBtYXJrZXJTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgbWFya2VyTGlzdDogbWFya2VyTGFiZWxzTGlzdC52YWx1ZSxcbiAgICBtYXJrZXJNYXA6IG1hcmtlckxhYmVsc01hcC52YWx1ZSxcbiAgICBjbGFzc2VzOiBtYXJrZXJMYWJlbENsYXNzLnZhbHVlLCAvLyBUT0RPIHRzIGRlZmluaXRpb25cbiAgICBnZXRTdHlsZTogZ2V0TWFya2VyTGFiZWxTdHlsZVxuICB9KSlcblxuICBjb25zdCBtYXJrZXJTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBzaXplID0gaW5uZXJCYXJMZW4udmFsdWUgPT09IDBcbiAgICAgID8gJzJweCdcbiAgICAgIDogMTAwICogbWFya2VyU3RlcC52YWx1ZSAvIGlubmVyQmFyTGVuLnZhbHVlXG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uaW5uZXJCYXJTdHlsZS52YWx1ZSxcbiAgICAgIGJhY2tncm91bmRTaXplOiBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICA/IGAycHggJHsgc2l6ZSB9JWBcbiAgICAgICAgOiBgJHsgc2l6ZSB9JSAycHhgXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldE1hcmtlckxpc3QgKGRlZikge1xuICAgIGlmIChkZWYgPT09IGZhbHNlKSB7IHJldHVybiBudWxsIH1cblxuICAgIGlmIChkZWYgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBtYXJrZXJUaWNrcy52YWx1ZS5tYXAoZGVmYXVsdE1hcmtlckNvbnZlcnRGbilcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG1hcmtlclRpY2tzLnZhbHVlLm1hcCh2YWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkZWYodmFsdWUpXG4gICAgICAgIHJldHVybiBpc09iamVjdChpdGVtKSA9PT0gdHJ1ZSA/IHsgLi4uaXRlbSwgdmFsdWUgfSA6IHsgdmFsdWUsIGxhYmVsOiBpdGVtIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgZmlsdGVyRm4gPSAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA+PSBwcm9wcy5taW4gJiYgdmFsdWUgPD0gcHJvcHMubWF4XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZWYpID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZGVmXG4gICAgICAgIC5tYXAoaXRlbSA9PiAoaXNPYmplY3QoaXRlbSkgPT09IHRydWUgPyBpdGVtIDogeyB2YWx1ZTogaXRlbSB9KSlcbiAgICAgICAgLmZpbHRlcihmaWx0ZXJGbilcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGVmKS5tYXAoa2V5ID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkZWZbIGtleSBdXG4gICAgICBjb25zdCB2YWx1ZSA9IE51bWJlcihrZXkpXG4gICAgICByZXR1cm4gaXNPYmplY3QoaXRlbSkgPT09IHRydWUgPyB7IC4uLml0ZW0sIHZhbHVlIH0gOiB7IHZhbHVlLCBsYWJlbDogaXRlbSB9XG4gICAgfSkuZmlsdGVyKGZpbHRlckZuKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWFya2VyTGFiZWxTdHlsZSAodmFsKSB7XG4gICAgcmV0dXJuIHsgWyBwb3NpdGlvblByb3AudmFsdWUgXTogYCR7IDEwMCAqICh2YWwgLSBwcm9wcy5taW4pIC8gdHJhY2tMZW4udmFsdWUgfSVgIH1cbiAgfVxuXG4gIGNvbnN0IG1hcmtlckxhYmVsc01hcCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMubWFya2VyTGFiZWxzID09PSBmYWxzZSkgeyByZXR1cm4gbnVsbCB9XG5cbiAgICBjb25zdCBhY2MgPSB7fVxuICAgIG1hcmtlckxhYmVsc0xpc3QudmFsdWUuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBhY2NbIGVudHJ5LnZhbHVlIF0gPSBlbnRyeVxuICAgIH0pXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIGZ1bmN0aW9uIGdldE1hcmtlckxhYmVsc0NvbnRlbnQgKCkge1xuICAgIGlmIChzbG90c1sgJ21hcmtlci1sYWJlbC1ncm91cCcgXSAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gc2xvdHNbICdtYXJrZXItbGFiZWwtZ3JvdXAnIF0obWFya2VyU2NvcGUudmFsdWUpXG4gICAgfVxuXG4gICAgY29uc3QgZm4gPSBzbG90c1sgJ21hcmtlci1sYWJlbCcgXSB8fCBkZWZhdWx0TWFya2VyTGFiZWxSZW5kZXJGblxuICAgIHJldHVybiBtYXJrZXJMYWJlbHNMaXN0LnZhbHVlLm1hcChtYXJrZXIgPT4gZm4oe1xuICAgICAgbWFya2VyLFxuICAgICAgLi4ubWFya2VyU2NvcGUudmFsdWVcbiAgICB9KSlcbiAgfVxuXG4gIGNvbnN0IHBhbkRpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAvLyBpZiBlZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgIHJldHVybiBbIFtcbiAgICAgIFRvdWNoUGFuLFxuICAgICAgb25QYW4sXG4gICAgICB2b2lkIDAsXG4gICAgICB7XG4gICAgICAgIFsgb3JpZW50YXRpb24udmFsdWUgXTogdHJ1ZSxcbiAgICAgICAgcHJldmVudDogdHJ1ZSxcbiAgICAgICAgc3RvcDogdHJ1ZSxcbiAgICAgICAgbW91c2U6IHRydWUsXG4gICAgICAgIG1vdXNlQWxsRGlyOiB0cnVlXG4gICAgICB9XG4gICAgXSBdXG4gIH0pXG5cbiAgZnVuY3Rpb24gb25QYW4gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChkcmFnZ2luZy52YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKGV2ZW50LmV2dClcbiAgICAgICAgLy8gb25seSBpZiB0b3VjaCwgYmVjYXVzZSB3ZSBhbHNvIGhhdmUgbW91c2Vkb3duL3VwOlxuICAgICAgICBldmVudC50b3VjaCA9PT0gdHJ1ZSAmJiB1cGRhdGVWYWx1ZSh0cnVlKVxuICAgICAgICBkcmFnZ2luZy52YWx1ZSA9IHZvaWQgMFxuICAgICAgICBlbWl0KCdwYW4nLCAnZW5kJylcbiAgICAgIH1cbiAgICAgIGFjdGl2ZS52YWx1ZSA9IGZhbHNlXG4gICAgICBmb2N1cy52YWx1ZSA9IGZhbHNlXG4gICAgfVxuICAgIGVsc2UgaWYgKGV2ZW50LmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgIGRyYWdnaW5nLnZhbHVlID0gZ2V0RHJhZ2dpbmcoZXZlbnQuZXZ0KVxuICAgICAgdXBkYXRlUG9zaXRpb24oZXZlbnQuZXZ0KVxuICAgICAgdXBkYXRlVmFsdWUoKVxuICAgICAgYWN0aXZlLnZhbHVlID0gdHJ1ZVxuICAgICAgZW1pdCgncGFuJywgJ3N0YXJ0JylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB1cGRhdGVQb3NpdGlvbihldmVudC5ldnQpXG4gICAgICB1cGRhdGVWYWx1ZSgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25CbHVyICgpIHtcbiAgICBmb2N1cy52YWx1ZSA9IGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBvbkFjdGl2YXRlIChldnQpIHtcbiAgICB1cGRhdGVQb3NpdGlvbihldnQsIGdldERyYWdnaW5nKGV2dCkpXG4gICAgdXBkYXRlVmFsdWUoKVxuXG4gICAgcHJldmVudEZvY3VzLnZhbHVlID0gdHJ1ZVxuICAgIGFjdGl2ZS52YWx1ZSA9IHRydWVcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkRlYWN0aXZhdGUsIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBvbkRlYWN0aXZhdGUgKCkge1xuICAgIHByZXZlbnRGb2N1cy52YWx1ZSA9IGZhbHNlXG4gICAgYWN0aXZlLnZhbHVlID0gZmFsc2VcblxuICAgIHVwZGF0ZVZhbHVlKHRydWUpXG4gICAgb25CbHVyKClcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkRlYWN0aXZhdGUsIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBvbk1vYmlsZUNsaWNrIChldnQpIHtcbiAgICB1cGRhdGVQb3NpdGlvbihldnQsIGdldERyYWdnaW5nKGV2dCkpXG4gICAgdXBkYXRlVmFsdWUodHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5dXAgKGV2dCkge1xuICAgIGlmIChrZXlDb2Rlcy5pbmNsdWRlcyhldnQua2V5Q29kZSkpIHtcbiAgICAgIHVwZGF0ZVZhbHVlKHRydWUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VGV4dENvbnRhaW5lclN0eWxlIChyYXRpbykge1xuICAgIGlmIChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgeyByZXR1cm4gbnVsbCB9XG5cbiAgICBjb25zdCBwID0gJHEubGFuZy5ydGwgIT09IHByb3BzLnJldmVyc2UgPyAxIC0gcmF0aW8gOiByYXRpb1xuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKGNhbGMoJHsgMiAqIHAgLSAxIH0gKiAkeyBwcm9wcy50aHVtYlNpemUgfSAvIDIgKyAkeyA1MCAtIDEwMCAqIHAgfSUpKWBcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUaHVtYlJlbmRlckZuICh0aHVtYikge1xuICAgIGNvbnN0IGZvY3VzQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcmV2ZW50Rm9jdXMudmFsdWUgPT09IGZhbHNlICYmIChmb2N1cy52YWx1ZSA9PT0gdGh1bWIuZm9jdXNWYWx1ZSB8fCBmb2N1cy52YWx1ZSA9PT0gJ2JvdGgnKVxuICAgICAgICA/ICcgcS1zbGlkZXItLWZvY3VzJ1xuICAgICAgICA6ICcnXG4gICAgKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtc2xpZGVyX190aHVtYiBxLXNsaWRlcl9fdGh1bWIkeyBheGlzLnZhbHVlIH0gcS1zbGlkZXJfX3RodW1iJHsgYXhpcy52YWx1ZSB9LSR7IGlzUmV2ZXJzZWQudmFsdWUgPT09IHRydWUgPyAncnRsJyA6ICdsdHInIH0gYWJzb2x1dGUgbm9uLXNlbGVjdGFibGVgXG4gICAgICArIGZvY3VzQ2xhc3MudmFsdWVcbiAgICAgICsgKHRodW1iLnRodW1iQ29sb3IudmFsdWUgIT09IHZvaWQgMCA/IGAgdGV4dC0keyB0aHVtYi50aHVtYkNvbG9yLnZhbHVlIH1gIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgd2lkdGg6IHByb3BzLnRodW1iU2l6ZSxcbiAgICAgIGhlaWdodDogcHJvcHMudGh1bWJTaXplLFxuICAgICAgWyBwb3NpdGlvblByb3AudmFsdWUgXTogYCR7IDEwMCAqIHRodW1iLnJhdGlvLnZhbHVlIH0lYCxcbiAgICAgIHpJbmRleDogZm9jdXMudmFsdWUgPT09IHRodW1iLmZvY3VzVmFsdWUgPyAyIDogdm9pZCAwXG4gICAgfSkpXG5cbiAgICBjb25zdCBwaW5Db2xvciA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHRodW1iLmxhYmVsQ29sb3IudmFsdWUgIT09IHZvaWQgMFxuICAgICAgICA/IGAgdGV4dC0keyB0aHVtYi5sYWJlbENvbG9yLnZhbHVlIH1gXG4gICAgICAgIDogJydcbiAgICApKVxuXG4gICAgY29uc3QgdGV4dENvbnRhaW5lclN0eWxlID0gY29tcHV0ZWQoKCkgPT4gZ2V0VGV4dENvbnRhaW5lclN0eWxlKHRodW1iLnJhdGlvLnZhbHVlKSlcblxuICAgIGNvbnN0IHRleHRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICdxLXNsaWRlcl9fdGV4dCdcbiAgICAgICsgKHRodW1iLmxhYmVsVGV4dENvbG9yLnZhbHVlICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgdGh1bWIubGFiZWxUZXh0Q29sb3IudmFsdWUgfWAgOiAnJylcbiAgICApKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IHRodW1iQ29udGVudCA9IFtcbiAgICAgICAgaCgnc3ZnJywge1xuICAgICAgICAgIGNsYXNzOiAncS1zbGlkZXJfX3RodW1iLXNoYXBlIGFic29sdXRlLWZ1bGwnLFxuICAgICAgICAgIHZpZXdCb3g6ICcwIDAgMjAgMjAnLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgncGF0aCcsIHsgZDogcHJvcHMudGh1bWJQYXRoIH0pXG4gICAgICAgIF0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXNsaWRlcl9fZm9jdXMtcmluZyBmaXQnIH0pXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5sYWJlbCA9PT0gdHJ1ZSB8fCBwcm9wcy5sYWJlbEFsd2F5cyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aHVtYkNvbnRlbnQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogcGluQ2xhc3MudmFsdWUgKyAnIGFic29sdXRlIGZpdCBuby1wb2ludGVyLWV2ZW50cycgKyBwaW5Db2xvci52YWx1ZVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6IGxhYmVsQ2xhc3MudmFsdWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IG1pbldpZHRoOiBwcm9wcy50aHVtYlNpemUgfVxuICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6IHRleHRDb250YWluZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBzdHlsZTogdGV4dENvbnRhaW5lclN0eWxlLnZhbHVlXG4gICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogdGV4dENsYXNzLnZhbHVlIH0sIHRodW1iLmxhYmVsLnZhbHVlKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG5cbiAgICAgICAgaWYgKHByb3BzLm5hbWUgIT09IHZvaWQgMCAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgaW5qZWN0Rm9ybUlucHV0KHRodW1iQ29udGVudCwgJ3B1c2gnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIC4uLnRodW1iLmdldE5vZGVEYXRhKClcbiAgICAgIH0sIHRodW1iQ29udGVudClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50IChzZWxlY3Rpb25CYXJTdHlsZSwgdHJhY2tDb250YWluZXJUYWJpbmRleCwgdHJhY2tDb250YWluZXJFdmVudHMsIGluamVjdFRodW1iKSB7XG4gICAgY29uc3QgdHJhY2tDb250ZW50ID0gW11cblxuICAgIHByb3BzLmlubmVyVHJhY2tDb2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiB0cmFja0NvbnRlbnQucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAga2V5OiAnaW5uZXInLFxuICAgICAgICBjbGFzczogaW5uZXJCYXJDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IGlubmVyQmFyU3R5bGUudmFsdWVcbiAgICAgIH0pXG4gICAgKVxuXG4gICAgcHJvcHMuc2VsZWN0aW9uQ29sb3IgIT09ICd0cmFuc3BhcmVudCcgJiYgdHJhY2tDb250ZW50LnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGtleTogJ3NlbGVjdGlvbicsXG4gICAgICAgIGNsYXNzOiBzZWxlY3Rpb25CYXJDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNlbGVjdGlvbkJhclN0eWxlLnZhbHVlXG4gICAgICB9KVxuICAgIClcblxuICAgIHByb3BzLm1hcmtlcnMgIT09IGZhbHNlICYmIHRyYWNrQ29udGVudC5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBrZXk6ICdtYXJrZXInLFxuICAgICAgICBjbGFzczogbWFya2VyQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBtYXJrZXJTdHlsZS52YWx1ZVxuICAgICAgfSlcbiAgICApXG5cbiAgICBpbmplY3RUaHVtYih0cmFja0NvbnRlbnQpXG5cbiAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6ICd0cmFja0MnLFxuICAgICAgICAgIGNsYXNzOiB0cmFja0NvbnRhaW5lckNsYXNzLnZhbHVlLFxuICAgICAgICAgIHRhYmluZGV4OiB0cmFja0NvbnRhaW5lclRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgIC4uLnRyYWNrQ29udGFpbmVyRXZlbnRzLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogdHJhY2tDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgIHN0eWxlOiB0cmFja1N0eWxlLnZhbHVlXG4gICAgICAgICAgfSwgdHJhY2tDb250ZW50KVxuICAgICAgICBdLFxuICAgICAgICAnc2xpZGUnLFxuICAgICAgICBlZGl0YWJsZS52YWx1ZSwgKCkgPT4gcGFuRGlyZWN0aXZlLnZhbHVlXG4gICAgICApXG4gICAgXVxuXG4gICAgaWYgKHByb3BzLm1hcmtlckxhYmVscyAhPT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHByb3BzLnN3aXRjaE1hcmtlckxhYmVsc1NpZGUgPT09IHRydWVcbiAgICAgICAgPyAndW5zaGlmdCdcbiAgICAgICAgOiAncHVzaCdcblxuICAgICAgY29udGVudFsgYWN0aW9uIF0oXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdtYXJrZXJMJyxcbiAgICAgICAgICBjbGFzczogbWFya2VyTGFiZWxzQ29udGFpbmVyQ2xhc3MudmFsdWVcbiAgICAgICAgfSwgZ2V0TWFya2VyTGFiZWxzQ29udGVudCgpKVxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiBjb250ZW50XG4gIH1cblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkRlYWN0aXZhdGUsIHRydWUpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0ZToge1xuICAgICAgYWN0aXZlLFxuICAgICAgZm9jdXMsXG4gICAgICBwcmV2ZW50Rm9jdXMsXG4gICAgICBkcmFnZ2luZyxcblxuICAgICAgZWRpdGFibGUsXG4gICAgICBjbGFzc2VzLFxuICAgICAgdGFiaW5kZXgsXG4gICAgICBhdHRyaWJ1dGVzLFxuXG4gICAgICByb3VuZFZhbHVlRm4sXG4gICAgICBrZXlTdGVwLFxuICAgICAgdHJhY2tMZW4sXG4gICAgICBpbm5lck1pbixcbiAgICAgIGlubmVyTWluUmF0aW8sXG4gICAgICBpbm5lck1heCxcbiAgICAgIGlubmVyTWF4UmF0aW8sXG4gICAgICBwb3NpdGlvblByb3AsXG4gICAgICBzaXplUHJvcCxcbiAgICAgIGlzUmV2ZXJzZWRcbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgb25BY3RpdmF0ZSxcbiAgICAgIG9uTW9iaWxlQ2xpY2ssXG4gICAgICBvbkJsdXIsXG4gICAgICBvbktleXVwLFxuICAgICAgZ2V0Q29udGVudCxcbiAgICAgIGdldFRodW1iUmVuZGVyRm4sXG4gICAgICBjb252ZXJ0UmF0aW9Ub01vZGVsLFxuICAgICAgY29udmVydE1vZGVsVG9SYXRpbyxcbiAgICAgIGdldERyYWdnaW5nUmF0aW9cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHVzZUZvcm1BdHRycyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1mb3JtL3ByaXZhdGUudXNlLWZvcm0uanMnXG5cbmltcG9ydCB1c2VTbGlkZXIsIHtcbiAgdXNlU2xpZGVyUHJvcHMsXG4gIHVzZVNsaWRlckVtaXRzLFxuICBrZXlDb2Rlc1xufSBmcm9tICcuL3VzZS1zbGlkZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcblxuY29uc3QgZ2V0Tm9kZURhdGEgPSAoKSA9PiAoe30pXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2xpZGVyJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVNsaWRlclByb3BzLFxuXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJyB8fCB2ID09PSBudWxsXG4gICAgfSxcblxuICAgIGxhYmVsVmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXVxuICB9LFxuXG4gIGVtaXRzOiB1c2VTbGlkZXJFbWl0cyxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgeyBzdGF0ZSwgbWV0aG9kcyB9ID0gdXNlU2xpZGVyKHtcbiAgICAgIHVwZGF0ZVZhbHVlLCB1cGRhdGVQb3NpdGlvbiwgZ2V0RHJhZ2dpbmcsXG4gICAgICBmb3JtQXR0cnM6IHVzZUZvcm1BdHRycyhwcm9wcylcbiAgICB9KVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGN1clJhdGlvID0gcmVmKDApXG4gICAgY29uc3QgbW9kZWwgPSByZWYoMClcblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU1vZGVsICgpIHtcbiAgICAgIG1vZGVsLnZhbHVlID0gcHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbFxuICAgICAgICA/IHN0YXRlLmlubmVyTWluLnZhbHVlXG4gICAgICAgIDogYmV0d2Vlbihwcm9wcy5tb2RlbFZhbHVlLCBzdGF0ZS5pbm5lck1pbi52YWx1ZSwgc3RhdGUuaW5uZXJNYXgudmFsdWUpXG4gICAgfVxuXG4gICAgd2F0Y2goXG4gICAgICAoKSA9PiBgJHsgcHJvcHMubW9kZWxWYWx1ZSB9fCR7IHN0YXRlLmlubmVyTWluLnZhbHVlIH18JHsgc3RhdGUuaW5uZXJNYXgudmFsdWUgfWAsXG4gICAgICBub3JtYWxpemVNb2RlbFxuICAgIClcblxuICAgIG5vcm1hbGl6ZU1vZGVsKClcblxuICAgIGNvbnN0IG1vZGVsUmF0aW8gPSBjb21wdXRlZCgoKSA9PiBtZXRob2RzLmNvbnZlcnRNb2RlbFRvUmF0aW8obW9kZWwudmFsdWUpKVxuICAgIGNvbnN0IHJhdGlvID0gY29tcHV0ZWQoKCkgPT4gKHN0YXRlLmFjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/IGN1clJhdGlvLnZhbHVlIDogbW9kZWxSYXRpby52YWx1ZSkpXG5cbiAgICBjb25zdCBzZWxlY3Rpb25CYXJTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgICAgWyBzdGF0ZS5wb3NpdGlvblByb3AudmFsdWUgXTogYCR7IDEwMCAqIHN0YXRlLmlubmVyTWluUmF0aW8udmFsdWUgfSVgLFxuICAgICAgICBbIHN0YXRlLnNpemVQcm9wLnZhbHVlIF06IGAkeyAxMDAgKiAocmF0aW8udmFsdWUgLSBzdGF0ZS5pbm5lck1pblJhdGlvLnZhbHVlKSB9JWBcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wcy5zZWxlY3Rpb25JbWcgIT09IHZvaWQgMCkge1xuICAgICAgICBhY2MuYmFja2dyb3VuZEltYWdlID0gYHVybCgkeyBwcm9wcy5zZWxlY3Rpb25JbWcgfSkgIWltcG9ydGFudGBcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgZ2V0VGh1bWIgPSBtZXRob2RzLmdldFRodW1iUmVuZGVyRm4oe1xuICAgICAgZm9jdXNWYWx1ZTogdHJ1ZSxcbiAgICAgIGdldE5vZGVEYXRhLFxuICAgICAgcmF0aW8sXG4gICAgICBsYWJlbDogY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgICBwcm9wcy5sYWJlbFZhbHVlICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHByb3BzLmxhYmVsVmFsdWVcbiAgICAgICAgICA6IG1vZGVsLnZhbHVlXG4gICAgICApKSxcbiAgICAgIHRodW1iQ29sb3I6IGNvbXB1dGVkKCgpID0+IHByb3BzLnRodW1iQ29sb3IgfHwgcHJvcHMuY29sb3IpLFxuICAgICAgbGFiZWxDb2xvcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMubGFiZWxDb2xvciksXG4gICAgICBsYWJlbFRleHRDb2xvcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMubGFiZWxUZXh0Q29sb3IpXG4gICAgfSlcblxuICAgIGNvbnN0IHRyYWNrQ29udGFpbmVyRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB7fVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHEucGxhdGZvcm0uaXMubW9iaWxlID09PSB0cnVlXG4gICAgICAgID8geyBvbkNsaWNrOiBtZXRob2RzLm9uTW9iaWxlQ2xpY2sgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIG9uTW91c2Vkb3duOiBtZXRob2RzLm9uQWN0aXZhdGUsXG4gICAgICAgICAgICBvbkZvY3VzLFxuICAgICAgICAgICAgb25CbHVyOiBtZXRob2RzLm9uQmx1cixcbiAgICAgICAgICAgIG9uS2V5ZG93bixcbiAgICAgICAgICAgIG9uS2V5dXA6IG1ldGhvZHMub25LZXl1cFxuICAgICAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlVmFsdWUgKGNoYW5nZSkge1xuICAgICAgaWYgKG1vZGVsLnZhbHVlICE9PSBwcm9wcy5tb2RlbFZhbHVlKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbW9kZWwudmFsdWUpXG4gICAgICB9XG4gICAgICBjaGFuZ2UgPT09IHRydWUgJiYgZW1pdCgnY2hhbmdlJywgbW9kZWwudmFsdWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RHJhZ2dpbmcgKCkge1xuICAgICAgcmV0dXJuIHJvb3RSZWYudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoZXZlbnQsIGRyYWdnaW5nID0gc3RhdGUuZHJhZ2dpbmcudmFsdWUpIHtcbiAgICAgIGNvbnN0IHJhdGlvID0gbWV0aG9kcy5nZXREcmFnZ2luZ1JhdGlvKGV2ZW50LCBkcmFnZ2luZylcblxuICAgICAgbW9kZWwudmFsdWUgPSBtZXRob2RzLmNvbnZlcnRSYXRpb1RvTW9kZWwocmF0aW8pXG5cbiAgICAgIGN1clJhdGlvLnZhbHVlID0gcHJvcHMuc25hcCAhPT0gdHJ1ZSB8fCBwcm9wcy5zdGVwID09PSAwXG4gICAgICAgID8gcmF0aW9cbiAgICAgICAgOiBtZXRob2RzLmNvbnZlcnRNb2RlbFRvUmF0aW8obW9kZWwudmFsdWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1cyAoKSB7XG4gICAgICBzdGF0ZS5mb2N1cy52YWx1ZSA9IHRydWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleWRvd24gKGV2dCkge1xuICAgICAgaWYgKCFrZXlDb2Rlcy5pbmNsdWRlcyhldnQua2V5Q29kZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcblxuICAgICAgY29uc3RcbiAgICAgICAgc3RlcFZhbCA9IChbIDM0LCAzMyBdLmluY2x1ZGVzKGV2dC5rZXlDb2RlKSA/IDEwIDogMSkgKiBzdGF0ZS5rZXlTdGVwLnZhbHVlLFxuICAgICAgICBvZmZzZXQgPSAoXG4gICAgICAgICAgKFsgMzQsIDM3LCA0MCBdLmluY2x1ZGVzKGV2dC5rZXlDb2RlKSA/IC0xIDogMSlcbiAgICAgICAgICAqIChzdGF0ZS5pc1JldmVyc2VkLnZhbHVlID09PSB0cnVlID8gLTEgOiAxKVxuICAgICAgICAgICogKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gLTEgOiAxKSAqIHN0ZXBWYWxcbiAgICAgICAgKVxuXG4gICAgICBtb2RlbC52YWx1ZSA9IGJldHdlZW4oXG4gICAgICAgIHN0YXRlLnJvdW5kVmFsdWVGbi52YWx1ZShtb2RlbC52YWx1ZSArIG9mZnNldCksXG4gICAgICAgIHN0YXRlLmlubmVyTWluLnZhbHVlLFxuICAgICAgICBzdGF0ZS5pbm5lck1heC52YWx1ZVxuICAgICAgKVxuXG4gICAgICB1cGRhdGVWYWx1ZSgpXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBtZXRob2RzLmdldENvbnRlbnQoXG4gICAgICAgIHNlbGVjdGlvbkJhclN0eWxlLFxuICAgICAgICBzdGF0ZS50YWJpbmRleCxcbiAgICAgICAgdHJhY2tDb250YWluZXJFdmVudHMsXG4gICAgICAgIG5vZGUgPT4geyBub2RlLnB1c2goZ2V0VGh1bWIoKSkgfVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByZWY6IHJvb3RSZWYsXG4gICAgICAgIGNsYXNzOiBzdGF0ZS5jbGFzc2VzLnZhbHVlICsgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgPyAnIHEtc2xpZGVyLS1uby12YWx1ZScgOiAnJyksXG4gICAgICAgIC4uLnN0YXRlLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgfSwgY29udGVudClcbiAgICB9XG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgICAgIDxxLXRvZ2dsZSBzaXplPVwiNXZoXCIgZGVuc2Ugdi1tb2RlbD1cInZpZGVvX2FjdGl2ZVwiIGljb249XCJ2aWRlb2NhbVwiIC8+XG4gICAgICAgIDxxLXRvZ2dsZSBzaXplPVwiNXZoXCIgZGVuc2Ugdi1tb2RlbD1cInR3ZWFrX2FjdGl2ZVwiIGljb249XCJ0b25hbGl0eVwiIC8+XG4gICAgICAgIDxxLXRvZ2dsZSBzaXplPVwiNXZoXCIgZGVuc2Ugdi1tb2RlbD1cInBhaW50X2FjdGl2ZVwiIGNvbG9yPVwicGlua1wiIGljb249XCJlbWVyZ2VuY3lfcmVjb3JkaW5nXCI+XG4gICAgICAgICAgICA8cS10b29sdGlwPiAncicgdG8gdG9nZ2xlIHBhaW50aW5nPC9xLXRvb2x0aXA+XG4gICAgICAgIDwvcS10b2dnbGU+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgc2l6ZT1cIjIuNXZoXCJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJ4c1wiXG4gICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICBpY29uPVwiZmliZXJfbWFudWFsX3JlY29yZFwiXG4gICAgICAgICAgICA6bG9hZGluZz1cInBhaW50X2FjdGl2ZVwiXG4gICAgICAgICAgICBAbW91c2Vkb3duPVwicGFpbnRfYWN0aXZlID0gdHJ1ZVwiXG4gICAgICAgICAgICBAbW91c2V1cD1cInBhaW50X2FjdGl2ZSA9IGZhbHNlXCJcbiAgICAgICAgICAgIEB0b3VjaHN0YXJ0PVwicGFpbnRfYWN0aXZlID0gdHJ1ZVwiXG4gICAgICAgICAgICBAdG91Y2hlbmQ9XCJwYWludF9hY3RpdmUgPSBmYWxzZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bG9hZGluZz5cbiAgICAgICAgICAgICAgICA8cS1zcGlubmVyLXJpbmdzIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8IS0tXG4gICAgICAgICAgICAgICAgQG1vdXNlbGVhdmU9XCJwYWludF9hY3RpdmUgPSBmYWxzZVwiIC0tPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIHNpemU9XCIyLjV2aFwiXG4gICAgICAgICAgICBwYWRkaW5nPVwieHNcIlxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICBpY29uPVwiZGVsZXRlX2ZvcmV2ZXJcIlxuICAgICAgICAgICAgQGNsaWNrPVwiJGVtaXQoJ2NsZWFyJylcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8cS10b29sdGlwPidjJyB0byBjbGVhciBwYWludGluZzwvcS10b29sdGlwPlxuICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8cS1idG4gc2l6ZT1cIjIuNXZoXCIgcGFkZGluZz1cInhzXCIgY29sb3I9XCJwcmltYXJ5XCIgcm91bmQgaWNvbj1cInNhdmVcIiBAY2xpY2s9XCIkZW1pdCgnc2F2ZScpXCI+XG4gICAgICAgICAgICA8cS10b29sdGlwPidzJyB0byBzYXZlIGN1cnJlbnQgcGFpbnRpbmcgdG8gbWVtb3J5PC9xLXRvb2x0aXA+XG4gICAgICAgIDwvcS1idG4+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgc2l6ZT1cIjIuNXZoXCJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJ4c1wiXG4gICAgICAgICAgICByb3VuZFxuICAgICAgICAgICAgQGNsaWNrPVwiJHEuZnVsbHNjcmVlbi50b2dnbGUoKVwiXG4gICAgICAgICAgICA6aWNvbj1cIiRxLmZ1bGxzY3JlZW4uaXNBY3RpdmUgPyAnZnVsbHNjcmVlbl9leGl0JyA6ICdmdWxsc2NyZWVuJ1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxxLXRvb2x0aXA+dG9nZ2xlIGZ1bGwgc2NyZWVuIG1vZGU8L3EtdG9vbHRpcD5cbiAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgPCEtLVxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIDpsYWJlbD1cIiRxLmZ1bGxzY3JlZW4uaXNBY3RpdmUgPyAnRXhpdCBGdWxsc2NyZWVuJyA6ICdHbyBGdWxsc2NyZWVuJ1wiXG4gICAgICAgIC0tPlxuXG4gICAgICAgIDxxLXNsaWRlciB2LW1vZGVsPVwidHdlYWtfbHVtXCIgOm1pbj1cIi01LjBcIiA6bWF4PVwiMi4wXCIgOnN0ZXA9XCIwXCIgOmRpc2FibGU9XCIhdHdlYWtfYWN0aXZlXCIgLz5cbiAgICAgICAgPCEtLSAgLS0+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuLmNvbnRyb2xzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGFsaWduLWNvbnRlbnQ6IHN0cmV0Y2g7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgIG1heC13aWR0aDogNjByZW07XG59XG5cbi5jb250cm9scyA+ICoge1xuICAgIG1hcmdpbjogMCAwLjRyZW07XG59XG48L3N0eWxlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgQXBwRnVsbHNjcmVlbiwgdXNlUXVhc2FyIH0gZnJvbSBcInF1YXNhclwiO1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcblxuLy8gY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyh7XG4vLyAgICAgdmlzdWFsczoge1xuLy8gICAgICAgICB0eXBlOiBBcnJheSxcbi8vICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4vLyAgICAgfSxcbi8vIH0pO1xuXG5jb25zdCB2aWRlb19hY3RpdmUgPSBkZWZpbmVNb2RlbChcInZpZGVvX2FjdGl2ZVwiLCB7IHR5cGU6IEJvb2xlYW4sIHJlcXVpcmVkOiB0cnVlIH0pO1xuY29uc3QgdHdlYWtfYWN0aXZlID0gZGVmaW5lTW9kZWwoXCJ0d2Vha19hY3RpdmVcIiwgeyB0eXBlOiBCb29sZWFuLCByZXF1aXJlZDogdHJ1ZSB9KTtcbmNvbnN0IHBhaW50X2FjdGl2ZSA9IGRlZmluZU1vZGVsKFwicGFpbnRfYWN0aXZlXCIsIHsgdHlwZTogQm9vbGVhbiwgcmVxdWlyZWQ6IHRydWUgfSk7XG5jb25zdCB0d2Vha19sdW0gPSBkZWZpbmVNb2RlbChcInR3ZWFrX2x1bVwiLCB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSk7XG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbXCJjbGVhclwiLCBcInNhdmVcIl0pO1xuXG4vLyBSZXF1ZXN0aW5nIGZ1bGxzY3JlZW4gbW9kZTpcbiRxLmZ1bGxzY3JlZW5cbiAgICAucmVxdWVzdCgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBzdWNjZXNzIVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgLy8gb2gsIG5vISEhXG4gICAgfSk7XG5cbi8vIEV4aXRpbmcgZnVsbHNjcmVlbiBtb2RlOlxuJHEuZnVsbHNjcmVlblxuICAgIC5leGl0KClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIHN1Y2Nlc3MhXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAvLyBvaCwgbm8hISFcbiAgICB9KTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXZcbiAgICAgICAgcmVmPVwiZWxcIlxuICAgICAgICBjbGFzcz1cImZsZXgtY29udGFpbmVyIGZsZXgtY29sdW1uXCJcbiAgICAgICAgOmNsYXNzPVwieyAndmlkZW8tcG9ydHJhaXQnOiB2aWRlb19pc19wb3J0cmFpdCB9XCJcbiAgICA+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lciBmbGV4LWNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx2aWRlbz48L3ZpZGVvPlxuICAgICAgICAgICAgICAgIDxjYW52YXMgaWQ9XCJ0d2Vha1wiPjwvY2FudmFzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwicmVzdWx0XCI+PC9jYW52YXM+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPExpZ2h0cGFpbnRlckNvbnRyb2xzXG4gICAgICAgICAgICBAY2xlYXI9XCJjbGVhcl9jYW52YXNcIlxuICAgICAgICAgICAgQHNhdmU9XCJzYXZlX2NhbnZhc1wiXG4gICAgICAgICAgICB2LW1vZGVsOnBhaW50X2FjdGl2ZT1cInBhaW50X2FjdGl2ZVwiXG4gICAgICAgICAgICB2LW1vZGVsOnR3ZWFrX2FjdGl2ZT1cInR3ZWFrX2FjdGl2ZVwiXG4gICAgICAgICAgICB2LW1vZGVsOnR3ZWFrX2x1bT1cInR3ZWFrX2x1bVwiXG4gICAgICAgICAgICB2LW1vZGVsOnZpZGVvX2FjdGl2ZT1cInZpZGVvX2FjdGl2ZVwiXG4gICAgICAgID48L0xpZ2h0cGFpbnRlckNvbnRyb2xzPlxuICAgICAgICA8IS0tIHYtbW9kZWw6dmlkZW9fZmlsdGVyX2FjdGl2ZT1cInZpZGVvX2ZpbHRlcl9hY3RpdmVcIiAtLT5cbiAgICAgICAgPFNhdmVkVmlzdWFscyA6dmlzdWFscz1cInNhdmVkX3Zpc3VhbHNcIj5TYXZlZCBpbWFnZXM6PC9TYXZlZFZpc3VhbHM+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxudmlkZW8sXG5jYW52YXMge1xuICAgIG1hcmdpbjogMXJlbTtcbiAgICBib3JkZXI6IHNvbGlkIDFweCBoc2woMjUwLCAxMDAlLCA1MCUpO1xufVxuXG4uZmxleC1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24tY29udGVudDogc3RyZXRjaDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIC8qIHdpZHRoOiAxMDAlOyAqL1xuICAgIC8qIGhlaWdodDogMTAwJTsgKi9cbn1cblxuLmZsZXgtY29sdW1uIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4vKiAuZmxleC1pdGVtOm50aC1jaGlsZCgxKSAqL1xuLmZsZXgtY29udGFpbmVyID4gKiB7XG4gICAgb3JkZXI6IDA7XG4gICAgZmxleDogMCAxIGF1dG87XG4gICAgYWxpZ24tc2VsZjogYXV0bztcbiAgICBtYXJnaW46IDAuMjVyZW0gMDtcbn1cblxuLyogLmZsZXgtY29udGFpbmVyID4gdmlkZW8sXG4uZmxleC1jb250YWluZXIgPiBjYW52YXMge1xuICAgIGZsZXgtZ3JvdzogMTtcbn0gKi9cblxuLmZsZXgtY29udGFpbmVyID4gdmlkZW8sXG4uZmxleC1jb250YWluZXIgPiBjYW52YXMjdHdlYWsge1xuICAgIG1heC13aWR0aDogMzJ2dztcbiAgICBtYXgtaGVpZ2h0OiA0MHZoO1xufVxuLmZsZXgtY29udGFpbmVyID4gY2FudmFzI3Jlc3VsdCB7XG4gICAgbWF4LXdpZHRoOiA2N3Z3O1xuICAgIG1heC1oZWlnaHQ6IDgwdmg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gICAgLnZpZGVvLXBvcnRyYWl0IC5mbGV4LWNvbnRhaW5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBlbmQ7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgLnZpZGVvLXBvcnRyYWl0IC5mbGV4LWNvbnRhaW5lciA+IHZpZGVvIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgICAgICAgbWF4LWhlaWdodDogMzJ2dztcbiAgICAgICAgbWF4LXdpZHRoOiA0MHZoO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogY2FsYygzMnZoIC0gNDB2dyk7XG4gICAgICAgIHJpZ2h0OiBjYWxjKCgzMnZ3IC0gNDB2aCkgKiAwLjU0KTtcbiAgICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSB7XG4gICAgLnZpZGVvLXBvcnRyYWl0IC5mbGV4LWNvbnRhaW5lciB7XG4gICAgICAgIC8qIGFsaWduLWl0ZW1zOiBlbmQ7ICovXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgLnZpZGVvLXBvcnRyYWl0IC5mbGV4LWNvbnRhaW5lciA+IHZpZGVvIHtcbiAgICAgICAgLyogdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTsgKi9cbiAgICAgICAgLyogbWF4LWhlaWdodDogMzJ2dzsgKi9cbiAgICAgICAgLyogbWF4LXdpZHRoOiA0MHZoOyAqL1xuICAgICAgICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7ICovXG4gICAgICAgIC8qIHRvcDogY2FsYygzMnZoIC0gNDB2dyk7ICovXG4gICAgICAgIC8qIHJpZ2h0OiBjYWxjKCgzMnZ3IC0gNDB2aCkgKiAwLjU0KTsgKi9cbiAgICB9XG59XG48L3N0eWxlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQsIG9uVW5tb3VudGVkLCB3YXRjaCwgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBkYXRlLCB1c2VRdWFzYXIgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgXCJydmZjLXBvbHlmaWxsXCI7XG5cbmNvbnN0ICRxID0gdXNlUXVhc2FyKCk7XG5cbmltcG9ydCBTYXZlZFZpc3VhbHMgZnJvbSBcImNvbXBvbmVudHMvU2F2ZWRWaXN1YWxzLnZ1ZVwiO1xuaW1wb3J0IExpZ2h0cGFpbnRlckNvbnRyb2xzIGZyb20gXCJjb21wb25lbnRzL0xpZ2h0cGFpbnRlckNvbnRyb2xzLnZ1ZVwiO1xuaW1wb3J0IHsgd2F0Y2hFZmZlY3QgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGVsID0gcmVmKCk7XG5jb25zdCBhbmltYXRpb25faGFuZGxlID0gcmVmKG51bGwpO1xuXG5jb25zdCB2aWRlbyA9IHJlZigpO1xuY29uc3QgbWVkaWFfc3RyZWFtID0gcmVmKCk7XG5jb25zdCB2aWRlb190cmFjayA9IHJlZigpO1xuY29uc3QgdmlkZW9fYWN0aXZlID0gcmVmKHRydWUpO1xuXG5jb25zdCB2aWRlb19pc19wb3J0cmFpdCA9IHJlZihmYWxzZSk7XG5jb25zdCBkZXZpY2VfaXNfbGFuZHNjYXBlID0gcmVmKHRydWUpO1xuY29uc3Qgb3JpZW50YXRpb25FdmVudHMgPSByZWYoW10pO1xuXG5jb25zdCBjYW52YXNfcmVzdWx0ID0gcmVmKCk7XG5jb25zdCBjdHhfcmVzdWx0ID0gcmVmKCk7XG5cbmNvbnN0IGNhbnZhc190d2VhayA9IHJlZigpO1xuY29uc3QgY3R4X3R3ZWFrID0gcmVmKCk7XG5jb25zdCB0d2Vha19hY3RpdmUgPSByZWYoZmFsc2UpO1xuY29uc3QgdHdlYWtfbHVtID0gcmVmKDAuOCk7XG5cbmNvbnN0IHBhaW50X2FjdGl2ZSA9IHJlZihmYWxzZSk7XG5jb25zdCBzYXZlZF92aXN1YWxzID0gcmVmKFtdKTtcblxuZnVuY3Rpb24gdGVzdChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwibW91c2VvdXRcIiwgZXZlbnQpO1xuICAgIC8vIHBhaW50X2FjdGl2ZS52YWx1ZSA9IGZhbHNlO1xufVxuXG5jb25zdCB2aWRlb19jb25zdHJhaW50cyA9IHtcbiAgICB3aWR0aDogeyBtaW46IDgwMCwgaWRlYWw6IDE5MjAgfSxcbiAgICBoZWlnaHQ6IHsgbWluOiA2MDAsIGlkZWFsOiAxMDgwIH0sXG4gICAgLy8gZmZtcGVnIC1mIGxhdmZpIC1pIHRlc3RzcmM9c2l6ZT0xMDgweDE5MjAgLWYgdjRsMiAtdmNvZGVjIHJhd3ZpZGVvIC1waXhlbF9mb3JtYXQgeXV2NDIwcCAtZnJhbWVyYXRlIDE1IC12aWRlb19zaXplIDEwODB4MTkyMCAvZGV2L3ZpZGVvNjFcbiAgICAvLyB3aWR0aDogeyBpZGVhbDogMTA4MCB9LFxuICAgIC8vIGhlaWdodDogeyBpZGVhbDogMTkyMCB9LFxuICAgIC8vIHdpZHRoOiB7IG1pbjogMSwgbWF4OiAxMDgwIH0sXG4gICAgLy8gaGVpZ2h0OiB7IG1pbjogMTEwMCwgbWF4OiAyMDAwIH0sXG4gICAgZnJhbWVSYXRlOiB7IG1heDogMzAgfSxcbiAgICBmYWNpbmdNb2RlOiB7IGlkZWFsOiBcImVudmlyb25tZW50XCIgfSxcbn07XG4vLyBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpLmZhY2luZ01vZGUpIHtcbi8vICAgICBjb25zb2xlLmxvZyhcInNldCBmYWNpbmdNb2RlIGVudmlyb25tZW50LlwiKTtcbi8vICAgICB2aWRlb19jb25zdHJhaW50cy5mYWNpbmdNb2RlID0geyBpZGVhbDogXCJlbnZpcm9ubWVudFwiIH07XG4vLyB9XG5cbmZ1bmN0aW9uIGdlbmVyYXRlX2ZpbGVuYW1lKHRpdGxlID0gXCJsaWdodHBhaW50aW5nXCIsIGV4dCA9IFwicG5nXCIpIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRTdHJpbmcgPSBkYXRlLmZvcm1hdERhdGUoRGF0ZS5ub3coKSwgXCJZWVlZLU1NLUREIC0gSEg6bW06c3MuU1NTXCIpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7Zm9ybWF0dGVkU3RyaW5nfSAtICR7dGl0bGV9LiR7ZXh0fWA7XG4gICAgcmV0dXJuIGZpbGVuYW1lO1xufVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKFwib25Nb3VudGVkXCIpO1xuICAgIC8vIGVsLnZhbHVlOyAvLyA8ZGl2PlxuICAgIHNldHVwX2NhbnZhcygpO1xuICAgIHNldHVwX2NhbSgpO1xuICAgIHN0YXJ0X2NhbSgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlR2xvYmFsS2V5ZG93bik7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1NjcmVlbk9yaWVudGF0aW9uL2NoYW5nZV9ldmVudFxuICAgIHNjcmVlbi5vcmllbnRhdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGhhbmRsZVNjcmVlbk9yaWVudGF0aW9uQ2hhbmdlKTtcblxuICAgIHVwZGF0ZV9kZXZpY2VfaXNfbGFuZHNjYXBlKCk7XG59KTtcbm9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm9uVW5tb3VudGVkXCIpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlIGV2ZW50IGxpc3RlbmVyLi5cIik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUdsb2JhbEtleWRvd24pO1xuICAgICAgICBzY3JlZW4ub3JpZW50YXRpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBoYW5kbGVTY3JlZW5PcmllbnRhdGlvbkNoYW5nZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBoYW5kbGVTY3JlZW5PcmllbnRhdGlvbkNoYW5nZShldmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwic2NyZWVuLm9yaWVudGF0aW9uICdjaGFuZ2UnXCIsIGV2ZW50KTtcbiAgICBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVHbG9iYWxLZXlkb3duKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJnbG9iYWwga2V5ZG93blwiLCBldmVudCk7XG5cbiAgICAkcS5ub3RpZnkoYGtleTogJyR7ZXZlbnQua2V5fSdgKTtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwicFwiOlxuICAgICAgICBjYXNlIFwiIFwiOlxuICAgICAgICBjYXNlIFwiclwiOlxuICAgICAgICAgICAgcGFpbnRfYWN0aXZlLnZhbHVlID0gIXBhaW50X2FjdGl2ZS52YWx1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgc2F2ZV9jYW52YXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY1wiOlxuICAgICAgICAgICAgY2xlYXJfY2FudmFzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cF9jYW52YXMoKSB7XG4gICAgY29uc29sZS5sb2coXCJzZXR1cF9jYW52YXNcIik7XG5cbiAgICBjYW52YXNfdHdlYWsudmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpO1xuICAgIGN0eF90d2Vhay52YWx1ZSA9IGNhbnZhc190d2Vhay52YWx1ZS5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjYW52YXNfcmVzdWx0LnZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhcyNyZXN1bHRcIik7XG4gICAgY3R4X3Jlc3VsdC52YWx1ZSA9IGNhbnZhc19yZXN1bHQudmFsdWUuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJjYW52YXNfcmVzdWx0XCIsIGNhbnZhc19yZXN1bHQudmFsdWUpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiY3R4X3Jlc3VsdFwiLCBjdHhfcmVzdWx0LnZhbHVlKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNhbnZhc190d2Vha1wiLCBjYW52YXNfdHdlYWsudmFsdWUpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiY3R4X3R3ZWFrXCIsIGN0eF90d2Vhay52YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyX2NhbnZhcygpIHtcbiAgICBjb25zb2xlLmxvZyhcImNsZWFyX2NhbnZhc1wiKTtcblxuICAgIGN0eF90d2Vhay52YWx1ZS5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICBjdHhfdHdlYWsudmFsdWUuZmlsbFJlY3QoMCwgMCwgY2FudmFzX3R3ZWFrLnZhbHVlLndpZHRoLCBjYW52YXNfdHdlYWsudmFsdWUuaGVpZ2h0KTtcblxuICAgIGNvbnN0IGNvbXBPcCA9IGN0eF9yZXN1bHQudmFsdWUuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uO1xuICAgIGN0eF9yZXN1bHQudmFsdWUuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgIGN0eF9yZXN1bHQudmFsdWUuZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgY3R4X3Jlc3VsdC52YWx1ZS5maWxsUmVjdCgwLCAwLCBjYW52YXNfcmVzdWx0LnZhbHVlLndpZHRoLCBjYW52YXNfcmVzdWx0LnZhbHVlLmhlaWdodCk7XG4gICAgY3R4X3Jlc3VsdC52YWx1ZS5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBjb21wT3A7XG59XG5cbmZ1bmN0aW9uIHNhdmVfY2FudmFzKCkge1xuICAgIGNvbnNvbGUubG9nKFwic2F2ZV9jYW52YXNcIik7XG4gICAgY2FudmFzX3Jlc3VsdC52YWx1ZS50b0Jsb2IoKGJsb2IpID0+IHtcbiAgICAgICAgY29uc3QgdmlzdWFsID0ge1xuICAgICAgICAgICAgdHlwZTogXCJpbWFnZVwiLFxuICAgICAgICAgICAgZmlsZW5hbWU6IGdlbmVyYXRlX2ZpbGVuYW1lKCksXG4gICAgICAgICAgICBkYXRhOiBjYW52YXNfcmVzdWx0LnZhbHVlLnRvRGF0YVVSTCgpLFxuICAgICAgICAgICAgYmxvYjogYmxvYixcbiAgICAgICAgfTtcbiAgICAgICAgc2F2ZWRfdmlzdWFscy52YWx1ZS5wdXNoKHZpc3VhbCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwX2NhbSgpIHtcbiAgICBjb25zb2xlLmxvZyhcInNldHVwX2NhbVwiKTtcbiAgICB2aWRlby52YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcbiAgICBjb25zb2xlLmxvZyhcInZpZGVvXCIsIHZpZGVvLnZhbHVlKTtcbiAgICB2aWRlby52YWx1ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkZGF0YVwiLCB2aWRlb19sb2FkX2NhbGxiYWNrLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV9kZXZpY2VfaXNfbGFuZHNjYXBlKCkge1xuICAgIGlmIChzY3JlZW4ub3JpZW50YXRpb24udHlwZS5zdGFydHNXaXRoKFwibGFuZHNjYXBlXCIpKSB7XG4gICAgICAgIGRldmljZV9pc19sYW5kc2NhcGUudmFsdWUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRldmljZSBpbiBsYW5kc2NhcGUgbW9kZVxuICAgICAgICBkZXZpY2VfaXNfbGFuZHNjYXBlLnZhbHVlID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiZGV2aWNlX2lzX2xhbmRzY2FwZVwiLCBkZXZpY2VfaXNfbGFuZHNjYXBlLnZhbHVlKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlT3JpZW50YXRpb25DaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcImhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlXCIsIHNjcmVlbi5vcmllbnRhdGlvbik7XG4gICAgdXBkYXRlX2RldmljZV9pc19sYW5kc2NhcGUoKTtcbiAgICBpZiAodmlkZW9fdHJhY2sudmFsdWUpIHtcbiAgICAgICAgdmlkZW9fbG9hZF9jYWxsYmFjaygpO1xuICAgIH1cbn1cblxud2F0Y2godmlkZW9fYWN0aXZlLCBhc3luYyAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiB7XG4gICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgIHN0YXJ0X2NhbSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0b3BfY2FtKCk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHN0YXJ0X2NhbSgpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAgIC5nZXRVc2VyTWVkaWEoe1xuICAgICAgICAgICAgdmlkZW86IHZpZGVvX2NvbnN0cmFpbnRzLFxuICAgICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgICAgICAgICBtZWRpYV9zdHJlYW0udmFsdWUgPSBzdHJlYW07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1lZGlhX3N0cmVhbVwiLCBtZWRpYV9zdHJlYW0udmFsdWUpO1xuICAgICAgICAgICAgdmlkZW8udmFsdWUuc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgICAgdmlkZW8udmFsdWUucGxheSgpO1xuICAgICAgICAgICAgdmlkZW9fdHJhY2sudmFsdWUgPSBtZWRpYV9zdHJlYW0udmFsdWUuZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlkZW9fdHJhY2tcIiwgdmlkZW9fdHJhY2sudmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cnJlZDogXCIgKyBlcnIpO1xuICAgICAgICAgICAgJHEubm90aWZ5KFwiU3RhcnRpbmcgQ2FtZXJhOlwiICsgZXJyKTtcbiAgICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3BfY2FtKCkge1xuICAgIGlmIChtZWRpYV9zdHJlYW0udmFsdWUpIHtcbiAgICAgICAgbWVkaWFfc3RyZWFtLnZhbHVlLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgICAgICAgICBpZiAodHJhY2sucmVhZHlTdGF0ZSA9PSBcImxpdmVcIikge1xuICAgICAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZpZGVvLnZhbHVlLnNyY09iamVjdCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIHZpZGVvX2xvYWRfY2FsbGJhY2soKSB7XG4gICAgY29uc29sZS5sb2coXCJ2aWRlb19sb2FkX2NhbGxiYWNrXCIpO1xuICAgIHZpZGVvLnZhbHVlLmNhbmNlbFZpZGVvRnJhbWVDYWxsYmFjayhhbmltYXRpb25faGFuZGxlLnZhbHVlKTtcbiAgICBjb25zdCB0cmFja19zZXR0aW5ncyA9IHZpZGVvX3RyYWNrLnZhbHVlLmdldFNldHRpbmdzKCk7XG5cbiAgICB2aWRlb19pc19wb3J0cmFpdC52YWx1ZSA9IHRyYWNrX3NldHRpbmdzLmhlaWdodCA+IHRyYWNrX3NldHRpbmdzLndpZHRoO1xuICAgIGNvbnNvbGUubG9nKFwidmlkZW9faXNfcG9ydHJhaXRcIiwgdmlkZW9faXNfcG9ydHJhaXQudmFsdWUpO1xuICAgIHVwZGF0ZV9kZXZpY2VfaXNfbGFuZHNjYXBlKCk7XG5cbiAgICBpZiAodmlkZW9faXNfcG9ydHJhaXQudmFsdWUgJiYgZGV2aWNlX2lzX2xhbmRzY2FwZS52YWx1ZSkge1xuICAgICAgICBjYW52YXNfdHdlYWsudmFsdWUuaGVpZ2h0ID0gdHJhY2tfc2V0dGluZ3Mud2lkdGg7XG4gICAgICAgIGNhbnZhc190d2Vhay52YWx1ZS53aWR0aCA9IHRyYWNrX3NldHRpbmdzLmhlaWdodDtcblxuICAgICAgICBjYW52YXNfcmVzdWx0LnZhbHVlLmhlaWdodCA9IHRyYWNrX3NldHRpbmdzLndpZHRoO1xuICAgICAgICBjYW52YXNfcmVzdWx0LnZhbHVlLndpZHRoID0gdHJhY2tfc2V0dGluZ3MuaGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNldCBjYW52YXMgc2l6ZXNcbiAgICAgICAgY2FudmFzX3R3ZWFrLnZhbHVlLmhlaWdodCA9IHRyYWNrX3NldHRpbmdzLmhlaWdodDtcbiAgICAgICAgY2FudmFzX3R3ZWFrLnZhbHVlLndpZHRoID0gdHJhY2tfc2V0dGluZ3Mud2lkdGg7XG5cbiAgICAgICAgY2FudmFzX3Jlc3VsdC52YWx1ZS5oZWlnaHQgPSB0cmFja19zZXR0aW5ncy5oZWlnaHQ7XG4gICAgICAgIGNhbnZhc19yZXN1bHQudmFsdWUud2lkdGggPSB0cmFja19zZXR0aW5ncy53aWR0aDtcbiAgICB9XG4gICAgY3R4X3Jlc3VsdC52YWx1ZS5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImxpZ2h0ZW5cIjtcblxuICAgIGNsZWFyX2NhbnZhcygpO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb25cIiwgY3R4X3Jlc3VsdC52YWx1ZS5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24pO1xuXG4gICAgLy8gc3RhcnQgcHJvY2Vzc2luZ1xuICAgIHN0ZXAoKTtcbn1cbmZ1bmN0aW9uIHN0ZXAoKSB7XG4gICAgLy8gdXBkYXRlIHRoZSBjYW52YXMgd2hlbiBhIHZpZGVvIHByb2NlZWRzIHRvIG5leHQgZnJhbWVcbiAgICBpZiAodHdlYWtfYWN0aXZlLnZhbHVlKSB7XG4gICAgICAgIGlmICh2aWRlb19pc19wb3J0cmFpdC52YWx1ZSAmJiBkZXZpY2VfaXNfbGFuZHNjYXBlLnZhbHVlKSB7XG4gICAgICAgICAgICBjdHhfdHdlYWsudmFsdWUuc2F2ZSgpO1xuICAgICAgICAgICAgY3R4X3R3ZWFrLnZhbHVlLnRyYW5zbGF0ZSgwLCBjYW52YXNfdHdlYWsudmFsdWUuaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eF90d2Vhay52YWx1ZS5yb3RhdGUoKC05MCAqIE1hdGguUEkpIC8gMTgwKTtcbiAgICAgICAgICAgIGN0eF90d2Vhay52YWx1ZS5kcmF3SW1hZ2UodmlkZW8udmFsdWUsIDAsIDApO1xuICAgICAgICAgICAgY3R4X3R3ZWFrLnZhbHVlLnJlc3RvcmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eF90d2Vhay52YWx1ZS5kcmF3SW1hZ2UodmlkZW8udmFsdWUsIDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIHR3ZWFrQ29udHJhc3QoKTtcbiAgICB9IGVsc2UgaWYgKHBhaW50X2FjdGl2ZS52YWx1ZSkge1xuICAgICAgICAvLyBjdHhfcmVzdWx0LnZhbHVlLmRyYXdJbWFnZShcbiAgICAgICAgLy8gICAgIHZpZGVvLnZhbHVlLFxuICAgICAgICAvLyAgICAgMCxcbiAgICAgICAgLy8gICAgIDAsXG4gICAgICAgIC8vICAgICBjYW52YXNfcmVzdWx0LnZhbHVlLndpZHRoLFxuICAgICAgICAvLyAgICAgY2FudmFzX3Jlc3VsdC52YWx1ZS5oZWlnaHRcbiAgICAgICAgLy8gKTtcbiAgICAgICAgaWYgKHZpZGVvX2lzX3BvcnRyYWl0LnZhbHVlICYmIGRldmljZV9pc19sYW5kc2NhcGUudmFsdWUpIHtcbiAgICAgICAgICAgIGN0eF9yZXN1bHQudmFsdWUuc2F2ZSgpO1xuICAgICAgICAgICAgY3R4X3Jlc3VsdC52YWx1ZS50cmFuc2xhdGUoMCwgY2FudmFzX3Jlc3VsdC52YWx1ZS5oZWlnaHQpO1xuICAgICAgICAgICAgY3R4X3Jlc3VsdC52YWx1ZS5yb3RhdGUoKC05MCAqIE1hdGguUEkpIC8gMTgwKTtcbiAgICAgICAgICAgIGN0eF9yZXN1bHQudmFsdWUuZHJhd0ltYWdlKHZpZGVvLnZhbHVlLCAwLCAwKTtcbiAgICAgICAgICAgIGN0eF9yZXN1bHQudmFsdWUucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4X3Jlc3VsdC52YWx1ZS5kcmF3SW1hZ2UodmlkZW8udmFsdWUsIDAsIDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFuaW1hdGlvbl9oYW5kbGUudmFsdWUgPSB2aWRlby52YWx1ZS5yZXF1ZXN0VmlkZW9GcmFtZUNhbGxiYWNrKHN0ZXApO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5FeHBvKHgpIHtcbiAgICAvLyBodHRwczovL2Vhc2luZ3MubmV0LyNlYXNlSW5FeHBvXG4gICAgcmV0dXJuIHggPT09IDAgPyAwIDogTWF0aC5wb3coMiwgMTAgKiB4IC0gMTApO1xufVxuXG4vLyBodHRwczovL2N1YmljLWJlemllci5jb20vIzEsMCwxLC4wMlxuZnVuY3Rpb24gYmV6aWVyKHQsIGluaXRpYWwsIHAxLCBwMiwgZmluYWwpIHtcbiAgICAvLyBodHRwczovL21vcmV0aGFuZGV2Lmhhc2hub2RlLmRldi9kZW15c3RpZnlpbmctdGhlLWN1YmljLWJlemllci1mdW5jdGlvbi1mdC1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIChcbiAgICAgICAgKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICogaW5pdGlhbCArXG4gICAgICAgIDMgKiAoMSAtIHQpICogKDEgLSB0KSAqIHQgKiBwMSArXG4gICAgICAgIDMgKiAoMSAtIHQpICogdCAqIHQgKiBwMiArXG4gICAgICAgIHQgKiB0ICogdCAqIGZpbmFsXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gYmV6aWVyU2ltcGxlKHQsIHAxKSB7XG4gICAgLy8gaHR0cHM6Ly9tb3JldGhhbmRldi5oYXNobm9kZS5kZXYvZGVteXN0aWZ5aW5nLXRoZS1jdWJpYy1iZXppZXItZnVuY3Rpb24tZnQtamF2YXNjcmlwdFxuICAgIHJldHVybiAzICogKDEgLSB0KSAqICgxIC0gdCkgKiB0ICogcDEgKyB0ICogdCAqIHQ7XG59XG5cbmZ1bmN0aW9uIHR3ZWFrQ29udHJhc3QoKSB7XG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4X3R3ZWFrLnZhbHVlLmdldEltYWdlRGF0YShcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgY2FudmFzX3R3ZWFrLnZhbHVlLndpZHRoLFxuICAgICAgICBjYW52YXNfdHdlYWsudmFsdWUuaGVpZ2h0XG4gICAgKTtcbiAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgbGV0IHIgPSBkYXRhW2kgKyAwXTtcbiAgICAgICAgbGV0IGcgPSBkYXRhW2kgKyAxXTtcbiAgICAgICAgbGV0IGIgPSBkYXRhW2kgKyAyXTtcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9hbmRfSFNWI0Zvcm1hbF9kZXJpdmF0aW9uXG4gICAgICAgIC8vIGNvbnZlcnQgcixnLGIgWzAsMjU1XSByYW5nZSB0byBbMCwxXVxuICAgICAgICByID0gciAvIDI1NTtcbiAgICAgICAgZyA9IGcgLyAyNTU7XG4gICAgICAgIGIgPSBiIC8gMjU1O1xuICAgICAgICAvLyBnZXQgdGhlIG1pbiBhbmQgbWF4IG9mIHIsZyxiXG4gICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICAgICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICAgICAgLy8gbGlnaHRuZXNzIGlzIHRoZSBhdmVyYWdlIG9mIHRoZSBsYXJnZXN0IGFuZCBzbWFsbGVzdCBjb2xvciBjb21wb25lbnRzXG4gICAgICAgIGNvbnN0IGx1bSA9IChtYXggKyBtaW4pIC8gMjtcblxuICAgICAgICAvLyBiZXppZXJcbiAgICAgICAgLy8gdHdlYWtfbHVtLnZhbHVlXG4gICAgICAgIGRhdGFbaSArIDFdID0gZyAqIGJlemllclNpbXBsZShsdW0sIHR3ZWFrX2x1bS52YWx1ZSkgKiAyNTU7XG4gICAgICAgIGRhdGFbaSArIDBdID0gciAqIGJlemllclNpbXBsZShsdW0sIHR3ZWFrX2x1bS52YWx1ZSkgKiAyNTU7XG4gICAgICAgIGRhdGFbaSArIDJdID0gYiAqIGJlemllclNpbXBsZShsdW0sIHR3ZWFrX2x1bS52YWx1ZSkgKiAyNTU7XG5cbiAgICAgICAgLy8gaWYgKGx1bSA8IHR3ZWFrX2x1bS52YWx1ZSkge1xuICAgICAgICAvLyAgICAgZGF0YVtpICsgMF0gPSAwO1xuICAgICAgICAvLyAgICAgZGF0YVtpICsgMV0gPSAwO1xuICAgICAgICAvLyAgICAgZGF0YVtpICsgMl0gPSAwO1xuICAgICAgICAvLyAgICAgLy8gZGF0YVtpICsgM10gPSAwO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgLy8gZGF0YVtpICsgM10gPSBlYXNlSW5FeHBvKGx1bSkgKiAyNTU7XG4gICAgICAgIC8vICAgICAvLyBkYXRhW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBjdHhfdHdlYWsudmFsdWUucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgaWYgKHBhaW50X2FjdGl2ZS52YWx1ZSkge1xuICAgICAgICBjdHhfcmVzdWx0LnZhbHVlLmRyYXdJbWFnZShjYW52YXNfdHdlYWsudmFsdWUsIDAsIDApO1xuICAgIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxxLXBhZ2UgY2xhc3M9XCJmbGV4IGZsZXgtY2VudGVyIGNvbnRlbnQtc3RyZXRjaFwiPlxuICAgICAgICA8TGlnaHRQYWludCAvPlxuICAgIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbi8vIGltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgTGlnaHRQYWludCBmcm9tIFwic3JjL2NvbXBvbmVudHMvTGlnaHRQYWludC52dWVcIjtcblxuLy8gaW1wb3J0IHsgdXNlVGhlVGltZVN0b3JlIH0gZnJvbSBcInN0b3Jlcy90aGV0aW1lLmpzXCI7XG5cbi8vIGltcG9ydCBUaW1lckRpc3BsYXkgZnJvbSBcImNvbXBvbmVudHMvVGltZXJEaXNwbGF5LnZ1ZVwiO1xuXG4vLyBjb25zdCB0aGV0aW1lID0gdXNlVGhlVGltZVN0b3JlKCk7XG5cbi8vICRxLm5vdGlmeSgnTWVzc2FnZScpXG5cbmNvbnN0ICRxID0gdXNlUXVhc2FyKCk7XG4vLyBodHRwczovL3F1YXNhci5kZXYvcXVhc2FyLXBsdWdpbnMvYWRkcmVzc2Jhci1jb2xvclxuLy8gJHEuYWRkcmVzc2JhckNvbG9yLnNldCgnI2EyZTNmYScpXG5cbi8vIGRhcmsgbW9kZVxuLy8gZ2V0IHN0YXR1c1xuLy8gY29uc29sZS5sb2coJHEuZGFyay5pc0FjdGl2ZSk7IC8vIHRydWUsIGZhbHNlXG4vLyBnZXQgY29uZmlndXJlZCBzdGF0dXNcbi8vIGNvbnNvbGUubG9nKCRxLmRhcmsubW9kZSkgLy8gXCJhdXRvXCIsIHRydWUsIGZhbHNlXG4vLyBzZXQgc3RhdHVzXG4kcS5kYXJrLnNldCh0cnVlKTsgLy8gb3IgZmFsc2Ugb3IgXCJhdXRvXCJcbi8vIHRvZ2dsZVxuLy8gJHEuZGFyay50b2dnbGUoKVxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiZGF0ZSIsIm1vZCIsIkxhbmciLCJkYXRlMiIsInRoaXMiLCJhIiwiYiIsImMiLCJkIiwiZ2xvYmFsIiwiZyIsImgiLCJmIiwiZSIsInNhdmVBcyIsImRyYWdnaW5nIiwiY2xhc3NlcyIsInJhdGlvIiwiX3VzZU1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7QUFRZSxTQUFTLFlBQWE7QUFDbkMsU0FBTyxPQUFPLFNBQVM7QUFDekI7QUNMQSxNQUFNLFNBQVM7QUFBQSxFQUNiO0FBQUEsRUFBSztBQUFBLEVBQUc7QUFBQSxFQUFJO0FBQUEsRUFBSztBQUFBLEVBQUs7QUFBQSxFQUFLO0FBQUEsRUFBSztBQUFBLEVBQUs7QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQ2pEO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFDbEQ7QUF3QkEsU0FBUyxrQkFBbUIsSUFBSTtBQUM5QixTQUFPLFdBQVcsRUFBRSxNQUFNO0FBQzVCO0FBS08sU0FBUyxtQkFBb0IsSUFBSSxJQUFJO0FBQzFDLE1BQUksTUFBTTtBQUFHLFdBQU87QUFDcEIsTUFBSSxNQUFNO0FBQUksV0FBTztBQUNyQixNQUFJLGtCQUFr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
