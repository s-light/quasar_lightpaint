import { d as defineComponent, h, e as effectScope, i as inject, o as onMounted, a as onUnmounted, c as computed, w as watch, F as Fragment, g as getCurrentInstance, b as isRef, r as ref, s as shallowRef, f as setupDevtoolsPlugin, j as createVNode, T as Text, k as boot } from "./index.2f56bee1.js";
/*!
  * shared v9.13.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign$1 = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => {
  if (!isObject$1(val))
    return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto.constructor === Object;
};
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join$1(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
function incrementer(code2) {
  let current = code2;
  return () => ++current;
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (isNotObjectOrIsArray(src2[key]) || isNotObjectOrIsArray(des2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
/*!
  * message-compiler v9.13.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  if (source != null) {
    loc.source = source;
  }
  return loc;
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format$1(message, ...args) {
  if (args.length === 1 && isObject(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const assign = Object.assign;
const isString = (val) => typeof val === "string";
const isObject = (val) => val !== null && typeof val === "object";
function join(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
const CompileWarnCodes = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
};
const warnMessages = {
  [CompileWarnCodes.USE_MODULO_SYNTAX]: `Use modulo before '{{0}}'.`
};
function createCompileWarn(code2, loc, ...args) {
  const msg = format$1(warnMessages[code2] || "", ...args || []);
  const message = { message: String(msg), code: code2 };
  if (loc) {
    message.location = loc;
  }
  return message;
}
const CompileErrorCodes = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  __EXTEND_POINT__: 17
};
const errorMessages = {
  [CompileErrorCodes.EXPECTED_TOKEN]: `Expected token: '{0}'`,
  [CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER]: `Invalid token in placeholder: '{0}'`,
  [CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: `Unterminated single quote in placeholder`,
  [CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE]: `Unknown escape sequence: \\{0}`,
  [CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE]: `Invalid unicode escape sequence: {0}`,
  [CompileErrorCodes.UNBALANCED_CLOSING_BRACE]: `Unbalanced closing brace`,
  [CompileErrorCodes.UNTERMINATED_CLOSING_BRACE]: `Unterminated closing brace`,
  [CompileErrorCodes.EMPTY_PLACEHOLDER]: `Empty placeholder`,
  [CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER]: `Not allowed nest placeholder`,
  [CompileErrorCodes.INVALID_LINKED_FORMAT]: `Invalid linked format`,
  [CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL]: `Plural must have messages`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER]: `Unexpected empty linked modifier`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY]: `Unexpected empty linked key`,
  [CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS]: `Unexpected lexical analysis in token: '{0}'`,
  [CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE]: `unhandled codegen node type: '{0}'`,
  [CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE]: `unhandled mimifier node type: '{0}'`
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages: messages2, args } = options;
  const msg = format$1((messages2 || errorMessages)[code2] || "", ...args || []);
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 14,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 14,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code2, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(context2, 14);
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 8 || currentType === 12)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 10) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isTextStart(scnr, false);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function detectModuloStart(scnr) {
    const spaces = peekSpaces(scnr);
    const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
    scnr.resetPeek();
    return {
      isModulo: ret,
      hasSpace: spaces.length > 0
    };
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "", detectModulo = false) => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return prev === "%" ? false : hasSpace;
      } else if (ch === "@" || !ch) {
        return prev === "%" ? true : hasSpace;
      } else if (ch === "%") {
        scnr.peek();
        return fn(hasSpace, "%", true);
      } else if (ch === "|") {
        return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP, detectModulo);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF, detectModulo);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36 || cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readModulo(scnr) {
    skipSpaces(scnr);
    const ch = scnr.currentChar();
    if (ch !== "%") {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
    }
    scnr.next();
    return "%";
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === "%") {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else {
          break;
        }
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(buf);
      }
    };
    return fn("");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(scnr, "|");
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(context2, 2, "{");
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(context2, 3, "}");
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 6, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 7, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 13, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(context2, 8, "@");
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(context2, 9, ".");
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(context2, 10, ":");
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 12, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 11, readLinkedRefer(scnr));
          }
        }
        if (currentType === 8) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = { type: 14 };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(context2, 3, "}");
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        const { isModulo, hasSpace } = detectModuloStart(scnr);
        if (isModulo) {
          return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(_context, 14);
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "\uFFFD";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError, onWarn } = options;
  function emitError(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function emitWarn(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onWarn) {
      const loc = location ? createLocation(start, end) : null;
      onWarn(createCompileWarn(code2, loc, args));
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (type) {
      node.type = type;
    }
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key, modulo) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    if (modulo === true) {
      node.modulo = true;
    }
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 12) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 9) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 10) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 11:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 7:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    let modulo = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          modulo = true;
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || "", !!modulo));
          if (modulo) {
            emitWarn(tokenizer, CompileWarnCodes.USE_MODULO_SYNTAX, context.lastStartLoc, 0, getTokenCaption(token));
            modulo = null;
          }
          break;
        case 7:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 8: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 14 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 14);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 14) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 14) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 14) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper("plural");
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper("linked");
      transformer.helper("type");
      break;
    }
    case 5:
      transformer.helper("interpolate");
      transformer.helper("list");
      break;
    case 4:
      transformer.helper("interpolate");
      transformer.helper("named");
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper("normalize");
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
const ERROR_DOMAIN$1 = "minifier";
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
    default: {
      throw createCompileError(CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: ERROR_DOMAIN$1,
        args: [node.type]
      });
    }
  }
  delete node.type;
}
const ERROR_DOMAIN = "parser";
function createCodeGenerator(ast, options) {
  const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code2, node) {
    _context.code += code2;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper("linked")}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper("normalize")}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper("plural")}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper("interpolate")}(${helper("list")}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper("interpolate")}(${helper("named")}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
    default: {
      throw createCompileError(CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: ERROR_DOMAIN,
        args: [node.type]
      });
    }
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  const sourceMap = !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    mode,
    filename,
    sourceMap,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code: code2, map } = generator.context();
  return {
    ast,
    code: code2,
    map: map ? map.toJSON() : void 0
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
/*!
  * core-base v9.13.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function initFeatureFlags$1() {
  if (typeof __INTLIFY_JIT_COMPILATION__ !== "boolean") {
    getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
const pathStateMachine = [];
pathStateMachine[0] = {
  ["w"]: [0],
  ["i"]: [3, 0],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[1] = {
  ["w"]: [1],
  ["."]: [2],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[2] = {
  ["w"]: [2],
  ["i"]: [3, 0],
  ["0"]: [3, 0]
};
pathStateMachine[3] = {
  ["i"]: [3, 0],
  ["0"]: [3, 0],
  ["w"]: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  ["o"]: [7, 1]
};
pathStateMachine[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [
    4,
    2
  ],
  ["]"]: [1, 3],
  ["o"]: 8,
  ["l"]: [4, 0]
};
pathStateMachine[5] = {
  ["'"]: [4, 0],
  ["o"]: 8,
  ["l"]: [5, 0]
};
pathStateMachine[6] = {
  ['"']: [4, 0],
  ["o"]: 8,
  ["l"]: [6, 0]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[0] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[1] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[2] = () => {
    actions[0]();
    subPathDepth++;
  };
  actions[3] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[0]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[1]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[0]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap["l"] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject$1(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join$1(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages2) => {
    return messages2[pluralRule(pluralIndex, messages2.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject$1(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString$1(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key)(ctx);
    const msg = type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret;
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    ["list"]: list,
    ["named"]: named,
    ["plural"]: plural,
    ["linked"]: linked,
    ["message"]: message,
    ["type"]: type,
    ["interpolate"]: interpolate,
    ["normalize"]: normalize,
    ["values"]: assign$1({}, _list, _named)
  };
  return ctx;
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n2, version, meta) {
  devtools && devtools.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: i18n2,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook("function:translate");
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const code$1$1 = CompileWarnCodes.__EXTEND_POINT__;
const inc$1$1 = incrementer(code$1$1);
const CoreWarnCodes = {
  NOT_FOUND_KEY: code$1$1,
  FALLBACK_TO_TRANSLATE: inc$1$1(),
  CANNOT_FORMAT_NUMBER: inc$1$1(),
  FALLBACK_TO_NUMBER_FORMAT: inc$1$1(),
  CANNOT_FORMAT_DATE: inc$1$1(),
  FALLBACK_TO_DATE_FORMAT: inc$1$1(),
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: inc$1$1(),
  __EXTEND_POINT__: inc$1$1()
};
const code$2 = CompileErrorCodes.__EXTEND_POINT__;
const inc$2 = incrementer(code$2);
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$2,
  INVALID_DATE_ARGUMENT: inc$2(),
  INVALID_ISO_DATE_ARGUMENT: inc$2(),
  NOT_SUPPORT_NON_STRING_MESSAGE: inc$2(),
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: inc$2(),
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: inc$2(),
  NOT_SUPPORT_LOCALE_TYPE: inc$2(),
  __EXTEND_POINT__: inc$2()
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString$1(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve = locale();
        if (isPromise(resolve)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject$1(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString$1(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString$1(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString$1(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.13.1";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString$1(val) ? capitalize(val) : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString$1(options.version) ? options.version : VERSION$1;
  const locale = isString$1(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages2 = isPlainObject(options.messages) ? options.messages : { [_locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale]: {} };
  const modifiers = assign$1({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject$1(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages: messages2,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString$1(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales) {
  const index = locales.indexOf(targetLocale);
  if (index === -1) {
    return false;
  }
  for (let i = index + 1; i < locales.length; i++) {
    if (isAlmostSameLocale(targetLocale, locales[i])) {
      return true;
    }
  }
  return false;
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = ast.b || ast.body;
  if ((body.t || body.type) === 1) {
    const plural = body;
    const cases = plural.c || plural.cases;
    return ctx.plural(cases.reduce((messages2, c) => [
      ...messages2,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const _static = node.s || node.static;
  if (_static) {
    return ctx.type === "text" ? _static : ctx.normalize([_static]);
  } else {
    const messages2 = (node.i || node.items).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages2);
  }
}
function formatMessagePart(ctx, node) {
  const type = node.t || node.type;
  switch (type) {
    case 3: {
      const text = node;
      return text.v || text.value;
    }
    case 9: {
      const literal = node;
      return literal.v || literal.value;
    }
    case 4: {
      const named = node;
      return ctx.interpolate(ctx.named(named.k || named.key));
    }
    case 5: {
      const list = node;
      return ctx.interpolate(ctx.list(list.i != null ? list.i : list.index));
    }
    case 6: {
      const linked = node;
      const modifier = linked.m || linked.modifier;
      return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      const linkedKey = node;
      return linkedKey.v || linkedKey.value;
    }
    case 8: {
      const linkedModifier = node;
      return linkedModifier.v || linkedModifier.value;
    }
    default:
      throw new Error(`unhandled node type on format message part: ${type}`);
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = /* @__PURE__ */ Object.create(null);
const isMessageAST = (val) => isObject$1(val) && (val.t === 0 || val.type === 0) && ("b" in val || "body" in val);
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
function compile(message, context) {
  if (__INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__ && isString$1(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: false,
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages: messages2 } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString$1(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages2[locale] || {}
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString$1(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString$1(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString$1(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign$1({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString$1(item) ? escapeHtml(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString$1(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages: messages2, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages2[targetLocale] || {};
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales)) {
      const missingRet = handleMissing(
        context,
        key,
        targetLocale,
        missingWarn,
        type
      );
      if (missingRet !== key) {
        format2 = missingRet;
      }
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString$1(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString$1(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString$1(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign$1(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message, key);
    if (val == null && fallbackContext) {
      const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message2, key);
    }
    if (isString$1(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign$1({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString$1(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign$1({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
{
  initFeatureFlags$1();
}
/*!
  * vue-i18n v9.13.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.13.1";
function initFeatureFlags() {
  if (typeof __INTLIFY_JIT_COMPILATION__ !== "boolean") {
    getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
const code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = incrementer(code$1);
({
  FALLBACK_TO_ROOT: code$1,
  NOT_SUPPORTED_PRESERVE: inc$1(),
  NOT_SUPPORTED_FORMATTER: inc$1(),
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  IGNORE_OBJ_FLATTEN: inc$1(),
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1(),
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: inc$1()
});
const code = CoreErrorCodes.__EXTEND_POINT__;
const inc = incrementer(code);
const I18nErrorCodes = {
  UNEXPECTED_RETURN_TYPE: code,
  INVALID_ARGUMENT: inc(),
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSTALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  UNEXPECTED_ERROR: inc(),
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  __EXTEND_POINT__: inc()
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        if (!isObject$1(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
      }
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages: messages2, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages2) ? messages2 : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString$1(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages2 = isObject$1(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages2 = getLocaleMessages(gl.locale.value, {
      messages: messages2,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages2);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages2[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = inBrowser ? ref : shallowRef;
  const translateExistCompatible = !!options.translateExistCompatible;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages2 = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (true) {
        setAdditionalMeta(getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      {
        setAdditionalMeta(null);
      }
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign$1({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      (root) => root[NumberPartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString$1(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      (root) => root[DatetimePartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString$1(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return !translateExistCompatible ? isMessageAST(resolved) || isMessageFunction(resolved) || isString$1(resolved) : resolved != null;
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages3 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages3 = messageValue;
        break;
      }
    }
    return messages3;
  }
  function tm(key) {
    const messages3 = resolveMessages(key);
    return messages3 != null ? messages3 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign$1(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign$1(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages: messages2,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-t",
  props: assign$1({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString$1(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n2[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign$1({}, attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString$1(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString$1(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign$1({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString$1(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign$1({}, attrs);
    const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-n",
  props: assign$1({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n2[NumberPartsSymbol](...args));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-d",
  props: assign$1({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n2[DatetimePartsSymbol](...args));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n2, instance) {
  const i18nInternal = i18n2;
  if (i18n2.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n2.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
  }
}
function vTDirective(i18n2) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n2, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n2.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString$1(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString$1(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n2, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n2));
  }
}
const VueDevToolsLabels = {
  ["vue-devtools-plugin-vue-i18n"]: "Vue I18n devtools",
  ["vue-i18n-resource-inspector"]: "I18n Resources",
  ["vue-i18n-timeline"]: "Vue I18n"
};
const VueDevToolsPlaceholders = {
  ["vue-i18n-resource-inspector"]: "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  ["vue-i18n-timeline"]: 16764185
};
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
async function enableDevTools(app, i18n2) {
  return new Promise((resolve, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n2);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el && componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n2.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels["vue-i18n-resource-inspector"],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n2);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n2);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n2);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n2);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels["vue-i18n-timeline"],
          color: VueDevToolsTimelineColors["vue-i18n-timeline"]
        });
        resolve(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n2) {
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages2) {
  const value = {};
  Object.keys(messages2).forEach((key) => {
    const v = messages2[key];
    if (isFunction(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isMessageAST(v) && v.loc && v.loc.source) {
      value[key] = v.loc.source;
    } else if (isObject$1(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>\u0192</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n2) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  for (const [keyInstance, instance] of i18n2.__instances) {
    const composer = i18n2.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n2) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n2.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$1(nodeId, i18n2) {
  if (nodeId === "global") {
    return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  } else {
    const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n2.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString$1(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString$1(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n2 = {
      get mode() {
        return "composition";
      },
      get allowComposition() {
        return __allowComposition;
      },
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n2.__composerExtend = opts.__composerExtend;
          i18n2.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        if (__globalInjection) {
          globalReleaseHandler = injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler();
          i18n2.dispose();
          unmountApp();
        };
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          }
          const emitter = createEmitter();
          {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      __instances,
      __getInstance,
      __setInstance,
      __deleteInstance
    };
    return i18n2;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n2 = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n2);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n2, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n2;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign$1({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n2 = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n2) {
  return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
}
function getComposer(i18n2, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
}
function setupLifeCycle(i18n2, target, composer) {
  let emitter = null;
  {
    onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    onUnmounted(() => {
      const _composer = composer;
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
      const dispose = _composer[DisposeSymbol];
      if (dispose) {
        dispose();
        delete _composer[DisposeSymbol];
      }
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n2 = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n2, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n2;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
{
  initFeatureFlags();
}
if (__INTLIFY_JIT_COMPILATION__) {
  registerMessageCompiler(compile);
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
var enUS = {
  failed: "Action failed",
  success: "Action was successful"
};
var messages = {
  "en-US": enUS
};
var i18n = boot(({ app }) => {
  const i18n2 = createI18n({
    locale: "en-US",
    globalInjection: true,
    messages
  });
  app.use(i18n2);
});
export { i18n as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5hNDhjYWI1Mi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BpbnRsaWZ5L3NoYXJlZC9kaXN0L3NoYXJlZC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGludGxpZnkvbWVzc2FnZS1jb21waWxlci9kaXN0L21lc3NhZ2UtY29tcGlsZXIuZXNtLWJyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGludGxpZnkvY29yZS1iYXNlL2Rpc3QvY29yZS1iYXNlLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLnJ1bnRpbWUubWpzIiwiLi4vLi4vLi4vc3JjL2kxOG4vZW4tVVMvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvaTE4bi9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9ib290L2kxOG4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gICogc2hhcmVkIHY5LjEzLjFcbiAgKiAoYykgMjAyNCBrYXp1eWEga2F3YWd1Y2hpXG4gICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICAqL1xuLyoqXG4gKiBPcmlnaW5hbCBVdGlsaXRpZXNcbiAqIHdyaXR0ZW4gYnkga2F6dXlhIGthd2FndWNoaVxuICovXG5jb25zdCBpbkJyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBtYXJrO1xubGV0IG1lYXN1cmU7XG5pZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgY29uc3QgcGVyZiA9IGluQnJvd3NlciAmJiB3aW5kb3cucGVyZm9ybWFuY2U7XG4gICAgaWYgKHBlcmYgJiZcbiAgICAgICAgcGVyZi5tYXJrICYmXG4gICAgICAgIHBlcmYubWVhc3VyZSAmJlxuICAgICAgICBwZXJmLmNsZWFyTWFya3MgJiZcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBicm93c2VyIGNvbXBhdFxuICAgICAgICBwZXJmLmNsZWFyTWVhc3VyZXMpIHtcbiAgICAgICAgbWFyayA9ICh0YWcpID0+IHtcbiAgICAgICAgICAgIHBlcmYubWFyayh0YWcpO1xuICAgICAgICB9O1xuICAgICAgICBtZWFzdXJlID0gKG5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpID0+IHtcbiAgICAgICAgICAgIHBlcmYubWVhc3VyZShuYW1lLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICAgICAgICAgIHBlcmYuY2xlYXJNYXJrcyhzdGFydFRhZyk7XG4gICAgICAgICAgICBwZXJmLmNsZWFyTWFya3MoZW5kVGFnKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5jb25zdCBSRV9BUkdTID0gL1xceyhbMC05YS16QS1aXSspXFx9L2c7XG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuZnVuY3Rpb24gZm9ybWF0KG1lc3NhZ2UsIC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgaXNPYmplY3QoYXJnc1swXSkpIHtcbiAgICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgfVxuICAgIGlmICghYXJncyB8fCAhYXJncy5oYXNPd25Qcm9wZXJ0eSkge1xuICAgICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlLnJlcGxhY2UoUkVfQVJHUywgKG1hdGNoLCBpZGVudGlmaWVyKSA9PiB7XG4gICAgICAgIHJldHVybiBhcmdzLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpID8gYXJnc1tpZGVudGlmaWVyXSA6ICcnO1xuICAgIH0pO1xufVxuY29uc3QgbWFrZVN5bWJvbCA9IChuYW1lLCBzaGFyZWFibGUgPSBmYWxzZSkgPT4gIXNoYXJlYWJsZSA/IFN5bWJvbChuYW1lKSA6IFN5bWJvbC5mb3IobmFtZSk7XG5jb25zdCBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5ID0gKGxvY2FsZSwga2V5LCBzb3VyY2UpID0+IGZyaWVuZGx5SlNPTnN0cmluZ2lmeSh7IGw6IGxvY2FsZSwgazoga2V5LCBzOiBzb3VyY2UgfSk7XG5jb25zdCBmcmllbmRseUpTT05zdHJpbmdpZnkgPSAoanNvbikgPT4gSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAucmVwbGFjZSgvXFx1MjAyOC9nLCAnXFxcXHUyMDI4JylcbiAgICAucmVwbGFjZSgvXFx1MjAyOS9nLCAnXFxcXHUyMDI5JylcbiAgICAucmVwbGFjZSgvXFx1MDAyNy9nLCAnXFxcXHUwMDI3Jyk7XG5jb25zdCBpc051bWJlciA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCk7XG5jb25zdCBpc0RhdGUgPSAodmFsKSA9PiB0b1R5cGVTdHJpbmcodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xuY29uc3QgaXNSZWdFeHAgPSAodmFsKSA9PiB0b1R5cGVTdHJpbmcodmFsKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG5jb25zdCBpc0VtcHR5T2JqZWN0ID0gKHZhbCkgPT4gaXNQbGFpbk9iamVjdCh2YWwpICYmIE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwO1xuY29uc3QgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbmxldCBfZ2xvYmFsVGhpcztcbmNvbnN0IGdldEdsb2JhbFRoaXMgPSAoKSA9PiB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgcmV0dXJuIChfZ2xvYmFsVGhpcyB8fFxuICAgICAgICAoX2dsb2JhbFRoaXMgPVxuICAgICAgICAgICAgdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgPyBnbG9iYWxUaGlzXG4gICAgICAgICAgICAgICAgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmXG4gICAgICAgICAgICAgICAgICAgIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gd2luZG93XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBnbG9iYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9KSk7XG59O1xuZnVuY3Rpb24gZXNjYXBlSHRtbChyYXdUZXh0KSB7XG4gICAgcmV0dXJuIHJhd1RleHRcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgLnJlcGxhY2UoLycvZywgJyZhcG9zOycpO1xufVxuY29uc3QgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuLyogZXNsaW50LWVuYWJsZSAqL1xuLyoqXG4gKiBVc2VmdWwgVXRpbGl0aWVzIEJ5IEV2YW4geW91XG4gKiBNb2RpZmllZCBieSBrYXp1eWEga2F3YWd1Y2hpXG4gKiBNSVQgTGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1uZXh0L2Jsb2IvbWFzdGVyL3BhY2thZ2VzL3NoYXJlZC9zcmMvaW5kZXgudHNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtbmV4dC9ibG9iL21hc3Rlci9wYWNrYWdlcy9zaGFyZWQvc3JjL2NvZGVmcmFtZS50c1xuICovXG5jb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmNvbnN0IGlzRnVuY3Rpb24gPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNTdHJpbmcgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbmNvbnN0IGlzQm9vbGVhbiA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdib29sZWFuJztcbmNvbnN0IGlzU3ltYm9sID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ3N5bWJvbCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuY29uc3QgaXNPYmplY3QgPSAodmFsKSA9PiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuY29uc3QgaXNQcm9taXNlID0gKHZhbCkgPT4ge1xuICAgIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnRoZW4pICYmIGlzRnVuY3Rpb24odmFsLmNhdGNoKTtcbn07XG5jb25zdCBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCB0b1R5cGVTdHJpbmcgPSAodmFsdWUpID0+IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgICBpZiAoIWlzT2JqZWN0KHZhbCkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICAgIHJldHVybiBwcm90byA9PT0gbnVsbCB8fCBwcm90by5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xufTtcbi8vIGZvciBjb252ZXJ0aW5nIGxpc3QgYW5kIG5hbWVkIHZhbHVlcyB0byBkaXNwbGF5ZWQgc3RyaW5ncy5cbmNvbnN0IHRvRGlzcGxheVN0cmluZyA9ICh2YWwpID0+IHtcbiAgICByZXR1cm4gdmFsID09IG51bGxcbiAgICAgICAgPyAnJ1xuICAgICAgICA6IGlzQXJyYXkodmFsKSB8fCAoaXNQbGFpbk9iamVjdCh2YWwpICYmIHZhbC50b1N0cmluZyA9PT0gb2JqZWN0VG9TdHJpbmcpXG4gICAgICAgICAgICA/IEpTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMilcbiAgICAgICAgICAgIDogU3RyaW5nKHZhbCk7XG59O1xuZnVuY3Rpb24gam9pbihpdGVtcywgc2VwYXJhdG9yID0gJycpIHtcbiAgICByZXR1cm4gaXRlbXMucmVkdWNlKChzdHIsIGl0ZW0sIGluZGV4KSA9PiAoaW5kZXggPT09IDAgPyBzdHIgKyBpdGVtIDogc3RyICsgc2VwYXJhdG9yICsgaXRlbSksICcnKTtcbn1cbmNvbnN0IFJBTkdFID0gMjtcbmZ1bmN0aW9uIGdlbmVyYXRlQ29kZUZyYW1lKHNvdXJjZSwgc3RhcnQgPSAwLCBlbmQgPSBzb3VyY2UubGVuZ3RoKSB7XG4gICAgY29uc3QgbGluZXMgPSBzb3VyY2Uuc3BsaXQoL1xccj9cXG4vKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY291bnQgKz0gbGluZXNbaV0ubGVuZ3RoICsgMTtcbiAgICAgICAgaWYgKGNvdW50ID49IHN0YXJ0KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSAtIFJBTkdFOyBqIDw9IGkgKyBSQU5HRSB8fCBlbmQgPiBjb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGogPCAwIHx8IGogPj0gbGluZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gaiArIDE7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goYCR7bGluZX0keycgJy5yZXBlYXQoMyAtIFN0cmluZyhsaW5lKS5sZW5ndGgpfXwgICR7bGluZXNbal19YCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUxlbmd0aCA9IGxpbmVzW2pdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHVuZGVybGluZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWQgPSBzdGFydCAtIChjb3VudCAtIGxpbmVMZW5ndGgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgoMSwgZW5kID4gY291bnQgPyBsaW5lTGVuZ3RoIC0gcGFkIDogZW5kIC0gc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChgICAgfCAgYCArICcgJy5yZXBlYXQocGFkKSArICdeJy5yZXBlYXQobGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGogPiBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmQgPiBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5taW4oZW5kIC0gY291bnQsIGxpbmVMZW5ndGgpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGAgICB8ICBgICsgJ14nLnJlcGVhdChsZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSBsaW5lTGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzLmpvaW4oJ1xcbicpO1xufVxuZnVuY3Rpb24gaW5jcmVtZW50ZXIoY29kZSkge1xuICAgIGxldCBjdXJyZW50ID0gY29kZTtcbiAgICByZXR1cm4gKCkgPT4gKytjdXJyZW50O1xufVxuXG5mdW5jdGlvbiB3YXJuKG1zZywgZXJyKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLndhcm4oYFtpbnRsaWZ5XSBgICsgbXNnKTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIuc3RhY2spO1xuICAgICAgICB9XG4gICAgfVxufVxuY29uc3QgaGFzV2FybmVkID0ge307XG5mdW5jdGlvbiB3YXJuT25jZShtc2cpIHtcbiAgICBpZiAoIWhhc1dhcm5lZFttc2ddKSB7XG4gICAgICAgIGhhc1dhcm5lZFttc2ddID0gdHJ1ZTtcbiAgICAgICAgd2Fybihtc2cpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBFdmVudCBlbWl0dGVyLCBmb3JrZWQgZnJvbSB0aGUgYmVsb3c6XG4gKiAtIG9yaWdpbmFsIHJlcG9zaXRvcnkgdXJsOiBodHRwczovL2dpdGh1Yi5jb20vZGV2ZWxvcGl0L21pdHRcbiAqIC0gY29kZSB1cmw6IGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvbWl0dC9ibG9iL21hc3Rlci9zcmMvaW5kZXgudHNcbiAqIC0gYXV0aG9yOiBKYXNvbiBNaWxsZXIgKGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQpXG4gKiAtIGxpY2Vuc2U6IE1JVFxuICovXG4vKipcbiAqIENyZWF0ZSBhIGV2ZW50IGVtaXR0ZXJcbiAqXG4gKiBAcmV0dXJucyBBbiBldmVudCBlbWl0dGVyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVtaXR0ZXIoKSB7XG4gICAgY29uc3QgZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGVtaXR0ZXIgPSB7XG4gICAgICAgIGV2ZW50cyxcbiAgICAgICAgb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJzID0gZXZlbnRzLmdldChldmVudCk7XG4gICAgICAgICAgICBjb25zdCBhZGRlZCA9IGhhbmRsZXJzICYmIGhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgICAgICAgICBpZiAoIWFkZGVkKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLnNldChldmVudCwgW2hhbmRsZXJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2ZmKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVycyA9IGV2ZW50cy5nZXQoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcikgPj4+IDAsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbWl0KGV2ZW50LCBwYXlsb2FkKSB7XG4gICAgICAgICAgICAoZXZlbnRzLmdldChldmVudCkgfHwgW10pXG4gICAgICAgICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAgICAgICAubWFwKGhhbmRsZXIgPT4gaGFuZGxlcihwYXlsb2FkKSk7XG4gICAgICAgICAgICAoZXZlbnRzLmdldCgnKicpIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5zbGljZSgpXG4gICAgICAgICAgICAgICAgLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoZXZlbnQsIHBheWxvYWQpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbmNvbnN0IGlzTm90T2JqZWN0T3JJc0FycmF5ID0gKHZhbCkgPT4gIWlzT2JqZWN0KHZhbCkgfHwgaXNBcnJheSh2YWwpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIGRlZXBDb3B5KHNyYywgZGVzKSB7XG4gICAgLy8gc3JjIGFuZCBkZXMgc2hvdWxkIGJvdGggYmUgb2JqZWN0cywgYW5kIG5vbmUgb2YgdGhlbSBjYW4gYmUgYSBhcnJheVxuICAgIGlmIChpc05vdE9iamVjdE9ySXNBcnJheShzcmMpIHx8IGlzTm90T2JqZWN0T3JJc0FycmF5KGRlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlJyk7XG4gICAgfVxuICAgIGNvbnN0IHN0YWNrID0gW3sgc3JjLCBkZXMgfV07XG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICBjb25zdCB7IHNyYywgZGVzIH0gPSBzdGFjay5wb3AoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoc3JjKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNOb3RPYmplY3RPcklzQXJyYXkoc3JjW2tleV0pIHx8IGlzTm90T2JqZWN0T3JJc0FycmF5KGRlc1trZXldKSkge1xuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2Ugd2l0aCBzcmNba2V5XSB3aGVuOlxuICAgICAgICAgICAgICAgIC8vIHNyY1trZXldIG9yIGRlc1trZXldIGlzIG5vdCBhbiBvYmplY3QsIG9yXG4gICAgICAgICAgICAgICAgLy8gc3JjW2tleV0gb3IgZGVzW2tleV0gaXMgYW4gYXJyYXlcbiAgICAgICAgICAgICAgICBkZXNba2V5XSA9IHNyY1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3JjW2tleV0gYW5kIGRlc1trZXldIGFyZSBib3RoIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHsgc3JjOiBzcmNba2V5XSwgZGVzOiBkZXNba2V5XSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBhc3NpZ24sIGNyZWF0ZUVtaXR0ZXIsIGRlZXBDb3B5LCBlc2NhcGVIdG1sLCBmb3JtYXQsIGZyaWVuZGx5SlNPTnN0cmluZ2lmeSwgZ2VuZXJhdGVDb2RlRnJhbWUsIGdlbmVyYXRlRm9ybWF0Q2FjaGVLZXksIGdldEdsb2JhbFRoaXMsIGhhc093biwgaW5Ccm93c2VyLCBpbmNyZW1lbnRlciwgaXNBcnJheSwgaXNCb29sZWFuLCBpc0RhdGUsIGlzRW1wdHlPYmplY3QsIGlzRnVuY3Rpb24sIGlzTnVtYmVyLCBpc09iamVjdCwgaXNQbGFpbk9iamVjdCwgaXNQcm9taXNlLCBpc1JlZ0V4cCwgaXNTdHJpbmcsIGlzU3ltYm9sLCBqb2luLCBtYWtlU3ltYm9sLCBtYXJrLCBtZWFzdXJlLCBvYmplY3RUb1N0cmluZywgdG9EaXNwbGF5U3RyaW5nLCB0b1R5cGVTdHJpbmcsIHdhcm4sIHdhcm5PbmNlIH07XG4iLCIvKiFcbiAgKiBtZXNzYWdlLWNvbXBpbGVyIHY5LjEzLjFcbiAgKiAoYykgMjAyNCBrYXp1eWEga2F3YWd1Y2hpXG4gICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICAqL1xuY29uc3QgTE9DQVRJT05fU1RVQiA9IHtcbiAgICBzdGFydDogeyBsaW5lOiAxLCBjb2x1bW46IDEsIG9mZnNldDogMCB9LFxuICAgIGVuZDogeyBsaW5lOiAxLCBjb2x1bW46IDEsIG9mZnNldDogMCB9XG59O1xuZnVuY3Rpb24gY3JlYXRlUG9zaXRpb24obGluZSwgY29sdW1uLCBvZmZzZXQpIHtcbiAgICByZXR1cm4geyBsaW5lLCBjb2x1bW4sIG9mZnNldCB9O1xufVxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oc3RhcnQsIGVuZCwgc291cmNlKSB7XG4gICAgY29uc3QgbG9jID0geyBzdGFydCwgZW5kIH07XG4gICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgIGxvYy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIHJldHVybiBsb2M7XG59XG5cbi8qKlxuICogT3JpZ2luYWwgVXRpbGl0aWVzXG4gKiB3cml0dGVuIGJ5IGthenV5YSBrYXdhZ3VjaGlcbiAqL1xuY29uc3QgUkVfQVJHUyA9IC9cXHsoWzAtOWEtekEtWl0rKVxcfS9nO1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmZ1bmN0aW9uIGZvcm1hdChtZXNzYWdlLCAuLi5hcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGlzT2JqZWN0KGFyZ3NbMF0pKSB7XG4gICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgIH1cbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcbiAgICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKFJFX0FSR1MsIChtYXRjaCwgaWRlbnRpZmllcikgPT4ge1xuICAgICAgICByZXR1cm4gYXJncy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSA/IGFyZ3NbaWRlbnRpZmllcl0gOiAnJztcbiAgICB9KTtcbn1cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5jb25zdCBpc1N0cmluZyA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmNvbnN0IGlzT2JqZWN0ID0gKHZhbCkgPT4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xuZnVuY3Rpb24gam9pbihpdGVtcywgc2VwYXJhdG9yID0gJycpIHtcbiAgICByZXR1cm4gaXRlbXMucmVkdWNlKChzdHIsIGl0ZW0sIGluZGV4KSA9PiAoaW5kZXggPT09IDAgPyBzdHIgKyBpdGVtIDogc3RyICsgc2VwYXJhdG9yICsgaXRlbSksICcnKTtcbn1cblxuY29uc3QgQ29tcGlsZVdhcm5Db2RlcyA9IHtcbiAgICBVU0VfTU9EVUxPX1NZTlRBWDogMSxcbiAgICBfX0VYVEVORF9QT0lOVF9fOiAyXG59O1xuLyoqIEBpbnRlcm5hbCAqL1xuY29uc3Qgd2Fybk1lc3NhZ2VzID0ge1xuICAgIFtDb21waWxlV2FybkNvZGVzLlVTRV9NT0RVTE9fU1lOVEFYXTogYFVzZSBtb2R1bG8gYmVmb3JlICd7ezB9fScuYFxufTtcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVXYXJuKGNvZGUsIGxvYywgLi4uYXJncykge1xuICAgIGNvbnN0IG1zZyA9IGZvcm1hdCh3YXJuTWVzc2FnZXNbY29kZV0gfHwgJycsIC4uLihhcmdzIHx8IFtdKSkgO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB7IG1lc3NhZ2U6IFN0cmluZyhtc2cpLCBjb2RlIH07XG4gICAgaWYgKGxvYykge1xuICAgICAgICBtZXNzYWdlLmxvY2F0aW9uID0gbG9jO1xuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuY29uc3QgQ29tcGlsZUVycm9yQ29kZXMgPSB7XG4gICAgLy8gdG9rZW5pemVyIGVycm9yIGNvZGVzXG4gICAgRVhQRUNURURfVE9LRU46IDEsXG4gICAgSU5WQUxJRF9UT0tFTl9JTl9QTEFDRUhPTERFUjogMixcbiAgICBVTlRFUk1JTkFURURfU0lOR0xFX1FVT1RFX0lOX1BMQUNFSE9MREVSOiAzLFxuICAgIFVOS05PV05fRVNDQVBFX1NFUVVFTkNFOiA0LFxuICAgIElOVkFMSURfVU5JQ09ERV9FU0NBUEVfU0VRVUVOQ0U6IDUsXG4gICAgVU5CQUxBTkNFRF9DTE9TSU5HX0JSQUNFOiA2LFxuICAgIFVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFOiA3LFxuICAgIEVNUFRZX1BMQUNFSE9MREVSOiA4LFxuICAgIE5PVF9BTExPV19ORVNUX1BMQUNFSE9MREVSOiA5LFxuICAgIElOVkFMSURfTElOS0VEX0ZPUk1BVDogMTAsXG4gICAgLy8gcGFyc2VyIGVycm9yIGNvZGVzXG4gICAgTVVTVF9IQVZFX01FU1NBR0VTX0lOX1BMVVJBTDogMTEsXG4gICAgVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfTU9ESUZJRVI6IDEyLFxuICAgIFVORVhQRUNURURfRU1QVFlfTElOS0VEX0tFWTogMTMsXG4gICAgVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTOiAxNCxcbiAgICAvLyBnZW5lcmF0b3IgZXJyb3IgY29kZXNcbiAgICBVTkhBTkRMRURfQ09ERUdFTl9OT0RFX1RZUEU6IDE1LFxuICAgIC8vIG1pbmlmaWVyIGVycm9yIGNvZGVzXG4gICAgVU5IQU5ETEVEX01JTklGSUVSX05PREVfVFlQRTogMTYsXG4gICAgLy8gU3BlY2lhbCB2YWx1ZSBmb3IgaGlnaGVyLW9yZGVyIGNvbXBpbGVycyB0byBwaWNrIHVwIHRoZSBsYXN0IGNvZGVcbiAgICAvLyB0byBhdm9pZCBjb2xsaXNpb24gb2YgZXJyb3IgY29kZXMuIFRoaXMgc2hvdWxkIGFsd2F5cyBiZSBrZXB0IGFzIHRoZSBsYXN0XG4gICAgLy8gaXRlbS5cbiAgICBfX0VYVEVORF9QT0lOVF9fOiAxN1xufTtcbi8qKiBAaW50ZXJuYWwgKi9cbmNvbnN0IGVycm9yTWVzc2FnZXMgPSB7XG4gICAgLy8gdG9rZW5pemVyIGVycm9yIG1lc3NhZ2VzXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLkVYUEVDVEVEX1RPS0VOXTogYEV4cGVjdGVkIHRva2VuOiAnezB9J2AsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVE9LRU5fSU5fUExBQ0VIT0xERVJdOiBgSW52YWxpZCB0b2tlbiBpbiBwbGFjZWhvbGRlcjogJ3swfSdgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfU0lOR0xFX1FVT1RFX0lOX1BMQUNFSE9MREVSXTogYFVudGVybWluYXRlZCBzaW5nbGUgcXVvdGUgaW4gcGxhY2Vob2xkZXJgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTktOT1dOX0VTQ0FQRV9TRVFVRU5DRV06IGBVbmtub3duIGVzY2FwZSBzZXF1ZW5jZTogXFxcXHswfWAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVU5JQ09ERV9FU0NBUEVfU0VRVUVOQ0VdOiBgSW52YWxpZCB1bmljb2RlIGVzY2FwZSBzZXF1ZW5jZTogezB9YCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5CQUxBTkNFRF9DTE9TSU5HX0JSQUNFXTogYFVuYmFsYW5jZWQgY2xvc2luZyBicmFjZWAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFXTogYFVudGVybWluYXRlZCBjbG9zaW5nIGJyYWNlYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuRU1QVFlfUExBQ0VIT0xERVJdOiBgRW1wdHkgcGxhY2Vob2xkZXJgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5OT1RfQUxMT1dfTkVTVF9QTEFDRUhPTERFUl06IGBOb3QgYWxsb3dlZCBuZXN0IHBsYWNlaG9sZGVyYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9MSU5LRURfRk9STUFUXTogYEludmFsaWQgbGlua2VkIGZvcm1hdGAsXG4gICAgLy8gcGFyc2VyIGVycm9yIG1lc3NhZ2VzXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLk1VU1RfSEFWRV9NRVNTQUdFU19JTl9QTFVSQUxdOiBgUGx1cmFsIG11c3QgaGF2ZSBtZXNzYWdlc2AsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfRU1QVFlfTElOS0VEX01PRElGSUVSXTogYFVuZXhwZWN0ZWQgZW1wdHkgbGlua2VkIG1vZGlmaWVyYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfS0VZXTogYFVuZXhwZWN0ZWQgZW1wdHkgbGlua2VkIGtleWAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJU106IGBVbmV4cGVjdGVkIGxleGljYWwgYW5hbHlzaXMgaW4gdG9rZW46ICd7MH0nYCxcbiAgICAvLyBnZW5lcmF0b3IgZXJyb3IgbWVzc2FnZXNcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5IQU5ETEVEX0NPREVHRU5fTk9ERV9UWVBFXTogYHVuaGFuZGxlZCBjb2RlZ2VuIG5vZGUgdHlwZTogJ3swfSdgLFxuICAgIC8vIG1pbmltaXplciBlcnJvciBtZXNzYWdlc1xuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTkhBTkRMRURfTUlOSUZJRVJfTk9ERV9UWVBFXTogYHVuaGFuZGxlZCBtaW1pZmllciBub2RlIHR5cGU6ICd7MH0nYFxufTtcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVFcnJvcihjb2RlLCBsb2MsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHsgZG9tYWluLCBtZXNzYWdlcywgYXJncyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBtc2cgPSBmb3JtYXQoKG1lc3NhZ2VzIHx8IGVycm9yTWVzc2FnZXMpW2NvZGVdIHx8ICcnLCAuLi4oYXJncyB8fCBbXSkpXG4gICAgICAgIDtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBTeW50YXhFcnJvcihTdHJpbmcobXNnKSk7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gICAgaWYgKGxvYykge1xuICAgICAgICBlcnJvci5sb2NhdGlvbiA9IGxvYztcbiAgICB9XG4gICAgZXJyb3IuZG9tYWluID0gZG9tYWluO1xuICAgIHJldHVybiBlcnJvcjtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGRlZmF1bHRPbkVycm9yKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuY29uc3QgUkVfSFRNTF9UQUcgPSAvPFxcLz9bXFx3XFxzPVwiLy4nOjsjLVxcL10rPi87XG5jb25zdCBkZXRlY3RIdG1sVGFnID0gKHNvdXJjZSkgPT4gUkVfSFRNTF9UQUcudGVzdChzb3VyY2UpO1xuXG5jb25zdCBDSEFSX1NQID0gJyAnO1xuY29uc3QgQ0hBUl9DUiA9ICdcXHInO1xuY29uc3QgQ0hBUl9MRiA9ICdcXG4nO1xuY29uc3QgQ0hBUl9MUyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHgyMDI4KTtcbmNvbnN0IENIQVJfUFMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4MjAyOSk7XG5mdW5jdGlvbiBjcmVhdGVTY2FubmVyKHN0cikge1xuICAgIGNvbnN0IF9idWYgPSBzdHI7XG4gICAgbGV0IF9pbmRleCA9IDA7XG4gICAgbGV0IF9saW5lID0gMTtcbiAgICBsZXQgX2NvbHVtbiA9IDE7XG4gICAgbGV0IF9wZWVrT2Zmc2V0ID0gMDtcbiAgICBjb25zdCBpc0NSTEYgPSAoaW5kZXgpID0+IF9idWZbaW5kZXhdID09PSBDSEFSX0NSICYmIF9idWZbaW5kZXggKyAxXSA9PT0gQ0hBUl9MRjtcbiAgICBjb25zdCBpc0xGID0gKGluZGV4KSA9PiBfYnVmW2luZGV4XSA9PT0gQ0hBUl9MRjtcbiAgICBjb25zdCBpc1BTID0gKGluZGV4KSA9PiBfYnVmW2luZGV4XSA9PT0gQ0hBUl9QUztcbiAgICBjb25zdCBpc0xTID0gKGluZGV4KSA9PiBfYnVmW2luZGV4XSA9PT0gQ0hBUl9MUztcbiAgICBjb25zdCBpc0xpbmVFbmQgPSAoaW5kZXgpID0+IGlzQ1JMRihpbmRleCkgfHwgaXNMRihpbmRleCkgfHwgaXNQUyhpbmRleCkgfHwgaXNMUyhpbmRleCk7XG4gICAgY29uc3QgaW5kZXggPSAoKSA9PiBfaW5kZXg7XG4gICAgY29uc3QgbGluZSA9ICgpID0+IF9saW5lO1xuICAgIGNvbnN0IGNvbHVtbiA9ICgpID0+IF9jb2x1bW47XG4gICAgY29uc3QgcGVla09mZnNldCA9ICgpID0+IF9wZWVrT2Zmc2V0O1xuICAgIGNvbnN0IGNoYXJBdCA9IChvZmZzZXQpID0+IGlzQ1JMRihvZmZzZXQpIHx8IGlzUFMob2Zmc2V0KSB8fCBpc0xTKG9mZnNldCkgPyBDSEFSX0xGIDogX2J1ZltvZmZzZXRdO1xuICAgIGNvbnN0IGN1cnJlbnRDaGFyID0gKCkgPT4gY2hhckF0KF9pbmRleCk7XG4gICAgY29uc3QgY3VycmVudFBlZWsgPSAoKSA9PiBjaGFyQXQoX2luZGV4ICsgX3BlZWtPZmZzZXQpO1xuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIF9wZWVrT2Zmc2V0ID0gMDtcbiAgICAgICAgaWYgKGlzTGluZUVuZChfaW5kZXgpKSB7XG4gICAgICAgICAgICBfbGluZSsrO1xuICAgICAgICAgICAgX2NvbHVtbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ1JMRihfaW5kZXgpKSB7XG4gICAgICAgICAgICBfaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBfaW5kZXgrKztcbiAgICAgICAgX2NvbHVtbisrO1xuICAgICAgICByZXR1cm4gX2J1ZltfaW5kZXhdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwZWVrKCkge1xuICAgICAgICBpZiAoaXNDUkxGKF9pbmRleCArIF9wZWVrT2Zmc2V0KSkge1xuICAgICAgICAgICAgX3BlZWtPZmZzZXQrKztcbiAgICAgICAgfVxuICAgICAgICBfcGVla09mZnNldCsrO1xuICAgICAgICByZXR1cm4gX2J1ZltfaW5kZXggKyBfcGVla09mZnNldF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICBfaW5kZXggPSAwO1xuICAgICAgICBfbGluZSA9IDE7XG4gICAgICAgIF9jb2x1bW4gPSAxO1xuICAgICAgICBfcGVla09mZnNldCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2V0UGVlayhvZmZzZXQgPSAwKSB7XG4gICAgICAgIF9wZWVrT2Zmc2V0ID0gb2Zmc2V0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBza2lwVG9QZWVrKCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBfaW5kZXggKyBfcGVla09mZnNldDtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgd2hpbGUgKHRhcmdldCAhPT0gX2luZGV4KSB7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgX3BlZWtPZmZzZXQgPSAwO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBpbmRleCxcbiAgICAgICAgbGluZSxcbiAgICAgICAgY29sdW1uLFxuICAgICAgICBwZWVrT2Zmc2V0LFxuICAgICAgICBjaGFyQXQsXG4gICAgICAgIGN1cnJlbnRDaGFyLFxuICAgICAgICBjdXJyZW50UGVlayxcbiAgICAgICAgbmV4dCxcbiAgICAgICAgcGVlayxcbiAgICAgICAgcmVzZXQsXG4gICAgICAgIHJlc2V0UGVlayxcbiAgICAgICAgc2tpcFRvUGVla1xuICAgIH07XG59XG5cbmNvbnN0IEVPRiA9IHVuZGVmaW5lZDtcbmNvbnN0IERPVCA9ICcuJztcbmNvbnN0IExJVEVSQUxfREVMSU1JVEVSID0gXCInXCI7XG5jb25zdCBFUlJPUl9ET01BSU4kMyA9ICd0b2tlbml6ZXInO1xuZnVuY3Rpb24gY3JlYXRlVG9rZW5pemVyKHNvdXJjZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uICE9PSBmYWxzZTtcbiAgICBjb25zdCBfc2NuciA9IGNyZWF0ZVNjYW5uZXIoc291cmNlKTtcbiAgICBjb25zdCBjdXJyZW50T2Zmc2V0ID0gKCkgPT4gX3NjbnIuaW5kZXgoKTtcbiAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSAoKSA9PiBjcmVhdGVQb3NpdGlvbihfc2Nuci5saW5lKCksIF9zY25yLmNvbHVtbigpLCBfc2Nuci5pbmRleCgpKTtcbiAgICBjb25zdCBfaW5pdExvYyA9IGN1cnJlbnRQb3NpdGlvbigpO1xuICAgIGNvbnN0IF9pbml0T2Zmc2V0ID0gY3VycmVudE9mZnNldCgpO1xuICAgIGNvbnN0IF9jb250ZXh0ID0ge1xuICAgICAgICBjdXJyZW50VHlwZTogMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8sXG4gICAgICAgIG9mZnNldDogX2luaXRPZmZzZXQsXG4gICAgICAgIHN0YXJ0TG9jOiBfaW5pdExvYyxcbiAgICAgICAgZW5kTG9jOiBfaW5pdExvYyxcbiAgICAgICAgbGFzdFR5cGU6IDE0IC8qIFRva2VuVHlwZXMuRU9GICovLFxuICAgICAgICBsYXN0T2Zmc2V0OiBfaW5pdE9mZnNldCxcbiAgICAgICAgbGFzdFN0YXJ0TG9jOiBfaW5pdExvYyxcbiAgICAgICAgbGFzdEVuZExvYzogX2luaXRMb2MsXG4gICAgICAgIGJyYWNlTmVzdDogMCxcbiAgICAgICAgaW5MaW5rZWQ6IGZhbHNlLFxuICAgICAgICB0ZXh0OiAnJ1xuICAgIH07XG4gICAgY29uc3QgY29udGV4dCA9ICgpID0+IF9jb250ZXh0O1xuICAgIGNvbnN0IHsgb25FcnJvciB9ID0gb3B0aW9ucztcbiAgICBmdW5jdGlvbiBlbWl0RXJyb3IoY29kZSwgcG9zLCBvZmZzZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gY29udGV4dCgpO1xuICAgICAgICBwb3MuY29sdW1uICs9IG9mZnNldDtcbiAgICAgICAgcG9zLm9mZnNldCArPSBvZmZzZXQ7XG4gICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBsb2MgPSBsb2NhdGlvbiA/IGNyZWF0ZUxvY2F0aW9uKGN0eC5zdGFydExvYywgcG9zKSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbG9jLCB7XG4gICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4kMyxcbiAgICAgICAgICAgICAgICBhcmdzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRUb2tlbihjb250ZXh0LCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICBjb250ZXh0LmVuZExvYyA9IGN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICBjb250ZXh0LmN1cnJlbnRUeXBlID0gdHlwZTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB7IHR5cGUgfTtcbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICB0b2tlbi5sb2MgPSBjcmVhdGVMb2NhdGlvbihjb250ZXh0LnN0YXJ0TG9jLCBjb250ZXh0LmVuZExvYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRva2VuLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgICBjb25zdCBnZXRFbmRUb2tlbiA9IChjb250ZXh0KSA9PiBnZXRUb2tlbihjb250ZXh0LCAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLyk7XG4gICAgZnVuY3Rpb24gZWF0KHNjbnIsIGNoKSB7XG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09IGNoKSB7XG4gICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgIHJldHVybiBjaDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5FWFBFQ1RFRF9UT0tFTiwgY3VycmVudFBvc2l0aW9uKCksIDAsIGNoKTtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwZWVrU3BhY2VzKHNjbnIpIHtcbiAgICAgICAgbGV0IGJ1ZiA9ICcnO1xuICAgICAgICB3aGlsZSAoc2Nuci5jdXJyZW50UGVlaygpID09PSBDSEFSX1NQIHx8IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgYnVmICs9IHNjbnIuY3VycmVudFBlZWsoKTtcbiAgICAgICAgICAgIHNjbnIucGVlaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNraXBTcGFjZXMoc2Nucikge1xuICAgICAgICBjb25zdCBidWYgPSBwZWVrU3BhY2VzKHNjbnIpO1xuICAgICAgICBzY25yLnNraXBUb1BlZWsoKTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNJZGVudGlmaWVyU3RhcnQoY2gpIHtcbiAgICAgICAgaWYgKGNoID09PSBFT0YpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYyA9IGNoLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIHJldHVybiAoKGNjID49IDk3ICYmIGNjIDw9IDEyMikgfHwgLy8gYS16XG4gICAgICAgICAgICAoY2MgPj0gNjUgJiYgY2MgPD0gOTApIHx8IC8vIEEtWlxuICAgICAgICAgICAgY2MgPT09IDk1IC8vIF9cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNOdW1iZXJTdGFydChjaCkge1xuICAgICAgICBpZiAoY2ggPT09IEVPRikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuIGNjID49IDQ4ICYmIGNjIDw9IDU3OyAvLyAwLTlcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNOYW1lZElkZW50aWZpZXJTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IHJldCA9IGlzSWRlbnRpZmllclN0YXJ0KHNjbnIuY3VycmVudFBlZWsoKSk7XG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTGlzdElkZW50aWZpZXJTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50UGVlaygpID09PSAnLScgPyBzY25yLnBlZWsoKSA6IHNjbnIuY3VycmVudFBlZWsoKTtcbiAgICAgICAgY29uc3QgcmV0ID0gaXNOdW1iZXJTdGFydChjaCk7XG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTGl0ZXJhbFN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSAyIC8qIFRva2VuVHlwZXMuQnJhY2VMZWZ0ICovKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBMSVRFUkFMX0RFTElNSVRFUjtcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaW5rZWREb3RTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gOCAvKiBUb2tlblR5cGVzLkxpbmtlZEFsaWFzICovKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBcIi5cIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERvdCAqLztcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaW5rZWRNb2RpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSA5IC8qIFRva2VuVHlwZXMuTGlua2VkRG90ICovKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gaXNJZGVudGlmaWVyU3RhcnQoc2Nuci5jdXJyZW50UGVlaygpKTtcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaW5rZWREZWxpbWl0ZXJTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmICghKGN1cnJlbnRUeXBlID09PSA4IC8qIFRva2VuVHlwZXMuTGlua2VkQWxpYXMgKi8gfHxcbiAgICAgICAgICAgIGN1cnJlbnRUeXBlID09PSAxMiAvKiBUb2tlblR5cGVzLkxpbmtlZE1vZGlmaWVyICovKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCI6XCIgLyogVG9rZW5DaGFycy5MaW5rZWREZWxpbWl0ZXIgKi87XG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTGlua2VkUmVmZXJTdGFydChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMTAgLyogVG9rZW5UeXBlcy5MaW5rZWREZWxpbWl0ZXIgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50UGVlaygpO1xuICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0lkZW50aWZpZXJTdGFydChzY25yLnBlZWsoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcInxcIiAvKiBUb2tlbkNoYXJzLlBpcGUgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCI6XCIgLyogVG9rZW5DaGFycy5MaW5rZWREZWxpbWl0ZXIgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIuXCIgLyogVG9rZW5DaGFycy5MaW5rZWREb3QgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gQ0hBUl9TUCB8fFxuICAgICAgICAgICAgICAgICFjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX0xGKSB7XG4gICAgICAgICAgICAgICAgc2Nuci5wZWVrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvdGhlciBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVGV4dFN0YXJ0KHNjbnIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmV0ID0gZm4oKTtcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNQbHVyYWxTdGFydChzY25yKSB7XG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCJ8XCIgLyogVG9rZW5DaGFycy5QaXBlICovO1xuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZXRlY3RNb2R1bG9TdGFydChzY25yKSB7XG4gICAgICAgIGNvbnN0IHNwYWNlcyA9IHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8gJiZcbiAgICAgICAgICAgIHNjbnIucGVlaygpID09PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLztcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTW9kdWxvOiByZXQsXG4gICAgICAgICAgICBoYXNTcGFjZTogc3BhY2VzLmxlbmd0aCA+IDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNUZXh0U3RhcnQoc2NuciwgcmVzZXQgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGZuID0gKGhhc1NwYWNlID0gZmFsc2UsIHByZXYgPSAnJywgZGV0ZWN0TW9kdWxvID0gZmFsc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50UGVlaygpO1xuICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLyA/IGZhbHNlIDogaGFzU3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLyB8fCAhY2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8gPyB0cnVlIDogaGFzU3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8pIHtcbiAgICAgICAgICAgICAgICBzY25yLnBlZWsoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oaGFzU3BhY2UsIFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcInxcIiAvKiBUb2tlbkNoYXJzLlBpcGUgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8gfHwgZGV0ZWN0TW9kdWxvXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICA6ICEocHJldiA9PT0gQ0hBUl9TUCB8fCBwcmV2ID09PSBDSEFSX0xGKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX1NQKSB7XG4gICAgICAgICAgICAgICAgc2Nuci5wZWVrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHRydWUsIENIQVJfU1AsIGRldGVjdE1vZHVsbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgICAgIHNjbnIucGVlaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmbih0cnVlLCBDSEFSX0xGLCBkZXRlY3RNb2R1bG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJldCA9IGZuKCk7XG4gICAgICAgIHJlc2V0ICYmIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRha2VDaGFyKHNjbnIsIGZuKSB7XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xuICAgICAgICBpZiAoY2ggPT09IEVPRikge1xuICAgICAgICAgICAgcmV0dXJuIEVPRjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm4oY2gpKSB7XG4gICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgIHJldHVybiBjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNJZGVudGlmaWVyKGNoKSB7XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuICgoY2MgPj0gOTcgJiYgY2MgPD0gMTIyKSB8fCAvLyBhLXpcbiAgICAgICAgICAgIChjYyA+PSA2NSAmJiBjYyA8PSA5MCkgfHwgLy8gQS1aXG4gICAgICAgICAgICAoY2MgPj0gNDggJiYgY2MgPD0gNTcpIHx8IC8vIDAtOVxuICAgICAgICAgICAgY2MgPT09IDk1IHx8IC8vIF9cbiAgICAgICAgICAgIGNjID09PSAzNiAvLyAkXG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRha2VJZGVudGlmaWVyQ2hhcihzY25yKSB7XG4gICAgICAgIHJldHVybiB0YWtlQ2hhcihzY25yLCBpc0lkZW50aWZpZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc05hbWVkSWRlbnRpZmllcihjaCkge1xuICAgICAgICBjb25zdCBjYyA9IGNoLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIHJldHVybiAoKGNjID49IDk3ICYmIGNjIDw9IDEyMikgfHwgLy8gYS16XG4gICAgICAgICAgICAoY2MgPj0gNjUgJiYgY2MgPD0gOTApIHx8IC8vIEEtWlxuICAgICAgICAgICAgKGNjID49IDQ4ICYmIGNjIDw9IDU3KSB8fCAvLyAwLTlcbiAgICAgICAgICAgIGNjID09PSA5NSB8fCAvLyBfXG4gICAgICAgICAgICBjYyA9PT0gMzYgfHwgLy8gJFxuICAgICAgICAgICAgY2MgPT09IDQ1IC8vIC1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGFrZU5hbWVkSWRlbnRpZmllckNoYXIoc2Nucikge1xuICAgICAgICByZXR1cm4gdGFrZUNoYXIoc2NuciwgaXNOYW1lZElkZW50aWZpZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0RpZ2l0KGNoKSB7XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuIGNjID49IDQ4ICYmIGNjIDw9IDU3OyAvLyAwLTlcbiAgICB9XG4gICAgZnVuY3Rpb24gdGFrZURpZ2l0KHNjbnIpIHtcbiAgICAgICAgcmV0dXJuIHRha2VDaGFyKHNjbnIsIGlzRGlnaXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0hleERpZ2l0KGNoKSB7XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuICgoY2MgPj0gNDggJiYgY2MgPD0gNTcpIHx8IC8vIDAtOVxuICAgICAgICAgICAgKGNjID49IDY1ICYmIGNjIDw9IDcwKSB8fCAvLyBBLUZcbiAgICAgICAgICAgIChjYyA+PSA5NyAmJiBjYyA8PSAxMDIpKTsgLy8gYS1mXG4gICAgfVxuICAgIGZ1bmN0aW9uIHRha2VIZXhEaWdpdChzY25yKSB7XG4gICAgICAgIHJldHVybiB0YWtlQ2hhcihzY25yLCBpc0hleERpZ2l0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RGlnaXRzKHNjbnIpIHtcbiAgICAgICAgbGV0IGNoID0gJyc7XG4gICAgICAgIGxldCBudW0gPSAnJztcbiAgICAgICAgd2hpbGUgKChjaCA9IHRha2VEaWdpdChzY25yKSkpIHtcbiAgICAgICAgICAgIG51bSArPSBjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkTW9kdWxvKHNjbnIpIHtcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgIGlmIChjaCAhPT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8pIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5FWFBFQ1RFRF9UT0tFTiwgY3VycmVudFBvc2l0aW9uKCksIDAsIGNoKTtcbiAgICAgICAgfVxuICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgcmV0dXJuIFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkVGV4dChzY25yKSB7XG4gICAgICAgIGxldCBidWYgPSAnJztcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwifFwiIC8qIFRva2VuQ2hhcnMuUGlwZSAqLyB8fFxuICAgICAgICAgICAgICAgICFjaCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVGV4dFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZiArPSBjaDtcbiAgICAgICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gQ0hBUl9TUCB8fCBjaCA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgICAgIGlmIChpc1RleHRTdGFydChzY25yKSkge1xuICAgICAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmICs9IGNoO1xuICAgICAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZE5hbWVkSWRlbnRpZmllcihzY25yKSB7XG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgIGxldCBjaCA9ICcnO1xuICAgICAgICBsZXQgbmFtZSA9ICcnO1xuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZU5hbWVkSWRlbnRpZmllckNoYXIoc2NucikpKSB7XG4gICAgICAgICAgICBuYW1lICs9IGNoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09IEVPRikge1xuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRMaXN0SWRlbnRpZmllcihzY25yKSB7XG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgICAgICBpZiAoc2Nuci5jdXJyZW50Q2hhcigpID09PSAnLScpIHtcbiAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgdmFsdWUgKz0gYC0ke2dldERpZ2l0cyhzY25yKX1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgKz0gZ2V0RGlnaXRzKHNjbnIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09IEVPRikge1xuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0xpdGVyYWwoY2gpIHtcbiAgICAgICAgcmV0dXJuIGNoICE9PSBMSVRFUkFMX0RFTElNSVRFUiAmJiBjaCAhPT0gQ0hBUl9MRjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZExpdGVyYWwoc2Nucikge1xuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgICAgZWF0KHNjbnIsIGBcXCdgKTtcbiAgICAgICAgbGV0IGNoID0gJyc7XG4gICAgICAgIGxldCBsaXRlcmFsID0gJyc7XG4gICAgICAgIHdoaWxlICgoY2ggPSB0YWtlQ2hhcihzY25yLCBpc0xpdGVyYWwpKSkge1xuICAgICAgICAgICAgaWYgKGNoID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICBsaXRlcmFsICs9IHJlYWRFc2NhcGVTZXF1ZW5jZShzY25yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpdGVyYWwgKz0gY2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudCA9IHNjbnIuY3VycmVudENoYXIoKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IENIQVJfTEYgfHwgY3VycmVudCA9PT0gRU9GKSB7XG4gICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX1NJTkdMRV9RVU9URV9JTl9QTEFDRUhPTERFUiwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICAgICAgLy8gVE9ETzogSXMgaXQgY29ycmVjdCByZWFsbHk/XG4gICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgICAgICAgICAgICAgIGVhdChzY25yLCBgXFwnYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGl0ZXJhbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgICAgZWF0KHNjbnIsIGBcXCdgKTtcbiAgICAgICAgcmV0dXJuIGxpdGVyYWw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRFc2NhcGVTZXF1ZW5jZShzY25yKSB7XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgICAgICBjYXNlICdcXFxcJzpcbiAgICAgICAgICAgIGNhc2UgYFxcJ2A6IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYFxcXFwke2NofWA7XG4gICAgICAgICAgICBjYXNlICd1JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCBjaCwgNCk7XG4gICAgICAgICAgICBjYXNlICdVJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCBjaCwgNik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTktOT1dOX0VTQ0FQRV9TRVFVRU5DRSwgY3VycmVudFBvc2l0aW9uKCksIDAsIGNoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCB1bmljb2RlLCBkaWdpdHMpIHtcbiAgICAgICAgZWF0KHNjbnIsIHVuaWNvZGUpO1xuICAgICAgICBsZXQgc2VxdWVuY2UgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWdpdHM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2ggPSB0YWtlSGV4RGlnaXQoc2Nucik7XG4gICAgICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVU5JQ09ERV9FU0NBUEVfU0VRVUVOQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwLCBgXFxcXCR7dW5pY29kZX0ke3NlcXVlbmNlfSR7c2Nuci5jdXJyZW50Q2hhcigpfWApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VxdWVuY2UgKz0gY2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBcXFxcJHt1bmljb2RlfSR7c2VxdWVuY2V9YDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNJbnZhbGlkSWRlbnRpZmllcihjaCkge1xuICAgICAgICByZXR1cm4gKGNoICE9PSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLyAmJlxuICAgICAgICAgICAgY2ggIT09IFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLyAmJlxuICAgICAgICAgICAgY2ggIT09IENIQVJfU1AgJiZcbiAgICAgICAgICAgIGNoICE9PSBDSEFSX0xGKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZEludmFsaWRJZGVudGlmaWVyKHNjbnIpIHtcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgbGV0IGNoID0gJyc7XG4gICAgICAgIGxldCBpZGVudGlmaWVycyA9ICcnO1xuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZUNoYXIoc2NuciwgaXNJbnZhbGlkSWRlbnRpZmllcikpKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVycyArPSBjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWRlbnRpZmllcnM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRMaW5rZWRNb2RpZmllcihzY25yKSB7XG4gICAgICAgIGxldCBjaCA9ICcnO1xuICAgICAgICBsZXQgbmFtZSA9ICcnO1xuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZUlkZW50aWZpZXJDaGFyKHNjbnIpKSkge1xuICAgICAgICAgICAgbmFtZSArPSBjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZExpbmtlZFJlZmVyKHNjbnIpIHtcbiAgICAgICAgY29uc3QgZm4gPSAoYnVmKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gXCJ7XCIgLyogVG9rZW5DaGFycy5CcmFjZUxlZnQgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcInxcIiAvKiBUb2tlbkNoYXJzLlBpcGUgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIoXCIgLyogVG9rZW5DaGFycy5QYXJlbkxlZnQgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIpXCIgLyogVG9rZW5DaGFycy5QYXJlblJpZ2h0ICovIHx8XG4gICAgICAgICAgICAgICAgIWNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX1NQKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX0xGIHx8IGNoID09PSBET1QpIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKGJ1Zik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKGJ1Zik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmbignJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRQbHVyYWwoc2Nucikge1xuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICBjb25zdCBwbHVyYWwgPSBlYXQoc2NuciwgXCJ8XCIgLyogVG9rZW5DaGFycy5QaXBlICovKTtcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgcmV0dXJuIHBsdXJhbDtcbiAgICB9XG4gICAgLy8gVE9ETzogV2UgbmVlZCByZWZhY3RvcmluZyBvZiB0b2tlbiBwYXJzaW5nIC4uLlxuICAgIGZ1bmN0aW9uIHJlYWRUb2tlbkluUGxhY2Vob2xkZXIoc2NuciwgY29udGV4dCkge1xuICAgICAgICBsZXQgdG9rZW4gPSBudWxsO1xuICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcbiAgICAgICAgc3dpdGNoIChjaCkge1xuICAgICAgICAgICAgY2FzZSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLzpcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuTk9UX0FMTE9XX05FU1RfUExBQ0VIT0xERVIsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAyIC8qIFRva2VuVHlwZXMuQnJhY2VMZWZ0ICovLCBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLyk7XG4gICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCsrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgIGNhc2UgXCJ9XCIgLyogVG9rZW5DaGFycy5CcmFjZVJpZ2h0ICovOlxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmJyYWNlTmVzdCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXJyZW50VHlwZSA9PT0gMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuRU1QVFlfUExBQ0VIT0xERVIsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAzIC8qIFRva2VuVHlwZXMuQnJhY2VSaWdodCAqLywgXCJ9XCIgLyogVG9rZW5DaGFycy5CcmFjZVJpZ2h0ICovKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdC0tO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID4gMCAmJiBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmluTGlua2VkICYmIGNvbnRleHQuYnJhY2VOZXN0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgY2FzZSBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovOlxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmJyYWNlTmVzdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuID0gcmVhZFRva2VuSW5MaW5rZWQoc2NuciwgY29udGV4dCkgfHwgZ2V0RW5kVG9rZW4oY29udGV4dCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWROYW1lZElkZW50aWZpZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCB2YWxpZExpc3RJZGVudGlmaWVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRMaXRlcmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNQbHVyYWxTdGFydChzY25yKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX0NMT1NJTkdfQlJBQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDEgLyogVG9rZW5UeXBlcy5QaXBlICovLCByZWFkUGx1cmFsKHNjbnIpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAoY29udGV4dC5jdXJyZW50VHlwZSA9PT0gNSAvKiBUb2tlblR5cGVzLk5hbWVkICovIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmN1cnJlbnRUeXBlID09PSA2IC8qIFRva2VuVHlwZXMuTGlzdCAqLyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXJyZW50VHlwZSA9PT0gNyAvKiBUb2tlblR5cGVzLkxpdGVyYWwgKi8pKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW4oc2NuciwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgodmFsaWROYW1lZElkZW50aWZpZXIgPSBpc05hbWVkSWRlbnRpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDUgLyogVG9rZW5UeXBlcy5OYW1lZCAqLywgcmVhZE5hbWVkSWRlbnRpZmllcihzY25yKSk7XG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh2YWxpZExpc3RJZGVudGlmaWVyID0gaXNMaXN0SWRlbnRpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDYgLyogVG9rZW5UeXBlcy5MaXN0ICovLCByZWFkTGlzdElkZW50aWZpZXIoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgodmFsaWRMaXRlcmFsID0gaXNMaXRlcmFsU3RhcnQoc2NuciwgY29udGV4dCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgNyAvKiBUb2tlblR5cGVzLkxpdGVyYWwgKi8sIHJlYWRMaXRlcmFsKHNjbnIpKTtcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkTmFtZWRJZGVudGlmaWVyICYmICF2YWxpZExpc3RJZGVudGlmaWVyICYmICF2YWxpZExpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogd2Ugc2hvdWxkIGJlIHJlLWRlc2lnbmVkIGludmFsaWQgY2FzZXMsIHdoZW4gd2Ugd2lsbCBleHRlbmQgbWVzc2FnZSBzeW50YXggbmVhciB0aGUgZnV0dXJlIC4uLlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDEzIC8qIFRva2VuVHlwZXMuSW52YWxpZFBsYWNlICovLCByZWFkSW52YWxpZElkZW50aWZpZXIoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9UT0tFTl9JTl9QTEFDRUhPTERFUiwgY3VycmVudFBvc2l0aW9uKCksIDAsIHRva2VuLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICAgIC8vIFRPRE86IFdlIG5lZWQgcmVmYWN0b3Jpbmcgb2YgdG9rZW4gcGFyc2luZyAuLi5cbiAgICBmdW5jdGlvbiByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XG4gICAgICAgIGxldCB0b2tlbiA9IG51bGw7XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xuICAgICAgICBpZiAoKGN1cnJlbnRUeXBlID09PSA4IC8qIFRva2VuVHlwZXMuTGlua2VkQWxpYXMgKi8gfHxcbiAgICAgICAgICAgIGN1cnJlbnRUeXBlID09PSA5IC8qIFRva2VuVHlwZXMuTGlua2VkRG90ICovIHx8XG4gICAgICAgICAgICBjdXJyZW50VHlwZSA9PT0gMTIgLyogVG9rZW5UeXBlcy5MaW5rZWRNb2RpZmllciAqLyB8fFxuICAgICAgICAgICAgY3VycmVudFR5cGUgPT09IDEwIC8qIFRva2VuVHlwZXMuTGlua2VkRGVsaW1pdGVyICovKSAmJlxuICAgICAgICAgICAgKGNoID09PSBDSEFSX0xGIHx8IGNoID09PSBDSEFSX1NQKSkge1xuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfTElOS0VEX0ZPUk1BVCwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgICAgIGNhc2UgXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLzpcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDggLyogVG9rZW5UeXBlcy5MaW5rZWRBbGlhcyAqLywgXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5pbkxpbmtlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgY2FzZSBcIi5cIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERvdCAqLzpcbiAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCA5IC8qIFRva2VuVHlwZXMuTGlua2VkRG90ICovLCBcIi5cIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERvdCAqLyk7XG4gICAgICAgICAgICBjYXNlIFwiOlwiIC8qIFRva2VuQ2hhcnMuTGlua2VkRGVsaW1pdGVyICovOlxuICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDEwIC8qIFRva2VuVHlwZXMuTGlua2VkRGVsaW1pdGVyICovLCBcIjpcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERlbGltaXRlciAqLyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMSAvKiBUb2tlblR5cGVzLlBpcGUgKi8sIHJlYWRQbHVyYWwoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNMaW5rZWREb3RTdGFydChzY25yLCBjb250ZXh0KSB8fFxuICAgICAgICAgICAgICAgICAgICBpc0xpbmtlZERlbGltaXRlclN0YXJ0KHNjbnIsIGNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTGlua2VkTW9kaWZpZXJTdGFydChzY25yLCBjb250ZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgMTIgLyogVG9rZW5UeXBlcy5MaW5rZWRNb2RpZmllciAqLywgcmVhZExpbmtlZE1vZGlmaWVyKHNjbnIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTGlua2VkUmVmZXJTdGFydChzY25yLCBjb250ZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzY2FuIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluUGxhY2Vob2xkZXIoc2NuciwgY29udGV4dCkgfHwgdG9rZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgMTEgLyogVG9rZW5UeXBlcy5MaW5rZWRLZXkgKi8sIHJlYWRMaW5rZWRSZWZlcihzY25yKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUeXBlID09PSA4IC8qIFRva2VuVHlwZXMuTGlua2VkQWxpYXMgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfTElOS0VEX0ZPUk1BVCwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XG4gICAgICAgICAgICAgICAgY29udGV4dC5pbkxpbmtlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW4oc2NuciwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVE9ETzogV2UgbmVlZCByZWZhY3RvcmluZyBvZiB0b2tlbiBwYXJzaW5nIC4uLlxuICAgIGZ1bmN0aW9uIHJlYWRUb2tlbihzY25yLCBjb250ZXh0KSB7XG4gICAgICAgIGxldCB0b2tlbiA9IHsgdHlwZTogMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8gfTtcbiAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluUGxhY2Vob2xkZXIoc2NuciwgY29udGV4dCkgfHwgZ2V0RW5kVG9rZW4oY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRleHQuaW5MaW5rZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KSB8fCBnZXRFbmRUb2tlbihjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcbiAgICAgICAgc3dpdGNoIChjaCkge1xuICAgICAgICAgICAgY2FzZSBcIntcIiAvKiBUb2tlbkNoYXJzLkJyYWNlTGVmdCAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuSW5QbGFjZWhvbGRlcihzY25yLCBjb250ZXh0KSB8fCBnZXRFbmRUb2tlbihjb250ZXh0KTtcbiAgICAgICAgICAgIGNhc2UgXCJ9XCIgLyogVG9rZW5DaGFycy5CcmFjZVJpZ2h0ICovOlxuICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTkJBTEFOQ0VEX0NMT1NJTkdfQlJBQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgMyAvKiBUb2tlblR5cGVzLkJyYWNlUmlnaHQgKi8sIFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLyk7XG4gICAgICAgICAgICBjYXNlIFwiQFwiIC8qIFRva2VuQ2hhcnMuTGlua2VkQWxpYXMgKi86XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMSAvKiBUb2tlblR5cGVzLlBpcGUgKi8sIHJlYWRQbHVyYWwoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IGlzTW9kdWxvLCBoYXNTcGFjZSB9ID0gZGV0ZWN0TW9kdWxvU3RhcnQoc2Nucik7XG4gICAgICAgICAgICAgICAgaWYgKGlzTW9kdWxvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNTcGFjZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRUb2tlbihjb250ZXh0LCAwIC8qIFRva2VuVHlwZXMuVGV4dCAqLywgcmVhZFRleHQoc2NucikpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGdldFRva2VuKGNvbnRleHQsIDQgLyogVG9rZW5UeXBlcy5Nb2R1bG8gKi8sIHJlYWRNb2R1bG8oc2NucikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNUZXh0U3RhcnQoc2NucikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDAgLyogVG9rZW5UeXBlcy5UZXh0ICovLCByZWFkVGV4dChzY25yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gbmV4dFRva2VuKCkge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlLCBvZmZzZXQsIHN0YXJ0TG9jLCBlbmRMb2MgfSA9IF9jb250ZXh0O1xuICAgICAgICBfY29udGV4dC5sYXN0VHlwZSA9IGN1cnJlbnRUeXBlO1xuICAgICAgICBfY29udGV4dC5sYXN0T2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICBfY29udGV4dC5sYXN0U3RhcnRMb2MgPSBzdGFydExvYztcbiAgICAgICAgX2NvbnRleHQubGFzdEVuZExvYyA9IGVuZExvYztcbiAgICAgICAgX2NvbnRleHQub2Zmc2V0ID0gY3VycmVudE9mZnNldCgpO1xuICAgICAgICBfY29udGV4dC5zdGFydExvYyA9IGN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICBpZiAoX3NjbnIuY3VycmVudENoYXIoKSA9PT0gRU9GKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oX2NvbnRleHQsIDE0IC8qIFRva2VuVHlwZXMuRU9GICovKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZFRva2VuKF9zY25yLCBfY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG5leHRUb2tlbixcbiAgICAgICAgY3VycmVudE9mZnNldCxcbiAgICAgICAgY3VycmVudFBvc2l0aW9uLFxuICAgICAgICBjb250ZXh0XG4gICAgfTtcbn1cblxuY29uc3QgRVJST1JfRE9NQUlOJDIgPSAncGFyc2VyJztcbi8vIEJhY2tzbGFzaCBiYWNrc2xhc2gsIGJhY2tzbGFzaCBxdW90ZSwgdUhISEgsIFVISEhISEguXG5jb25zdCBLTk9XTl9FU0NBUEVTID0gLyg/OlxcXFxcXFxcfFxcXFwnfFxcXFx1KFswLTlhLWZBLUZdezR9KXxcXFxcVShbMC05YS1mQS1GXXs2fSkpL2c7XG5mdW5jdGlvbiBmcm9tRXNjYXBlU2VxdWVuY2UobWF0Y2gsIGNvZGVQb2ludDQsIGNvZGVQb2ludDYpIHtcbiAgICBzd2l0Y2ggKG1hdGNoKSB7XG4gICAgICAgIGNhc2UgYFxcXFxcXFxcYDpcbiAgICAgICAgICAgIHJldHVybiBgXFxcXGA7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgICAgICBjYXNlIGBcXFxcXFwnYDpcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgICAgICAgICAgcmV0dXJuIGBcXCdgO1xuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlUG9pbnQgPSBwYXJzZUludChjb2RlUG9pbnQ0IHx8IGNvZGVQb2ludDYsIDE2KTtcbiAgICAgICAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhkN2ZmIHx8IGNvZGVQb2ludCA+PSAweGUwMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGludmFsaWQgLi4uXG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZW0gd2l0aCBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSLlxuICAgICAgICAgICAgcmV0dXJuICfvv70nO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlUGFyc2VyKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiAhPT0gZmFsc2U7XG4gICAgY29uc3QgeyBvbkVycm9yLCBvbldhcm4gfSA9IG9wdGlvbnM7XG4gICAgZnVuY3Rpb24gZW1pdEVycm9yKHRva2VuemVyLCBjb2RlLCBzdGFydCwgb2Zmc2V0LCAuLi5hcmdzKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHRva2VuemVyLmN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICBlbmQub2Zmc2V0ICs9IG9mZnNldDtcbiAgICAgICAgZW5kLmNvbHVtbiArPSBvZmZzZXQ7XG4gICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBsb2MgPSBsb2NhdGlvbiA/IGNyZWF0ZUxvY2F0aW9uKHN0YXJ0LCBlbmQpIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGNyZWF0ZUNvbXBpbGVFcnJvcihjb2RlLCBsb2MsIHtcbiAgICAgICAgICAgICAgICBkb21haW46IEVSUk9SX0RPTUFJTiQyLFxuICAgICAgICAgICAgICAgIGFyZ3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVtaXRXYXJuKHRva2VuemVyLCBjb2RlLCBzdGFydCwgb2Zmc2V0LCAuLi5hcmdzKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHRva2VuemVyLmN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICBlbmQub2Zmc2V0ICs9IG9mZnNldDtcbiAgICAgICAgZW5kLmNvbHVtbiArPSBvZmZzZXQ7XG4gICAgICAgIGlmIChvbldhcm4pIHtcbiAgICAgICAgICAgIGNvbnN0IGxvYyA9IGxvY2F0aW9uID8gY3JlYXRlTG9jYXRpb24oc3RhcnQsIGVuZCkgOiBudWxsO1xuICAgICAgICAgICAgb25XYXJuKGNyZWF0ZUNvbXBpbGVXYXJuKGNvZGUsIGxvYywgYXJncykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0YXJ0Tm9kZSh0eXBlLCBvZmZzZXQsIGxvYykge1xuICAgICAgICBjb25zdCBub2RlID0geyB0eXBlIH07XG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgbm9kZS5zdGFydCA9IG9mZnNldDtcbiAgICAgICAgICAgIG5vZGUuZW5kID0gb2Zmc2V0O1xuICAgICAgICAgICAgbm9kZS5sb2MgPSB7IHN0YXJ0OiBsb2MsIGVuZDogbG9jIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVuZE5vZGUobm9kZSwgb2Zmc2V0LCBwb3MsIHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIG5vZGUudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICBub2RlLmVuZCA9IG9mZnNldDtcbiAgICAgICAgICAgIGlmIChub2RlLmxvYykge1xuICAgICAgICAgICAgICAgIG5vZGUubG9jLmVuZCA9IHBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVRleHQodG9rZW5pemVyLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSgzIC8qIE5vZGVUeXBlcy5UZXh0ICovLCBjb250ZXh0Lm9mZnNldCwgY29udGV4dC5zdGFydExvYyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VMaXN0KHRva2VuaXplciwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IHsgbGFzdE9mZnNldDogb2Zmc2V0LCBsYXN0U3RhcnRMb2M6IGxvYyB9ID0gY29udGV4dDsgLy8gZ2V0IGJyYWNlIGxlZnQgbG9jXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoNSAvKiBOb2RlVHlwZXMuTGlzdCAqLywgb2Zmc2V0LCBsb2MpO1xuICAgICAgICBub2RlLmluZGV4ID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcbiAgICAgICAgdG9rZW5pemVyLm5leHRUb2tlbigpOyAvLyBza2lwIGJyYWNoIHJpZ2h0XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlTmFtZWQodG9rZW5pemVyLCBrZXksIG1vZHVsbykge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgY29uc3QgeyBsYXN0T2Zmc2V0OiBvZmZzZXQsIGxhc3RTdGFydExvYzogbG9jIH0gPSBjb250ZXh0OyAvLyBnZXQgYnJhY2UgbGVmdCBsb2NcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSg0IC8qIE5vZGVUeXBlcy5OYW1lZCAqLywgb2Zmc2V0LCBsb2MpO1xuICAgICAgICBub2RlLmtleSA9IGtleTtcbiAgICAgICAgaWYgKG1vZHVsbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbm9kZS5tb2R1bG8gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRva2VuaXplci5uZXh0VG9rZW4oKTsgLy8gc2tpcCBicmFjaCByaWdodFxuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUxpdGVyYWwodG9rZW5pemVyLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgY29uc3QgeyBsYXN0T2Zmc2V0OiBvZmZzZXQsIGxhc3RTdGFydExvYzogbG9jIH0gPSBjb250ZXh0OyAvLyBnZXQgYnJhY2UgbGVmdCBsb2NcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSg5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovLCBvZmZzZXQsIGxvYyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZS5yZXBsYWNlKEtOT1dOX0VTQ0FQRVMsIGZyb21Fc2NhcGVTZXF1ZW5jZSk7XG4gICAgICAgIHRva2VuaXplci5uZXh0VG9rZW4oKTsgLy8gc2tpcCBicmFjaCByaWdodFxuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUxpbmtlZE1vZGlmaWVyKHRva2VuaXplcikge1xuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuaXplci5uZXh0VG9rZW4oKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IHsgbGFzdE9mZnNldDogb2Zmc2V0LCBsYXN0U3RhcnRMb2M6IGxvYyB9ID0gY29udGV4dDsgLy8gZ2V0IGxpbmtlZCBkb3QgbG9jXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoOCAvKiBOb2RlVHlwZXMuTGlua2VkTW9kaWZpZXIgKi8sIG9mZnNldCwgbG9jKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IDEyIC8qIFRva2VuVHlwZXMuTGlua2VkTW9kaWZpZXIgKi8pIHtcbiAgICAgICAgICAgIC8vIGVtcHR5IG1vZGlmaWVyXG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VNUFRZX0xJTktFRF9NT0RJRklFUiwgY29udGV4dC5sYXN0U3RhcnRMb2MsIDApO1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgZW5kTm9kZShub2RlLCBvZmZzZXQsIGxvYyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5leHRDb25zdW1lVG9rZW46IHRva2VuLFxuICAgICAgICAgICAgICAgIG5vZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgdG9rZW5cbiAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUudmFsdWUgPSB0b2tlbi52YWx1ZSB8fCAnJztcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9kZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUxpbmtlZEtleSh0b2tlbml6ZXIsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDcgLyogTm9kZVR5cGVzLkxpbmtlZEtleSAqLywgY29udGV4dC5vZmZzZXQsIGNvbnRleHQuc3RhcnRMb2MpO1xuICAgICAgICBub2RlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlTGlua2VkKHRva2VuaXplcikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgY29uc3QgbGlua2VkTm9kZSA9IHN0YXJ0Tm9kZSg2IC8qIE5vZGVUeXBlcy5MaW5rZWQgKi8sIGNvbnRleHQub2Zmc2V0LCBjb250ZXh0LnN0YXJ0TG9jKTtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5pemVyLm5leHRUb2tlbigpO1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gOSAvKiBUb2tlblR5cGVzLkxpbmtlZERvdCAqLykge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VMaW5rZWRNb2RpZmllcih0b2tlbml6ZXIpO1xuICAgICAgICAgICAgbGlua2VkTm9kZS5tb2RpZmllciA9IHBhcnNlZC5ub2RlO1xuICAgICAgICAgICAgdG9rZW4gPSBwYXJzZWQubmV4dENvbnN1bWVUb2tlbiB8fCB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXNzZXQgY2hlY2sgdG9rZW5cbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IDEwIC8qIFRva2VuVHlwZXMuTGlua2VkRGVsaW1pdGVyICovKSB7XG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbiA9IHRva2VuaXplci5uZXh0VG9rZW4oKTtcbiAgICAgICAgLy8gc2tpcCBicmFjZSBsZWZ0XG4gICAgICAgIGlmICh0b2tlbi50eXBlID09PSAyIC8qIFRva2VuVHlwZXMuQnJhY2VMZWZ0ICovKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2VuaXplci5uZXh0VG9rZW4oKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgMTEgLyogVG9rZW5UeXBlcy5MaW5rZWRLZXkgKi86XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGUua2V5ID0gcGFyc2VMaW5rZWRLZXkodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDUgLyogVG9rZW5UeXBlcy5OYW1lZCAqLzpcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBwYXJzZU5hbWVkKHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2IC8qIFRva2VuVHlwZXMuTGlzdCAqLzpcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBwYXJzZUxpc3QodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDcgLyogVG9rZW5UeXBlcy5MaXRlcmFsICovOlxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlLmtleSA9IHBhcnNlTGl0ZXJhbCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBrZXlcbiAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VNUFRZX0xJTktFRF9LRVksIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHlMaW5rZWRLZXlOb2RlID0gc3RhcnROb2RlKDcgLyogTm9kZVR5cGVzLkxpbmtlZEtleSAqLywgbmV4dENvbnRleHQub2Zmc2V0LCBuZXh0Q29udGV4dC5zdGFydExvYyk7XG4gICAgICAgICAgICAgICAgZW1wdHlMaW5rZWRLZXlOb2RlLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgZW5kTm9kZShlbXB0eUxpbmtlZEtleU5vZGUsIG5leHRDb250ZXh0Lm9mZnNldCwgbmV4dENvbnRleHQuc3RhcnRMb2MpO1xuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGUua2V5ID0gZW1wdHlMaW5rZWRLZXlOb2RlO1xuICAgICAgICAgICAgICAgIGVuZE5vZGUobGlua2VkTm9kZSwgbmV4dENvbnRleHQub2Zmc2V0LCBuZXh0Q29udGV4dC5zdGFydExvYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENvbnN1bWVUb2tlbjogdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGxpbmtlZE5vZGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVuZE5vZGUobGlua2VkTm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGU6IGxpbmtlZE5vZGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VNZXNzYWdlKHRva2VuaXplcikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgY29uc3Qgc3RhcnRPZmZzZXQgPSBjb250ZXh0LmN1cnJlbnRUeXBlID09PSAxIC8qIFRva2VuVHlwZXMuUGlwZSAqL1xuICAgICAgICAgICAgPyB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpXG4gICAgICAgICAgICA6IGNvbnRleHQub2Zmc2V0O1xuICAgICAgICBjb25zdCBzdGFydExvYyA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogVG9rZW5UeXBlcy5QaXBlICovXG4gICAgICAgICAgICA/IGNvbnRleHQuZW5kTG9jXG4gICAgICAgICAgICA6IGNvbnRleHQuc3RhcnRMb2M7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoMiAvKiBOb2RlVHlwZXMuTWVzc2FnZSAqLywgc3RhcnRPZmZzZXQsIHN0YXJ0TG9jKTtcbiAgICAgICAgbm9kZS5pdGVtcyA9IFtdO1xuICAgICAgICBsZXQgbmV4dFRva2VuID0gbnVsbDtcbiAgICAgICAgbGV0IG1vZHVsbyA9IG51bGw7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gbmV4dFRva2VuIHx8IHRva2VuaXplci5uZXh0VG9rZW4oKTtcbiAgICAgICAgICAgIG5leHRUb2tlbiA9IG51bGw7XG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDAgLyogVG9rZW5UeXBlcy5UZXh0ICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlVGV4dCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNiAvKiBUb2tlblR5cGVzLkxpc3QgKi86XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBub2RlLml0ZW1zLnB1c2gocGFyc2VMaXN0KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIFRva2VuVHlwZXMuTW9kdWxvICovOlxuICAgICAgICAgICAgICAgICAgICBtb2R1bG8gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDUgLyogVG9rZW5UeXBlcy5OYW1lZCAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMucHVzaChwYXJzZU5hbWVkKHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycsICEhbW9kdWxvKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2R1bG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRXYXJuKHRva2VuaXplciwgQ29tcGlsZVdhcm5Db2Rlcy5VU0VfTU9EVUxPX1NZTlRBWCwgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxvID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDcgLyogVG9rZW5UeXBlcy5MaXRlcmFsICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlTGl0ZXJhbCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgOCAvKiBUb2tlblR5cGVzLkxpbmtlZEFsaWFzICovOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlTGlua2VkKHRva2VuaXplcik7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMucHVzaChwYXJzZWQubm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRUb2tlbiA9IHBhcnNlZC5uZXh0Q29uc3VtZVRva2VuIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoY29udGV4dC5jdXJyZW50VHlwZSAhPT0gMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8gJiZcbiAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgIT09IDEgLyogVG9rZW5UeXBlcy5QaXBlICovKTtcbiAgICAgICAgLy8gYWRqdXN0IG1lc3NhZ2Ugbm9kZSBsb2NcbiAgICAgICAgY29uc3QgZW5kT2Zmc2V0ID0gY29udGV4dC5jdXJyZW50VHlwZSA9PT0gMSAvKiBUb2tlblR5cGVzLlBpcGUgKi9cbiAgICAgICAgICAgID8gY29udGV4dC5sYXN0T2Zmc2V0XG4gICAgICAgICAgICA6IHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCk7XG4gICAgICAgIGNvbnN0IGVuZExvYyA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogVG9rZW5UeXBlcy5QaXBlICovXG4gICAgICAgICAgICA/IGNvbnRleHQubGFzdEVuZExvY1xuICAgICAgICAgICAgOiB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCk7XG4gICAgICAgIGVuZE5vZGUobm9kZSwgZW5kT2Zmc2V0LCBlbmRMb2MpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VQbHVyYWwodG9rZW5pemVyLCBvZmZzZXQsIGxvYywgbXNnTm9kZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgbGV0IGhhc0VtcHR5TWVzc2FnZSA9IG1zZ05vZGUuaXRlbXMubGVuZ3RoID09PSAwO1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDEgLyogTm9kZVR5cGVzLlBsdXJhbCAqLywgb2Zmc2V0LCBsb2MpO1xuICAgICAgICBub2RlLmNhc2VzID0gW107XG4gICAgICAgIG5vZGUuY2FzZXMucHVzaChtc2dOb2RlKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gcGFyc2VNZXNzYWdlKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIWhhc0VtcHR5TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGhhc0VtcHR5TWVzc2FnZSA9IG1zZy5pdGVtcy5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLmNhc2VzLnB1c2gobXNnKTtcbiAgICAgICAgfSB3aGlsZSAoY29udGV4dC5jdXJyZW50VHlwZSAhPT0gMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8pO1xuICAgICAgICBpZiAoaGFzRW1wdHlNZXNzYWdlKSB7XG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5NVVNUX0hBVkVfTUVTU0FHRVNfSU5fUExVUkFMLCBsb2MsIDApO1xuICAgICAgICB9XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlUmVzb3VyY2UodG9rZW5pemVyKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCB7IG9mZnNldCwgc3RhcnRMb2MgfSA9IGNvbnRleHQ7XG4gICAgICAgIGNvbnN0IG1zZ05vZGUgPSBwYXJzZU1lc3NhZ2UodG9rZW5pemVyKTtcbiAgICAgICAgaWYgKGNvbnRleHQuY3VycmVudFR5cGUgPT09IDE0IC8qIFRva2VuVHlwZXMuRU9GICovKSB7XG4gICAgICAgICAgICByZXR1cm4gbXNnTm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBsdXJhbCh0b2tlbml6ZXIsIG9mZnNldCwgc3RhcnRMb2MsIG1zZ05vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlKHNvdXJjZSkge1xuICAgICAgICBjb25zdCB0b2tlbml6ZXIgPSBjcmVhdGVUb2tlbml6ZXIoc291cmNlLCBhc3NpZ24oe30sIG9wdGlvbnMpKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoMCAvKiBOb2RlVHlwZXMuUmVzb3VyY2UgKi8sIGNvbnRleHQub2Zmc2V0LCBjb250ZXh0LnN0YXJ0TG9jKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uICYmIG5vZGUubG9jKSB7XG4gICAgICAgICAgICBub2RlLmxvYy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5ib2R5ID0gcGFyc2VSZXNvdXJjZSh0b2tlbml6ZXIpO1xuICAgICAgICBpZiAob3B0aW9ucy5vbkNhY2hlS2V5KSB7XG4gICAgICAgICAgICBub2RlLmNhY2hlS2V5ID0gb3B0aW9ucy5vbkNhY2hlS2V5KHNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXNzZXJ0IHdoZXRoZXIgYWNoaWV2ZWQgdG8gRU9GXG4gICAgICAgIGlmIChjb250ZXh0LmN1cnJlbnRUeXBlICE9PSAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLykge1xuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgc291cmNlW2NvbnRleHQub2Zmc2V0XSB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcGFyc2UgfTtcbn1cbmZ1bmN0aW9uIGdldFRva2VuQ2FwdGlvbih0b2tlbikge1xuICAgIGlmICh0b2tlbi50eXBlID09PSAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLykge1xuICAgICAgICByZXR1cm4gJ0VPRic7XG4gICAgfVxuICAgIGNvbnN0IG5hbWUgPSAodG9rZW4udmFsdWUgfHwgJycpLnJlcGxhY2UoL1xccj9cXG4vZ3UsICdcXFxcbicpO1xuICAgIHJldHVybiBuYW1lLmxlbmd0aCA+IDEwID8gbmFtZS5zbGljZSgwLCA5KSArICfigKYnIDogbmFtZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNmb3JtZXIoYXN0LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuKSB7XG4gICAgY29uc3QgX2NvbnRleHQgPSB7XG4gICAgICAgIGFzdCxcbiAgICAgICAgaGVscGVyczogbmV3IFNldCgpXG4gICAgfTtcbiAgICBjb25zdCBjb250ZXh0ID0gKCkgPT4gX2NvbnRleHQ7XG4gICAgY29uc3QgaGVscGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgX2NvbnRleHQuaGVscGVycy5hZGQobmFtZSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG4gICAgcmV0dXJuIHsgY29udGV4dCwgaGVscGVyIH07XG59XG5mdW5jdGlvbiB0cmF2ZXJzZU5vZGVzKG5vZGVzLCB0cmFuc2Zvcm1lcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJhdmVyc2VOb2RlKG5vZGVzW2ldLCB0cmFuc2Zvcm1lcik7XG4gICAgfVxufVxuZnVuY3Rpb24gdHJhdmVyc2VOb2RlKG5vZGUsIHRyYW5zZm9ybWVyKSB7XG4gICAgLy8gVE9ETzogaWYgd2UgbmVlZCBwcmUtaG9vayBvZiB0cmFuc2Zvcm0sIHNob3VsZCBiZSBpbXBsZW1lbnRlZCB0byBoZXJlXG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi86XG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKG5vZGUuY2FzZXMsIHRyYW5zZm9ybWVyKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcInBsdXJhbFwiIC8qIEhlbHBlck5hbWVNYXAuUExVUkFMICovKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDIgLyogTm9kZVR5cGVzLk1lc3NhZ2UgKi86XG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKG5vZGUuaXRlbXMsIHRyYW5zZm9ybWVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDYgLyogTm9kZVR5cGVzLkxpbmtlZCAqLzoge1xuICAgICAgICAgICAgY29uc3QgbGlua2VkID0gbm9kZTtcbiAgICAgICAgICAgIHRyYXZlcnNlTm9kZShsaW5rZWQua2V5LCB0cmFuc2Zvcm1lcik7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJsaW5rZWRcIiAvKiBIZWxwZXJOYW1lTWFwLkxJTktFRCAqLyk7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJ0eXBlXCIgLyogSGVscGVyTmFtZU1hcC5UWVBFICovKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNSAvKiBOb2RlVHlwZXMuTGlzdCAqLzpcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcImludGVycG9sYXRlXCIgLyogSGVscGVyTmFtZU1hcC5JTlRFUlBPTEFURSAqLyk7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJsaXN0XCIgLyogSGVscGVyTmFtZU1hcC5MSVNUICovKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQgLyogTm9kZVR5cGVzLk5hbWVkICovOlxuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwiaW50ZXJwb2xhdGVcIiAvKiBIZWxwZXJOYW1lTWFwLklOVEVSUE9MQVRFICovKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcIm5hbWVkXCIgLyogSGVscGVyTmFtZU1hcC5OQU1FRCAqLyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gVE9ETzogaWYgd2UgbmVlZCBwb3N0LWhvb2sgb2YgdHJhbnNmb3JtLCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgdG8gaGVyZVxufVxuLy8gdHJhbnNmb3JtIEFTVFxuZnVuY3Rpb24gdHJhbnNmb3JtKGFzdCwgb3B0aW9ucyA9IHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbikge1xuICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gY3JlYXRlVHJhbnNmb3JtZXIoYXN0KTtcbiAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJub3JtYWxpemVcIiAvKiBIZWxwZXJOYW1lTWFwLk5PUk1BTElaRSAqLyk7XG4gICAgLy8gdHJhdmVyc2VcbiAgICBhc3QuYm9keSAmJiB0cmF2ZXJzZU5vZGUoYXN0LmJvZHksIHRyYW5zZm9ybWVyKTtcbiAgICAvLyBzZXQgbWV0YSBpbmZvcm1hdGlvblxuICAgIGNvbnN0IGNvbnRleHQgPSB0cmFuc2Zvcm1lci5jb250ZXh0KCk7XG4gICAgYXN0LmhlbHBlcnMgPSBBcnJheS5mcm9tKGNvbnRleHQuaGVscGVycyk7XG59XG5cbmZ1bmN0aW9uIG9wdGltaXplKGFzdCkge1xuICAgIGNvbnN0IGJvZHkgPSBhc3QuYm9keTtcbiAgICBpZiAoYm9keS50eXBlID09PSAyIC8qIE5vZGVUeXBlcy5NZXNzYWdlICovKSB7XG4gICAgICAgIG9wdGltaXplTWVzc2FnZU5vZGUoYm9keSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBib2R5LmNhc2VzLmZvckVhY2goYyA9PiBvcHRpbWl6ZU1lc3NhZ2VOb2RlKGMpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbn1cbmZ1bmN0aW9uIG9wdGltaXplTWVzc2FnZU5vZGUobWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLml0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbWVzc2FnZS5pdGVtc1swXTtcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gMyAvKiBOb2RlVHlwZXMuVGV4dCAqLyB8fCBpdGVtLnR5cGUgPT09IDkgLyogTm9kZVR5cGVzLkxpdGVyYWwgKi8pIHtcbiAgICAgICAgICAgIG1lc3NhZ2Uuc3RhdGljID0gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnZhbHVlOyAvLyBvcHRpbWl6YXRpb24gZm9yIHNpemVcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZS5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG1lc3NhZ2UuaXRlbXNbaV07XG4gICAgICAgICAgICBpZiAoIShpdGVtLnR5cGUgPT09IDMgLyogTm9kZVR5cGVzLlRleHQgKi8gfHwgaXRlbS50eXBlID09PSA5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW0udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVzLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IG1lc3NhZ2UuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBtZXNzYWdlLnN0YXRpYyA9IGpvaW4odmFsdWVzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZS5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBtZXNzYWdlLml0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDMgLyogTm9kZVR5cGVzLlRleHQgKi8gfHwgaXRlbS50eXBlID09PSA5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnZhbHVlOyAvLyBvcHRpbWl6YXRpb24gZm9yIHNpemVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IEVSUk9SX0RPTUFJTiQxID0gJ21pbmlmaWVyJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmZ1bmN0aW9uIG1pbmlmeShub2RlKSB7XG4gICAgbm9kZS50ID0gbm9kZS50eXBlO1xuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgMCAvKiBOb2RlVHlwZXMuUmVzb3VyY2UgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc291cmNlID0gbm9kZTtcbiAgICAgICAgICAgIG1pbmlmeShyZXNvdXJjZS5ib2R5KTtcbiAgICAgICAgICAgIHJlc291cmNlLmIgPSByZXNvdXJjZS5ib2R5O1xuICAgICAgICAgICAgZGVsZXRlIHJlc291cmNlLmJvZHk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDEgLyogTm9kZVR5cGVzLlBsdXJhbCAqLzoge1xuICAgICAgICAgICAgY29uc3QgcGx1cmFsID0gbm9kZTtcbiAgICAgICAgICAgIGNvbnN0IGNhc2VzID0gcGx1cmFsLmNhc2VzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG1pbmlmeShjYXNlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbHVyYWwuYyA9IGNhc2VzO1xuICAgICAgICAgICAgZGVsZXRlIHBsdXJhbC5jYXNlcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMiAvKiBOb2RlVHlwZXMuTWVzc2FnZSAqLzoge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IG5vZGU7XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IG1lc3NhZ2UuaXRlbXM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbWluaWZ5KGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lc3NhZ2UuaSA9IGl0ZW1zO1xuICAgICAgICAgICAgZGVsZXRlIG1lc3NhZ2UuaXRlbXM7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5zdGF0aWMpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnMgPSBtZXNzYWdlLnN0YXRpYztcbiAgICAgICAgICAgICAgICBkZWxldGUgbWVzc2FnZS5zdGF0aWM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDMgLyogTm9kZVR5cGVzLlRleHQgKi86XG4gICAgICAgIGNhc2UgOSAvKiBOb2RlVHlwZXMuTGl0ZXJhbCAqLzpcbiAgICAgICAgY2FzZSA4IC8qIE5vZGVUeXBlcy5MaW5rZWRNb2RpZmllciAqLzpcbiAgICAgICAgY2FzZSA3IC8qIE5vZGVUeXBlcy5MaW5rZWRLZXkgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBpZiAodmFsdWVOb2RlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVOb2RlLnYgPSB2YWx1ZU5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlTm9kZS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNiAvKiBOb2RlVHlwZXMuTGlua2VkICovOiB7XG4gICAgICAgICAgICBjb25zdCBsaW5rZWQgPSBub2RlO1xuICAgICAgICAgICAgbWluaWZ5KGxpbmtlZC5rZXkpO1xuICAgICAgICAgICAgbGlua2VkLmsgPSBsaW5rZWQua2V5O1xuICAgICAgICAgICAgZGVsZXRlIGxpbmtlZC5rZXk7XG4gICAgICAgICAgICBpZiAobGlua2VkLm1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgbWluaWZ5KGxpbmtlZC5tb2RpZmllcik7XG4gICAgICAgICAgICAgICAgbGlua2VkLm0gPSBsaW5rZWQubW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGxpbmtlZC5tb2RpZmllcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNSAvKiBOb2RlVHlwZXMuTGlzdCAqLzoge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IG5vZGU7XG4gICAgICAgICAgICBsaXN0LmkgPSBsaXN0LmluZGV4O1xuICAgICAgICAgICAgZGVsZXRlIGxpc3QuaW5kZXg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDQgLyogTm9kZVR5cGVzLk5hbWVkICovOiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lZCA9IG5vZGU7XG4gICAgICAgICAgICBuYW1lZC5rID0gbmFtZWQua2V5O1xuICAgICAgICAgICAgZGVsZXRlIG5hbWVkLmtleTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlQ29tcGlsZUVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOSEFORExFRF9NSU5JRklFUl9OT0RFX1RZUEUsIG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4kMSxcbiAgICAgICAgICAgICAgICAgICAgYXJnczogW25vZGUudHlwZV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlIG5vZGUudHlwZTtcbn1cbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3RyaXBsZS1zbGFzaC1yZWZlcmVuY2Vcbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwic291cmNlLW1hcC1qc1wiIC8+XG5jb25zdCBFUlJPUl9ET01BSU4gPSAncGFyc2VyJztcbmZ1bmN0aW9uIGNyZWF0ZUNvZGVHZW5lcmF0b3IoYXN0LCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBzb3VyY2VNYXAsIGZpbGVuYW1lLCBicmVha0xpbmVDb2RlLCBuZWVkSW5kZW50OiBfbmVlZEluZGVudCB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBsb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gIT09IGZhbHNlO1xuICAgIGNvbnN0IF9jb250ZXh0ID0ge1xuICAgICAgICBmaWxlbmFtZSxcbiAgICAgICAgY29kZTogJycsXG4gICAgICAgIGNvbHVtbjogMSxcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBtYXA6IHVuZGVmaW5lZCxcbiAgICAgICAgYnJlYWtMaW5lQ29kZSxcbiAgICAgICAgbmVlZEluZGVudDogX25lZWRJbmRlbnQsXG4gICAgICAgIGluZGVudExldmVsOiAwXG4gICAgfTtcbiAgICBpZiAobG9jYXRpb24gJiYgYXN0LmxvYykge1xuICAgICAgICBfY29udGV4dC5zb3VyY2UgPSBhc3QubG9jLnNvdXJjZTtcbiAgICB9XG4gICAgY29uc3QgY29udGV4dCA9ICgpID0+IF9jb250ZXh0O1xuICAgIGZ1bmN0aW9uIHB1c2goY29kZSwgbm9kZSkge1xuICAgICAgICBfY29udGV4dC5jb2RlICs9IGNvZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9uZXdsaW5lKG4sIHdpdGhCcmVha0xpbmUgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IF9icmVha0xpbmVDb2RlID0gd2l0aEJyZWFrTGluZSA/IGJyZWFrTGluZUNvZGUgOiAnJztcbiAgICAgICAgcHVzaChfbmVlZEluZGVudCA/IF9icmVha0xpbmVDb2RlICsgYCAgYC5yZXBlYXQobikgOiBfYnJlYWtMaW5lQ29kZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluZGVudCh3aXRoTmV3TGluZSA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgbGV2ZWwgPSArK19jb250ZXh0LmluZGVudExldmVsO1xuICAgICAgICB3aXRoTmV3TGluZSAmJiBfbmV3bGluZShsZXZlbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlaW5kZW50KHdpdGhOZXdMaW5lID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBsZXZlbCA9IC0tX2NvbnRleHQuaW5kZW50TGV2ZWw7XG4gICAgICAgIHdpdGhOZXdMaW5lICYmIF9uZXdsaW5lKGxldmVsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbmV3bGluZSgpIHtcbiAgICAgICAgX25ld2xpbmUoX2NvbnRleHQuaW5kZW50TGV2ZWwpO1xuICAgIH1cbiAgICBjb25zdCBoZWxwZXIgPSAoa2V5KSA9PiBgXyR7a2V5fWA7XG4gICAgY29uc3QgbmVlZEluZGVudCA9ICgpID0+IF9jb250ZXh0Lm5lZWRJbmRlbnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgcHVzaCxcbiAgICAgICAgaW5kZW50LFxuICAgICAgICBkZWluZGVudCxcbiAgICAgICAgbmV3bGluZSxcbiAgICAgICAgaGVscGVyLFxuICAgICAgICBuZWVkSW5kZW50XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlTGlua2VkTm9kZShnZW5lcmF0b3IsIG5vZGUpIHtcbiAgICBjb25zdCB7IGhlbHBlciB9ID0gZ2VuZXJhdG9yO1xuICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcImxpbmtlZFwiIC8qIEhlbHBlck5hbWVNYXAuTElOS0VEICovKX0oYCk7XG4gICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5rZXkpO1xuICAgIGlmIChub2RlLm1vZGlmaWVyKSB7XG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAsIGApO1xuICAgICAgICBnZW5lcmF0ZU5vZGUoZ2VuZXJhdG9yLCBub2RlLm1vZGlmaWVyKTtcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYCwgX3R5cGVgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAsIHVuZGVmaW5lZCwgX3R5cGVgKTtcbiAgICB9XG4gICAgZ2VuZXJhdG9yLnB1c2goYClgKTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlTWVzc2FnZU5vZGUoZ2VuZXJhdG9yLCBub2RlKSB7XG4gICAgY29uc3QgeyBoZWxwZXIsIG5lZWRJbmRlbnQgfSA9IGdlbmVyYXRvcjtcbiAgICBnZW5lcmF0b3IucHVzaChgJHtoZWxwZXIoXCJub3JtYWxpemVcIiAvKiBIZWxwZXJOYW1lTWFwLk5PUk1BTElaRSAqLyl9KFtgKTtcbiAgICBnZW5lcmF0b3IuaW5kZW50KG5lZWRJbmRlbnQoKSk7XG4gICAgY29uc3QgbGVuZ3RoID0gbm9kZS5pdGVtcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBnZW5lcmF0ZU5vZGUoZ2VuZXJhdG9yLCBub2RlLml0ZW1zW2ldKTtcbiAgICAgICAgaWYgKGkgPT09IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGdlbmVyYXRvci5wdXNoKCcsICcpO1xuICAgIH1cbiAgICBnZW5lcmF0b3IuZGVpbmRlbnQobmVlZEluZGVudCgpKTtcbiAgICBnZW5lcmF0b3IucHVzaCgnXSknKTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUGx1cmFsTm9kZShnZW5lcmF0b3IsIG5vZGUpIHtcbiAgICBjb25zdCB7IGhlbHBlciwgbmVlZEluZGVudCB9ID0gZ2VuZXJhdG9yO1xuICAgIGlmIChub2RlLmNhc2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYCR7aGVscGVyKFwicGx1cmFsXCIgLyogSGVscGVyTmFtZU1hcC5QTFVSQUwgKi8pfShbYCk7XG4gICAgICAgIGdlbmVyYXRvci5pbmRlbnQobmVlZEluZGVudCgpKTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbm9kZS5jYXNlcy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUuY2FzZXNbaV0pO1xuICAgICAgICAgICAgaWYgKGkgPT09IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKCcsICcpO1xuICAgICAgICB9XG4gICAgICAgIGdlbmVyYXRvci5kZWluZGVudChuZWVkSW5kZW50KCkpO1xuICAgICAgICBnZW5lcmF0b3IucHVzaChgXSlgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVJlc291cmNlKGdlbmVyYXRvciwgbm9kZSkge1xuICAgIGlmIChub2RlLmJvZHkpIHtcbiAgICAgICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5ib2R5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbmVyYXRvci5wdXNoKCdudWxsJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZSkge1xuICAgIGNvbnN0IHsgaGVscGVyIH0gPSBnZW5lcmF0b3I7XG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAwIC8qIE5vZGVUeXBlcy5SZXNvdXJjZSAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRlUmVzb3VyY2UoZ2VuZXJhdG9yLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEgLyogTm9kZVR5cGVzLlBsdXJhbCAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRlUGx1cmFsTm9kZShnZW5lcmF0b3IsIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMiAvKiBOb2RlVHlwZXMuTWVzc2FnZSAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRlTWVzc2FnZU5vZGUoZ2VuZXJhdG9yLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDYgLyogTm9kZVR5cGVzLkxpbmtlZCAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRlTGlua2VkTm9kZShnZW5lcmF0b3IsIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgOCAvKiBOb2RlVHlwZXMuTGlua2VkTW9kaWZpZXIgKi86XG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChKU09OLnN0cmluZ2lmeShub2RlLnZhbHVlKSwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA3IC8qIE5vZGVUeXBlcy5MaW5rZWRLZXkgKi86XG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChKU09OLnN0cmluZ2lmeShub2RlLnZhbHVlKSwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1IC8qIE5vZGVUeXBlcy5MaXN0ICovOlxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goYCR7aGVscGVyKFwiaW50ZXJwb2xhdGVcIiAvKiBIZWxwZXJOYW1lTWFwLklOVEVSUE9MQVRFICovKX0oJHtoZWxwZXIoXCJsaXN0XCIgLyogSGVscGVyTmFtZU1hcC5MSVNUICovKX0oJHtub2RlLmluZGV4fSkpYCwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0IC8qIE5vZGVUeXBlcy5OYW1lZCAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcImludGVycG9sYXRlXCIgLyogSGVscGVyTmFtZU1hcC5JTlRFUlBPTEFURSAqLyl9KCR7aGVscGVyKFwibmFtZWRcIiAvKiBIZWxwZXJOYW1lTWFwLk5BTUVEICovKX0oJHtKU09OLnN0cmluZ2lmeShub2RlLmtleSl9KSlgLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDkgLyogTm9kZVR5cGVzLkxpdGVyYWwgKi86XG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChKU09OLnN0cmluZ2lmeShub2RlLnZhbHVlKSwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzIC8qIE5vZGVUeXBlcy5UZXh0ICovOlxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlQ29tcGlsZUVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOSEFORExFRF9DT0RFR0VOX05PREVfVFlQRSwgbnVsbCwge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IEVSUk9SX0RPTUFJTixcbiAgICAgICAgICAgICAgICAgICAgYXJnczogW25vZGUudHlwZV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICB9XG59XG4vLyBnZW5lcmF0ZSBjb2RlIGZyb20gQVNUXG5jb25zdCBnZW5lcmF0ZSA9IChhc3QsIG9wdGlvbnMgPSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4pID0+IHtcbiAgICBjb25zdCBtb2RlID0gaXNTdHJpbmcob3B0aW9ucy5tb2RlKSA/IG9wdGlvbnMubW9kZSA6ICdub3JtYWwnO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gaXNTdHJpbmcob3B0aW9ucy5maWxlbmFtZSlcbiAgICAgICAgPyBvcHRpb25zLmZpbGVuYW1lXG4gICAgICAgIDogJ21lc3NhZ2UuaW50bCc7XG4gICAgY29uc3Qgc291cmNlTWFwID0gISFvcHRpb25zLnNvdXJjZU1hcDtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBicmVha0xpbmVDb2RlID0gb3B0aW9ucy5icmVha0xpbmVDb2RlICE9IG51bGxcbiAgICAgICAgPyBvcHRpb25zLmJyZWFrTGluZUNvZGVcbiAgICAgICAgOiBtb2RlID09PSAnYXJyb3cnXG4gICAgICAgICAgICA/ICc7J1xuICAgICAgICAgICAgOiAnXFxuJztcbiAgICBjb25zdCBuZWVkSW5kZW50ID0gb3B0aW9ucy5uZWVkSW5kZW50ID8gb3B0aW9ucy5uZWVkSW5kZW50IDogbW9kZSAhPT0gJ2Fycm93JztcbiAgICBjb25zdCBoZWxwZXJzID0gYXN0LmhlbHBlcnMgfHwgW107XG4gICAgY29uc3QgZ2VuZXJhdG9yID0gY3JlYXRlQ29kZUdlbmVyYXRvcihhc3QsIHtcbiAgICAgICAgbW9kZSxcbiAgICAgICAgZmlsZW5hbWUsXG4gICAgICAgIHNvdXJjZU1hcCxcbiAgICAgICAgYnJlYWtMaW5lQ29kZSxcbiAgICAgICAgbmVlZEluZGVudFxuICAgIH0pO1xuICAgIGdlbmVyYXRvci5wdXNoKG1vZGUgPT09ICdub3JtYWwnID8gYGZ1bmN0aW9uIF9fbXNnX18gKGN0eCkge2AgOiBgKGN0eCkgPT4ge2ApO1xuICAgIGdlbmVyYXRvci5pbmRlbnQobmVlZEluZGVudCk7XG4gICAgaWYgKGhlbHBlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBnZW5lcmF0b3IucHVzaChgY29uc3QgeyAke2pvaW4oaGVscGVycy5tYXAocyA9PiBgJHtzfTogXyR7c31gKSwgJywgJyl9IH0gPSBjdHhgKTtcbiAgICAgICAgZ2VuZXJhdG9yLm5ld2xpbmUoKTtcbiAgICB9XG4gICAgZ2VuZXJhdG9yLnB1c2goYHJldHVybiBgKTtcbiAgICBnZW5lcmF0ZU5vZGUoZ2VuZXJhdG9yLCBhc3QpO1xuICAgIGdlbmVyYXRvci5kZWluZGVudChuZWVkSW5kZW50KTtcbiAgICBnZW5lcmF0b3IucHVzaChgfWApO1xuICAgIGRlbGV0ZSBhc3QuaGVscGVycztcbiAgICBjb25zdCB7IGNvZGUsIG1hcCB9ID0gZ2VuZXJhdG9yLmNvbnRleHQoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBhc3QsXG4gICAgICAgIGNvZGUsXG4gICAgICAgIG1hcDogbWFwID8gbWFwLnRvSlNPTigpIDogdW5kZWZpbmVkIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIH07XG59O1xuXG5mdW5jdGlvbiBiYXNlQ29tcGlsZShzb3VyY2UsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGFzc2lnbmVkT3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgY29uc3Qgaml0ID0gISFhc3NpZ25lZE9wdGlvbnMuaml0O1xuICAgIGNvbnN0IGVuYWxiZU1pbmlmeSA9ICEhYXNzaWduZWRPcHRpb25zLm1pbmlmeTtcbiAgICBjb25zdCBlbmFtYmVPcHRpbWl6ZSA9IGFzc2lnbmVkT3B0aW9ucy5vcHRpbWl6ZSA9PSBudWxsID8gdHJ1ZSA6IGFzc2lnbmVkT3B0aW9ucy5vcHRpbWl6ZTtcbiAgICAvLyBwYXJzZSBzb3VyY2UgY29kZXNcbiAgICBjb25zdCBwYXJzZXIgPSBjcmVhdGVQYXJzZXIoYXNzaWduZWRPcHRpb25zKTtcbiAgICBjb25zdCBhc3QgPSBwYXJzZXIucGFyc2Uoc291cmNlKTtcbiAgICBpZiAoIWppdCkge1xuICAgICAgICAvLyB0cmFuc2Zvcm0gQVNUc1xuICAgICAgICB0cmFuc2Zvcm0oYXN0LCBhc3NpZ25lZE9wdGlvbnMpO1xuICAgICAgICAvLyBnZW5lcmF0ZSBqYXZhc2NyaXB0IGNvZGVzXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZShhc3QsIGFzc2lnbmVkT3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBvcHRpbWl6ZSBBU1RzXG4gICAgICAgIGVuYW1iZU9wdGltaXplICYmIG9wdGltaXplKGFzdCk7XG4gICAgICAgIC8vIG1pbmltaXplIEFTVHNcbiAgICAgICAgZW5hbGJlTWluaWZ5ICYmIG1pbmlmeShhc3QpO1xuICAgICAgICAvLyBJbiBKSVQgbW9kZSwgbm8gYXN0IHRyYW5zZm9ybSwgbm8gY29kZSBnZW5lcmF0aW9uLlxuICAgICAgICByZXR1cm4geyBhc3QsIGNvZGU6ICcnIH07XG4gICAgfVxufVxuXG5leHBvcnQgeyBDb21waWxlRXJyb3JDb2RlcywgQ29tcGlsZVdhcm5Db2RlcywgRVJST1JfRE9NQUlOJDIgYXMgRVJST1JfRE9NQUlOLCBMT0NBVElPTl9TVFVCLCBiYXNlQ29tcGlsZSwgY3JlYXRlQ29tcGlsZUVycm9yLCBjcmVhdGVDb21waWxlV2FybiwgY3JlYXRlTG9jYXRpb24sIGNyZWF0ZVBhcnNlciwgY3JlYXRlUG9zaXRpb24sIGRlZmF1bHRPbkVycm9yLCBkZXRlY3RIdG1sVGFnLCBlcnJvck1lc3NhZ2VzLCB3YXJuTWVzc2FnZXMgfTtcbiIsIi8qIVxuICAqIGNvcmUtYmFzZSB2OS4xMy4xXG4gICogKGMpIDIwMjQga2F6dXlhIGthd2FndWNoaVxuICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAgKi9cbmltcG9ydCB7IGdldEdsb2JhbFRoaXMsIGlzT2JqZWN0LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzUGxhaW5PYmplY3QsIGFzc2lnbiwgam9pbiwgdG9EaXNwbGF5U3RyaW5nLCBpc0FycmF5LCBpbmNyZW1lbnRlciwgZm9ybWF0IGFzIGZvcm1hdCQxLCBpc1Byb21pc2UsIGlzQm9vbGVhbiwgd2FybiwgaXNSZWdFeHAsIHdhcm5PbmNlLCBlc2NhcGVIdG1sLCBpbkJyb3dzZXIsIG1hcmssIG1lYXN1cmUsIGlzRW1wdHlPYmplY3QsIGdlbmVyYXRlQ29kZUZyYW1lLCBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5LCBpc0RhdGUgfSBmcm9tICdAaW50bGlmeS9zaGFyZWQnO1xuaW1wb3J0IHsgQ29tcGlsZVdhcm5Db2RlcywgQ29tcGlsZUVycm9yQ29kZXMsIGNyZWF0ZUNvbXBpbGVFcnJvciwgZGV0ZWN0SHRtbFRhZywgZGVmYXVsdE9uRXJyb3IsIGJhc2VDb21waWxlIGFzIGJhc2VDb21waWxlJDEgfSBmcm9tICdAaW50bGlmeS9tZXNzYWdlLWNvbXBpbGVyJztcbmV4cG9ydCB7IENvbXBpbGVFcnJvckNvZGVzLCBjcmVhdGVDb21waWxlRXJyb3IgfSBmcm9tICdAaW50bGlmeS9tZXNzYWdlLWNvbXBpbGVyJztcblxuLyoqXG4gKiBUaGlzIGlzIG9ubHkgY2FsbGVkIGluIGVzbS1idW5kbGVyIGJ1aWxkcy5cbiAqIGlzdGFuYnVsLWlnbm9yZS1uZXh0XG4gKi9cbmZ1bmN0aW9uIGluaXRGZWF0dXJlRmxhZ3MoKSB7XG4gICAgaWYgKHR5cGVvZiBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBfX0lOVExJRllfSklUX0NPTVBJTEFUSU9OX18gIT09ICdib29sZWFuJykge1xuICAgICAgICBnZXRHbG9iYWxUaGlzKCkuX19JTlRMSUZZX0pJVF9DT01QSUxBVElPTl9fID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX0RST1BfTUVTU0FHRV9DT01QSUxFUl9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9EUk9QX01FU1NBR0VfQ09NUElMRVJfXyA9IGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3QgcGF0aFN0YXRlTWFjaGluZSA9ICBbXTtcbnBhdGhTdGF0ZU1hY2hpbmVbMCAvKiBTdGF0ZXMuQkVGT1JFX1BBVEggKi9dID0ge1xuICAgIFtcIndcIiAvKiBQYXRoQ2hhclR5cGVzLldPUktTUEFDRSAqL106IFswIC8qIFN0YXRlcy5CRUZPUkVfUEFUSCAqL10sXG4gICAgW1wiaVwiIC8qIFBhdGhDaGFyVHlwZXMuSURFTlQgKi9dOiBbMyAvKiBTdGF0ZXMuSU5fSURFTlQgKi8sIDAgLyogQWN0aW9ucy5BUFBFTkQgKi9dLFxuICAgIFtcIltcIiAvKiBQYXRoQ2hhclR5cGVzLkxFRlRfQlJBQ0tFVCAqL106IFs0IC8qIFN0YXRlcy5JTl9TVUJfUEFUSCAqL10sXG4gICAgW1wib1wiIC8qIFBhdGhDaGFyVHlwZXMuRU5EX09GX0ZBSUwgKi9dOiBbNyAvKiBTdGF0ZXMuQUZURVJfUEFUSCAqL11cbn07XG5wYXRoU3RhdGVNYWNoaW5lWzEgLyogU3RhdGVzLklOX1BBVEggKi9dID0ge1xuICAgIFtcIndcIiAvKiBQYXRoQ2hhclR5cGVzLldPUktTUEFDRSAqL106IFsxIC8qIFN0YXRlcy5JTl9QQVRIICovXSxcbiAgICBbXCIuXCIgLyogUGF0aENoYXJUeXBlcy5ET1QgKi9dOiBbMiAvKiBTdGF0ZXMuQkVGT1JFX0lERU5UICovXSxcbiAgICBbXCJbXCIgLyogUGF0aENoYXJUeXBlcy5MRUZUX0JSQUNLRVQgKi9dOiBbNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi9dLFxuICAgIFtcIm9cIiAvKiBQYXRoQ2hhclR5cGVzLkVORF9PRl9GQUlMICovXTogWzcgLyogU3RhdGVzLkFGVEVSX1BBVEggKi9dXG59O1xucGF0aFN0YXRlTWFjaGluZVsyIC8qIFN0YXRlcy5CRUZPUkVfSURFTlQgKi9dID0ge1xuICAgIFtcIndcIiAvKiBQYXRoQ2hhclR5cGVzLldPUktTUEFDRSAqL106IFsyIC8qIFN0YXRlcy5CRUZPUkVfSURFTlQgKi9dLFxuICAgIFtcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCIwXCIgLyogUGF0aENoYXJUeXBlcy5aRVJPICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXVxufTtcbnBhdGhTdGF0ZU1hY2hpbmVbMyAvKiBTdGF0ZXMuSU5fSURFTlQgKi9dID0ge1xuICAgIFtcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCIwXCIgLyogUGF0aENoYXJUeXBlcy5aRVJPICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJ3XCIgLyogUGF0aENoYXJUeXBlcy5XT1JLU1BBQ0UgKi9dOiBbMSAvKiBTdGF0ZXMuSU5fUEFUSCAqLywgMSAvKiBBY3Rpb25zLlBVU0ggKi9dLFxuICAgIFtcIi5cIiAvKiBQYXRoQ2hhclR5cGVzLkRPVCAqL106IFsyIC8qIFN0YXRlcy5CRUZPUkVfSURFTlQgKi8sIDEgLyogQWN0aW9ucy5QVVNIICovXSxcbiAgICBbXCJbXCIgLyogUGF0aENoYXJUeXBlcy5MRUZUX0JSQUNLRVQgKi9dOiBbNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi8sIDEgLyogQWN0aW9ucy5QVVNIICovXSxcbiAgICBbXCJvXCIgLyogUGF0aENoYXJUeXBlcy5FTkRfT0ZfRkFJTCAqL106IFs3IC8qIFN0YXRlcy5BRlRFUl9QQVRIICovLCAxIC8qIEFjdGlvbnMuUFVTSCAqL11cbn07XG5wYXRoU3RhdGVNYWNoaW5lWzQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovXSA9IHtcbiAgICBbXCInXCIgLyogUGF0aENoYXJUeXBlcy5TSU5HTEVfUVVPVEUgKi9dOiBbNSAvKiBTdGF0ZXMuSU5fU0lOR0xFX1FVT1RFICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJcXFwiXCIgLyogUGF0aENoYXJUeXBlcy5ET1VCTEVfUVVPVEUgKi9dOiBbNiAvKiBTdGF0ZXMuSU5fRE9VQkxFX1FVT1RFICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJbXCIgLyogUGF0aENoYXJUeXBlcy5MRUZUX0JSQUNLRVQgKi9dOiBbXG4gICAgICAgIDQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovLFxuICAgICAgICAyIC8qIEFjdGlvbnMuSU5DX1NVQl9QQVRIX0RFUFRIICovXG4gICAgXSxcbiAgICBbXCJdXCIgLyogUGF0aENoYXJUeXBlcy5SSUdIVF9CUkFDS0VUICovXTogWzEgLyogU3RhdGVzLklOX1BBVEggKi8sIDMgLyogQWN0aW9ucy5QVVNIX1NVQl9QQVRIICovXSxcbiAgICBbXCJvXCIgLyogUGF0aENoYXJUeXBlcy5FTkRfT0ZfRkFJTCAqL106IDggLyogU3RhdGVzLkVSUk9SICovLFxuICAgIFtcImxcIiAvKiBQYXRoQ2hhclR5cGVzLkVMU0UgKi9dOiBbNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi8sIDAgLyogQWN0aW9ucy5BUFBFTkQgKi9dXG59O1xucGF0aFN0YXRlTWFjaGluZVs1IC8qIFN0YXRlcy5JTl9TSU5HTEVfUVVPVEUgKi9dID0ge1xuICAgIFtcIidcIiAvKiBQYXRoQ2hhclR5cGVzLlNJTkdMRV9RVU9URSAqL106IFs0IC8qIFN0YXRlcy5JTl9TVUJfUEFUSCAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL10sXG4gICAgW1wib1wiIC8qIFBhdGhDaGFyVHlwZXMuRU5EX09GX0ZBSUwgKi9dOiA4IC8qIFN0YXRlcy5FUlJPUiAqLyxcbiAgICBbXCJsXCIgLyogUGF0aENoYXJUeXBlcy5FTFNFICovXTogWzUgLyogU3RhdGVzLklOX1NJTkdMRV9RVU9URSAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL11cbn07XG5wYXRoU3RhdGVNYWNoaW5lWzYgLyogU3RhdGVzLklOX0RPVUJMRV9RVU9URSAqL10gPSB7XG4gICAgW1wiXFxcIlwiIC8qIFBhdGhDaGFyVHlwZXMuRE9VQkxFX1FVT1RFICovXTogWzQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJvXCIgLyogUGF0aENoYXJUeXBlcy5FTkRfT0ZfRkFJTCAqL106IDggLyogU3RhdGVzLkVSUk9SICovLFxuICAgIFtcImxcIiAvKiBQYXRoQ2hhclR5cGVzLkVMU0UgKi9dOiBbNiAvKiBTdGF0ZXMuSU5fRE9VQkxFX1FVT1RFICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXVxufTtcbi8qKlxuICogQ2hlY2sgaWYgYW4gZXhwcmVzc2lvbiBpcyBhIGxpdGVyYWwgdmFsdWUuXG4gKi9cbmNvbnN0IGxpdGVyYWxWYWx1ZVJFID0gL15cXHM/KD86dHJ1ZXxmYWxzZXwtP1tcXGQuXSt8J1teJ10qJ3xcIlteXCJdKlwiKVxccz8kLztcbmZ1bmN0aW9uIGlzTGl0ZXJhbChleHApIHtcbiAgICByZXR1cm4gbGl0ZXJhbFZhbHVlUkUudGVzdChleHApO1xufVxuLyoqXG4gKiBTdHJpcCBxdW90ZXMgZnJvbSBhIHN0cmluZ1xuICovXG5mdW5jdGlvbiBzdHJpcFF1b3RlcyhzdHIpIHtcbiAgICBjb25zdCBhID0gc3RyLmNoYXJDb2RlQXQoMCk7XG4gICAgY29uc3QgYiA9IHN0ci5jaGFyQ29kZUF0KHN0ci5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYSA9PT0gYiAmJiAoYSA9PT0gMHgyMiB8fCBhID09PSAweDI3KSA/IHN0ci5zbGljZSgxLCAtMSkgOiBzdHI7XG59XG4vKipcbiAqIERldGVybWluZSB0aGUgdHlwZSBvZiBhIGNoYXJhY3RlciBpbiBhIGtleXBhdGguXG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhDaGFyVHlwZShjaCkge1xuICAgIGlmIChjaCA9PT0gdW5kZWZpbmVkIHx8IGNoID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIm9cIiAvKiBQYXRoQ2hhclR5cGVzLkVORF9PRl9GQUlMICovO1xuICAgIH1cbiAgICBjb25zdCBjb2RlID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgY2FzZSAweDViOiAvLyBbXG4gICAgICAgIGNhc2UgMHg1ZDogLy8gXVxuICAgICAgICBjYXNlIDB4MmU6IC8vIC5cbiAgICAgICAgY2FzZSAweDIyOiAvLyBcIlxuICAgICAgICBjYXNlIDB4Mjc6IC8vICdcbiAgICAgICAgICAgIHJldHVybiBjaDtcbiAgICAgICAgY2FzZSAweDVmOiAvLyBfXG4gICAgICAgIGNhc2UgMHgyNDogLy8gJFxuICAgICAgICBjYXNlIDB4MmQ6IC8vIC1cbiAgICAgICAgICAgIHJldHVybiBcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovO1xuICAgICAgICBjYXNlIDB4MDk6IC8vIFRhYiAoSFQpXG4gICAgICAgIGNhc2UgMHgwYTogLy8gTmV3bGluZSAoTEYpXG4gICAgICAgIGNhc2UgMHgwZDogLy8gUmV0dXJuIChDUilcbiAgICAgICAgY2FzZSAweGEwOiAvLyBOby1icmVhayBzcGFjZSAoTkJTUClcbiAgICAgICAgY2FzZSAweGZlZmY6IC8vIEJ5dGUgT3JkZXIgTWFyayAoQk9NKVxuICAgICAgICBjYXNlIDB4MjAyODogLy8gTGluZSBTZXBhcmF0b3IgKExTKVxuICAgICAgICBjYXNlIDB4MjAyOTogLy8gUGFyYWdyYXBoIFNlcGFyYXRvciAoUFMpXG4gICAgICAgICAgICByZXR1cm4gXCJ3XCIgLyogUGF0aENoYXJUeXBlcy5XT1JLU1BBQ0UgKi87XG4gICAgfVxuICAgIHJldHVybiBcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovO1xufVxuLyoqXG4gKiBGb3JtYXQgYSBzdWJQYXRoLCByZXR1cm4gaXRzIHBsYWluIGZvcm0gaWYgaXQgaXNcbiAqIGEgbGl0ZXJhbCBzdHJpbmcgb3IgbnVtYmVyLiBPdGhlcndpc2UgcHJlcGVuZCB0aGVcbiAqIGR5bmFtaWMgaW5kaWNhdG9yICgqKS5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0U3ViUGF0aChwYXRoKSB7XG4gICAgY29uc3QgdHJpbW1lZCA9IHBhdGgudHJpbSgpO1xuICAgIC8vIGludmFsaWQgbGVhZGluZyAwXG4gICAgaWYgKHBhdGguY2hhckF0KDApID09PSAnMCcgJiYgaXNOYU4ocGFyc2VJbnQocGF0aCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzTGl0ZXJhbCh0cmltbWVkKVxuICAgICAgICA/IHN0cmlwUXVvdGVzKHRyaW1tZWQpXG4gICAgICAgIDogXCIqXCIgLyogUGF0aENoYXJUeXBlcy5BU1RBUklTSyAqLyArIHRyaW1tZWQ7XG59XG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIHBhdGggaW50byBhbiBhcnJheSBvZiBzZWdtZW50c1xuICovXG5mdW5jdGlvbiBwYXJzZShwYXRoKSB7XG4gICAgY29uc3Qga2V5cyA9IFtdO1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGxldCBtb2RlID0gMCAvKiBTdGF0ZXMuQkVGT1JFX1BBVEggKi87XG4gICAgbGV0IHN1YlBhdGhEZXB0aCA9IDA7XG4gICAgbGV0IGM7XG4gICAgbGV0IGtleTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGxldCBuZXdDaGFyO1xuICAgIGxldCB0eXBlO1xuICAgIGxldCB0cmFuc2l0aW9uO1xuICAgIGxldCBhY3Rpb247XG4gICAgbGV0IHR5cGVNYXA7XG4gICAgY29uc3QgYWN0aW9ucyA9IFtdO1xuICAgIGFjdGlvbnNbMCAvKiBBY3Rpb25zLkFQUEVORCAqL10gPSAoKSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga2V5ID0gbmV3Q2hhcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGtleSArPSBuZXdDaGFyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBhY3Rpb25zWzEgLyogQWN0aW9ucy5QVVNIICovXSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYWN0aW9uc1syIC8qIEFjdGlvbnMuSU5DX1NVQl9QQVRIX0RFUFRIICovXSA9ICgpID0+IHtcbiAgICAgICAgYWN0aW9uc1swIC8qIEFjdGlvbnMuQVBQRU5EICovXSgpO1xuICAgICAgICBzdWJQYXRoRGVwdGgrKztcbiAgICB9O1xuICAgIGFjdGlvbnNbMyAvKiBBY3Rpb25zLlBVU0hfU1VCX1BBVEggKi9dID0gKCkgPT4ge1xuICAgICAgICBpZiAoc3ViUGF0aERlcHRoID4gMCkge1xuICAgICAgICAgICAgc3ViUGF0aERlcHRoLS07XG4gICAgICAgICAgICBtb2RlID0gNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi87XG4gICAgICAgICAgICBhY3Rpb25zWzAgLyogQWN0aW9ucy5BUFBFTkQgKi9dKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJQYXRoRGVwdGggPSAwO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5ID0gZm9ybWF0U3ViUGF0aChrZXkpO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zWzEgLyogQWN0aW9ucy5QVVNIICovXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBtYXliZVVuZXNjYXBlUXVvdGUoKSB7XG4gICAgICAgIGNvbnN0IG5leHRDaGFyID0gcGF0aFtpbmRleCArIDFdO1xuICAgICAgICBpZiAoKG1vZGUgPT09IDUgLyogU3RhdGVzLklOX1NJTkdMRV9RVU9URSAqLyAmJlxuICAgICAgICAgICAgbmV4dENoYXIgPT09IFwiJ1wiIC8qIFBhdGhDaGFyVHlwZXMuU0lOR0xFX1FVT1RFICovKSB8fFxuICAgICAgICAgICAgKG1vZGUgPT09IDYgLyogU3RhdGVzLklOX0RPVUJMRV9RVU9URSAqLyAmJlxuICAgICAgICAgICAgICAgIG5leHRDaGFyID09PSBcIlxcXCJcIiAvKiBQYXRoQ2hhclR5cGVzLkRPVUJMRV9RVU9URSAqLykpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBuZXdDaGFyID0gJ1xcXFwnICsgbmV4dENoYXI7XG4gICAgICAgICAgICBhY3Rpb25zWzAgLyogQWN0aW9ucy5BUFBFTkQgKi9dKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAobW9kZSAhPT0gbnVsbCkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICBjID0gcGF0aFtpbmRleF07XG4gICAgICAgIGlmIChjID09PSAnXFxcXCcgJiYgbWF5YmVVbmVzY2FwZVF1b3RlKCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHR5cGUgPSBnZXRQYXRoQ2hhclR5cGUoYyk7XG4gICAgICAgIHR5cGVNYXAgPSBwYXRoU3RhdGVNYWNoaW5lW21vZGVdO1xuICAgICAgICB0cmFuc2l0aW9uID0gdHlwZU1hcFt0eXBlXSB8fCB0eXBlTWFwW1wibFwiIC8qIFBhdGhDaGFyVHlwZXMuRUxTRSAqL10gfHwgOCAvKiBTdGF0ZXMuRVJST1IgKi87XG4gICAgICAgIC8vIGNoZWNrIHBhcnNlIGVycm9yXG4gICAgICAgIGlmICh0cmFuc2l0aW9uID09PSA4IC8qIFN0YXRlcy5FUlJPUiAqLykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG1vZGUgPSB0cmFuc2l0aW9uWzBdO1xuICAgICAgICBpZiAodHJhbnNpdGlvblsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBhY3Rpb25zW3RyYW5zaXRpb25bMV1dO1xuICAgICAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIG5ld0NoYXIgPSBjO1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBwYXJzZSBmaW5pc2hcbiAgICAgICAgaWYgKG1vZGUgPT09IDcgLyogU3RhdGVzLkFGVEVSX1BBVEggKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8gcGF0aCB0b2tlbiBjYWNoZVxuY29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XG4vKipcbiAqIGtleS12YWx1ZSBtZXNzYWdlIHJlc29sdmVyXG4gKlxuICogQHJlbWFya3NcbiAqIFJlc29sdmVzIG1lc3NhZ2VzIHdpdGggdGhlIGtleS12YWx1ZSBzdHJ1Y3R1cmUuIE5vdGUgdGhhdCBtZXNzYWdlcyB3aXRoIGEgaGllcmFyY2hpY2FsIHN0cnVjdHVyZSBzdWNoIGFzIG9iamVjdHMgY2Fubm90IGJlIHJlc29sdmVkXG4gKlxuICogQHBhcmFtIG9iaiAtIEEgdGFyZ2V0IG9iamVjdCB0byBiZSByZXNvbHZlZCB3aXRoIHBhdGhcbiAqIEBwYXJhbSBwYXRoIC0gQSB7QGxpbmsgUGF0aCB8IHBhdGh9IHRvIHJlc29sdmUgdGhlIHZhbHVlIG9mIG1lc3NhZ2VcbiAqXG4gKiBAcmV0dXJucyBBIHJlc29sdmVkIHtAbGluayBQYXRoVmFsdWUgfCBwYXRoIHZhbHVlfVxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5mdW5jdGlvbiByZXNvbHZlV2l0aEtleVZhbHVlKG9iaiwgcGF0aCkge1xuICAgIHJldHVybiBpc09iamVjdChvYmopID8gb2JqW3BhdGhdIDogbnVsbDtcbn1cbi8qKlxuICogbWVzc2FnZSByZXNvbHZlclxuICpcbiAqIEByZW1hcmtzXG4gKiBSZXNvbHZlcyBtZXNzYWdlcy4gbWVzc2FnZXMgd2l0aCBhIGhpZXJhcmNoaWNhbCBzdHJ1Y3R1cmUgc3VjaCBhcyBvYmplY3RzIGNhbiBiZSByZXNvbHZlZC4gVGhpcyByZXNvbHZlciBpcyB1c2VkIGluIFZ1ZUkxOG4gYXMgZGVmYXVsdC5cbiAqXG4gKiBAcGFyYW0gb2JqIC0gQSB0YXJnZXQgb2JqZWN0IHRvIGJlIHJlc29sdmVkIHdpdGggcGF0aFxuICogQHBhcmFtIHBhdGggLSBBIHtAbGluayBQYXRoIHwgcGF0aH0gdG8gcmVzb2x2ZSB0aGUgdmFsdWUgb2YgbWVzc2FnZVxuICpcbiAqIEByZXR1cm5zIEEgcmVzb2x2ZWQge0BsaW5rIFBhdGhWYWx1ZSB8IHBhdGggdmFsdWV9XG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVWYWx1ZShvYmosIHBhdGgpIHtcbiAgICAvLyBjaGVjayBvYmplY3RcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIHBhcnNlIHBhdGhcbiAgICBsZXQgaGl0ID0gY2FjaGUuZ2V0KHBhdGgpO1xuICAgIGlmICghaGl0KSB7XG4gICAgICAgIGhpdCA9IHBhcnNlKHBhdGgpO1xuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgICBjYWNoZS5zZXQocGF0aCwgaGl0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjaGVjayBoaXRcbiAgICBpZiAoIWhpdCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gcmVzb2x2ZSBwYXRoIHZhbHVlXG4gICAgY29uc3QgbGVuID0gaGl0Lmxlbmd0aDtcbiAgICBsZXQgbGFzdCA9IG9iajtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgY29uc3QgdmFsID0gbGFzdFtoaXRbaV1dO1xuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGxhc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsYXN0ID0gdmFsO1xuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBsYXN0O1xufVxuXG5jb25zdCBERUZBVUxUX01PRElGSUVSID0gKHN0cikgPT4gc3RyO1xuY29uc3QgREVGQVVMVF9NRVNTQUdFID0gKGN0eCkgPT4gJyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbmNvbnN0IERFRkFVTFRfTUVTU0FHRV9EQVRBX1RZUEUgPSAndGV4dCc7XG5jb25zdCBERUZBVUxUX05PUk1BTElaRSA9ICh2YWx1ZXMpID0+IHZhbHVlcy5sZW5ndGggPT09IDAgPyAnJyA6IGpvaW4odmFsdWVzKTtcbmNvbnN0IERFRkFVTFRfSU5URVJQT0xBVEUgPSB0b0Rpc3BsYXlTdHJpbmc7XG5mdW5jdGlvbiBwbHVyYWxEZWZhdWx0KGNob2ljZSwgY2hvaWNlc0xlbmd0aCkge1xuICAgIGNob2ljZSA9IE1hdGguYWJzKGNob2ljZSk7XG4gICAgaWYgKGNob2ljZXNMZW5ndGggPT09IDIpIHtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIHJldHVybiBjaG9pY2VcbiAgICAgICAgICAgID8gY2hvaWNlID4gMVxuICAgICAgICAgICAgICAgID8gMVxuICAgICAgICAgICAgICAgIDogMFxuICAgICAgICAgICAgOiAxO1xuICAgIH1cbiAgICByZXR1cm4gY2hvaWNlID8gTWF0aC5taW4oY2hvaWNlLCAyKSA6IDA7XG59XG5mdW5jdGlvbiBnZXRQbHVyYWxJbmRleChvcHRpb25zKSB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgaW5kZXggPSBpc051bWJlcihvcHRpb25zLnBsdXJhbEluZGV4KVxuICAgICAgICA/IG9wdGlvbnMucGx1cmFsSW5kZXhcbiAgICAgICAgOiAtMTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICByZXR1cm4gb3B0aW9ucy5uYW1lZCAmJiAoaXNOdW1iZXIob3B0aW9ucy5uYW1lZC5jb3VudCkgfHwgaXNOdW1iZXIob3B0aW9ucy5uYW1lZC5uKSlcbiAgICAgICAgPyBpc051bWJlcihvcHRpb25zLm5hbWVkLmNvdW50KVxuICAgICAgICAgICAgPyBvcHRpb25zLm5hbWVkLmNvdW50XG4gICAgICAgICAgICA6IGlzTnVtYmVyKG9wdGlvbnMubmFtZWQubilcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMubmFtZWQublxuICAgICAgICAgICAgICAgIDogaW5kZXhcbiAgICAgICAgOiBpbmRleDtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWVkKHBsdXJhbEluZGV4LCBwcm9wcykge1xuICAgIGlmICghcHJvcHMuY291bnQpIHtcbiAgICAgICAgcHJvcHMuY291bnQgPSBwbHVyYWxJbmRleDtcbiAgICB9XG4gICAgaWYgKCFwcm9wcy5uKSB7XG4gICAgICAgIHByb3BzLm4gPSBwbHVyYWxJbmRleDtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVNZXNzYWdlQ29udGV4dChvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBsb2NhbGUgPSBvcHRpb25zLmxvY2FsZTtcbiAgICBjb25zdCBwbHVyYWxJbmRleCA9IGdldFBsdXJhbEluZGV4KG9wdGlvbnMpO1xuICAgIGNvbnN0IHBsdXJhbFJ1bGUgPSBpc09iamVjdChvcHRpb25zLnBsdXJhbFJ1bGVzKSAmJlxuICAgICAgICBpc1N0cmluZyhsb2NhbGUpICYmXG4gICAgICAgIGlzRnVuY3Rpb24ob3B0aW9ucy5wbHVyYWxSdWxlc1tsb2NhbGVdKVxuICAgICAgICA/IG9wdGlvbnMucGx1cmFsUnVsZXNbbG9jYWxlXVxuICAgICAgICA6IHBsdXJhbERlZmF1bHQ7XG4gICAgY29uc3Qgb3JnUGx1cmFsUnVsZSA9IGlzT2JqZWN0KG9wdGlvbnMucGx1cmFsUnVsZXMpICYmXG4gICAgICAgIGlzU3RyaW5nKGxvY2FsZSkgJiZcbiAgICAgICAgaXNGdW5jdGlvbihvcHRpb25zLnBsdXJhbFJ1bGVzW2xvY2FsZV0pXG4gICAgICAgID8gcGx1cmFsRGVmYXVsdFxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwbHVyYWwgPSAobWVzc2FnZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzW3BsdXJhbFJ1bGUocGx1cmFsSW5kZXgsIG1lc3NhZ2VzLmxlbmd0aCwgb3JnUGx1cmFsUnVsZSldO1xuICAgIH07XG4gICAgY29uc3QgX2xpc3QgPSBvcHRpb25zLmxpc3QgfHwgW107XG4gICAgY29uc3QgbGlzdCA9IChpbmRleCkgPT4gX2xpc3RbaW5kZXhdO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgX25hbWVkID0gb3B0aW9ucy5uYW1lZCB8fCB7fTtcbiAgICBpc051bWJlcihvcHRpb25zLnBsdXJhbEluZGV4KSAmJiBub3JtYWxpemVOYW1lZChwbHVyYWxJbmRleCwgX25hbWVkKTtcbiAgICBjb25zdCBuYW1lZCA9IChrZXkpID0+IF9uYW1lZFtrZXldO1xuICAgIGZ1bmN0aW9uIG1lc3NhZ2Uoa2V5KSB7XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBjb25zdCBtc2cgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZXMpXG4gICAgICAgICAgICA/IG9wdGlvbnMubWVzc2FnZXMoa2V5KVxuICAgICAgICAgICAgOiBpc09iamVjdChvcHRpb25zLm1lc3NhZ2VzKVxuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5tZXNzYWdlc1trZXldXG4gICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgcmV0dXJuICFtc2dcbiAgICAgICAgICAgID8gb3B0aW9ucy5wYXJlbnRcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMucGFyZW50Lm1lc3NhZ2Uoa2V5KSAvLyByZXNvbHZlIGZyb20gcGFyZW50IG1lc3NhZ2VzXG4gICAgICAgICAgICAgICAgOiBERUZBVUxUX01FU1NBR0VcbiAgICAgICAgICAgIDogbXNnO1xuICAgIH1cbiAgICBjb25zdCBfbW9kaWZpZXIgPSAobmFtZSkgPT4gb3B0aW9ucy5tb2RpZmllcnNcbiAgICAgICAgPyBvcHRpb25zLm1vZGlmaWVyc1tuYW1lXVxuICAgICAgICA6IERFRkFVTFRfTU9ESUZJRVI7XG4gICAgY29uc3Qgbm9ybWFsaXplID0gaXNQbGFpbk9iamVjdChvcHRpb25zLnByb2Nlc3NvcikgJiYgaXNGdW5jdGlvbihvcHRpb25zLnByb2Nlc3Nvci5ub3JtYWxpemUpXG4gICAgICAgID8gb3B0aW9ucy5wcm9jZXNzb3Iubm9ybWFsaXplXG4gICAgICAgIDogREVGQVVMVF9OT1JNQUxJWkU7XG4gICAgY29uc3QgaW50ZXJwb2xhdGUgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMucHJvY2Vzc29yKSAmJlxuICAgICAgICBpc0Z1bmN0aW9uKG9wdGlvbnMucHJvY2Vzc29yLmludGVycG9sYXRlKVxuICAgICAgICA/IG9wdGlvbnMucHJvY2Vzc29yLmludGVycG9sYXRlXG4gICAgICAgIDogREVGQVVMVF9JTlRFUlBPTEFURTtcbiAgICBjb25zdCB0eXBlID0gaXNQbGFpbk9iamVjdChvcHRpb25zLnByb2Nlc3NvcikgJiYgaXNTdHJpbmcob3B0aW9ucy5wcm9jZXNzb3IudHlwZSlcbiAgICAgICAgPyBvcHRpb25zLnByb2Nlc3Nvci50eXBlXG4gICAgICAgIDogREVGQVVMVF9NRVNTQUdFX0RBVEFfVFlQRTtcbiAgICBjb25zdCBsaW5rZWQgPSAoa2V5LCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IFthcmcxLCBhcmcyXSA9IGFyZ3M7XG4gICAgICAgIGxldCB0eXBlID0gJ3RleHQnO1xuICAgICAgICBsZXQgbW9kaWZpZXIgPSAnJztcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoYXJnMSkpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9IGFyZzEubW9kaWZpZXIgfHwgbW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGFyZzEudHlwZSB8fCB0eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNTdHJpbmcoYXJnMSkpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9IGFyZzEgfHwgbW9kaWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcxKSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gYXJnMSB8fCBtb2RpZmllcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBhcmcyIHx8IHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmV0ID0gbWVzc2FnZShrZXkpKGN0eCk7XG4gICAgICAgIGNvbnN0IG1zZyA9IFxuICAgICAgICAvLyBUaGUgbWVzc2FnZSBpbiB2bm9kZSByZXNvbHZlZCB3aXRoIGxpbmtlZCBhcmUgcmV0dXJuZWQgYXMgYW4gYXJyYXkgYnkgcHJvY2Vzc29yLm5vbWFsaXplXG4gICAgICAgIHR5cGUgPT09ICd2bm9kZScgJiYgaXNBcnJheShyZXQpICYmIG1vZGlmaWVyXG4gICAgICAgICAgICA/IHJldFswXVxuICAgICAgICAgICAgOiByZXQ7XG4gICAgICAgIHJldHVybiBtb2RpZmllciA/IF9tb2RpZmllcihtb2RpZmllcikobXNnLCB0eXBlKSA6IG1zZztcbiAgICB9O1xuICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgW1wibGlzdFwiIC8qIEhlbHBlck5hbWVNYXAuTElTVCAqL106IGxpc3QsXG4gICAgICAgIFtcIm5hbWVkXCIgLyogSGVscGVyTmFtZU1hcC5OQU1FRCAqL106IG5hbWVkLFxuICAgICAgICBbXCJwbHVyYWxcIiAvKiBIZWxwZXJOYW1lTWFwLlBMVVJBTCAqL106IHBsdXJhbCxcbiAgICAgICAgW1wibGlua2VkXCIgLyogSGVscGVyTmFtZU1hcC5MSU5LRUQgKi9dOiBsaW5rZWQsXG4gICAgICAgIFtcIm1lc3NhZ2VcIiAvKiBIZWxwZXJOYW1lTWFwLk1FU1NBR0UgKi9dOiBtZXNzYWdlLFxuICAgICAgICBbXCJ0eXBlXCIgLyogSGVscGVyTmFtZU1hcC5UWVBFICovXTogdHlwZSxcbiAgICAgICAgW1wiaW50ZXJwb2xhdGVcIiAvKiBIZWxwZXJOYW1lTWFwLklOVEVSUE9MQVRFICovXTogaW50ZXJwb2xhdGUsXG4gICAgICAgIFtcIm5vcm1hbGl6ZVwiIC8qIEhlbHBlck5hbWVNYXAuTk9STUFMSVpFICovXTogbm9ybWFsaXplLFxuICAgICAgICBbXCJ2YWx1ZXNcIiAvKiBIZWxwZXJOYW1lTWFwLlZBTFVFUyAqL106IGFzc2lnbih7fSwgX2xpc3QsIF9uYW1lZClcbiAgICB9O1xuICAgIHJldHVybiBjdHg7XG59XG5cbmxldCBkZXZ0b29scyA9IG51bGw7XG5mdW5jdGlvbiBzZXREZXZUb29sc0hvb2soaG9vaykge1xuICAgIGRldnRvb2xzID0gaG9vaztcbn1cbmZ1bmN0aW9uIGdldERldlRvb2xzSG9vaygpIHtcbiAgICByZXR1cm4gZGV2dG9vbHM7XG59XG5mdW5jdGlvbiBpbml0STE4bkRldlRvb2xzKGkxOG4sIHZlcnNpb24sIG1ldGEpIHtcbiAgICAvLyBUT0RPOiBxdWV1ZSBpZiBkZXZ0b29scyBpcyB1bmRlZmluZWRcbiAgICBkZXZ0b29scyAmJlxuICAgICAgICBkZXZ0b29scy5lbWl0KFwiaTE4bjppbml0XCIgLyogSW50bGlmeURldlRvb2xzSG9va3MuSTE4bkluaXQgKi8sIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgICB2ZXJzaW9uLFxuICAgICAgICAgICAgbWV0YVxuICAgICAgICB9KTtcbn1cbmNvbnN0IHRyYW5zbGF0ZURldlRvb2xzID0gLyogI19fUFVSRV9fKi8gY3JlYXRlRGV2VG9vbHNIb29rKFwiZnVuY3Rpb246dHJhbnNsYXRlXCIgLyogSW50bGlmeURldlRvb2xzSG9va3MuRnVuY3Rpb25UcmFuc2xhdGUgKi8pO1xuZnVuY3Rpb24gY3JlYXRlRGV2VG9vbHNIb29rKGhvb2spIHtcbiAgICByZXR1cm4gKHBheWxvYWRzKSA9PiBkZXZ0b29scyAmJiBkZXZ0b29scy5lbWl0KGhvb2ssIHBheWxvYWRzKTtcbn1cblxuY29uc3QgY29kZSQxID0gQ29tcGlsZVdhcm5Db2Rlcy5fX0VYVEVORF9QT0lOVF9fO1xuY29uc3QgaW5jJDEgPSBpbmNyZW1lbnRlcihjb2RlJDEpO1xuY29uc3QgQ29yZVdhcm5Db2RlcyA9IHtcbiAgICBOT1RfRk9VTkRfS0VZOiBjb2RlJDEsIC8vIDJcbiAgICBGQUxMQkFDS19UT19UUkFOU0xBVEU6IGluYyQxKCksIC8vIDNcbiAgICBDQU5OT1RfRk9STUFUX05VTUJFUjogaW5jJDEoKSwgLy8gNFxuICAgIEZBTExCQUNLX1RPX05VTUJFUl9GT1JNQVQ6IGluYyQxKCksIC8vIDVcbiAgICBDQU5OT1RfRk9STUFUX0RBVEU6IGluYyQxKCksIC8vIDZcbiAgICBGQUxMQkFDS19UT19EQVRFX0ZPUk1BVDogaW5jJDEoKSwgLy8gN1xuICAgIEVYUEVSSU1FTlRBTF9DVVNUT01fTUVTU0FHRV9DT01QSUxFUjogaW5jJDEoKSwgLy8gOFxuICAgIF9fRVhURU5EX1BPSU5UX186IGluYyQxKCkgLy8gOVxufTtcbi8qKiBAaW50ZXJuYWwgKi9cbmNvbnN0IHdhcm5NZXNzYWdlcyA9IHtcbiAgICBbQ29yZVdhcm5Db2Rlcy5OT1RfRk9VTkRfS0VZXTogYE5vdCBmb3VuZCAne2tleX0nIGtleSBpbiAne2xvY2FsZX0nIGxvY2FsZSBtZXNzYWdlcy5gLFxuICAgIFtDb3JlV2FybkNvZGVzLkZBTExCQUNLX1RPX1RSQU5TTEFURV06IGBGYWxsIGJhY2sgdG8gdHJhbnNsYXRlICd7a2V5fScga2V5IHdpdGggJ3t0YXJnZXR9JyBsb2NhbGUuYCxcbiAgICBbQ29yZVdhcm5Db2Rlcy5DQU5OT1RfRk9STUFUX05VTUJFUl06IGBDYW5ub3QgZm9ybWF0IGEgbnVtYmVyIHZhbHVlIGR1ZSB0byBub3Qgc3VwcG9ydGVkIEludGwuTnVtYmVyRm9ybWF0LmAsXG4gICAgW0NvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fTlVNQkVSX0ZPUk1BVF06IGBGYWxsIGJhY2sgdG8gbnVtYmVyIGZvcm1hdCAne2tleX0nIGtleSB3aXRoICd7dGFyZ2V0fScgbG9jYWxlLmAsXG4gICAgW0NvcmVXYXJuQ29kZXMuQ0FOTk9UX0ZPUk1BVF9EQVRFXTogYENhbm5vdCBmb3JtYXQgYSBkYXRlIHZhbHVlIGR1ZSB0byBub3Qgc3VwcG9ydGVkIEludGwuRGF0ZVRpbWVGb3JtYXQuYCxcbiAgICBbQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19EQVRFX0ZPUk1BVF06IGBGYWxsIGJhY2sgdG8gZGF0ZXRpbWUgZm9ybWF0ICd7a2V5fScga2V5IHdpdGggJ3t0YXJnZXR9JyBsb2NhbGUuYCxcbiAgICBbQ29yZVdhcm5Db2Rlcy5FWFBFUklNRU5UQUxfQ1VTVE9NX01FU1NBR0VfQ09NUElMRVJdOiBgVGhpcyBwcm9qZWN0IGlzIHVzaW5nIEN1c3RvbSBNZXNzYWdlIENvbXBpbGVyLCB3aGljaCBpcyBhbiBleHBlcmltZW50YWwgZmVhdHVyZS4gSXQgbWF5IHJlY2VpdmUgYnJlYWtpbmcgY2hhbmdlcyBvciBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUuYFxufTtcbmZ1bmN0aW9uIGdldFdhcm5NZXNzYWdlKGNvZGUsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gZm9ybWF0JDEod2Fybk1lc3NhZ2VzW2NvZGVdLCAuLi5hcmdzKTtcbn1cblxuY29uc3QgY29kZSA9IENvbXBpbGVFcnJvckNvZGVzLl9fRVhURU5EX1BPSU5UX187XG5jb25zdCBpbmMgPSBpbmNyZW1lbnRlcihjb2RlKTtcbmNvbnN0IENvcmVFcnJvckNvZGVzID0ge1xuICAgIElOVkFMSURfQVJHVU1FTlQ6IGNvZGUsIC8vIDE3XG4gICAgSU5WQUxJRF9EQVRFX0FSR1VNRU5UOiBpbmMoKSwgLy8gMThcbiAgICBJTlZBTElEX0lTT19EQVRFX0FSR1VNRU5UOiBpbmMoKSwgLy8gMTlcbiAgICBOT1RfU1VQUE9SVF9OT05fU1RSSU5HX01FU1NBR0U6IGluYygpLCAvLyAyMFxuICAgIE5PVF9TVVBQT1JUX0xPQ0FMRV9QUk9NSVNFX1ZBTFVFOiBpbmMoKSwgLy8gMjFcbiAgICBOT1RfU1VQUE9SVF9MT0NBTEVfQVNZTkNfRlVOQ1RJT046IGluYygpLCAvLyAyMlxuICAgIE5PVF9TVVBQT1JUX0xPQ0FMRV9UWVBFOiBpbmMoKSwgLy8gMjNcbiAgICBfX0VYVEVORF9QT0lOVF9fOiBpbmMoKSAvLyAyNFxufTtcbmZ1bmN0aW9uIGNyZWF0ZUNvcmVFcnJvcihjb2RlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbXBpbGVFcnJvcihjb2RlLCBudWxsLCAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgPyB7IG1lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzIH0gOiB1bmRlZmluZWQpO1xufVxuLyoqIEBpbnRlcm5hbCAqL1xuY29uc3QgZXJyb3JNZXNzYWdlcyA9IHtcbiAgICBbQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVF06ICdJbnZhbGlkIGFyZ3VtZW50cycsXG4gICAgW0NvcmVFcnJvckNvZGVzLklOVkFMSURfREFURV9BUkdVTUVOVF06ICdUaGUgZGF0ZSBwcm92aWRlZCBpcyBhbiBpbnZhbGlkIERhdGUgb2JqZWN0LicgK1xuICAgICAgICAnTWFrZSBzdXJlIHlvdXIgRGF0ZSByZXByZXNlbnRzIGEgdmFsaWQgZGF0ZS4nLFxuICAgIFtDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0lTT19EQVRFX0FSR1VNRU5UXTogJ1RoZSBhcmd1bWVudCBwcm92aWRlZCBpcyBub3QgYSB2YWxpZCBJU08gZGF0ZSBzdHJpbmcnLFxuICAgIFtDb3JlRXJyb3JDb2Rlcy5OT1RfU1VQUE9SVF9OT05fU1RSSU5HX01FU1NBR0VdOiAnTm90IHN1cHBvcnQgbm9uLXN0cmluZyBtZXNzYWdlJyxcbiAgICBbQ29yZUVycm9yQ29kZXMuTk9UX1NVUFBPUlRfTE9DQUxFX1BST01JU0VfVkFMVUVdOiAnY2Fubm90IHN1cHBvcnQgcHJvbWlzZSB2YWx1ZScsXG4gICAgW0NvcmVFcnJvckNvZGVzLk5PVF9TVVBQT1JUX0xPQ0FMRV9BU1lOQ19GVU5DVElPTl06ICdjYW5ub3Qgc3VwcG9ydCBhc3luYyBmdW5jdGlvbicsXG4gICAgW0NvcmVFcnJvckNvZGVzLk5PVF9TVVBQT1JUX0xPQ0FMRV9UWVBFXTogJ2Nhbm5vdCBzdXBwb3J0IGxvY2FsZSB0eXBlJ1xufTtcblxuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gZ2V0TG9jYWxlKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUgIT0gbnVsbFxuICAgICAgICA/IHJlc29sdmVMb2NhbGUob3B0aW9ucy5sb2NhbGUpXG4gICAgICAgIDogcmVzb2x2ZUxvY2FsZShjb250ZXh0LmxvY2FsZSk7XG59XG5sZXQgX3Jlc29sdmVMb2NhbGU7XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiByZXNvbHZlTG9jYWxlKGxvY2FsZSkge1xuICAgIGlmIChpc1N0cmluZyhsb2NhbGUpKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihsb2NhbGUpKSB7XG4gICAgICAgICAgICBpZiAobG9jYWxlLnJlc29sdmVkT25jZSAmJiBfcmVzb2x2ZUxvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZXNvbHZlTG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobG9jYWxlLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdGdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlID0gbG9jYWxlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShyZXNvbHZlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuTk9UX1NVUFBPUlRfTE9DQUxFX1BST01JU0VfVkFMVUUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKF9yZXNvbHZlTG9jYWxlID0gcmVzb2x2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuTk9UX1NVUFBPUlRfTE9DQUxFX0FTWU5DX0ZVTkNUSU9OKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5OT1RfU1VQUE9SVF9MT0NBTEVfVFlQRSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEZhbGxiYWNrIHdpdGggc2ltcGxlIGltcGxlbWVuYXRpb25cbiAqXG4gKiBAcmVtYXJrc1xuICogQSBmYWxsYmFjayBsb2NhbGUgZnVuY3Rpb24gaW1wbGVtZW50ZWQgd2l0aCBhIHNpbXBsZSBmYWxsYmFjayBhbGdvcml0aG0uXG4gKlxuICogQmFzaWNhbGx5LCBpdCByZXR1cm5zIHRoZSB2YWx1ZSBhcyBzcGVjaWZpZWQgaW4gdGhlIGBmYWxsYmFja0xvY2FsZWAgcHJvcHMsIGFuZCBpcyBwcm9jZXNzZWQgd2l0aCB0aGUgZmFsbGJhY2sgaW5zaWRlIGludGxpZnkuXG4gKlxuICogQHBhcmFtIGN0eCAtIEEge0BsaW5rIENvcmVDb250ZXh0IHwgY29udGV4dH1cbiAqIEBwYXJhbSBmYWxsYmFjayAtIEEge0BsaW5rIEZhbGxiYWNrTG9jYWxlIHwgZmFsbGJhY2sgbG9jYWxlfVxuICogQHBhcmFtIHN0YXJ0IC0gQSBzdGFydGluZyB7QGxpbmsgTG9jYWxlIHwgbG9jYWxlfVxuICpcbiAqIEByZXR1cm5zIEZhbGxiYWNrIGxvY2FsZXNcbiAqXG4gKiBAVnVlSTE4bkdlbmVyYWxcbiAqL1xuZnVuY3Rpb24gZmFsbGJhY2tXaXRoU2ltcGxlKGN0eCwgZmFsbGJhY2ssIHN0YXJ0IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4pIHtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoW1xuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICAuLi4oaXNBcnJheShmYWxsYmFjaylcbiAgICAgICAgICAgICAgICA/IGZhbGxiYWNrXG4gICAgICAgICAgICAgICAgOiBpc09iamVjdChmYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgPyBPYmplY3Qua2V5cyhmYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgOiBpc1N0cmluZyhmYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgID8gW2ZhbGxiYWNrXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbc3RhcnRdKVxuICAgICAgICBdKV07XG59XG4vKipcbiAqIEZhbGxiYWNrIHdpdGggbG9jYWxlIGNoYWluXG4gKlxuICogQHJlbWFya3NcbiAqIEEgZmFsbGJhY2sgbG9jYWxlIGZ1bmN0aW9uIGltcGxlbWVudGVkIHdpdGggYSBmYWxsYmFjayBjaGFpbiBhbGdvcml0aG0uIEl0J3MgdXNlZCBpbiBWdWVJMThuIGFzIGRlZmF1bHQuXG4gKlxuICogQHBhcmFtIGN0eCAtIEEge0BsaW5rIENvcmVDb250ZXh0IHwgY29udGV4dH1cbiAqIEBwYXJhbSBmYWxsYmFjayAtIEEge0BsaW5rIEZhbGxiYWNrTG9jYWxlIHwgZmFsbGJhY2sgbG9jYWxlfVxuICogQHBhcmFtIHN0YXJ0IC0gQSBzdGFydGluZyB7QGxpbmsgTG9jYWxlIHwgbG9jYWxlfVxuICpcbiAqIEByZXR1cm5zIEZhbGxiYWNrIGxvY2FsZXNcbiAqXG4gKiBAVnVlSTE4blNlZSBbRmFsbGJhY2tpbmddKC4uL2d1aWRlL2Vzc2VudGlhbHMvZmFsbGJhY2spXG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmZ1bmN0aW9uIGZhbGxiYWNrV2l0aExvY2FsZUNoYWluKGN0eCwgZmFsbGJhY2ssIHN0YXJ0KSB7XG4gICAgY29uc3Qgc3RhcnRMb2NhbGUgPSBpc1N0cmluZyhzdGFydCkgPyBzdGFydCA6IERFRkFVTFRfTE9DQUxFO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjdHg7XG4gICAgaWYgKCFjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZSkge1xuICAgICAgICBjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgbGV0IGNoYWluID0gY29udGV4dC5fX2xvY2FsZUNoYWluQ2FjaGUuZ2V0KHN0YXJ0TG9jYWxlKTtcbiAgICBpZiAoIWNoYWluKSB7XG4gICAgICAgIGNoYWluID0gW107XG4gICAgICAgIC8vIGZpcnN0IGJsb2NrIGRlZmluZWQgYnkgc3RhcnRcbiAgICAgICAgbGV0IGJsb2NrID0gW3N0YXJ0XTtcbiAgICAgICAgLy8gd2hpbGUgYW55IGludGVydmVuaW5nIGJsb2NrIGZvdW5kXG4gICAgICAgIHdoaWxlIChpc0FycmF5KGJsb2NrKSkge1xuICAgICAgICAgICAgYmxvY2sgPSBhcHBlbmRCbG9ja1RvQ2hhaW4oY2hhaW4sIGJsb2NrLCBmYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIC8vIGxhc3QgYmxvY2sgZGVmaW5lZCBieSBkZWZhdWx0XG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0gaXNBcnJheShmYWxsYmFjaykgfHwgIWlzUGxhaW5PYmplY3QoZmFsbGJhY2spXG4gICAgICAgICAgICA/IGZhbGxiYWNrXG4gICAgICAgICAgICA6IGZhbGxiYWNrWydkZWZhdWx0J11cbiAgICAgICAgICAgICAgICA/IGZhbGxiYWNrWydkZWZhdWx0J11cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIC8vIGNvbnZlcnQgZGVmYXVsdHMgdG8gYXJyYXlcbiAgICAgICAgYmxvY2sgPSBpc1N0cmluZyhkZWZhdWx0cykgPyBbZGVmYXVsdHNdIDogZGVmYXVsdHM7XG4gICAgICAgIGlmIChpc0FycmF5KGJsb2NrKSkge1xuICAgICAgICAgICAgYXBwZW5kQmxvY2tUb0NoYWluKGNoYWluLCBibG9jaywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuX19sb2NhbGVDaGFpbkNhY2hlLnNldChzdGFydExvY2FsZSwgY2hhaW4pO1xuICAgIH1cbiAgICByZXR1cm4gY2hhaW47XG59XG5mdW5jdGlvbiBhcHBlbmRCbG9ja1RvQ2hhaW4oY2hhaW4sIGJsb2NrLCBibG9ja3MpIHtcbiAgICBsZXQgZm9sbG93ID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2NrLmxlbmd0aCAmJiBpc0Jvb2xlYW4oZm9sbG93KTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsZSA9IGJsb2NrW2ldO1xuICAgICAgICBpZiAoaXNTdHJpbmcobG9jYWxlKSkge1xuICAgICAgICAgICAgZm9sbG93ID0gYXBwZW5kTG9jYWxlVG9DaGFpbihjaGFpbiwgYmxvY2tbaV0sIGJsb2Nrcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZvbGxvdztcbn1cbmZ1bmN0aW9uIGFwcGVuZExvY2FsZVRvQ2hhaW4oY2hhaW4sIGxvY2FsZSwgYmxvY2tzKSB7XG4gICAgbGV0IGZvbGxvdztcbiAgICBjb25zdCB0b2tlbnMgPSBsb2NhbGUuc3BsaXQoJy0nKTtcbiAgICBkbyB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRva2Vucy5qb2luKCctJyk7XG4gICAgICAgIGZvbGxvdyA9IGFwcGVuZEl0ZW1Ub0NoYWluKGNoYWluLCB0YXJnZXQsIGJsb2Nrcyk7XG4gICAgICAgIHRva2Vucy5zcGxpY2UoLTEsIDEpO1xuICAgIH0gd2hpbGUgKHRva2Vucy5sZW5ndGggJiYgZm9sbG93ID09PSB0cnVlKTtcbiAgICByZXR1cm4gZm9sbG93O1xufVxuZnVuY3Rpb24gYXBwZW5kSXRlbVRvQ2hhaW4oY2hhaW4sIHRhcmdldCwgYmxvY2tzKSB7XG4gICAgbGV0IGZvbGxvdyA9IGZhbHNlO1xuICAgIGlmICghY2hhaW4uaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgICBmb2xsb3cgPSB0cnVlO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBmb2xsb3cgPSB0YXJnZXRbdGFyZ2V0Lmxlbmd0aCAtIDFdICE9PSAnISc7XG4gICAgICAgICAgICBjb25zdCBsb2NhbGUgPSB0YXJnZXQucmVwbGFjZSgvIS9nLCAnJyk7XG4gICAgICAgICAgICBjaGFpbi5wdXNoKGxvY2FsZSk7XG4gICAgICAgICAgICBpZiAoKGlzQXJyYXkoYmxvY2tzKSB8fCBpc1BsYWluT2JqZWN0KGJsb2NrcykpICYmXG4gICAgICAgICAgICAgICAgYmxvY2tzW2xvY2FsZV0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgIGZvbGxvdyA9IGJsb2Nrc1tsb2NhbGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb2xsb3c7XG59XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qKlxuICogSW50bGlmeSBjb3JlLWJhc2UgdmVyc2lvblxuICogQGludGVybmFsXG4gKi9cbmNvbnN0IFZFUlNJT04gPSAnOS4xMy4xJztcbmNvbnN0IE5PVF9SRU9TTFZFRCA9IC0xO1xuY29uc3QgREVGQVVMVF9MT0NBTEUgPSAnZW4tVVMnO1xuY29uc3QgTUlTU0lOR19SRVNPTFZFX1ZBTFVFID0gJyc7XG5jb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT4gYCR7c3RyLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpfSR7c3RyLnN1YnN0cigxKX1gO1xuZnVuY3Rpb24gZ2V0RGVmYXVsdExpbmtlZE1vZGlmaWVycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1cHBlcjogKHZhbCwgdHlwZSkgPT4ge1xuICAgICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ3RleHQnICYmIGlzU3RyaW5nKHZhbClcbiAgICAgICAgICAgICAgICA/IHZhbC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgOiB0eXBlID09PSAndm5vZGUnICYmIGlzT2JqZWN0KHZhbCkgJiYgJ19fdl9pc1ZOb2RlJyBpbiB2YWxcbiAgICAgICAgICAgICAgICAgICAgPyB2YWwuY2hpbGRyZW4udG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICA6IHZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgbG93ZXI6ICh2YWwsIHR5cGUpID0+IHtcbiAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09ICd0ZXh0JyAmJiBpc1N0cmluZyh2YWwpXG4gICAgICAgICAgICAgICAgPyB2YWwudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIDogdHlwZSA9PT0gJ3Zub2RlJyAmJiBpc09iamVjdCh2YWwpICYmICdfX3ZfaXNWTm9kZScgaW4gdmFsXG4gICAgICAgICAgICAgICAgICAgID8gdmFsLmNoaWxkcmVuLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgOiB2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGNhcGl0YWxpemU6ICh2YWwsIHR5cGUpID0+IHtcbiAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgcmV0dXJuICh0eXBlID09PSAndGV4dCcgJiYgaXNTdHJpbmcodmFsKVxuICAgICAgICAgICAgICAgID8gY2FwaXRhbGl6ZSh2YWwpXG4gICAgICAgICAgICAgICAgOiB0eXBlID09PSAndm5vZGUnICYmIGlzT2JqZWN0KHZhbCkgJiYgJ19fdl9pc1ZOb2RlJyBpbiB2YWxcbiAgICAgICAgICAgICAgICAgICAgPyBjYXBpdGFsaXplKHZhbC5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAgICAgOiB2YWwpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmxldCBfY29tcGlsZXI7XG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VDb21waWxlcihjb21waWxlcikge1xuICAgIF9jb21waWxlciA9IGNvbXBpbGVyO1xufVxubGV0IF9yZXNvbHZlcjtcbi8qKlxuICogUmVnaXN0ZXIgdGhlIG1lc3NhZ2UgcmVzb2x2ZXJcbiAqXG4gKiBAcGFyYW0gcmVzb2x2ZXIgLSBBIHtAbGluayBNZXNzYWdlUmVzb2x2ZXJ9IGZ1bmN0aW9uXG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZVJlc29sdmVyKHJlc29sdmVyKSB7XG4gICAgX3Jlc29sdmVyID0gcmVzb2x2ZXI7XG59XG5sZXQgX2ZhbGxiYWNrZXI7XG4vKipcbiAqIFJlZ2lzdGVyIHRoZSBsb2NhbGUgZmFsbGJhY2tlclxuICpcbiAqIEBwYXJhbSBmYWxsYmFja2VyIC0gQSB7QGxpbmsgTG9jYWxlRmFsbGJhY2tlcn0gZnVuY3Rpb25cbiAqXG4gKiBAVnVlSTE4bkdlbmVyYWxcbiAqL1xuZnVuY3Rpb24gcmVnaXN0ZXJMb2NhbGVGYWxsYmFja2VyKGZhbGxiYWNrZXIpIHtcbiAgICBfZmFsbGJhY2tlciA9IGZhbGxiYWNrZXI7XG59XG4vLyBBZGRpdGlvbmFsIE1ldGEgZm9yIEludGxpZnkgRGV2VG9vbHNcbmxldCBfYWRkaXRpb25hbE1ldGEgPSAgbnVsbDtcbi8qICNfX05PX1NJREVfRUZGRUNUU19fICovXG5jb25zdCBzZXRBZGRpdGlvbmFsTWV0YSA9IChtZXRhKSA9PiB7XG4gICAgX2FkZGl0aW9uYWxNZXRhID0gbWV0YTtcbn07XG4vKiAjX19OT19TSURFX0VGRkVDVFNfXyAqL1xuY29uc3QgZ2V0QWRkaXRpb25hbE1ldGEgPSAoKSA9PiBfYWRkaXRpb25hbE1ldGE7XG5sZXQgX2ZhbGxiYWNrQ29udGV4dCA9IG51bGw7XG5jb25zdCBzZXRGYWxsYmFja0NvbnRleHQgPSAoY29udGV4dCkgPT4ge1xuICAgIF9mYWxsYmFja0NvbnRleHQgPSBjb250ZXh0O1xufTtcbmNvbnN0IGdldEZhbGxiYWNrQ29udGV4dCA9ICgpID0+IF9mYWxsYmFja0NvbnRleHQ7XG4vLyBJRCBmb3IgQ29yZUNvbnRleHRcbmxldCBfY2lkID0gMDtcbmZ1bmN0aW9uIGNyZWF0ZUNvcmVDb250ZXh0KG9wdGlvbnMgPSB7fSkge1xuICAgIC8vIHNldHVwIG9wdGlvbnNcbiAgICBjb25zdCBvbldhcm4gPSBpc0Z1bmN0aW9uKG9wdGlvbnMub25XYXJuKSA/IG9wdGlvbnMub25XYXJuIDogd2FybjtcbiAgICBjb25zdCB2ZXJzaW9uID0gaXNTdHJpbmcob3B0aW9ucy52ZXJzaW9uKSA/IG9wdGlvbnMudmVyc2lvbiA6IFZFUlNJT047XG4gICAgY29uc3QgbG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpIHx8IGlzRnVuY3Rpb24ob3B0aW9ucy5sb2NhbGUpXG4gICAgICAgID8gb3B0aW9ucy5sb2NhbGVcbiAgICAgICAgOiBERUZBVUxUX0xPQ0FMRTtcbiAgICBjb25zdCBfbG9jYWxlID0gaXNGdW5jdGlvbihsb2NhbGUpID8gREVGQVVMVF9MT0NBTEUgOiBsb2NhbGU7XG4gICAgY29uc3QgZmFsbGJhY2tMb2NhbGUgPSBpc0FycmF5KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgIGlzUGxhaW5PYmplY3Qob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgb3B0aW9ucy5mYWxsYmFja0xvY2FsZSA9PT0gZmFsc2VcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrTG9jYWxlXG4gICAgICAgIDogX2xvY2FsZTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5tZXNzYWdlcylcbiAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VzXG4gICAgICAgIDogeyBbX2xvY2FsZV06IHt9IH07XG4gICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzID0gaXNQbGFpbk9iamVjdChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cylcbiAgICAgICAgICAgID8gb3B0aW9ucy5kYXRldGltZUZvcm1hdHNcbiAgICAgICAgICAgIDogeyBbX2xvY2FsZV06IHt9IH1cbiAgICAgICAgO1xuICAgIGNvbnN0IG51bWJlckZvcm1hdHMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMubnVtYmVyRm9ybWF0cylcbiAgICAgICAgICAgID8gb3B0aW9ucy5udW1iZXJGb3JtYXRzXG4gICAgICAgICAgICA6IHsgW19sb2NhbGVdOiB7fSB9XG4gICAgICAgIDtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBhc3NpZ24oe30sIG9wdGlvbnMubW9kaWZpZXJzIHx8IHt9LCBnZXREZWZhdWx0TGlua2VkTW9kaWZpZXJzKCkpO1xuICAgIGNvbnN0IHBsdXJhbFJ1bGVzID0gb3B0aW9ucy5wbHVyYWxSdWxlcyB8fCB7fTtcbiAgICBjb25zdCBtaXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogbnVsbDtcbiAgICBjb25zdCBtaXNzaW5nV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLm1pc3NpbmdXYXJuKVxuICAgICAgICA/IG9wdGlvbnMubWlzc2luZ1dhcm5cbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGZhbGxiYWNrRm9ybWF0ID0gISFvcHRpb25zLmZhbGxiYWNrRm9ybWF0O1xuICAgIGNvbnN0IHVucmVzb2x2aW5nID0gISFvcHRpb25zLnVucmVzb2x2aW5nO1xuICAgIGNvbnN0IHBvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXG4gICAgICAgID8gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb25cbiAgICAgICAgOiBudWxsO1xuICAgIGNvbnN0IHByb2Nlc3NvciA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5wcm9jZXNzb3IpID8gb3B0aW9ucy5wcm9jZXNzb3IgOiBudWxsO1xuICAgIGNvbnN0IHdhcm5IdG1sTWVzc2FnZSA9IGlzQm9vbGVhbihvcHRpb25zLndhcm5IdG1sTWVzc2FnZSlcbiAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sTWVzc2FnZVxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgZXNjYXBlUGFyYW1ldGVyID0gISFvcHRpb25zLmVzY2FwZVBhcmFtZXRlcjtcbiAgICBjb25zdCBtZXNzYWdlQ29tcGlsZXIgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZUNvbXBpbGVyKVxuICAgICAgICA/IG9wdGlvbnMubWVzc2FnZUNvbXBpbGVyXG4gICAgICAgIDogX2NvbXBpbGVyO1xuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgIWZhbHNlICYmXG4gICAgICAgICFmYWxzZSAmJlxuICAgICAgICBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZUNvbXBpbGVyKSkge1xuICAgICAgICB3YXJuT25jZShnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkVYUEVSSU1FTlRBTF9DVVNUT01fTUVTU0FHRV9DT01QSUxFUikpO1xuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlUmVzb2x2ZXIgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZVJlc29sdmVyKVxuICAgICAgICA/IG9wdGlvbnMubWVzc2FnZVJlc29sdmVyXG4gICAgICAgIDogX3Jlc29sdmVyIHx8IHJlc29sdmVXaXRoS2V5VmFsdWU7XG4gICAgY29uc3QgbG9jYWxlRmFsbGJhY2tlciA9IGlzRnVuY3Rpb24ob3B0aW9ucy5sb2NhbGVGYWxsYmFja2VyKVxuICAgICAgICA/IG9wdGlvbnMubG9jYWxlRmFsbGJhY2tlclxuICAgICAgICA6IF9mYWxsYmFja2VyIHx8IGZhbGxiYWNrV2l0aFNpbXBsZTtcbiAgICBjb25zdCBmYWxsYmFja0NvbnRleHQgPSBpc09iamVjdChvcHRpb25zLmZhbGxiYWNrQ29udGV4dClcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrQ29udGV4dFxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAvLyBzZXR1cCBpbnRlcm5hbCBvcHRpb25zXG4gICAgY29uc3QgaW50ZXJuYWxPcHRpb25zID0gb3B0aW9ucztcbiAgICBjb25zdCBfX2RhdGV0aW1lRm9ybWF0dGVycyA9IGlzT2JqZWN0KGludGVybmFsT3B0aW9ucy5fX2RhdGV0aW1lRm9ybWF0dGVycylcbiAgICAgICAgICAgID8gaW50ZXJuYWxPcHRpb25zLl9fZGF0ZXRpbWVGb3JtYXR0ZXJzXG4gICAgICAgICAgICA6IG5ldyBNYXAoKVxuICAgICAgICA7XG4gICAgY29uc3QgX19udW1iZXJGb3JtYXR0ZXJzID0gaXNPYmplY3QoaW50ZXJuYWxPcHRpb25zLl9fbnVtYmVyRm9ybWF0dGVycylcbiAgICAgICAgICAgID8gaW50ZXJuYWxPcHRpb25zLl9fbnVtYmVyRm9ybWF0dGVyc1xuICAgICAgICAgICAgOiBuZXcgTWFwKClcbiAgICAgICAgO1xuICAgIGNvbnN0IF9fbWV0YSA9IGlzT2JqZWN0KGludGVybmFsT3B0aW9ucy5fX21ldGEpID8gaW50ZXJuYWxPcHRpb25zLl9fbWV0YSA6IHt9O1xuICAgIF9jaWQrKztcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBjaWQ6IF9jaWQsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIHBsdXJhbFJ1bGVzLFxuICAgICAgICBtaXNzaW5nLFxuICAgICAgICBtaXNzaW5nV2FybixcbiAgICAgICAgZmFsbGJhY2tXYXJuLFxuICAgICAgICBmYWxsYmFja0Zvcm1hdCxcbiAgICAgICAgdW5yZXNvbHZpbmcsXG4gICAgICAgIHBvc3RUcmFuc2xhdGlvbixcbiAgICAgICAgcHJvY2Vzc29yLFxuICAgICAgICB3YXJuSHRtbE1lc3NhZ2UsXG4gICAgICAgIGVzY2FwZVBhcmFtZXRlcixcbiAgICAgICAgbWVzc2FnZUNvbXBpbGVyLFxuICAgICAgICBtZXNzYWdlUmVzb2x2ZXIsXG4gICAgICAgIGxvY2FsZUZhbGxiYWNrZXIsXG4gICAgICAgIGZhbGxiYWNrQ29udGV4dCxcbiAgICAgICAgb25XYXJuLFxuICAgICAgICBfX21ldGFcbiAgICB9O1xuICAgIHtcbiAgICAgICAgY29udGV4dC5kYXRldGltZUZvcm1hdHMgPSBkYXRldGltZUZvcm1hdHM7XG4gICAgICAgIGNvbnRleHQubnVtYmVyRm9ybWF0cyA9IG51bWJlckZvcm1hdHM7XG4gICAgICAgIGNvbnRleHQuX19kYXRldGltZUZvcm1hdHRlcnMgPSBfX2RhdGV0aW1lRm9ybWF0dGVycztcbiAgICAgICAgY29udGV4dC5fX251bWJlckZvcm1hdHRlcnMgPSBfX251bWJlckZvcm1hdHRlcnM7XG4gICAgfVxuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgIGNvbnRleHQuX192X2VtaXR0ZXIgPVxuICAgICAgICAgICAgaW50ZXJuYWxPcHRpb25zLl9fdl9lbWl0dGVyICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGludGVybmFsT3B0aW9ucy5fX3ZfZW1pdHRlclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgICAgaW5pdEkxOG5EZXZUb29scyhjb250ZXh0LCB2ZXJzaW9uLCBfX21ldGEpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrLCBrZXkpIHtcbiAgICByZXR1cm4gZmFsbGJhY2sgaW5zdGFuY2VvZiBSZWdFeHAgPyBmYWxsYmFjay50ZXN0KGtleSkgOiBmYWxsYmFjaztcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4obWlzc2luZywga2V5KSB7XG4gICAgcmV0dXJuIG1pc3NpbmcgaW5zdGFuY2VvZiBSZWdFeHAgPyBtaXNzaW5nLnRlc3Qoa2V5KSA6IG1pc3Npbmc7XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIGtleSwgbG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSkge1xuICAgIGNvbnN0IHsgbWlzc2luZywgb25XYXJuIH0gPSBjb250ZXh0O1xuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWlzc2luZ1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuTUlTU0lORyAqLywge1xuICAgICAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobWlzc2luZyAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCByZXQgPSBtaXNzaW5nKGNvbnRleHQsIGxvY2FsZSwga2V5LCB0eXBlKTtcbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nKHJldCkgPyByZXQgOiBrZXk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4obWlzc2luZ1dhcm4sIGtleSkpIHtcbiAgICAgICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLk5PVF9GT1VORF9LRVksIHsga2V5LCBsb2NhbGUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxufVxuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gdXBkYXRlRmFsbGJhY2tMb2NhbGUoY3R4LCBsb2NhbGUsIGZhbGxiYWNrKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGN0eDtcbiAgICBjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZSA9IG5ldyBNYXAoKTtcbiAgICBjdHgubG9jYWxlRmFsbGJhY2tlcihjdHgsIGZhbGxiYWNrLCBsb2NhbGUpO1xufVxuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gaXNBbG1vc3RTYW1lTG9jYWxlKGxvY2FsZSwgY29tcGFyZUxvY2FsZSkge1xuICAgIGlmIChsb2NhbGUgPT09IGNvbXBhcmVMb2NhbGUpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbG9jYWxlLnNwbGl0KCctJylbMF0gPT09IGNvbXBhcmVMb2NhbGUuc3BsaXQoJy0nKVswXTtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGlzSW1wbGljaXRGYWxsYmFjayh0YXJnZXRMb2NhbGUsIGxvY2FsZXMpIHtcbiAgICBjb25zdCBpbmRleCA9IGxvY2FsZXMuaW5kZXhPZih0YXJnZXRMb2NhbGUpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gaW5kZXggKyAxOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXNBbG1vc3RTYW1lTG9jYWxlKHRhcmdldExvY2FsZSwgbG9jYWxlc1tpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5mdW5jdGlvbiBmb3JtYXQoYXN0KSB7XG4gICAgY29uc3QgbXNnID0gKGN0eCkgPT4gZm9ybWF0UGFydHMoY3R4LCBhc3QpO1xuICAgIHJldHVybiBtc2c7XG59XG5mdW5jdGlvbiBmb3JtYXRQYXJ0cyhjdHgsIGFzdCkge1xuICAgIGNvbnN0IGJvZHkgPSBhc3QuYiB8fCBhc3QuYm9keTtcbiAgICBpZiAoKGJvZHkudCB8fCBib2R5LnR5cGUpID09PSAxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi8pIHtcbiAgICAgICAgY29uc3QgcGx1cmFsID0gYm9keTtcbiAgICAgICAgY29uc3QgY2FzZXMgPSBwbHVyYWwuYyB8fCBwbHVyYWwuY2FzZXM7XG4gICAgICAgIHJldHVybiBjdHgucGx1cmFsKGNhc2VzLnJlZHVjZSgobWVzc2FnZXMsIGMpID0+IFtcbiAgICAgICAgICAgIC4uLm1lc3NhZ2VzLFxuICAgICAgICAgICAgZm9ybWF0TWVzc2FnZVBhcnRzKGN0eCwgYylcbiAgICAgICAgXSwgW10pKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmb3JtYXRNZXNzYWdlUGFydHMoY3R4LCBib2R5KTtcbiAgICB9XG59XG5mdW5jdGlvbiBmb3JtYXRNZXNzYWdlUGFydHMoY3R4LCBub2RlKSB7XG4gICAgY29uc3QgX3N0YXRpYyA9IG5vZGUucyB8fCBub2RlLnN0YXRpYztcbiAgICBpZiAoX3N0YXRpYykge1xuICAgICAgICByZXR1cm4gY3R4LnR5cGUgPT09ICd0ZXh0J1xuICAgICAgICAgICAgPyBfc3RhdGljXG4gICAgICAgICAgICA6IGN0eC5ub3JtYWxpemUoW19zdGF0aWNdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gKG5vZGUuaSB8fCBub2RlLml0ZW1zKS5yZWR1Y2UoKGFjbSwgYykgPT4gWy4uLmFjbSwgZm9ybWF0TWVzc2FnZVBhcnQoY3R4LCBjKV0sIFtdKTtcbiAgICAgICAgcmV0dXJuIGN0eC5ub3JtYWxpemUobWVzc2FnZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2VQYXJ0KGN0eCwgbm9kZSkge1xuICAgIGNvbnN0IHR5cGUgPSBub2RlLnQgfHwgbm9kZS50eXBlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIDMgLyogTm9kZVR5cGVzLlRleHQgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBub2RlO1xuICAgICAgICAgICAgcmV0dXJuICh0ZXh0LnYgfHwgdGV4dC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovOiB7XG4gICAgICAgICAgICBjb25zdCBsaXRlcmFsID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiAobGl0ZXJhbC52IHx8IGxpdGVyYWwudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNCAvKiBOb2RlVHlwZXMuTmFtZWQgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVkID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiBjdHguaW50ZXJwb2xhdGUoY3R4Lm5hbWVkKG5hbWVkLmsgfHwgbmFtZWQua2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA1IC8qIE5vZGVUeXBlcy5MaXN0ICovOiB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiBjdHguaW50ZXJwb2xhdGUoY3R4Lmxpc3QobGlzdC5pICE9IG51bGwgPyBsaXN0LmkgOiBsaXN0LmluZGV4KSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA2IC8qIE5vZGVUeXBlcy5MaW5rZWQgKi86IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZCA9IG5vZGU7XG4gICAgICAgICAgICBjb25zdCBtb2RpZmllciA9IGxpbmtlZC5tIHx8IGxpbmtlZC5tb2RpZmllcjtcbiAgICAgICAgICAgIHJldHVybiBjdHgubGlua2VkKGZvcm1hdE1lc3NhZ2VQYXJ0KGN0eCwgbGlua2VkLmsgfHwgbGlua2VkLmtleSksIG1vZGlmaWVyID8gZm9ybWF0TWVzc2FnZVBhcnQoY3R4LCBtb2RpZmllcikgOiB1bmRlZmluZWQsIGN0eC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDcgLyogTm9kZVR5cGVzLkxpbmtlZEtleSAqLzoge1xuICAgICAgICAgICAgY29uc3QgbGlua2VkS2V5ID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiAobGlua2VkS2V5LnYgfHwgbGlua2VkS2V5LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDggLyogTm9kZVR5cGVzLkxpbmtlZE1vZGlmaWVyICovOiB7XG4gICAgICAgICAgICBjb25zdCBsaW5rZWRNb2RpZmllciA9IG5vZGU7XG4gICAgICAgICAgICByZXR1cm4gKGxpbmtlZE1vZGlmaWVyLnYgfHwgbGlua2VkTW9kaWZpZXIudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBub2RlIHR5cGUgb24gZm9ybWF0IG1lc3NhZ2UgcGFydDogJHt0eXBlfWApO1xuICAgIH1cbn1cblxuY29uc3QgV0FSTl9NRVNTQUdFID0gYERldGVjdGVkIEhUTUwgaW4gJ3tzb3VyY2V9JyBtZXNzYWdlLiBSZWNvbW1lbmQgbm90IHVzaW5nIEhUTUwgbWVzc2FnZXMgdG8gYXZvaWQgWFNTLmA7XG5mdW5jdGlvbiBjaGVja0h0bWxNZXNzYWdlKHNvdXJjZSwgd2Fybkh0bWxNZXNzYWdlKSB7XG4gICAgaWYgKHdhcm5IdG1sTWVzc2FnZSAmJiBkZXRlY3RIdG1sVGFnKHNvdXJjZSkpIHtcbiAgICAgICAgd2Fybihmb3JtYXQkMShXQVJOX01FU1NBR0UsIHsgc291cmNlIH0pKTtcbiAgICB9XG59XG5jb25zdCBkZWZhdWx0T25DYWNoZUtleSA9IChtZXNzYWdlKSA9PiBtZXNzYWdlO1xubGV0IGNvbXBpbGVDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5mdW5jdGlvbiBvbkNvbXBpbGVXYXJuKF93YXJuKSB7XG4gICAgaWYgKF93YXJuLmNvZGUgPT09IENvbXBpbGVXYXJuQ29kZXMuVVNFX01PRFVMT19TWU5UQVgpIHtcbiAgICAgICAgd2FybihgVGhlIHVzZSBvZiBuYW1lZCBpbnRlcnBvbGF0aW9uIHdpdGggbW9kdWxvIHN5bnRheCBpcyBkZXByZWNhdGVkLiBgICtcbiAgICAgICAgICAgIGBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdjEwLlxcbmAgK1xuICAgICAgICAgICAgYHJlZmVyZW5jZTogaHR0cHM6Ly92dWUtaTE4bi5pbnRsaWZ5LmRldi9ndWlkZS9lc3NlbnRpYWxzL3N5bnRheCNyYWlscy1pMThuLWZvcm1hdCBcXG5gICtcbiAgICAgICAgICAgIGAobWVzc2FnZSBjb21waWxlciB3YXJuaW5nIG1lc3NhZ2U6ICR7X3dhcm4ubWVzc2FnZX0pYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJDb21waWxlQ2FjaGUoKSB7XG4gICAgY29tcGlsZUNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmNvbnN0IGlzTWVzc2FnZUFTVCA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiZcbiAgICAodmFsLnQgPT09IDAgfHwgdmFsLnR5cGUgPT09IDApICYmXG4gICAgKCdiJyBpbiB2YWwgfHwgJ2JvZHknIGluIHZhbCk7XG5mdW5jdGlvbiBiYXNlQ29tcGlsZShtZXNzYWdlLCBvcHRpb25zID0ge30pIHtcbiAgICAvLyBlcnJvciBkZXRlY3Rpbmcgb24gY29tcGlsZVxuICAgIGxldCBkZXRlY3RFcnJvciA9IGZhbHNlO1xuICAgIGNvbnN0IG9uRXJyb3IgPSBvcHRpb25zLm9uRXJyb3IgfHwgZGVmYXVsdE9uRXJyb3I7XG4gICAgb3B0aW9ucy5vbkVycm9yID0gKGVycikgPT4ge1xuICAgICAgICBkZXRlY3RFcnJvciA9IHRydWU7XG4gICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICB9O1xuICAgIC8vIGNvbXBpbGUgd2l0aCBtZXNhc2dlLWNvbXBpbGVyXG4gICAgcmV0dXJuIHsgLi4uYmFzZUNvbXBpbGUkMShtZXNzYWdlLCBvcHRpb25zKSwgZGV0ZWN0RXJyb3IgfTtcbn1cbi8qICNfX05PX1NJREVfRUZGRUNUU19fICovXG5jb25zdCBjb21waWxlVG9GdW5jdGlvbiA9IChtZXNzYWdlLCBjb250ZXh0KSA9PiB7XG4gICAgaWYgKCFpc1N0cmluZyhtZXNzYWdlKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuTk9UX1NVUFBPUlRfTk9OX1NUUklOR19NRVNTQUdFKTtcbiAgICB9XG4gICAgLy8gc2V0IG9uV2FyblxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgY29udGV4dC5vbldhcm4gPSBvbkNvbXBpbGVXYXJuO1xuICAgIH1cbiAgICB7XG4gICAgICAgIC8vIGNoZWNrIEhUTUwgbWVzc2FnZVxuICAgICAgICBjb25zdCB3YXJuSHRtbE1lc3NhZ2UgPSBpc0Jvb2xlYW4oY29udGV4dC53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgICAgICA/IGNvbnRleHQud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBjaGVja0h0bWxNZXNzYWdlKG1lc3NhZ2UsIHdhcm5IdG1sTWVzc2FnZSk7XG4gICAgICAgIC8vIGNoZWNrIGNhY2hlc1xuICAgICAgICBjb25zdCBvbkNhY2hlS2V5ID0gY29udGV4dC5vbkNhY2hlS2V5IHx8IGRlZmF1bHRPbkNhY2hlS2V5O1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IG9uQ2FjaGVLZXkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGNvbXBpbGVDYWNoZVtjYWNoZUtleV07XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tcGlsZVxuICAgICAgICBjb25zdCB7IGNvZGUsIGRldGVjdEVycm9yIH0gPSBiYXNlQ29tcGlsZShtZXNzYWdlLCBjb250ZXh0KTtcbiAgICAgICAgLy8gZXZhbHVhdGUgZnVuY3Rpb25cbiAgICAgICAgY29uc3QgbXNnID0gbmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtjb2RlfWApKCk7XG4gICAgICAgIC8vIGlmIG9jY3VycmVkIGNvbXBpbGUgZXJyb3IsIGRvbid0IGNhY2hlXG4gICAgICAgIHJldHVybiAhZGV0ZWN0RXJyb3JcbiAgICAgICAgICAgID8gKGNvbXBpbGVDYWNoZVtjYWNoZUtleV0gPSBtc2cpXG4gICAgICAgICAgICA6IG1zZztcbiAgICB9XG59O1xuZnVuY3Rpb24gY29tcGlsZShtZXNzYWdlLCBjb250ZXh0KSB7XG4gICAgLy8gc2V0IG9uV2FyblxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgY29udGV4dC5vbldhcm4gPSBvbkNvbXBpbGVXYXJuO1xuICAgIH1cbiAgICBpZiAoKChfX0lOVExJRllfSklUX0NPTVBJTEFUSU9OX18gJiYgIV9fSU5UTElGWV9EUk9QX01FU1NBR0VfQ09NUElMRVJfXykpICYmXG4gICAgICAgIGlzU3RyaW5nKG1lc3NhZ2UpKSB7XG4gICAgICAgIC8vIGNoZWNrIEhUTUwgbWVzc2FnZVxuICAgICAgICBjb25zdCB3YXJuSHRtbE1lc3NhZ2UgPSBpc0Jvb2xlYW4oY29udGV4dC53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgICAgICA/IGNvbnRleHQud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBjaGVja0h0bWxNZXNzYWdlKG1lc3NhZ2UsIHdhcm5IdG1sTWVzc2FnZSk7XG4gICAgICAgIC8vIGNoZWNrIGNhY2hlc1xuICAgICAgICBjb25zdCBvbkNhY2hlS2V5ID0gY29udGV4dC5vbkNhY2hlS2V5IHx8IGRlZmF1bHRPbkNhY2hlS2V5O1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IG9uQ2FjaGVLZXkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGNvbXBpbGVDYWNoZVtjYWNoZUtleV07XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tcGlsZSB3aXRoIEpJVCBtb2RlXG4gICAgICAgIGNvbnN0IHsgYXN0LCBkZXRlY3RFcnJvciB9ID0gYmFzZUNvbXBpbGUobWVzc2FnZSwge1xuICAgICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICAgIGxvY2F0aW9uOiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyksXG4gICAgICAgICAgICBqaXQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGNvbXBvc2UgbWVzc2FnZSBmdW5jdGlvbiBmcm9tIEFTVFxuICAgICAgICBjb25zdCBtc2cgPSBmb3JtYXQoYXN0KTtcbiAgICAgICAgLy8gaWYgb2NjdXJyZWQgY29tcGlsZSBlcnJvciwgZG9uJ3QgY2FjaGVcbiAgICAgICAgcmV0dXJuICFkZXRlY3RFcnJvclxuICAgICAgICAgICAgPyAoY29tcGlsZUNhY2hlW2NhY2hlS2V5XSA9IG1zZylcbiAgICAgICAgICAgIDogbXNnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiAhaXNNZXNzYWdlQVNUKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB3YXJuKGB0aGUgbWVzc2FnZSB0aGF0IGlzIHJlc29sdmUgd2l0aCBrZXkgJyR7Y29udGV4dC5rZXl9JyBpcyBub3Qgc3VwcG9ydGVkIGZvciBqaXQgY29tcGlsYXRpb25gKTtcbiAgICAgICAgICAgIHJldHVybiAoKCkgPT4gbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQVNUIGNhc2UgKHBhc3NlZCBmcm9tIGJ1bmRsZXIpXG4gICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gbWVzc2FnZS5jYWNoZUtleTtcbiAgICAgICAgaWYgKGNhY2hlS2V5KSB7XG4gICAgICAgICAgICBjb25zdCBjYWNoZWQgPSBjb21waWxlQ2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb21wb3NlIG1lc3NhZ2UgZnVuY3Rpb24gZnJvbSBtZXNzYWdlIChBU1QpXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBpbGVDYWNoZVtjYWNoZUtleV0gPVxuICAgICAgICAgICAgICAgIGZvcm1hdChtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBOT09QX01FU1NBR0VfRlVOQ1RJT04gPSAoKSA9PiAnJztcbmNvbnN0IGlzTWVzc2FnZUZ1bmN0aW9uID0gKHZhbCkgPT4gaXNGdW5jdGlvbih2YWwpO1xuLy8gaW1wbGVtZW50YXRpb24gb2YgYHRyYW5zbGF0ZWAgZnVuY3Rpb25cbmZ1bmN0aW9uIHRyYW5zbGF0ZShjb250ZXh0LCAuLi5hcmdzKSB7XG4gICAgY29uc3QgeyBmYWxsYmFja0Zvcm1hdCwgcG9zdFRyYW5zbGF0aW9uLCB1bnJlc29sdmluZywgbWVzc2FnZUNvbXBpbGVyLCBmYWxsYmFja0xvY2FsZSwgbWVzc2FnZXMgfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgW2tleSwgb3B0aW9uc10gPSBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyk7XG4gICAgY29uc3QgbWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybilcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXG4gICAgICAgIDogY29udGV4dC5taXNzaW5nV2FybjtcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cbiAgICAgICAgOiBjb250ZXh0LmZhbGxiYWNrV2FybjtcbiAgICBjb25zdCBlc2NhcGVQYXJhbWV0ZXIgPSBpc0Jvb2xlYW4ob3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXIpXG4gICAgICAgID8gb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXJcbiAgICAgICAgOiBjb250ZXh0LmVzY2FwZVBhcmFtZXRlcjtcbiAgICBjb25zdCByZXNvbHZlZE1lc3NhZ2UgPSAhIW9wdGlvbnMucmVzb2x2ZWRNZXNzYWdlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGRlZmF1bHRNc2dPcktleSA9IGlzU3RyaW5nKG9wdGlvbnMuZGVmYXVsdCkgfHwgaXNCb29sZWFuKG9wdGlvbnMuZGVmYXVsdCkgLy8gZGVmYXVsdCBieSBmdW5jdGlvbiBvcHRpb25cbiAgICAgICAgPyAhaXNCb29sZWFuKG9wdGlvbnMuZGVmYXVsdClcbiAgICAgICAgICAgID8gb3B0aW9ucy5kZWZhdWx0XG4gICAgICAgICAgICA6ICghbWVzc2FnZUNvbXBpbGVyID8gKCkgPT4ga2V5IDoga2V5KVxuICAgICAgICA6IGZhbGxiYWNrRm9ybWF0IC8vIGRlZmF1bHQgYnkgYGZhbGxiYWNrRm9ybWF0YCBvcHRpb25cbiAgICAgICAgICAgID8gKCFtZXNzYWdlQ29tcGlsZXIgPyAoKSA9PiBrZXkgOiBrZXkpXG4gICAgICAgICAgICA6ICcnO1xuICAgIGNvbnN0IGVuYWJsZURlZmF1bHRNc2cgPSBmYWxsYmFja0Zvcm1hdCB8fCBkZWZhdWx0TXNnT3JLZXkgIT09ICcnO1xuICAgIGNvbnN0IGxvY2FsZSA9IGdldExvY2FsZShjb250ZXh0LCBvcHRpb25zKTtcbiAgICAvLyBlc2NhcGUgcGFyYW1zXG4gICAgZXNjYXBlUGFyYW1ldGVyICYmIGVzY2FwZVBhcmFtcyhvcHRpb25zKTtcbiAgICAvLyByZXNvbHZlIG1lc3NhZ2UgZm9ybWF0XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICAgIGxldCBbZm9ybWF0U2NvcGUsIHRhcmdldExvY2FsZSwgbWVzc2FnZV0gPSAhcmVzb2x2ZWRNZXNzYWdlXG4gICAgICAgID8gcmVzb2x2ZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCBsb2NhbGUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuKVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzW2xvY2FsZV0gfHwge31cbiAgICAgICAgXTtcbiAgICAvLyBOT1RFOlxuICAgIC8vICBGaXggdG8gd29yayBhcm91bmQgYHNzclRyYW5zZnJvbWAgYnVnIGluIFZpdGUuXG4gICAgLy8gIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvNDMwNlxuICAgIC8vICBUbyBnZXQgYXJvdW5kIHRoaXMsIHVzZSB0ZW1wb3JhcnkgdmFyaWFibGVzLlxuICAgIC8vICBodHRwczovL2dpdGh1Yi5jb20vbnV4dC9mcmFtZXdvcmsvaXNzdWVzLzE0NjEjaXNzdWVjb21tZW50LTk1NDYwNjI0M1xuICAgIGxldCBmb3JtYXQgPSBmb3JtYXRTY29wZTtcbiAgICAvLyBpZiB5b3UgdXNlIGRlZmF1bHQgbWVzc2FnZSwgc2V0IGl0IGFzIG1lc3NhZ2UgZm9ybWF0IVxuICAgIGxldCBjYWNoZUJhc2VLZXkgPSBrZXk7XG4gICAgaWYgKCFyZXNvbHZlZE1lc3NhZ2UgJiZcbiAgICAgICAgIShpc1N0cmluZyhmb3JtYXQpIHx8XG4gICAgICAgICAgICBpc01lc3NhZ2VBU1QoZm9ybWF0KSB8fFxuICAgICAgICAgICAgaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KSkpIHtcbiAgICAgICAgaWYgKGVuYWJsZURlZmF1bHRNc2cpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGRlZmF1bHRNc2dPcktleTtcbiAgICAgICAgICAgIGNhY2hlQmFzZUtleSA9IGZvcm1hdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjaGVja2luZyBtZXNzYWdlIGZvcm1hdCBhbmQgdGFyZ2V0IGxvY2FsZVxuICAgIGlmICghcmVzb2x2ZWRNZXNzYWdlICYmXG4gICAgICAgICghKGlzU3RyaW5nKGZvcm1hdCkgfHxcbiAgICAgICAgICAgIGlzTWVzc2FnZUFTVChmb3JtYXQpIHx8XG4gICAgICAgICAgICBpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpKSB8fFxuICAgICAgICAgICAgIWlzU3RyaW5nKHRhcmdldExvY2FsZSkpKSB7XG4gICAgICAgIHJldHVybiB1bnJlc29sdmluZyA/IE5PVF9SRU9TTFZFRCA6IGtleTtcbiAgICB9XG4gICAgLy8gVE9ETzogcmVmYWN0b3JcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGlzU3RyaW5nKGZvcm1hdCkgJiYgY29udGV4dC5tZXNzYWdlQ29tcGlsZXIgPT0gbnVsbCkge1xuICAgICAgICB3YXJuKGBUaGUgbWVzc2FnZSBmb3JtYXQgY29tcGlsYXRpb24gaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJ1aWxkLiBgICtcbiAgICAgICAgICAgIGBCZWNhdXNlIG1lc3NhZ2UgY29tcGlsZXIgaXNuJ3QgaW5jbHVkZWQuIGAgK1xuICAgICAgICAgICAgYFlvdSBuZWVkIHRvIHByZS1jb21waWxhdGlvbiBhbGwgbWVzc2FnZSBmb3JtYXQuIGAgK1xuICAgICAgICAgICAgYFNvIHRyYW5zbGF0ZSBmdW5jdGlvbiByZXR1cm4gJyR7a2V5fScuYCk7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICAgIC8vIHNldHVwIGNvbXBpbGUgZXJyb3IgZGV0ZWN0aW5nXG4gICAgbGV0IG9jY3VycmVkID0gZmFsc2U7XG4gICAgY29uc3Qgb25FcnJvciA9ICgpID0+IHtcbiAgICAgICAgb2NjdXJyZWQgPSB0cnVlO1xuICAgIH07XG4gICAgLy8gY29tcGlsZSBtZXNzYWdlIGZvcm1hdFxuICAgIGNvbnN0IG1zZyA9ICFpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpXG4gICAgICAgID8gY29tcGlsZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCB0YXJnZXRMb2NhbGUsIGZvcm1hdCwgY2FjaGVCYXNlS2V5LCBvbkVycm9yKVxuICAgICAgICA6IGZvcm1hdDtcbiAgICAvLyBpZiBvY2N1cnJlZCBjb21waWxlIGVycm9yLCByZXR1cm4gdGhlIG1lc3NhZ2UgZm9ybWF0XG4gICAgaWYgKG9jY3VycmVkKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuICAgIC8vIGV2YWx1YXRlIG1lc3NhZ2Ugd2l0aCBjb250ZXh0XG4gICAgY29uc3QgY3R4T3B0aW9ucyA9IGdldE1lc3NhZ2VDb250ZXh0T3B0aW9ucyhjb250ZXh0LCB0YXJnZXRMb2NhbGUsIG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgIGNvbnN0IG1zZ0NvbnRleHQgPSBjcmVhdGVNZXNzYWdlQ29udGV4dChjdHhPcHRpb25zKTtcbiAgICBjb25zdCBtZXNzYWdlZCA9IGV2YWx1YXRlTWVzc2FnZShjb250ZXh0LCBtc2csIG1zZ0NvbnRleHQpO1xuICAgIC8vIGlmIHVzZSBwb3N0IHRyYW5zbGF0aW9uIG9wdGlvbiwgcHJvY2VlZCBpdCB3aXRoIGhhbmRsZXJcbiAgICBjb25zdCByZXQgPSBwb3N0VHJhbnNsYXRpb25cbiAgICAgICAgPyBwb3N0VHJhbnNsYXRpb24obWVzc2FnZWQsIGtleSlcbiAgICAgICAgOiBtZXNzYWdlZDtcbiAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIGNvbnN0IHBheWxvYWRzID0ge1xuICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAga2V5OiBpc1N0cmluZyhrZXkpXG4gICAgICAgICAgICAgICAgPyBrZXlcbiAgICAgICAgICAgICAgICA6IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdClcbiAgICAgICAgICAgICAgICAgICAgPyBmb3JtYXQua2V5XG4gICAgICAgICAgICAgICAgICAgIDogJycsXG4gICAgICAgICAgICBsb2NhbGU6IHRhcmdldExvY2FsZSB8fCAoaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KVxuICAgICAgICAgICAgICAgID8gZm9ybWF0LmxvY2FsZVxuICAgICAgICAgICAgICAgIDogJycpLFxuICAgICAgICAgICAgZm9ybWF0OiBpc1N0cmluZyhmb3JtYXQpXG4gICAgICAgICAgICAgICAgPyBmb3JtYXRcbiAgICAgICAgICAgICAgICA6IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdClcbiAgICAgICAgICAgICAgICAgICAgPyBmb3JtYXQuc291cmNlXG4gICAgICAgICAgICAgICAgICAgIDogJycsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXRcbiAgICAgICAgfTtcbiAgICAgICAgcGF5bG9hZHMubWV0YSA9IGFzc2lnbih7fSwgY29udGV4dC5fX21ldGEsIGdldEFkZGl0aW9uYWxNZXRhKCkgfHwge30pO1xuICAgICAgICB0cmFuc2xhdGVEZXZUb29scyhwYXlsb2Fkcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5mdW5jdGlvbiBlc2NhcGVQYXJhbXMob3B0aW9ucykge1xuICAgIGlmIChpc0FycmF5KG9wdGlvbnMubGlzdCkpIHtcbiAgICAgICAgb3B0aW9ucy5saXN0ID0gb3B0aW9ucy5saXN0Lm1hcChpdGVtID0+IGlzU3RyaW5nKGl0ZW0pID8gZXNjYXBlSHRtbChpdGVtKSA6IGl0ZW0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09iamVjdChvcHRpb25zLm5hbWVkKSkge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLm5hbWVkKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcob3B0aW9ucy5uYW1lZFtrZXldKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubmFtZWRba2V5XSA9IGVzY2FwZUh0bWwob3B0aW9ucy5uYW1lZFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCBsb2NhbGUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlcywgb25XYXJuLCBtZXNzYWdlUmVzb2x2ZXI6IHJlc29sdmVWYWx1ZSwgbG9jYWxlRmFsbGJhY2tlciB9ID0gY29udGV4dDtcbiAgICBjb25zdCBsb2NhbGVzID0gbG9jYWxlRmFsbGJhY2tlcihjb250ZXh0LCBmYWxsYmFja0xvY2FsZSwgbG9jYWxlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgbGV0IG1lc3NhZ2UgPSB7fTtcbiAgICBsZXQgdGFyZ2V0TG9jYWxlO1xuICAgIGxldCBmb3JtYXQgPSBudWxsO1xuICAgIGxldCBmcm9tID0gbG9jYWxlO1xuICAgIGxldCB0byA9IG51bGw7XG4gICAgY29uc3QgdHlwZSA9ICd0cmFuc2xhdGUnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0YXJnZXRMb2NhbGUgPSB0byA9IGxvY2FsZXNbaV07XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgICAgIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlICYmXG4gICAgICAgICAgICAhaXNBbG1vc3RTYW1lTG9jYWxlKGxvY2FsZSwgdGFyZ2V0TG9jYWxlKSAmJlxuICAgICAgICAgICAgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4oZmFsbGJhY2tXYXJuLCBrZXkpKSB7XG4gICAgICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19UUkFOU0xBVEUsIHtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRMb2NhbGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJmYWxsYmFja1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuRkFMQkFDSyAqLywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBtZXNzYWdlc1t0YXJnZXRMb2NhbGVdIHx8IHt9O1xuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgIGxldCBzdGFydCA9IG51bGw7XG4gICAgICAgIGxldCBzdGFydFRhZztcbiAgICAgICAgbGV0IGVuZFRhZztcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgc3RhcnRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLXJlc29sdmUtc3RhcnQnO1xuICAgICAgICAgICAgZW5kVGFnID0gJ2ludGxpZnktbWVzc2FnZS1yZXNvbHZlLWVuZCc7XG4gICAgICAgICAgICBtYXJrICYmIG1hcmsoc3RhcnRUYWcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoZm9ybWF0ID0gcmVzb2x2ZVZhbHVlKG1lc3NhZ2UsIGtleSkpID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBpZiBudWxsLCByZXNvbHZlIHdpdGggb2JqZWN0IGtleSBwYXRoXG4gICAgICAgICAgICBmb3JtYXQgPSBtZXNzYWdlW2tleV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB9XG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICAgICAgaWYgKGVtaXR0ZXIgJiYgc3RhcnQgJiYgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWVzc2FnZS1yZXNvbHZlXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5NRVNTQUdFX1JFU09MVkUgKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlLXJlc29sdmVcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLk1FU1NBR0VfUkVTT0xWRSAqLyxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBmb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IGVuZCAtIHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhcnRUYWcgJiYgZW5kVGFnICYmIG1hcmsgJiYgbWVhc3VyZSkge1xuICAgICAgICAgICAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgICAgICAgICAgICBtZWFzdXJlKCdpbnRsaWZ5IG1lc3NhZ2UgcmVzb2x2ZScsIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmluZyhmb3JtYXQpIHx8IGlzTWVzc2FnZUFTVChmb3JtYXQpIHx8IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNJbXBsaWNpdEZhbGxiYWNrKHRhcmdldExvY2FsZSwgbG9jYWxlcykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdSZXQgPSBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAga2V5LCB0YXJnZXRMb2NhbGUsIG1pc3NpbmdXYXJuLCB0eXBlKTtcbiAgICAgICAgICAgIGlmIChtaXNzaW5nUmV0ICE9PSBrZXkpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBtaXNzaW5nUmV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZyb20gPSB0bztcbiAgICB9XG4gICAgcmV0dXJuIFtmb3JtYXQsIHRhcmdldExvY2FsZSwgbWVzc2FnZV07XG59XG5mdW5jdGlvbiBjb21waWxlTWVzc2FnZUZvcm1hdChjb250ZXh0LCBrZXksIHRhcmdldExvY2FsZSwgZm9ybWF0LCBjYWNoZUJhc2VLZXksIG9uRXJyb3IpIHtcbiAgICBjb25zdCB7IG1lc3NhZ2VDb21waWxlciwgd2Fybkh0bWxNZXNzYWdlIH0gPSBjb250ZXh0O1xuICAgIGlmIChpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGZvcm1hdDtcbiAgICAgICAgbXNnLmxvY2FsZSA9IG1zZy5sb2NhbGUgfHwgdGFyZ2V0TG9jYWxlO1xuICAgICAgICBtc2cua2V5ID0gbXNnLmtleSB8fCBrZXk7XG4gICAgICAgIHJldHVybiBtc2c7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlQ29tcGlsZXIgPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtc2cgPSAoKCkgPT4gZm9ybWF0KTtcbiAgICAgICAgbXNnLmxvY2FsZSA9IHRhcmdldExvY2FsZTtcbiAgICAgICAgbXNnLmtleSA9IGtleTtcbiAgICAgICAgcmV0dXJuIG1zZztcbiAgICB9XG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgIGxldCBzdGFydCA9IG51bGw7XG4gICAgbGV0IHN0YXJ0VGFnO1xuICAgIGxldCBlbmRUYWc7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgc3RhcnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIHN0YXJ0VGFnID0gJ2ludGxpZnktbWVzc2FnZS1jb21waWxhdGlvbi1zdGFydCc7XG4gICAgICAgIGVuZFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtY29tcGlsYXRpb24tZW5kJztcbiAgICAgICAgbWFyayAmJiBtYXJrKHN0YXJ0VGFnKTtcbiAgICB9XG4gICAgY29uc3QgbXNnID0gbWVzc2FnZUNvbXBpbGVyKGZvcm1hdCwgZ2V0Q29tcGlsZUNvbnRleHQoY29udGV4dCwgdGFyZ2V0TG9jYWxlLCBjYWNoZUJhc2VLZXksIGZvcm1hdCwgd2Fybkh0bWxNZXNzYWdlLCBvbkVycm9yKSk7XG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgaW5Ccm93c2VyKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XG4gICAgICAgIGlmIChlbWl0dGVyICYmIHN0YXJ0KSB7XG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJtZXNzYWdlLWNvbXBpbGF0aW9uXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5NRVNTQUdFX0NPTVBJTEFUSU9OICovLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlLWNvbXBpbGF0aW9uXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5NRVNTQUdFX0NPTVBJTEFUSU9OICovLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGZvcm1hdCxcbiAgICAgICAgICAgICAgICB0aW1lOiBlbmQgLSBzdGFydCxcbiAgICAgICAgICAgICAgICBncm91cElkOiBgJHsndHJhbnNsYXRlJ306JHtrZXl9YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0VGFnICYmIGVuZFRhZyAmJiBtYXJrICYmIG1lYXN1cmUpIHtcbiAgICAgICAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgICAgICAgIG1lYXN1cmUoJ2ludGxpZnkgbWVzc2FnZSBjb21waWxhdGlvbicsIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1zZy5sb2NhbGUgPSB0YXJnZXRMb2NhbGU7XG4gICAgbXNnLmtleSA9IGtleTtcbiAgICBtc2cuc291cmNlID0gZm9ybWF0O1xuICAgIHJldHVybiBtc2c7XG59XG5mdW5jdGlvbiBldmFsdWF0ZU1lc3NhZ2UoY29udGV4dCwgbXNnLCBtc2dDdHgpIHtcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgbGV0IHN0YXJ0ID0gbnVsbDtcbiAgICBsZXQgc3RhcnRUYWc7XG4gICAgbGV0IGVuZFRhZztcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xuICAgICAgICBzdGFydCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgc3RhcnRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLWV2YWx1YXRpb24tc3RhcnQnO1xuICAgICAgICBlbmRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLWV2YWx1YXRpb24tZW5kJztcbiAgICAgICAgbWFyayAmJiBtYXJrKHN0YXJ0VGFnKTtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZWQgPSBtc2cobXNnQ3R4KTtcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgY29uc3QgZW5kID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcbiAgICAgICAgaWYgKGVtaXR0ZXIgJiYgc3RhcnQpIHtcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcIm1lc3NhZ2UtZXZhbHVhdGlvblwiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuTUVTU0FHRV9FVkFMVUFUSU9OICovLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlLWV2YWx1YXRpb25cIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLk1FU1NBR0VfRVZBTFVBVElPTiAqLyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWVzc2FnZWQsXG4gICAgICAgICAgICAgICAgdGltZTogZW5kIC0gc3RhcnQsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7J3RyYW5zbGF0ZSd9OiR7bXNnLmtleX1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRUYWcgJiYgZW5kVGFnICYmIG1hcmsgJiYgbWVhc3VyZSkge1xuICAgICAgICAgICAgbWFyayhlbmRUYWcpO1xuICAgICAgICAgICAgbWVhc3VyZSgnaW50bGlmeSBtZXNzYWdlIGV2YWx1YXRpb24nLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZWQ7XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncykge1xuICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczXSA9IGFyZ3M7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGlmICghaXNTdHJpbmcoYXJnMSkgJiZcbiAgICAgICAgIWlzTnVtYmVyKGFyZzEpICYmXG4gICAgICAgICFpc01lc3NhZ2VGdW5jdGlvbihhcmcxKSAmJlxuICAgICAgICAhaXNNZXNzYWdlQVNUKGFyZzEpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcbiAgICB9XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3Qga2V5ID0gaXNOdW1iZXIoYXJnMSlcbiAgICAgICAgPyBTdHJpbmcoYXJnMSlcbiAgICAgICAgOiBpc01lc3NhZ2VGdW5jdGlvbihhcmcxKVxuICAgICAgICAgICAgPyBhcmcxXG4gICAgICAgICAgICA6IGFyZzE7XG4gICAgaWYgKGlzTnVtYmVyKGFyZzIpKSB7XG4gICAgICAgIG9wdGlvbnMucGx1cmFsID0gYXJnMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoYXJnMikpIHtcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0ID0gYXJnMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmcyKSAmJiAhaXNFbXB0eU9iamVjdChhcmcyKSkge1xuICAgICAgICBvcHRpb25zLm5hbWVkID0gYXJnMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNBcnJheShhcmcyKSkge1xuICAgICAgICBvcHRpb25zLmxpc3QgPSBhcmcyO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIoYXJnMykpIHtcbiAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBhcmczO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhhcmczKSkge1xuICAgICAgICBvcHRpb25zLmRlZmF1bHQgPSBhcmczO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzMpKSB7XG4gICAgICAgIGFzc2lnbihvcHRpb25zLCBhcmczKTtcbiAgICB9XG4gICAgcmV0dXJuIFtrZXksIG9wdGlvbnNdO1xufVxuZnVuY3Rpb24gZ2V0Q29tcGlsZUNvbnRleHQoY29udGV4dCwgbG9jYWxlLCBrZXksIHNvdXJjZSwgd2Fybkh0bWxNZXNzYWdlLCBvbkVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBrZXksXG4gICAgICAgIHdhcm5IdG1sTWVzc2FnZSxcbiAgICAgICAgb25FcnJvcjogKGVycikgPT4ge1xuICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKGVycik7XG4gICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3NvdXJjZSA9IGdldFNvdXJjZUZvckNvZGVGcmFtZShzb3VyY2UpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgTWVzc2FnZSBjb21waWxhdGlvbiBlcnJvcjogJHtlcnIubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGVGcmFtZSA9IGVyci5sb2NhdGlvbiAmJlxuICAgICAgICAgICAgICAgICAgICBfc291cmNlICYmXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQ29kZUZyYW1lKF9zb3VyY2UsIGVyci5sb2NhdGlvbi5zdGFydC5vZmZzZXQsIGVyci5sb2NhdGlvbi5lbmQub2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcbiAgICAgICAgICAgICAgICBpZiAoZW1pdHRlciAmJiBfc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImNvbXBpbGUtZXJyb3JcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLkNPTVBJTEVfRVJST1IgKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF9zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZXJyLmxvY2F0aW9uICYmIGVyci5sb2NhdGlvbi5zdGFydC5vZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGVyci5sb2NhdGlvbiAmJiBlcnIubG9jYXRpb24uZW5kLm9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAkeyd0cmFuc2xhdGUnfToke2tleX1gXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGNvZGVGcmFtZSA/IGAke21lc3NhZ2V9XFxuJHtjb2RlRnJhbWV9YCA6IG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkNhY2hlS2V5OiAoc291cmNlKSA9PiBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5KGxvY2FsZSwga2V5LCBzb3VyY2UpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldFNvdXJjZUZvckNvZGVGcmFtZShzb3VyY2UpIHtcbiAgICBpZiAoaXNTdHJpbmcoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHNvdXJjZS5sb2MgJiYgc291cmNlLmxvYy5zb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UubG9jLnNvdXJjZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE1lc3NhZ2VDb250ZXh0T3B0aW9ucyhjb250ZXh0LCBsb2NhbGUsIG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IG1vZGlmaWVycywgcGx1cmFsUnVsZXMsIG1lc3NhZ2VSZXNvbHZlcjogcmVzb2x2ZVZhbHVlLCBmYWxsYmFja0xvY2FsZSwgZmFsbGJhY2tXYXJuLCBtaXNzaW5nV2FybiwgZmFsbGJhY2tDb250ZXh0IH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IHJlc29sdmVNZXNzYWdlID0gKGtleSkgPT4ge1xuICAgICAgICBsZXQgdmFsID0gcmVzb2x2ZVZhbHVlKG1lc3NhZ2UsIGtleSk7XG4gICAgICAgIC8vIGZhbGxiYWNrIHRvIHJvb3QgY29udGV4dFxuICAgICAgICBpZiAodmFsID09IG51bGwgJiYgZmFsbGJhY2tDb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBbLCAsIG1lc3NhZ2VdID0gcmVzb2x2ZU1lc3NhZ2VGb3JtYXQoZmFsbGJhY2tDb250ZXh0LCBrZXksIGxvY2FsZSwgZmFsbGJhY2tMb2NhbGUsIGZhbGxiYWNrV2FybiwgbWlzc2luZ1dhcm4pO1xuICAgICAgICAgICAgdmFsID0gcmVzb2x2ZVZhbHVlKG1lc3NhZ2UsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaW5nKHZhbCkgfHwgaXNNZXNzYWdlQVNUKHZhbCkpIHtcbiAgICAgICAgICAgIGxldCBvY2N1cnJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3Qgb25FcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBvY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgbXNnID0gY29tcGlsZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCBsb2NhbGUsIHZhbCwga2V5LCBvbkVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiAhb2NjdXJyZWRcbiAgICAgICAgICAgICAgICA/IG1zZ1xuICAgICAgICAgICAgICAgIDogTk9PUF9NRVNTQUdFX0ZVTkNUSU9OO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzTWVzc2FnZUZ1bmN0aW9uKHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBzaG91bGQgYmUgaW1wbGVtZW50ZWQgd2FybmluZyBtZXNzYWdlXG4gICAgICAgICAgICByZXR1cm4gTk9PUF9NRVNTQUdFX0ZVTkNUSU9OO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjdHhPcHRpb25zID0ge1xuICAgICAgICBsb2NhbGUsXG4gICAgICAgIG1vZGlmaWVycyxcbiAgICAgICAgcGx1cmFsUnVsZXMsXG4gICAgICAgIG1lc3NhZ2VzOiByZXNvbHZlTWVzc2FnZVxuICAgIH07XG4gICAgaWYgKGNvbnRleHQucHJvY2Vzc29yKSB7XG4gICAgICAgIGN0eE9wdGlvbnMucHJvY2Vzc29yID0gY29udGV4dC5wcm9jZXNzb3I7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxpc3QpIHtcbiAgICAgICAgY3R4T3B0aW9ucy5saXN0ID0gb3B0aW9ucy5saXN0O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5uYW1lZCkge1xuICAgICAgICBjdHhPcHRpb25zLm5hbWVkID0gb3B0aW9ucy5uYW1lZDtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKG9wdGlvbnMucGx1cmFsKSkge1xuICAgICAgICBjdHhPcHRpb25zLnBsdXJhbEluZGV4ID0gb3B0aW9ucy5wbHVyYWw7XG4gICAgfVxuICAgIHJldHVybiBjdHhPcHRpb25zO1xufVxuXG5jb25zdCBpbnRsRGVmaW5lZCA9IHR5cGVvZiBJbnRsICE9PSAndW5kZWZpbmVkJztcbmNvbnN0IEF2YWlsYWJpbGl0aWVzID0ge1xuICAgIGRhdGVUaW1lRm9ybWF0OiBpbnRsRGVmaW5lZCAmJiB0eXBlb2YgSW50bC5EYXRlVGltZUZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgbnVtYmVyRm9ybWF0OiBpbnRsRGVmaW5lZCAmJiB0eXBlb2YgSW50bC5OdW1iZXJGb3JtYXQgIT09ICd1bmRlZmluZWQnXG59O1xuXG4vLyBpbXBsZW1lbnRhdGlvbiBvZiBgZGF0ZXRpbWVgIGZ1bmN0aW9uXG5mdW5jdGlvbiBkYXRldGltZShjb250ZXh0LCAuLi5hcmdzKSB7XG4gICAgY29uc3QgeyBkYXRldGltZUZvcm1hdHMsIHVucmVzb2x2aW5nLCBmYWxsYmFja0xvY2FsZSwgb25XYXJuLCBsb2NhbGVGYWxsYmFja2VyIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IHsgX19kYXRldGltZUZvcm1hdHRlcnMgfSA9IGNvbnRleHQ7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiAhQXZhaWxhYmlsaXRpZXMuZGF0ZVRpbWVGb3JtYXQpIHtcbiAgICAgICAgb25XYXJuKGdldFdhcm5NZXNzYWdlKENvcmVXYXJuQ29kZXMuQ0FOTk9UX0ZPUk1BVF9EQVRFKSk7XG4gICAgICAgIHJldHVybiBNSVNTSU5HX1JFU09MVkVfVkFMVUU7XG4gICAgfVxuICAgIGNvbnN0IFtrZXksIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdID0gcGFyc2VEYXRlVGltZUFyZ3MoLi4uYXJncyk7XG4gICAgY29uc3QgbWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybilcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXG4gICAgICAgIDogY29udGV4dC5taXNzaW5nV2FybjtcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cbiAgICAgICAgOiBjb250ZXh0LmZhbGxiYWNrV2FybjtcbiAgICBjb25zdCBwYXJ0ID0gISFvcHRpb25zLnBhcnQ7XG4gICAgY29uc3QgbG9jYWxlID0gZ2V0TG9jYWxlKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIGNvbnN0IGxvY2FsZXMgPSBsb2NhbGVGYWxsYmFja2VyKGNvbnRleHQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGZhbGxiYWNrTG9jYWxlLCBsb2NhbGUpO1xuICAgIGlmICghaXNTdHJpbmcoa2V5KSB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIG92ZXJyaWRlcykuZm9ybWF0KHZhbHVlKTtcbiAgICB9XG4gICAgLy8gcmVzb2x2ZSBmb3JtYXRcbiAgICBsZXQgZGF0ZXRpbWVGb3JtYXQgPSB7fTtcbiAgICBsZXQgdGFyZ2V0TG9jYWxlO1xuICAgIGxldCBmb3JtYXQgPSBudWxsO1xuICAgIGxldCBmcm9tID0gbG9jYWxlO1xuICAgIGxldCB0byA9IG51bGw7XG4gICAgY29uc3QgdHlwZSA9ICdkYXRldGltZSBmb3JtYXQnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0YXJnZXRMb2NhbGUgPSB0byA9IGxvY2FsZXNbaV07XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgICAgIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlICYmXG4gICAgICAgICAgICBpc1RyYW5zbGF0ZUZhbGxiYWNrV2FybihmYWxsYmFja1dhcm4sIGtleSkpIHtcbiAgICAgICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkZBTExCQUNLX1RPX0RBVEVfRk9STUFULCB7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0TG9jYWxlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlKSB7XG4gICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwiZmFsbGJhY2tcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLkZBTEJBQ0sgKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgICAgICAgICB0byxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7dHlwZX06JHtrZXl9YFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRhdGV0aW1lRm9ybWF0ID1cbiAgICAgICAgICAgIGRhdGV0aW1lRm9ybWF0c1t0YXJnZXRMb2NhbGVdIHx8IHt9O1xuICAgICAgICBmb3JtYXQgPSBkYXRldGltZUZvcm1hdFtrZXldO1xuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChmb3JtYXQpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGhhbmRsZU1pc3NpbmcoY29udGV4dCwga2V5LCB0YXJnZXRMb2NhbGUsIG1pc3NpbmdXYXJuLCB0eXBlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGZyb20gPSB0bztcbiAgICB9XG4gICAgLy8gY2hlY2tpbmcgZm9ybWF0IGFuZCB0YXJnZXQgbG9jYWxlXG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGZvcm1hdCkgfHwgIWlzU3RyaW5nKHRhcmdldExvY2FsZSkpIHtcbiAgICAgICAgcmV0dXJuIHVucmVzb2x2aW5nID8gTk9UX1JFT1NMVkVEIDoga2V5O1xuICAgIH1cbiAgICBsZXQgaWQgPSBgJHt0YXJnZXRMb2NhbGV9X18ke2tleX1gO1xuICAgIGlmICghaXNFbXB0eU9iamVjdChvdmVycmlkZXMpKSB7XG4gICAgICAgIGlkID0gYCR7aWR9X18ke0pTT04uc3RyaW5naWZ5KG92ZXJyaWRlcyl9YDtcbiAgICB9XG4gICAgbGV0IGZvcm1hdHRlciA9IF9fZGF0ZXRpbWVGb3JtYXR0ZXJzLmdldChpZCk7XG4gICAgaWYgKCFmb3JtYXR0ZXIpIHtcbiAgICAgICAgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGFyZ2V0TG9jYWxlLCBhc3NpZ24oe30sIGZvcm1hdCwgb3ZlcnJpZGVzKSk7XG4gICAgICAgIF9fZGF0ZXRpbWVGb3JtYXR0ZXJzLnNldChpZCwgZm9ybWF0dGVyKTtcbiAgICB9XG4gICAgcmV0dXJuICFwYXJ0ID8gZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSkgOiBmb3JtYXR0ZXIuZm9ybWF0VG9QYXJ0cyh2YWx1ZSk7XG59XG4vKiogQGludGVybmFsICovXG5jb25zdCBEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTID0gW1xuICAgICdsb2NhbGVNYXRjaGVyJyxcbiAgICAnd2Vla2RheScsXG4gICAgJ2VyYScsXG4gICAgJ3llYXInLFxuICAgICdtb250aCcsXG4gICAgJ2RheScsXG4gICAgJ2hvdXInLFxuICAgICdtaW51dGUnLFxuICAgICdzZWNvbmQnLFxuICAgICd0aW1lWm9uZU5hbWUnLFxuICAgICdmb3JtYXRNYXRjaGVyJyxcbiAgICAnaG91cjEyJyxcbiAgICAndGltZVpvbmUnLFxuICAgICdkYXRlU3R5bGUnLFxuICAgICd0aW1lU3R5bGUnLFxuICAgICdjYWxlbmRhcicsXG4gICAgJ2RheVBlcmlvZCcsXG4gICAgJ251bWJlcmluZ1N5c3RlbScsXG4gICAgJ2hvdXJDeWNsZScsXG4gICAgJ2ZyYWN0aW9uYWxTZWNvbmREaWdpdHMnXG5dO1xuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gcGFyc2VEYXRlVGltZUFyZ3MoLi4uYXJncykge1xuICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczLCBhcmc0XSA9IGFyZ3M7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGxldCBvdmVycmlkZXMgPSB7fTtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKGlzU3RyaW5nKGFyZzEpKSB7XG4gICAgICAgIC8vIE9ubHkgYWxsb3cgSVNPIHN0cmluZ3MgLSBvdGhlciBkYXRlIGZvcm1hdHMgYXJlIG9mdGVuIHN1cHBvcnRlZCxcbiAgICAgICAgLy8gYnV0IG1heSBjYXVzZSBkaWZmZXJlbnQgcmVzdWx0cyBpbiBkaWZmZXJlbnQgYnJvd3NlcnMuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBhcmcxLm1hdGNoKC8oXFxkezR9LVxcZHsyfS1cXGR7Mn0pKFR8XFxzKT8oLiopLyk7XG4gICAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLklOVkFMSURfSVNPX0RBVEVfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgY2FuIG5vdCBwYXJzZSB0aGUgaXNvIGRhdGV0aW1lIHNlcGFyYXRlZCBieSBzcGFjZSxcbiAgICAgICAgLy8gdGhpcyBpcyBhIGNvbXByb21pc2Ugc29sdXRpb24gYnkgcmVwbGFjZSB0aGUgJ1QnLycgJyB3aXRoICdUJ1xuICAgICAgICBjb25zdCBkYXRlVGltZSA9IG1hdGNoZXNbM11cbiAgICAgICAgICAgID8gbWF0Y2hlc1szXS50cmltKCkuc3RhcnRzV2l0aCgnVCcpXG4gICAgICAgICAgICAgICAgPyBgJHttYXRjaGVzWzFdLnRyaW0oKX0ke21hdGNoZXNbM10udHJpbSgpfWBcbiAgICAgICAgICAgICAgICA6IGAke21hdGNoZXNbMV0udHJpbSgpfVQke21hdGNoZXNbM10udHJpbSgpfWBcbiAgICAgICAgICAgIDogbWF0Y2hlc1sxXS50cmltKCk7XG4gICAgICAgIHZhbHVlID0gbmV3IERhdGUoZGF0ZVRpbWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVGhpcyB3aWxsIGZhaWwgaWYgdGhlIGRhdGUgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9JU09fREFURV9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNEYXRlKGFyZzEpKSB7XG4gICAgICAgIGlmIChpc05hTihhcmcxLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0RBVEVfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gYXJnMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNOdW1iZXIoYXJnMSkpIHtcbiAgICAgICAgdmFsdWUgPSBhcmcxO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlQpO1xuICAgIH1cbiAgICBpZiAoaXNTdHJpbmcoYXJnMikpIHtcbiAgICAgICAgb3B0aW9ucy5rZXkgPSBhcmcyO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGFyZzIpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICBvdmVycmlkZXNba2V5XSA9IGFyZzJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IGFyZzJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc1N0cmluZyhhcmczKSkge1xuICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMykpIHtcbiAgICAgICAgb3ZlcnJpZGVzID0gYXJnMztcbiAgICB9XG4gICAgaWYgKGlzUGxhaW5PYmplY3QoYXJnNCkpIHtcbiAgICAgICAgb3ZlcnJpZGVzID0gYXJnNDtcbiAgICB9XG4gICAgcmV0dXJuIFtvcHRpb25zLmtleSB8fCAnJywgdmFsdWUsIG9wdGlvbnMsIG92ZXJyaWRlc107XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBjbGVhckRhdGVUaW1lRm9ybWF0KGN0eCwgbG9jYWxlLCBmb3JtYXQpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gY3R4O1xuICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm1hdCkge1xuICAgICAgICBjb25zdCBpZCA9IGAke2xvY2FsZX1fXyR7a2V5fWA7XG4gICAgICAgIGlmICghY29udGV4dC5fX2RhdGV0aW1lRm9ybWF0dGVycy5oYXMoaWQpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0Ll9fZGF0ZXRpbWVGb3JtYXR0ZXJzLmRlbGV0ZShpZCk7XG4gICAgfVxufVxuXG4vLyBpbXBsZW1lbnRhdGlvbiBvZiBgbnVtYmVyYCBmdW5jdGlvblxuZnVuY3Rpb24gbnVtYmVyKGNvbnRleHQsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7IG51bWJlckZvcm1hdHMsIHVucmVzb2x2aW5nLCBmYWxsYmFja0xvY2FsZSwgb25XYXJuLCBsb2NhbGVGYWxsYmFja2VyIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IHsgX19udW1iZXJGb3JtYXR0ZXJzIH0gPSBjb250ZXh0O1xuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgIUF2YWlsYWJpbGl0aWVzLm51bWJlckZvcm1hdCkge1xuICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5DQU5OT1RfRk9STUFUX05VTUJFUikpO1xuICAgICAgICByZXR1cm4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFO1xuICAgIH1cbiAgICBjb25zdCBba2V5LCB2YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXSA9IHBhcnNlTnVtYmVyQXJncyguLi5hcmdzKTtcbiAgICBjb25zdCBtaXNzaW5nV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKVxuICAgICAgICA/IG9wdGlvbnMubWlzc2luZ1dhcm5cbiAgICAgICAgOiBjb250ZXh0Lm1pc3NpbmdXYXJuO1xuICAgIGNvbnN0IGZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybilcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrV2FyblxuICAgICAgICA6IGNvbnRleHQuZmFsbGJhY2tXYXJuO1xuICAgIGNvbnN0IHBhcnQgPSAhIW9wdGlvbnMucGFydDtcbiAgICBjb25zdCBsb2NhbGUgPSBnZXRMb2NhbGUoY29udGV4dCwgb3B0aW9ucyk7XG4gICAgY29uc3QgbG9jYWxlcyA9IGxvY2FsZUZhbGxiYWNrZXIoY29udGV4dCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZmFsbGJhY2tMb2NhbGUsIGxvY2FsZSk7XG4gICAgaWYgKCFpc1N0cmluZyhrZXkpIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG92ZXJyaWRlcykuZm9ybWF0KHZhbHVlKTtcbiAgICB9XG4gICAgLy8gcmVzb2x2ZSBmb3JtYXRcbiAgICBsZXQgbnVtYmVyRm9ybWF0ID0ge307XG4gICAgbGV0IHRhcmdldExvY2FsZTtcbiAgICBsZXQgZm9ybWF0ID0gbnVsbDtcbiAgICBsZXQgZnJvbSA9IGxvY2FsZTtcbiAgICBsZXQgdG8gPSBudWxsO1xuICAgIGNvbnN0IHR5cGUgPSAnbnVtYmVyIGZvcm1hdCc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhcmdldExvY2FsZSA9IHRvID0gbG9jYWxlc1tpXTtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxuICAgICAgICAgICAgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUgJiZcbiAgICAgICAgICAgIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrV2Fybiwga2V5KSkge1xuICAgICAgICAgICAgb25XYXJuKGdldFdhcm5NZXNzYWdlKENvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fTlVNQkVSX0ZPUk1BVCwge1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldExvY2FsZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBsb2NhbGUgIT09IHRhcmdldExvY2FsZSkge1xuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XG4gICAgICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImZhbGxiYWNrXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5GQUxCQUNLICovLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3R5cGV9OiR7a2V5fWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBudW1iZXJGb3JtYXQgPVxuICAgICAgICAgICAgbnVtYmVyRm9ybWF0c1t0YXJnZXRMb2NhbGVdIHx8IHt9O1xuICAgICAgICBmb3JtYXQgPSBudW1iZXJGb3JtYXRba2V5XTtcbiAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QoZm9ybWF0KSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIGtleSwgdGFyZ2V0TG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBmcm9tID0gdG87XG4gICAgfVxuICAgIC8vIGNoZWNraW5nIGZvcm1hdCBhbmQgdGFyZ2V0IGxvY2FsZVxuICAgIGlmICghaXNQbGFpbk9iamVjdChmb3JtYXQpIHx8ICFpc1N0cmluZyh0YXJnZXRMb2NhbGUpKSB7XG4gICAgICAgIHJldHVybiB1bnJlc29sdmluZyA/IE5PVF9SRU9TTFZFRCA6IGtleTtcbiAgICB9XG4gICAgbGV0IGlkID0gYCR7dGFyZ2V0TG9jYWxlfV9fJHtrZXl9YDtcbiAgICBpZiAoIWlzRW1wdHlPYmplY3Qob3ZlcnJpZGVzKSkge1xuICAgICAgICBpZCA9IGAke2lkfV9fJHtKU09OLnN0cmluZ2lmeShvdmVycmlkZXMpfWA7XG4gICAgfVxuICAgIGxldCBmb3JtYXR0ZXIgPSBfX251bWJlckZvcm1hdHRlcnMuZ2V0KGlkKTtcbiAgICBpZiAoIWZvcm1hdHRlcikge1xuICAgICAgICBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGFyZ2V0TG9jYWxlLCBhc3NpZ24oe30sIGZvcm1hdCwgb3ZlcnJpZGVzKSk7XG4gICAgICAgIF9fbnVtYmVyRm9ybWF0dGVycy5zZXQoaWQsIGZvcm1hdHRlcik7XG4gICAgfVxuICAgIHJldHVybiAhcGFydCA/IGZvcm1hdHRlci5mb3JtYXQodmFsdWUpIDogZm9ybWF0dGVyLmZvcm1hdFRvUGFydHModmFsdWUpO1xufVxuLyoqIEBpbnRlcm5hbCAqL1xuY29uc3QgTlVNQkVSX0ZPUk1BVF9PUFRJT05TX0tFWVMgPSBbXG4gICAgJ2xvY2FsZU1hdGNoZXInLFxuICAgICdzdHlsZScsXG4gICAgJ2N1cnJlbmN5JyxcbiAgICAnY3VycmVuY3lEaXNwbGF5JyxcbiAgICAnY3VycmVuY3lTaWduJyxcbiAgICAndXNlR3JvdXBpbmcnLFxuICAgICdtaW5pbXVtSW50ZWdlckRpZ2l0cycsXG4gICAgJ21pbmltdW1GcmFjdGlvbkRpZ2l0cycsXG4gICAgJ21heGltdW1GcmFjdGlvbkRpZ2l0cycsXG4gICAgJ21pbmltdW1TaWduaWZpY2FudERpZ2l0cycsXG4gICAgJ21heGltdW1TaWduaWZpY2FudERpZ2l0cycsXG4gICAgJ2NvbXBhY3REaXNwbGF5JyxcbiAgICAnbm90YXRpb24nLFxuICAgICdzaWduRGlzcGxheScsXG4gICAgJ3VuaXQnLFxuICAgICd1bml0RGlzcGxheScsXG4gICAgJ3JvdW5kaW5nTW9kZScsXG4gICAgJ3JvdW5kaW5nUHJpb3JpdHknLFxuICAgICdyb3VuZGluZ0luY3JlbWVudCcsXG4gICAgJ3RyYWlsaW5nWmVyb0Rpc3BsYXknXG5dO1xuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gcGFyc2VOdW1iZXJBcmdzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnMywgYXJnNF0gPSBhcmdzO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBsZXQgb3ZlcnJpZGVzID0ge307XG4gICAgaWYgKCFpc051bWJlcihhcmcxKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gYXJnMTtcbiAgICBpZiAoaXNTdHJpbmcoYXJnMikpIHtcbiAgICAgICAgb3B0aW9ucy5rZXkgPSBhcmcyO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGFyZzIpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcnJpZGVzW2tleV0gPSBhcmcyW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBhcmcyW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNTdHJpbmcoYXJnMykpIHtcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBhcmczO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzMpKSB7XG4gICAgICAgIG92ZXJyaWRlcyA9IGFyZzM7XG4gICAgfVxuICAgIGlmIChpc1BsYWluT2JqZWN0KGFyZzQpKSB7XG4gICAgICAgIG92ZXJyaWRlcyA9IGFyZzQ7XG4gICAgfVxuICAgIHJldHVybiBbb3B0aW9ucy5rZXkgfHwgJycsIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdO1xufVxuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gY2xlYXJOdW1iZXJGb3JtYXQoY3R4LCBsb2NhbGUsIGZvcm1hdCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjdHg7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybWF0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gYCR7bG9jYWxlfV9fJHtrZXl9YDtcbiAgICAgICAgaWYgKCFjb250ZXh0Ll9fbnVtYmVyRm9ybWF0dGVycy5oYXMoaWQpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0Ll9fbnVtYmVyRm9ybWF0dGVycy5kZWxldGUoaWQpO1xuICAgIH1cbn1cblxue1xuICAgIGluaXRGZWF0dXJlRmxhZ3MoKTtcbn1cblxuZXhwb3J0IHsgQ29yZUVycm9yQ29kZXMsIENvcmVXYXJuQ29kZXMsIERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMsIERFRkFVTFRfTE9DQUxFLCBERUZBVUxUX01FU1NBR0VfREFUQV9UWVBFLCBNSVNTSU5HX1JFU09MVkVfVkFMVUUsIE5PVF9SRU9TTFZFRCwgTlVNQkVSX0ZPUk1BVF9PUFRJT05TX0tFWVMsIFZFUlNJT04sIGNsZWFyQ29tcGlsZUNhY2hlLCBjbGVhckRhdGVUaW1lRm9ybWF0LCBjbGVhck51bWJlckZvcm1hdCwgY29tcGlsZSwgY29tcGlsZVRvRnVuY3Rpb24sIGNyZWF0ZUNvcmVDb250ZXh0LCBjcmVhdGVDb3JlRXJyb3IsIGNyZWF0ZU1lc3NhZ2VDb250ZXh0LCBkYXRldGltZSwgZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4sIGZhbGxiYWNrV2l0aFNpbXBsZSwgZ2V0QWRkaXRpb25hbE1ldGEsIGdldERldlRvb2xzSG9vaywgZ2V0RmFsbGJhY2tDb250ZXh0LCBnZXRMb2NhbGUsIGdldFdhcm5NZXNzYWdlLCBoYW5kbGVNaXNzaW5nLCBpbml0STE4bkRldlRvb2xzLCBpc0FsbW9zdFNhbWVMb2NhbGUsIGlzSW1wbGljaXRGYWxsYmFjaywgaXNNZXNzYWdlQVNULCBpc01lc3NhZ2VGdW5jdGlvbiwgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4sIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4sIG51bWJlciwgcGFyc2UsIHBhcnNlRGF0ZVRpbWVBcmdzLCBwYXJzZU51bWJlckFyZ3MsIHBhcnNlVHJhbnNsYXRlQXJncywgcmVnaXN0ZXJMb2NhbGVGYWxsYmFja2VyLCByZWdpc3Rlck1lc3NhZ2VDb21waWxlciwgcmVnaXN0ZXJNZXNzYWdlUmVzb2x2ZXIsIHJlc29sdmVMb2NhbGUsIHJlc29sdmVWYWx1ZSwgcmVzb2x2ZVdpdGhLZXlWYWx1ZSwgc2V0QWRkaXRpb25hbE1ldGEsIHNldERldlRvb2xzSG9vaywgc2V0RmFsbGJhY2tDb250ZXh0LCB0cmFuc2xhdGUsIHRyYW5zbGF0ZURldlRvb2xzLCB1cGRhdGVGYWxsYmFja0xvY2FsZSB9O1xuIiwiLyohXG4gICogdnVlLWkxOG4gdjkuMTMuMVxuICAqIChjKSAyMDI0IGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5pbXBvcnQgeyBnZXRHbG9iYWxUaGlzLCBpbmNyZW1lbnRlciwgZm9ybWF0LCBtYWtlU3ltYm9sLCBpc1BsYWluT2JqZWN0LCBpc0FycmF5LCBkZWVwQ29weSwgaXNTdHJpbmcsIGhhc093biwgaXNPYmplY3QsIHdhcm4sIHdhcm5PbmNlLCBpc0Jvb2xlYW4sIGlzUmVnRXhwLCBpc0Z1bmN0aW9uLCBpbkJyb3dzZXIsIGFzc2lnbiwgaXNOdW1iZXIsIGNyZWF0ZUVtaXR0ZXIsIGlzRW1wdHlPYmplY3QgfSBmcm9tICdAaW50bGlmeS9zaGFyZWQnO1xuaW1wb3J0IHsgQ29yZVdhcm5Db2RlcywgQ29yZUVycm9yQ29kZXMsIGNyZWF0ZUNvbXBpbGVFcnJvciwgREVGQVVMVF9MT0NBTEUsIHVwZGF0ZUZhbGxiYWNrTG9jYWxlLCBzZXRGYWxsYmFja0NvbnRleHQsIGNyZWF0ZUNvcmVDb250ZXh0LCBjbGVhckRhdGVUaW1lRm9ybWF0LCBjbGVhck51bWJlckZvcm1hdCwgc2V0QWRkaXRpb25hbE1ldGEsIGdldEZhbGxiYWNrQ29udGV4dCwgTk9UX1JFT1NMVkVELCBpc1RyYW5zbGF0ZUZhbGxiYWNrV2FybiwgaXNUcmFuc2xhdGVNaXNzaW5nV2FybiwgcGFyc2VUcmFuc2xhdGVBcmdzLCB0cmFuc2xhdGUsIE1JU1NJTkdfUkVTT0xWRV9WQUxVRSwgcGFyc2VEYXRlVGltZUFyZ3MsIGRhdGV0aW1lLCBwYXJzZU51bWJlckFyZ3MsIG51bWJlciwgaXNNZXNzYWdlQVNULCBpc01lc3NhZ2VGdW5jdGlvbiwgZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4sIE5VTUJFUl9GT1JNQVRfT1BUSU9OU19LRVlTLCBEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTLCByZWdpc3Rlck1lc3NhZ2VDb21waWxlciwgY29tcGlsZSwgcmVnaXN0ZXJNZXNzYWdlUmVzb2x2ZXIsIHJlc29sdmVWYWx1ZSwgcmVnaXN0ZXJMb2NhbGVGYWxsYmFja2VyLCBzZXREZXZUb29sc0hvb2sgfSBmcm9tICdAaW50bGlmeS9jb3JlLWJhc2UnO1xuaW1wb3J0IHsgY3JlYXRlVk5vZGUsIFRleHQsIGNvbXB1dGVkLCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlLCByZWYsIHNoYWxsb3dSZWYsIEZyYWdtZW50LCBkZWZpbmVDb21wb25lbnQsIGgsIGVmZmVjdFNjb3BlLCBpbmplY3QsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQsIG9uQmVmb3JlTW91bnQsIGlzUmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHNldHVwRGV2dG9vbHNQbHVnaW4gfSBmcm9tICdAdnVlL2RldnRvb2xzLWFwaSc7XG5cbi8qKlxuICogVnVlIEkxOG4gVmVyc2lvblxuICpcbiAqIEByZW1hcmtzXG4gKiBTZW12ZXIgZm9ybWF0LiBTYW1lIGZvcm1hdCBhcyB0aGUgcGFja2FnZS5qc29uIGB2ZXJzaW9uYCBmaWVsZC5cbiAqXG4gKiBAVnVlSTE4bkdlbmVyYWxcbiAqL1xuY29uc3QgVkVSU0lPTiA9ICc5LjEzLjEnO1xuLyoqXG4gKiBUaGlzIGlzIG9ubHkgY2FsbGVkIGluIGVzbS1idW5kbGVyIGJ1aWxkcy5cbiAqIGlzdGFuYnVsLWlnbm9yZS1uZXh0XG4gKi9cbmZ1bmN0aW9uIGluaXRGZWF0dXJlRmxhZ3MoKSB7XG4gICAgaWYgKHR5cGVvZiBfX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX0kxOE5fRlVMTF9JTlNUQUxMX18gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBfX0lOVExJRllfSklUX0NPTVBJTEFUSU9OX18gIT09ICdib29sZWFuJykge1xuICAgICAgICBnZXRHbG9iYWxUaGlzKCkuX19JTlRMSUZZX0pJVF9DT01QSUxBVElPTl9fID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX0RST1BfTUVTU0FHRV9DT01QSUxFUl9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9EUk9QX01FU1NBR0VfQ09NUElMRVJfXyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gIT09ICdib29sZWFuJykge1xuICAgICAgICBnZXRHbG9iYWxUaGlzKCkuX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXyA9IGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3QgY29kZSQxID0gQ29yZVdhcm5Db2Rlcy5fX0VYVEVORF9QT0lOVF9fO1xuY29uc3QgaW5jJDEgPSBpbmNyZW1lbnRlcihjb2RlJDEpO1xuY29uc3QgSTE4bldhcm5Db2RlcyA9IHtcbiAgICBGQUxMQkFDS19UT19ST09UOiBjb2RlJDEsIC8vIDlcbiAgICBOT1RfU1VQUE9SVEVEX1BSRVNFUlZFOiBpbmMkMSgpLCAvLyAxMFxuICAgIE5PVF9TVVBQT1JURURfRk9STUFUVEVSOiBpbmMkMSgpLCAvLyAxMVxuICAgIE5PVF9TVVBQT1JURURfUFJFU0VSVkVfRElSRUNUSVZFOiBpbmMkMSgpLCAvLyAxMlxuICAgIE5PVF9TVVBQT1JURURfR0VUX0NIT0lDRV9JTkRFWDogaW5jJDEoKSwgLy8gMTNcbiAgICBDT01QT05FTlRfTkFNRV9MRUdBQ1lfQ09NUEFUSUJMRTogaW5jJDEoKSwgLy8gMTRcbiAgICBOT1RfRk9VTkRfUEFSRU5UX1NDT1BFOiBpbmMkMSgpLCAvLyAxNVxuICAgIElHTk9SRV9PQkpfRkxBVFRFTjogaW5jJDEoKSwgLy8gMTZcbiAgICBOT1RJQ0VfRFJPUF9BTExPV19DT01QT1NJVElPTjogaW5jJDEoKSwgLy8gMTdcbiAgICBOT1RJQ0VfRFJPUF9UUkFOU0xBVEVfRVhJU1RfQ09NUEFUSUJMRV9GTEFHOiBpbmMkMSgpIC8vIDE4XG59O1xuY29uc3Qgd2Fybk1lc3NhZ2VzID0ge1xuICAgIFtJMThuV2FybkNvZGVzLkZBTExCQUNLX1RPX1JPT1RdOiBgRmFsbCBiYWNrIHRvIHt0eXBlfSAne2tleX0nIHdpdGggcm9vdCBsb2NhbGUuYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFXTogYE5vdCBzdXBwb3J0ZWQgJ3ByZXNlcnZlJy5gLFxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfRk9STUFUVEVSXTogYE5vdCBzdXBwb3J0ZWQgJ2Zvcm1hdHRlcicuYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRV06IGBOb3Qgc3VwcG9ydGVkICdwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnQnLmAsXG4gICAgW0kxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9HRVRfQ0hPSUNFX0lOREVYXTogYE5vdCBzdXBwb3J0ZWQgJ2dldENob2ljZUluZGV4Jy5gLFxuICAgIFtJMThuV2FybkNvZGVzLkNPTVBPTkVOVF9OQU1FX0xFR0FDWV9DT01QQVRJQkxFXTogYENvbXBvbmVudCBuYW1lIGxlZ2FjeSBjb21wYXRpYmxlOiAne25hbWV9JyAtPiAnaTE4bidgLFxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9GT1VORF9QQVJFTlRfU0NPUEVdOiBgTm90IGZvdW5kIHBhcmVudCBzY29wZS4gdXNlIHRoZSBnbG9iYWwgc2NvcGUuYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5JR05PUkVfT0JKX0ZMQVRURU5dOiBgSWdub3JlIG9iamVjdCBmbGF0dGVuOiAne2tleX0nIGtleSBoYXMgYW4gc3RyaW5nIHZhbHVlYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RJQ0VfRFJPUF9BTExPV19DT01QT1NJVElPTl06IGAnYWxsb3dDb21wb3NpdGlvbicgb3B0aW9uIHdpbGwgYmUgZHJvcHBlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSDwn5GJIGh0dHBzOi8vdGlueXVybC5jb20vMnA5N21jemVgLFxuICAgIFtJMThuV2FybkNvZGVzLk5PVElDRV9EUk9QX1RSQU5TTEFURV9FWElTVF9DT01QQVRJQkxFX0ZMQUddOiBgJ3RyYW5zbGF0ZUV4aXN0Q29tcGF0aWJsZScgb3B0aW9uIHdpbGwgYmUgZHJvcHBlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLmBcbn07XG5mdW5jdGlvbiBnZXRXYXJuTWVzc2FnZShjb2RlLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGZvcm1hdCh3YXJuTWVzc2FnZXNbY29kZV0sIC4uLmFyZ3MpO1xufVxuXG5jb25zdCBjb2RlID0gQ29yZUVycm9yQ29kZXMuX19FWFRFTkRfUE9JTlRfXztcbmNvbnN0IGluYyA9IGluY3JlbWVudGVyKGNvZGUpO1xuY29uc3QgSTE4bkVycm9yQ29kZXMgPSB7XG4gICAgLy8gY29tcG9zZXIgbW9kdWxlIGVycm9yc1xuICAgIFVORVhQRUNURURfUkVUVVJOX1RZUEU6IGNvZGUsIC8vIDI0XG4gICAgLy8gbGVnYWN5IG1vZHVsZSBlcnJvcnNcbiAgICBJTlZBTElEX0FSR1VNRU5UOiBpbmMoKSwgLy8gMjVcbiAgICAvLyBpMThuIG1vZHVsZSBlcnJvcnNcbiAgICBNVVNUX0JFX0NBTExfU0VUVVBfVE9QOiBpbmMoKSwgLy8gMjZcbiAgICBOT1RfSU5TVEFMTEVEOiBpbmMoKSwgLy8gMjdcbiAgICBOT1RfQVZBSUxBQkxFX0lOX0xFR0FDWV9NT0RFOiBpbmMoKSwgLy8gMjhcbiAgICAvLyBkaXJlY3RpdmUgbW9kdWxlIGVycm9yc1xuICAgIFJFUVVJUkVEX1ZBTFVFOiBpbmMoKSwgLy8gMjlcbiAgICBJTlZBTElEX1ZBTFVFOiBpbmMoKSwgLy8gMzBcbiAgICAvLyB2dWUtZGV2dG9vbHMgZXJyb3JzXG4gICAgQ0FOTk9UX1NFVFVQX1ZVRV9ERVZUT09MU19QTFVHSU46IGluYygpLCAvLyAzMVxuICAgIE5PVF9JTlNUQUxMRURfV0lUSF9QUk9WSURFOiBpbmMoKSwgLy8gMzJcbiAgICAvLyB1bmV4cGVjdGVkIGVycm9yXG4gICAgVU5FWFBFQ1RFRF9FUlJPUjogaW5jKCksIC8vIDMzXG4gICAgLy8gbm90IGNvbXBhdGlibGUgbGVnYWN5IHZ1ZS1pMThuIGNvbnN0cnVjdG9yXG4gICAgTk9UX0NPTVBBVElCTEVfTEVHQUNZX1ZVRV9JMThOOiBpbmMoKSwgLy8gMzRcbiAgICAvLyBicmlkZ2Ugc3VwcG9ydCB2dWUgMi54IG9ubHlcbiAgICBCUklER0VfU1VQUE9SVF9WVUVfMl9PTkxZOiBpbmMoKSwgLy8gMzVcbiAgICAvLyBuZWVkIHRvIGRlZmluZSBgaTE4bmAgb3B0aW9uIGluIGBhbGxvd0NvbXBvc2l0aW9uOiB0cnVlYCBhbmQgYHVzZVNjb3BlOiAnbG9jYWwnIGF0IGB1c2VJMThuYGBcbiAgICBNVVNUX0RFRklORV9JMThOX09QVElPTl9JTl9BTExPV19DT01QT1NJVElPTjogaW5jKCksIC8vIDM2XG4gICAgLy8gTm90IGF2YWlsYWJsZSBDb21wb3N0aW9uIEFQSSBpbiBMZWdhY3kgQVBJIG1vZGUuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB0aGUgbGVnYWN5IEFQSSBtb2RlIGlzIHdvcmtpbmcgcHJvcGVybHlcbiAgICBOT1RfQVZBSUxBQkxFX0NPTVBPU0lUSU9OX0lOX0xFR0FDWTogaW5jKCksIC8vIDM3XG4gICAgLy8gZm9yIGVuaGFuY2VtZW50XG4gICAgX19FWFRFTkRfUE9JTlRfXzogaW5jKCkgLy8gMzhcbn07XG5mdW5jdGlvbiBjcmVhdGVJMThuRXJyb3IoY29kZSwgLi4uYXJncykge1xuICAgIHJldHVybiBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbnVsbCwgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpID8geyBtZXNzYWdlczogZXJyb3JNZXNzYWdlcywgYXJncyB9IDogdW5kZWZpbmVkKTtcbn1cbmNvbnN0IGVycm9yTWVzc2FnZXMgPSB7XG4gICAgW0kxOG5FcnJvckNvZGVzLlVORVhQRUNURURfUkVUVVJOX1RZUEVdOiAnVW5leHBlY3RlZCByZXR1cm4gdHlwZSBpbiBjb21wb3NlcicsXG4gICAgW0kxOG5FcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlRdOiAnSW52YWxpZCBhcmd1bWVudCcsXG4gICAgW0kxOG5FcnJvckNvZGVzLk1VU1RfQkVfQ0FMTF9TRVRVUF9UT1BdOiAnTXVzdCBiZSBjYWxsZWQgYXQgdGhlIHRvcCBvZiBhIGBzZXR1cGAgZnVuY3Rpb24nLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfSU5TVEFMTEVEXTogJ05lZWQgdG8gaW5zdGFsbCB3aXRoIGBhcHAudXNlYCBmdW5jdGlvbicsXG4gICAgW0kxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1JdOiAnVW5leHBlY3RlZCBlcnJvcicsXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9BVkFJTEFCTEVfSU5fTEVHQUNZX01PREVdOiAnTm90IGF2YWlsYWJsZSBpbiBsZWdhY3kgbW9kZScsXG4gICAgW0kxOG5FcnJvckNvZGVzLlJFUVVJUkVEX1ZBTFVFXTogYFJlcXVpcmVkIGluIHZhbHVlOiB7MH1gLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5JTlZBTElEX1ZBTFVFXTogYEludmFsaWQgdmFsdWVgLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5DQU5OT1RfU0VUVVBfVlVFX0RFVlRPT0xTX1BMVUdJTl06IGBDYW5ub3Qgc2V0dXAgdnVlLWRldnRvb2xzIHBsdWdpbmAsXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9JTlNUQUxMRURfV0lUSF9QUk9WSURFXTogJ05lZWQgdG8gaW5zdGFsbCB3aXRoIGBwcm92aWRlYCBmdW5jdGlvbicsXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9DT01QQVRJQkxFX0xFR0FDWV9WVUVfSTE4Tl06ICdOb3QgY29tcGF0aWJsZSBsZWdhY3kgVnVlSTE4bi4nLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5CUklER0VfU1VQUE9SVF9WVUVfMl9PTkxZXTogJ3Z1ZS1pMThuLWJyaWRnZSBzdXBwb3J0IFZ1ZSAyLnggb25seScsXG4gICAgW0kxOG5FcnJvckNvZGVzLk1VU1RfREVGSU5FX0kxOE5fT1BUSU9OX0lOX0FMTE9XX0NPTVBPU0lUSU9OXTogJ011c3QgZGVmaW5lIOKAmGkxOG7igJkgb3B0aW9uIG9yIGN1c3RvbSBibG9jayBpbiBDb21wb3NpdGlvbiBBUEkgd2l0aCB1c2luZyBsb2NhbCBzY29wZSBpbiBMZWdhY3kgQVBJIG1vZGUnLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0NPTVBPU0lUSU9OX0lOX0xFR0FDWV06ICdOb3QgYXZhaWxhYmxlIENvbXBvc3Rpb24gQVBJIGluIExlZ2FjeSBBUEkgbW9kZS4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHRoZSBsZWdhY3kgQVBJIG1vZGUgaXMgd29ya2luZyBwcm9wZXJseSdcbn07XG5cbmNvbnN0IFRyYW5zbGF0ZVZOb2RlU3ltYm9sID0gXG4vKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX3RyYW5zbGF0ZVZOb2RlJyk7XG5jb25zdCBEYXRldGltZVBhcnRzU3ltYm9sID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19kYXRldGltZVBhcnRzJyk7XG5jb25zdCBOdW1iZXJQYXJ0c1N5bWJvbCA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fbnVtYmVyUGFydHMnKTtcbmNvbnN0IEVuYWJsZUVtaXR0ZXIgPSAvKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX2VuYWJsZUVtaXR0ZXInKTtcbmNvbnN0IERpc2FibGVFbWl0dGVyID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19kaXNhYmxlRW1pdHRlcicpO1xuY29uc3QgU2V0UGx1cmFsUnVsZXNTeW1ib2wgPSBtYWtlU3ltYm9sKCdfX3NldFBsdXJhbFJ1bGVzJyk7XG5tYWtlU3ltYm9sKCdfX2ludGxpZnlNZXRhJyk7XG5jb25zdCBJbmVqY3RXaXRoT3B0aW9uU3ltYm9sID0gXG4vKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX2luamVjdFdpdGhPcHRpb24nKTtcbmNvbnN0IERpc3Bvc2VTeW1ib2wgPSAvKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX2Rpc3Bvc2UnKTtcbmNvbnN0IF9fVlVFX0kxOE5fQlJJREdFX18gPSAgJ19fVlVFX0kxOE5fQlJJREdFX18nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKipcbiAqIFRyYW5zZm9ybSBmbGF0IGpzb24gaW4gb2JqIHRvIG5vcm1hbCBqc29uIGluIG9ialxuICovXG5mdW5jdGlvbiBoYW5kbGVGbGF0SnNvbihvYmopIHtcbiAgICAvLyBjaGVjayBvYmpcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIC8vIGNoZWNrIGtleVxuICAgICAgICBpZiAoIWhhc093bihvYmosIGtleSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhhbmRsZSBmb3Igbm9ybWFsIGpzb25cbiAgICAgICAgaWYgKCFrZXkuaW5jbHVkZXMoJy4nKSkge1xuICAgICAgICAgICAgLy8gcmVjdXJzaXZlIHByb2Nlc3MgdmFsdWUgaWYgdmFsdWUgaXMgYWxzbyBhIG9iamVjdFxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUZsYXRKc29uKG9ialtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBoYW5kbGUgZm9yIGZsYXQganNvbiwgdHJhbnNmb3JtIHRvIG5vcm1hbCBqc29uXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZ28gdG8gdGhlIGxhc3Qgb2JqZWN0XG4gICAgICAgICAgICBjb25zdCBzdWJLZXlzID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBzdWJLZXlzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBsZXQgY3VycmVudE9iaiA9IG9iajtcbiAgICAgICAgICAgIGxldCBoYXNTdHJpbmdWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0SW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghKHN1YktleXNbaV0gaW4gY3VycmVudE9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE9ialtzdWJLZXlzW2ldXSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzT2JqZWN0KGN1cnJlbnRPYmpbc3ViS2V5c1tpXV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLklHTk9SRV9PQkpfRkxBVFRFTiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogc3ViS2V5c1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICBoYXNTdHJpbmdWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqID0gY3VycmVudE9ialtzdWJLZXlzW2ldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBsYXN0IG9iamVjdCB2YWx1ZSwgZGVsZXRlIG9sZCBwcm9wZXJ0eVxuICAgICAgICAgICAgaWYgKCFoYXNTdHJpbmdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmpbc3ViS2V5c1tsYXN0SW5kZXhdXSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZSBwcm9jZXNzIHZhbHVlIGlmIHZhbHVlIGlzIGFsc28gYSBvYmplY3RcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjdXJyZW50T2JqW3N1YktleXNbbGFzdEluZGV4XV0pKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRmxhdEpzb24oY3VycmVudE9ialtzdWJLZXlzW2xhc3RJbmRleF1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZXMobG9jYWxlLCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlcywgX19pMThuLCBtZXNzYWdlUmVzb2x2ZXIsIGZsYXRKc29uIH0gPSBvcHRpb25zO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IHJldCA9IChpc1BsYWluT2JqZWN0KG1lc3NhZ2VzKVxuICAgICAgICA/IG1lc3NhZ2VzXG4gICAgICAgIDogaXNBcnJheShfX2kxOG4pXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHsgW2xvY2FsZV06IHt9IH0pO1xuICAgIC8vIG1lcmdlIGxvY2FsZSBtZXNzYWdlcyBvZiBpMThuIGN1c3RvbSBibG9ja1xuICAgIGlmIChpc0FycmF5KF9faTE4bikpIHtcbiAgICAgICAgX19pMThuLmZvckVhY2goY3VzdG9tID0+IHtcbiAgICAgICAgICAgIGlmICgnbG9jYWxlJyBpbiBjdXN0b20gJiYgJ3Jlc291cmNlJyBpbiBjdXN0b20pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGxvY2FsZSwgcmVzb3VyY2UgfSA9IGN1c3RvbTtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFtsb2NhbGVdID0gcmV0W2xvY2FsZV0gfHwge307XG4gICAgICAgICAgICAgICAgICAgIGRlZXBDb3B5KHJlc291cmNlLCByZXRbbG9jYWxlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWVwQ29weShyZXNvdXJjZSwgcmV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc1N0cmluZyhjdXN0b20pICYmIGRlZXBDb3B5KEpTT04ucGFyc2UoY3VzdG9tKSwgcmV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGhhbmRsZSBtZXNzYWdlcyBmb3IgZmxhdCBqc29uXG4gICAgaWYgKG1lc3NhZ2VSZXNvbHZlciA9PSBudWxsICYmIGZsYXRKc29uKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJldCkge1xuICAgICAgICAgICAgaWYgKGhhc093bihyZXQsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVGbGF0SnNvbihyZXRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBnZXRDb21wb25lbnRPcHRpb25zKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLnR5cGUgO1xufVxuZnVuY3Rpb24gYWRqdXN0STE4blJlc291cmNlcyhnbCwgb3B0aW9ucywgY29tcG9uZW50T3B0aW9ucyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbikge1xuICAgIGxldCBtZXNzYWdlcyA9IGlzT2JqZWN0KG9wdGlvbnMubWVzc2FnZXMpID8gb3B0aW9ucy5tZXNzYWdlcyA6IHt9O1xuICAgIGlmICgnX19pMThuR2xvYmFsJyBpbiBjb21wb25lbnRPcHRpb25zKSB7XG4gICAgICAgIG1lc3NhZ2VzID0gZ2V0TG9jYWxlTWVzc2FnZXMoZ2wubG9jYWxlLnZhbHVlLCB7XG4gICAgICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgICAgIF9faTE4bjogY29tcG9uZW50T3B0aW9ucy5fX2kxOG5HbG9iYWxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIG1lcmdlIGxvY2FsZSBtZXNzYWdlc1xuICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhtZXNzYWdlcyk7XG4gICAgaWYgKGxvY2FsZXMubGVuZ3RoKSB7XG4gICAgICAgIGxvY2FsZXMuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgICAgICAgZ2wubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZXNbbG9jYWxlXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB7XG4gICAgICAgIC8vIG1lcmdlIGRhdGV0aW1lIGZvcm1hdHNcbiAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxlcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxvY2FsZXMuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnbC5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5kYXRldGltZUZvcm1hdHNbbG9jYWxlXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbWVyZ2UgbnVtYmVyIGZvcm1hdHNcbiAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMubnVtYmVyRm9ybWF0cykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLm51bWJlckZvcm1hdHMpO1xuICAgICAgICAgICAgaWYgKGxvY2FsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlcy5mb3JFYWNoKGxvY2FsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdsLm1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5udW1iZXJGb3JtYXRzW2xvY2FsZV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUoa2V5KSB7XG4gICAgcmV0dXJuIGNyZWF0ZVZOb2RlKFRleHQsIG51bGwsIGtleSwgMClcbiAgICAgICAgO1xufVxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8vIGV4dGVuZCBWTm9kZSBpbnRlcmZhY2VcbmNvbnN0IERFVlRPT0xTX01FVEEgPSAnX19JTlRMSUZZX01FVEFfXyc7XG5jb25zdCBOT09QX1JFVFVSTl9BUlJBWSA9ICgpID0+IFtdO1xuY29uc3QgTk9PUF9SRVRVUk5fRkFMU0UgPSAoKSA9PiBmYWxzZTtcbmxldCBjb21wb3NlcklEID0gMDtcbmZ1bmN0aW9uIGRlZmluZUNvcmVNaXNzaW5nSGFuZGxlcihtaXNzaW5nKSB7XG4gICAgcmV0dXJuICgoY3R4LCBsb2NhbGUsIGtleSwgdHlwZSkgPT4ge1xuICAgICAgICByZXR1cm4gbWlzc2luZyhsb2NhbGUsIGtleSwgZ2V0Q3VycmVudEluc3RhbmNlKCkgfHwgdW5kZWZpbmVkLCB0eXBlKTtcbiAgICB9KTtcbn1cbi8vIGZvciBJbnRsaWZ5IERldlRvb2xzXG4vKiAjX19OT19TSURFX0VGRkVDVFNfXyAqL1xuY29uc3QgZ2V0TWV0YUluZm8gPSAoKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgICBsZXQgbWV0YSA9IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHJldHVybiBpbnN0YW5jZSAmJiAobWV0YSA9IGdldENvbXBvbmVudE9wdGlvbnMoaW5zdGFuY2UpW0RFVlRPT0xTX01FVEFdKVxuICAgICAgICA/IHsgW0RFVlRPT0xTX01FVEFdOiBtZXRhIH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIDogbnVsbDtcbn07XG4vKipcbiAqIENyZWF0ZSBjb21wb3NlciBpbnRlcmZhY2UgZmFjdG9yeVxuICpcbiAqIEBpbnRlcm5hbFxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gY3JlYXRlQ29tcG9zZXIob3B0aW9ucyA9IHt9LCBWdWVJMThuTGVnYWN5KSB7XG4gICAgY29uc3QgeyBfX3Jvb3QsIF9faW5qZWN0V2l0aE9wdGlvbiB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBfaXNHbG9iYWwgPSBfX3Jvb3QgPT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCBmbGF0SnNvbiA9IG9wdGlvbnMuZmxhdEpzb247XG4gICAgY29uc3QgX3JlZiA9IGluQnJvd3NlciA/IHJlZiA6IHNoYWxsb3dSZWY7XG4gICAgY29uc3QgdHJhbnNsYXRlRXhpc3RDb21wYXRpYmxlID0gISFvcHRpb25zLnRyYW5zbGF0ZUV4aXN0Q29tcGF0aWJsZTtcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgIGlmICh0cmFuc2xhdGVFeGlzdENvbXBhdGlibGUgJiYgIWZhbHNlKSB7XG4gICAgICAgICAgICB3YXJuT25jZShnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVElDRV9EUk9QX1RSQU5TTEFURV9FWElTVF9DT01QQVRJQkxFX0ZMQUcpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgX2luaGVyaXRMb2NhbGUgPSBpc0Jvb2xlYW4ob3B0aW9ucy5pbmhlcml0TG9jYWxlKVxuICAgICAgICA/IG9wdGlvbnMuaW5oZXJpdExvY2FsZVxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgX2xvY2FsZSA9IF9yZWYoXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgX19yb290ICYmIF9pbmhlcml0TG9jYWxlXG4gICAgICAgID8gX19yb290LmxvY2FsZS52YWx1ZVxuICAgICAgICA6IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKVxuICAgICAgICAgICAgPyBvcHRpb25zLmxvY2FsZVxuICAgICAgICAgICAgOiBERUZBVUxUX0xPQ0FMRSk7XG4gICAgY29uc3QgX2ZhbGxiYWNrTG9jYWxlID0gX3JlZihcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBfX3Jvb3QgJiYgX2luaGVyaXRMb2NhbGVcbiAgICAgICAgPyBfX3Jvb3QuZmFsbGJhY2tMb2NhbGUudmFsdWVcbiAgICAgICAgOiBpc1N0cmluZyhvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICAgICAgaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICAgICAgaXNQbGFpbk9iamVjdChvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICAgICAgb3B0aW9ucy5mYWxsYmFja0xvY2FsZSA9PT0gZmFsc2VcbiAgICAgICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxuICAgICAgICAgICAgOiBfbG9jYWxlLnZhbHVlKTtcbiAgICBjb25zdCBfbWVzc2FnZXMgPSBfcmVmKGdldExvY2FsZU1lc3NhZ2VzKF9sb2NhbGUudmFsdWUsIG9wdGlvbnMpKTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfZGF0ZXRpbWVGb3JtYXRzID0gX3JlZihpc1BsYWluT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKVxuICAgICAgICAgICAgPyBvcHRpb25zLmRhdGV0aW1lRm9ybWF0c1xuICAgICAgICAgICAgOiB7IFtfbG9jYWxlLnZhbHVlXToge30gfSlcbiAgICAgICAgO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9udW1iZXJGb3JtYXRzID0gX3JlZihpc1BsYWluT2JqZWN0KG9wdGlvbnMubnVtYmVyRm9ybWF0cylcbiAgICAgICAgICAgID8gb3B0aW9ucy5udW1iZXJGb3JtYXRzXG4gICAgICAgICAgICA6IHsgW19sb2NhbGUudmFsdWVdOiB7fSB9KVxuICAgICAgICA7XG4gICAgLy8gd2FybmluZyBzdXBwcmVzcyBvcHRpb25zXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgbGV0IF9taXNzaW5nV2FybiA9IF9fcm9vdFxuICAgICAgICA/IF9fcm9vdC5taXNzaW5nV2FyblxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLm1pc3NpbmdXYXJuKVxuICAgICAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgbGV0IF9mYWxsYmFja1dhcm4gPSBfX3Jvb3RcbiAgICAgICAgPyBfX3Jvb3QuZmFsbGJhY2tXYXJuXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLmZhbGxiYWNrV2FybilcbiAgICAgICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBsZXQgX2ZhbGxiYWNrUm9vdCA9IF9fcm9vdFxuICAgICAgICA/IF9fcm9vdC5mYWxsYmFja1Jvb3RcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1Jvb3QpXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tSb290XG4gICAgICAgICAgICA6IHRydWU7XG4gICAgLy8gY29uZmlndXJlIGZhbGwgYmFjayB0byByb290XG4gICAgbGV0IF9mYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mYWxsYmFja0Zvcm1hdDtcbiAgICAvLyBydW50aW1lIG1pc3NpbmdcbiAgICBsZXQgX21pc3NpbmcgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWlzc2luZykgPyBvcHRpb25zLm1pc3NpbmcgOiBudWxsO1xuICAgIGxldCBfcnVudGltZU1pc3NpbmcgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWlzc2luZylcbiAgICAgICAgPyBkZWZpbmVDb3JlTWlzc2luZ0hhbmRsZXIob3B0aW9ucy5taXNzaW5nKVxuICAgICAgICA6IG51bGw7XG4gICAgLy8gcG9zdFRyYW5zbGF0aW9uIGhhbmRsZXJcbiAgICBsZXQgX3Bvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXG4gICAgICAgID8gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb25cbiAgICAgICAgOiBudWxsO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGxldCBfd2Fybkh0bWxNZXNzYWdlID0gX19yb290XG4gICAgICAgID8gX19yb290Lndhcm5IdG1sTWVzc2FnZVxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLndhcm5IdG1sTWVzc2FnZSlcbiAgICAgICAgICAgID8gb3B0aW9ucy53YXJuSHRtbE1lc3NhZ2VcbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICBsZXQgX2VzY2FwZVBhcmFtZXRlciA9ICEhb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXI7XG4gICAgLy8gY3VzdG9tIGxpbmtlZCBtb2RpZmllcnNcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfbW9kaWZpZXJzID0gX19yb290XG4gICAgICAgID8gX19yb290Lm1vZGlmaWVyc1xuICAgICAgICA6IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5tb2RpZmllcnMpXG4gICAgICAgICAgICA/IG9wdGlvbnMubW9kaWZpZXJzXG4gICAgICAgICAgICA6IHt9O1xuICAgIC8vIHBsdXJhbFJ1bGVzXG4gICAgbGV0IF9wbHVyYWxSdWxlcyA9IG9wdGlvbnMucGx1cmFsUnVsZXMgfHwgKF9fcm9vdCAmJiBfX3Jvb3QucGx1cmFsUnVsZXMpO1xuICAgIC8vIHJ1bnRpbWUgY29udGV4dFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgICBsZXQgX2NvbnRleHQ7XG4gICAgY29uc3QgZ2V0Q29yZUNvbnRleHQgPSAoKSA9PiB7XG4gICAgICAgIF9pc0dsb2JhbCAmJiBzZXRGYWxsYmFja0NvbnRleHQobnVsbCk7XG4gICAgICAgIGNvbnN0IGN0eE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB2ZXJzaW9uOiBWRVJTSU9OLFxuICAgICAgICAgICAgbG9jYWxlOiBfbG9jYWxlLnZhbHVlLFxuICAgICAgICAgICAgZmFsbGJhY2tMb2NhbGU6IF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBfbWVzc2FnZXMudmFsdWUsXG4gICAgICAgICAgICBtb2RpZmllcnM6IF9tb2RpZmllcnMsXG4gICAgICAgICAgICBwbHVyYWxSdWxlczogX3BsdXJhbFJ1bGVzLFxuICAgICAgICAgICAgbWlzc2luZzogX3J1bnRpbWVNaXNzaW5nID09PSBudWxsID8gdW5kZWZpbmVkIDogX3J1bnRpbWVNaXNzaW5nLFxuICAgICAgICAgICAgbWlzc2luZ1dhcm46IF9taXNzaW5nV2FybixcbiAgICAgICAgICAgIGZhbGxiYWNrV2FybjogX2ZhbGxiYWNrV2FybixcbiAgICAgICAgICAgIGZhbGxiYWNrRm9ybWF0OiBfZmFsbGJhY2tGb3JtYXQsXG4gICAgICAgICAgICB1bnJlc29sdmluZzogdHJ1ZSxcbiAgICAgICAgICAgIHBvc3RUcmFuc2xhdGlvbjogX3Bvc3RUcmFuc2xhdGlvbiA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IF9wb3N0VHJhbnNsYXRpb24sXG4gICAgICAgICAgICB3YXJuSHRtbE1lc3NhZ2U6IF93YXJuSHRtbE1lc3NhZ2UsXG4gICAgICAgICAgICBlc2NhcGVQYXJhbWV0ZXI6IF9lc2NhcGVQYXJhbWV0ZXIsXG4gICAgICAgICAgICBtZXNzYWdlUmVzb2x2ZXI6IG9wdGlvbnMubWVzc2FnZVJlc29sdmVyLFxuICAgICAgICAgICAgbWVzc2FnZUNvbXBpbGVyOiBvcHRpb25zLm1lc3NhZ2VDb21waWxlcixcbiAgICAgICAgICAgIF9fbWV0YTogeyBmcmFtZXdvcms6ICd2dWUnIH1cbiAgICAgICAgfTtcbiAgICAgICAge1xuICAgICAgICAgICAgY3R4T3B0aW9ucy5kYXRldGltZUZvcm1hdHMgPSBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xuICAgICAgICAgICAgY3R4T3B0aW9ucy5udW1iZXJGb3JtYXRzID0gX251bWJlckZvcm1hdHMudmFsdWU7XG4gICAgICAgICAgICBjdHhPcHRpb25zLl9fZGF0ZXRpbWVGb3JtYXR0ZXJzID0gaXNQbGFpbk9iamVjdChfY29udGV4dClcbiAgICAgICAgICAgICAgICA/IF9jb250ZXh0Ll9fZGF0ZXRpbWVGb3JtYXR0ZXJzXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjdHhPcHRpb25zLl9fbnVtYmVyRm9ybWF0dGVycyA9IGlzUGxhaW5PYmplY3QoX2NvbnRleHQpXG4gICAgICAgICAgICAgICAgPyBfY29udGV4dC5fX251bWJlckZvcm1hdHRlcnNcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgICAgICBjdHhPcHRpb25zLl9fdl9lbWl0dGVyID0gaXNQbGFpbk9iamVjdChfY29udGV4dClcbiAgICAgICAgICAgICAgICA/IF9jb250ZXh0Ll9fdl9lbWl0dGVyXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3R4ID0gY3JlYXRlQ29yZUNvbnRleHQoY3R4T3B0aW9ucyk7XG4gICAgICAgIF9pc0dsb2JhbCAmJiBzZXRGYWxsYmFja0NvbnRleHQoY3R4KTtcbiAgICAgICAgcmV0dXJuIGN0eDtcbiAgICB9O1xuICAgIF9jb250ZXh0ID0gZ2V0Q29yZUNvbnRleHQoKTtcbiAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlKTtcbiAgICAvLyB0cmFjayByZWFjdGl2aXR5XG4gICAgZnVuY3Rpb24gdHJhY2tSZWFjdGl2aXR5VmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIF9sb2NhbGUudmFsdWUsXG4gICAgICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlLFxuICAgICAgICAgICAgICAgIF9tZXNzYWdlcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlLFxuICAgICAgICAgICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICA7XG4gICAgfVxuICAgIC8vIGxvY2FsZVxuICAgIGNvbnN0IGxvY2FsZSA9IGNvbXB1dGVkKHtcbiAgICAgICAgZ2V0OiAoKSA9PiBfbG9jYWxlLnZhbHVlLFxuICAgICAgICBzZXQ6IHZhbCA9PiB7XG4gICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQubG9jYWxlID0gX2xvY2FsZS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGZhbGxiYWNrTG9jYWxlXG4gICAgY29uc3QgZmFsbGJhY2tMb2NhbGUgPSBjb21wdXRlZCh7XG4gICAgICAgIGdldDogKCkgPT4gX2ZhbGxiYWNrTG9jYWxlLnZhbHVlLFxuICAgICAgICBzZXQ6IHZhbCA9PiB7XG4gICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICBfY29udGV4dC5mYWxsYmFja0xvY2FsZSA9IF9mYWxsYmFja0xvY2FsZS52YWx1ZTtcbiAgICAgICAgICAgIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKF9jb250ZXh0LCBfbG9jYWxlLnZhbHVlLCB2YWwpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gbWVzc2FnZXNcbiAgICBjb25zdCBtZXNzYWdlcyA9IGNvbXB1dGVkKCgpID0+IF9tZXNzYWdlcy52YWx1ZSk7XG4gICAgLy8gZGF0ZXRpbWVGb3JtYXRzXG4gICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzID0gLyogI19fUFVSRV9fKi8gY29tcHV0ZWQoKCkgPT4gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSk7XG4gICAgLy8gbnVtYmVyRm9ybWF0c1xuICAgIGNvbnN0IG51bWJlckZvcm1hdHMgPSAvKiAjX19QVVJFX18qLyBjb21wdXRlZCgoKSA9PiBfbnVtYmVyRm9ybWF0cy52YWx1ZSk7XG4gICAgLy8gZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlclxuICAgIGZ1bmN0aW9uIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoKSB7XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKF9wb3N0VHJhbnNsYXRpb24pID8gX3Bvc3RUcmFuc2xhdGlvbiA6IG51bGw7XG4gICAgfVxuICAgIC8vIHNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXJcbiAgICBmdW5jdGlvbiBzZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKGhhbmRsZXIpIHtcbiAgICAgICAgX3Bvc3RUcmFuc2xhdGlvbiA9IGhhbmRsZXI7XG4gICAgICAgIF9jb250ZXh0LnBvc3RUcmFuc2xhdGlvbiA9IGhhbmRsZXI7XG4gICAgfVxuICAgIC8vIGdldE1pc3NpbmdIYW5kbGVyXG4gICAgZnVuY3Rpb24gZ2V0TWlzc2luZ0hhbmRsZXIoKSB7XG4gICAgICAgIHJldHVybiBfbWlzc2luZztcbiAgICB9XG4gICAgLy8gc2V0TWlzc2luZ0hhbmRsZXJcbiAgICBmdW5jdGlvbiBzZXRNaXNzaW5nSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIGlmIChoYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBfcnVudGltZU1pc3NpbmcgPSBkZWZpbmVDb3JlTWlzc2luZ0hhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgX21pc3NpbmcgPSBoYW5kbGVyO1xuICAgICAgICBfY29udGV4dC5taXNzaW5nID0gX3J1bnRpbWVNaXNzaW5nO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1Jlc29sdmVkVHJhbnNsYXRlTWVzc2FnZSh0eXBlLCBhcmcgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgKSB7XG4gICAgICAgIHJldHVybiB0eXBlICE9PSAndHJhbnNsYXRlJyB8fCAhYXJnLnJlc29sdmVkTWVzc2FnZTtcbiAgICB9XG4gICAgY29uc3Qgd3JhcFdpdGhEZXBzID0gKGZuLCBhcmd1bWVudFBhcnNlciwgd2FyblR5cGUsIGZhbGxiYWNrU3VjY2VzcywgZmFsbGJhY2tGYWlsLCBzdWNjZXNzQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRyYWNrUmVhY3Rpdml0eVZhbHVlcygpOyAvLyB0cmFjayByZWFjdGl2ZSBkZXBlbmRlbmN5XG4gICAgICAgIC8vIE5PVEU6IGV4cGVyaW1lbnRhbCAhIVxuICAgICAgICBsZXQgcmV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICAgICAgICAgICAgc2V0QWRkaXRpb25hbE1ldGEoZ2V0TWV0YUluZm8oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV9pc0dsb2JhbCkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrQ29udGV4dCA9IF9fcm9vdFxuICAgICAgICAgICAgICAgICAgICA/IGdldEZhbGxiYWNrQ29udGV4dCgpXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0ID0gZm4oX2NvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICAgICAgICAgICAgc2V0QWRkaXRpb25hbE1ldGEobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV9pc0dsb2JhbCkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrQ29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKHdhcm5UeXBlICE9PSAndHJhbnNsYXRlIGV4aXN0cycgJiYgLy8gZm9yIG5vdCBgdGVgIChlLmcgYHRgKVxuICAgICAgICAgICAgaXNOdW1iZXIocmV0KSAmJlxuICAgICAgICAgICAgcmV0ID09PSBOT1RfUkVPU0xWRUQpIHx8XG4gICAgICAgICAgICAod2FyblR5cGUgPT09ICd0cmFuc2xhdGUgZXhpc3RzJyAmJiAhcmV0KSAvLyBmb3IgYHRlYFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IFtrZXksIGFyZzJdID0gYXJndW1lbnRQYXJzZXIoKTtcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgICAgICAgICBfX3Jvb3QgJiZcbiAgICAgICAgICAgICAgICBpc1N0cmluZyhrZXkpICYmXG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZFRyYW5zbGF0ZU1lc3NhZ2Uod2FyblR5cGUsIGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9mYWxsYmFja1Jvb3QgJiZcbiAgICAgICAgICAgICAgICAgICAgKGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKF9mYWxsYmFja1dhcm4sIGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4oX21pc3NpbmdXYXJuLCBrZXkpKSkge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuRkFMTEJBQ0tfVE9fUk9PVCwge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogd2FyblR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgICAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IF9fdl9lbWl0dGVyOiBlbWl0dGVyIH0gPSBfY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVtaXR0ZXIgJiYgX2ZhbGxiYWNrUm9vdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwiZmFsbGJhY2tcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLkZBTEJBQ0sgKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB3YXJuVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICdnbG9iYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3dhcm5UeXBlfToke2tleX1gXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfX3Jvb3QgJiYgX2ZhbGxiYWNrUm9vdFxuICAgICAgICAgICAgICAgID8gZmFsbGJhY2tTdWNjZXNzKF9fcm9vdClcbiAgICAgICAgICAgICAgICA6IGZhbGxiYWNrRmFpbChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN1Y2Nlc3NDb25kaXRpb24ocmV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9SRVRVUk5fVFlQRSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIHRcbiAgICBmdW5jdGlvbiB0KC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkodHJhbnNsYXRlLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyksICd0cmFuc2xhdGUnLCByb290ID0+IFJlZmxlY3QuYXBwbHkocm9vdC50LCByb290LCBbLi4uYXJnc10pLCBrZXkgPT4ga2V5LCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XG4gICAgfVxuICAgIC8vIHJ0XG4gICAgZnVuY3Rpb24gcnQoLi4uYXJncykge1xuICAgICAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnM10gPSBhcmdzO1xuICAgICAgICBpZiAoYXJnMyAmJiAhaXNPYmplY3QoYXJnMykpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdCguLi5bYXJnMSwgYXJnMiwgYXNzaWduKHsgcmVzb2x2ZWRNZXNzYWdlOiB0cnVlIH0sIGFyZzMgfHwge30pXSk7XG4gICAgfVxuICAgIC8vIGRcbiAgICBmdW5jdGlvbiBkKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkoZGF0ZXRpbWUsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlRGF0ZVRpbWVBcmdzKC4uLmFyZ3MpLCAnZGF0ZXRpbWUgZm9ybWF0Jywgcm9vdCA9PiBSZWZsZWN0LmFwcGx5KHJvb3QuZCwgcm9vdCwgWy4uLmFyZ3NdKSwgKCkgPT4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFLCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XG4gICAgfVxuICAgIC8vIG5cbiAgICBmdW5jdGlvbiBuKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkobnVtYmVyLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZU51bWJlckFyZ3MoLi4uYXJncyksICdudW1iZXIgZm9ybWF0Jywgcm9vdCA9PiBSZWZsZWN0LmFwcGx5KHJvb3Qubiwgcm9vdCwgWy4uLmFyZ3NdKSwgKCkgPT4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFLCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XG4gICAgfVxuICAgIC8vIGZvciBjdXN0b20gcHJvY2Vzc29yXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcCh2YWwgPT4gaXNTdHJpbmcodmFsKSB8fCBpc051bWJlcih2YWwpIHx8IGlzQm9vbGVhbih2YWwpXG4gICAgICAgICAgICA/IGNyZWF0ZVRleHROb2RlKFN0cmluZyh2YWwpKVxuICAgICAgICAgICAgOiB2YWwpO1xuICAgIH1cbiAgICBjb25zdCBpbnRlcnBvbGF0ZSA9ICh2YWwpID0+IHZhbDtcbiAgICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgICAgIG5vcm1hbGl6ZSxcbiAgICAgICAgaW50ZXJwb2xhdGUsXG4gICAgICAgIHR5cGU6ICd2bm9kZSdcbiAgICB9O1xuICAgIC8vIHRyYW5zbGF0ZVZOb2RlLCB1c2luZyBmb3IgYGkxOG4tdGAgY29tcG9uZW50XG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlVk5vZGUoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gd3JhcFdpdGhEZXBzKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgbGV0IHJldDtcbiAgICAgICAgICAgIGNvbnN0IF9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQucHJvY2Vzc29yID0gcHJvY2Vzc29yO1xuICAgICAgICAgICAgICAgIHJldCA9IFJlZmxlY3QuYXBwbHkodHJhbnNsYXRlLCBudWxsLCBbX2NvbnRleHQsIC4uLmFyZ3NdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LnByb2Nlc3NvciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9LCAoKSA9PiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyksICd0cmFuc2xhdGUnLCBcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgcm9vdCA9PiByb290W1RyYW5zbGF0ZVZOb2RlU3ltYm9sXSguLi5hcmdzKSwga2V5ID0+IFtjcmVhdGVUZXh0Tm9kZShrZXkpXSwgdmFsID0+IGlzQXJyYXkodmFsKSk7XG4gICAgfVxuICAgIC8vIG51bWJlclBhcnRzLCB1c2luZyBmb3IgYGkxOG4tbmAgY29tcG9uZW50XG4gICAgZnVuY3Rpb24gbnVtYmVyUGFydHMoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gd3JhcFdpdGhEZXBzKGNvbnRleHQgPT4gUmVmbGVjdC5hcHBseShudW1iZXIsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlTnVtYmVyQXJncyguLi5hcmdzKSwgJ251bWJlciBmb3JtYXQnLCBcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgcm9vdCA9PiByb290W051bWJlclBhcnRzU3ltYm9sXSguLi5hcmdzKSwgTk9PUF9SRVRVUk5fQVJSQVksIHZhbCA9PiBpc1N0cmluZyh2YWwpIHx8IGlzQXJyYXkodmFsKSk7XG4gICAgfVxuICAgIC8vIGRhdGV0aW1lUGFydHMsIHVzaW5nIGZvciBgaTE4bi1kYCBjb21wb25lbnRcbiAgICBmdW5jdGlvbiBkYXRldGltZVBhcnRzKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkoZGF0ZXRpbWUsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlRGF0ZVRpbWVBcmdzKC4uLmFyZ3MpLCAnZGF0ZXRpbWUgZm9ybWF0JywgXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHJvb3QgPT4gcm9vdFtEYXRldGltZVBhcnRzU3ltYm9sXSguLi5hcmdzKSwgTk9PUF9SRVRVUk5fQVJSQVksIHZhbCA9PiBpc1N0cmluZyh2YWwpIHx8IGlzQXJyYXkodmFsKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFBsdXJhbFJ1bGVzKHJ1bGVzKSB7XG4gICAgICAgIF9wbHVyYWxSdWxlcyA9IHJ1bGVzO1xuICAgICAgICBfY29udGV4dC5wbHVyYWxSdWxlcyA9IF9wbHVyYWxSdWxlcztcbiAgICB9XG4gICAgLy8gdGVcbiAgICBmdW5jdGlvbiB0ZShrZXksIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gd3JhcFdpdGhEZXBzKCgpID0+IHtcbiAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0TG9jYWxlID0gaXNTdHJpbmcobG9jYWxlKSA/IGxvY2FsZSA6IF9sb2NhbGUudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZ2V0TG9jYWxlTWVzc2FnZSh0YXJnZXRMb2NhbGUpO1xuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBfY29udGV4dC5tZXNzYWdlUmVzb2x2ZXIobWVzc2FnZSwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiAhdHJhbnNsYXRlRXhpc3RDb21wYXRpYmxlXG4gICAgICAgICAgICAgICAgPyBpc01lc3NhZ2VBU1QocmVzb2x2ZWQpIHx8XG4gICAgICAgICAgICAgICAgICAgIGlzTWVzc2FnZUZ1bmN0aW9uKHJlc29sdmVkKSB8fFxuICAgICAgICAgICAgICAgICAgICBpc1N0cmluZyhyZXNvbHZlZClcbiAgICAgICAgICAgICAgICA6IHJlc29sdmVkICE9IG51bGw7XG4gICAgICAgIH0sICgpID0+IFtrZXldLCAndHJhbnNsYXRlIGV4aXN0cycsIHJvb3QgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkocm9vdC50ZSwgcm9vdCwgW2tleSwgbG9jYWxlXSk7XG4gICAgICAgIH0sIE5PT1BfUkVUVVJOX0ZBTFNFLCB2YWwgPT4gaXNCb29sZWFuKHZhbCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNvbHZlTWVzc2FnZXMoa2V5KSB7XG4gICAgICAgIGxldCBtZXNzYWdlcyA9IG51bGw7XG4gICAgICAgIGNvbnN0IGxvY2FsZXMgPSBmYWxsYmFja1dpdGhMb2NhbGVDaGFpbihfY29udGV4dCwgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlLCBfbG9jYWxlLnZhbHVlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRMb2NhbGVNZXNzYWdlcyA9IF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVzW2ldXSB8fCB7fTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VWYWx1ZSA9IF9jb250ZXh0Lm1lc3NhZ2VSZXNvbHZlcih0YXJnZXRMb2NhbGVNZXNzYWdlcywga2V5KTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZVZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICB9XG4gICAgLy8gdG1cbiAgICBmdW5jdGlvbiB0bShrZXkpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZXMgPSByZXNvbHZlTWVzc2FnZXMoa2V5KTtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIHJldHVybiBtZXNzYWdlcyAhPSBudWxsXG4gICAgICAgICAgICA/IG1lc3NhZ2VzXG4gICAgICAgICAgICA6IF9fcm9vdFxuICAgICAgICAgICAgICAgID8gX19yb290LnRtKGtleSkgfHwge31cbiAgICAgICAgICAgICAgICA6IHt9O1xuICAgIH1cbiAgICAvLyBnZXRMb2NhbGVNZXNzYWdlXG4gICAgZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZShsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIChfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSB8fCB7fSk7XG4gICAgfVxuICAgIC8vIHNldExvY2FsZU1lc3NhZ2VcbiAgICBmdW5jdGlvbiBzZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoZmxhdEpzb24pIHtcbiAgICAgICAgICAgIGNvbnN0IF9tZXNzYWdlID0geyBbbG9jYWxlXTogbWVzc2FnZSB9O1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duKF9tZXNzYWdlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUZsYXRKc29uKF9tZXNzYWdlW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lc3NhZ2UgPSBfbWVzc2FnZVtsb2NhbGVdO1xuICAgICAgICB9XG4gICAgICAgIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdID0gbWVzc2FnZTtcbiAgICAgICAgX2NvbnRleHQubWVzc2FnZXMgPSBfbWVzc2FnZXMudmFsdWU7XG4gICAgfVxuICAgIC8vIG1lcmdlTG9jYWxlTWVzc2FnZVxuICAgIGZ1bmN0aW9uIG1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gPSBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSB8fCB7fTtcbiAgICAgICAgY29uc3QgX21lc3NhZ2UgPSB7IFtsb2NhbGVdOiBtZXNzYWdlIH07XG4gICAgICAgIGlmIChmbGF0SnNvbikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duKF9tZXNzYWdlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUZsYXRKc29uKF9tZXNzYWdlW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlID0gX21lc3NhZ2VbbG9jYWxlXTtcbiAgICAgICAgZGVlcENvcHkobWVzc2FnZSwgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0pO1xuICAgICAgICBfY29udGV4dC5tZXNzYWdlcyA9IF9tZXNzYWdlcy52YWx1ZTtcbiAgICB9XG4gICAgLy8gZ2V0RGF0ZVRpbWVGb3JtYXRcbiAgICBmdW5jdGlvbiBnZXREYXRlVGltZUZvcm1hdChsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSB8fCB7fTtcbiAgICB9XG4gICAgLy8gc2V0RGF0ZVRpbWVGb3JtYXRcbiAgICBmdW5jdGlvbiBzZXREYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XG4gICAgICAgIF9jb250ZXh0LmRhdGV0aW1lRm9ybWF0cyA9IF9kYXRldGltZUZvcm1hdHMudmFsdWU7XG4gICAgICAgIGNsZWFyRGF0ZVRpbWVGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcbiAgICB9XG4gICAgLy8gbWVyZ2VEYXRlVGltZUZvcm1hdFxuICAgIGZ1bmN0aW9uIG1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gYXNzaWduKF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSB8fCB7fSwgZm9ybWF0KTtcbiAgICAgICAgX2NvbnRleHQuZGF0ZXRpbWVGb3JtYXRzID0gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgY2xlYXJEYXRlVGltZUZvcm1hdChfY29udGV4dCwgbG9jYWxlLCBmb3JtYXQpO1xuICAgIH1cbiAgICAvLyBnZXROdW1iZXJGb3JtYXRcbiAgICBmdW5jdGlvbiBnZXROdW1iZXJGb3JtYXQobG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdIHx8IHt9O1xuICAgIH1cbiAgICAvLyBzZXROdW1iZXJGb3JtYXRcbiAgICBmdW5jdGlvbiBzZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgX251bWJlckZvcm1hdHMudmFsdWVbbG9jYWxlXSA9IGZvcm1hdDtcbiAgICAgICAgX2NvbnRleHQubnVtYmVyRm9ybWF0cyA9IF9udW1iZXJGb3JtYXRzLnZhbHVlO1xuICAgICAgICBjbGVhck51bWJlckZvcm1hdChfY29udGV4dCwgbG9jYWxlLCBmb3JtYXQpO1xuICAgIH1cbiAgICAvLyBtZXJnZU51bWJlckZvcm1hdFxuICAgIGZ1bmN0aW9uIG1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBhc3NpZ24oX251bWJlckZvcm1hdHMudmFsdWVbbG9jYWxlXSB8fCB7fSwgZm9ybWF0KTtcbiAgICAgICAgX2NvbnRleHQubnVtYmVyRm9ybWF0cyA9IF9udW1iZXJGb3JtYXRzLnZhbHVlO1xuICAgICAgICBjbGVhck51bWJlckZvcm1hdChfY29udGV4dCwgbG9jYWxlLCBmb3JtYXQpO1xuICAgIH1cbiAgICAvLyBmb3IgZGVidWdcbiAgICBjb21wb3NlcklEKys7XG4gICAgLy8gd2F0Y2ggcm9vdCBsb2NhbGUgJiBmYWxsYmFja0xvY2FsZVxuICAgIGlmIChfX3Jvb3QgJiYgaW5Ccm93c2VyKSB7XG4gICAgICAgIHdhdGNoKF9fcm9vdC5sb2NhbGUsICh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmIChfaW5oZXJpdExvY2FsZSkge1xuICAgICAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQubG9jYWxlID0gdmFsO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKF9jb250ZXh0LCBfbG9jYWxlLnZhbHVlLCBfZmFsbGJhY2tMb2NhbGUudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2F0Y2goX19yb290LmZhbGxiYWNrTG9jYWxlLCAodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAoX2luaGVyaXRMb2NhbGUpIHtcbiAgICAgICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tMb2NhbGUgPSB2YWw7XG4gICAgICAgICAgICAgICAgdXBkYXRlRmFsbGJhY2tMb2NhbGUoX2NvbnRleHQsIF9sb2NhbGUudmFsdWUsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBkZWZpbmUgYmFzaWMgY29tcG9zaXRpb24gQVBJIVxuICAgIGNvbnN0IGNvbXBvc2VyID0ge1xuICAgICAgICBpZDogY29tcG9zZXJJRCxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBmYWxsYmFja0xvY2FsZSxcbiAgICAgICAgZ2V0IGluaGVyaXRMb2NhbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2luaGVyaXRMb2NhbGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBpbmhlcml0TG9jYWxlKHZhbCkge1xuICAgICAgICAgICAgX2luaGVyaXRMb2NhbGUgPSB2YWw7XG4gICAgICAgICAgICBpZiAodmFsICYmIF9fcm9vdCkge1xuICAgICAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSBfX3Jvb3QubG9jYWxlLnZhbHVlO1xuICAgICAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSA9IF9fcm9vdC5mYWxsYmFja0xvY2FsZS52YWx1ZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGF2YWlsYWJsZUxvY2FsZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoX21lc3NhZ2VzLnZhbHVlKS5zb3J0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBnZXQgbW9kaWZpZXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9tb2RpZmllcnM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBwbHVyYWxSdWxlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBfcGx1cmFsUnVsZXMgfHwge307XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBpc0dsb2JhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfaXNHbG9iYWw7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBtaXNzaW5nV2FybigpIHtcbiAgICAgICAgICAgIHJldHVybiBfbWlzc2luZ1dhcm47XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBtaXNzaW5nV2Fybih2YWwpIHtcbiAgICAgICAgICAgIF9taXNzaW5nV2FybiA9IHZhbDtcbiAgICAgICAgICAgIF9jb250ZXh0Lm1pc3NpbmdXYXJuID0gX21pc3NpbmdXYXJuO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgZmFsbGJhY2tXYXJuKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9mYWxsYmFja1dhcm47XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBmYWxsYmFja1dhcm4odmFsKSB7XG4gICAgICAgICAgICBfZmFsbGJhY2tXYXJuID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tXYXJuID0gX2ZhbGxiYWNrV2FybjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGZhbGxiYWNrUm9vdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfZmFsbGJhY2tSb290O1xuICAgICAgICB9LFxuICAgICAgICBzZXQgZmFsbGJhY2tSb290KHZhbCkge1xuICAgICAgICAgICAgX2ZhbGxiYWNrUm9vdCA9IHZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGZhbGxiYWNrRm9ybWF0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9mYWxsYmFja0Zvcm1hdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGZhbGxiYWNrRm9ybWF0KHZhbCkge1xuICAgICAgICAgICAgX2ZhbGxiYWNrRm9ybWF0ID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tGb3JtYXQgPSBfZmFsbGJhY2tGb3JtYXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCB3YXJuSHRtbE1lc3NhZ2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3dhcm5IdG1sTWVzc2FnZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IHdhcm5IdG1sTWVzc2FnZSh2YWwpIHtcbiAgICAgICAgICAgIF93YXJuSHRtbE1lc3NhZ2UgPSB2YWw7XG4gICAgICAgICAgICBfY29udGV4dC53YXJuSHRtbE1lc3NhZ2UgPSB2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBlc2NhcGVQYXJhbWV0ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2VzY2FwZVBhcmFtZXRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGVzY2FwZVBhcmFtZXRlcih2YWwpIHtcbiAgICAgICAgICAgIF9lc2NhcGVQYXJhbWV0ZXIgPSB2YWw7XG4gICAgICAgICAgICBfY29udGV4dC5lc2NhcGVQYXJhbWV0ZXIgPSB2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIHQsXG4gICAgICAgIGdldExvY2FsZU1lc3NhZ2UsXG4gICAgICAgIHNldExvY2FsZU1lc3NhZ2UsXG4gICAgICAgIG1lcmdlTG9jYWxlTWVzc2FnZSxcbiAgICAgICAgZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcixcbiAgICAgICAgc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcixcbiAgICAgICAgZ2V0TWlzc2luZ0hhbmRsZXIsXG4gICAgICAgIHNldE1pc3NpbmdIYW5kbGVyLFxuICAgICAgICBbU2V0UGx1cmFsUnVsZXNTeW1ib2xdOiBzZXRQbHVyYWxSdWxlc1xuICAgIH07XG4gICAge1xuICAgICAgICBjb21wb3Nlci5kYXRldGltZUZvcm1hdHMgPSBkYXRldGltZUZvcm1hdHM7XG4gICAgICAgIGNvbXBvc2VyLm51bWJlckZvcm1hdHMgPSBudW1iZXJGb3JtYXRzO1xuICAgICAgICBjb21wb3Nlci5ydCA9IHJ0O1xuICAgICAgICBjb21wb3Nlci50ZSA9IHRlO1xuICAgICAgICBjb21wb3Nlci50bSA9IHRtO1xuICAgICAgICBjb21wb3Nlci5kID0gZDtcbiAgICAgICAgY29tcG9zZXIubiA9IG47XG4gICAgICAgIGNvbXBvc2VyLmdldERhdGVUaW1lRm9ybWF0ID0gZ2V0RGF0ZVRpbWVGb3JtYXQ7XG4gICAgICAgIGNvbXBvc2VyLnNldERhdGVUaW1lRm9ybWF0ID0gc2V0RGF0ZVRpbWVGb3JtYXQ7XG4gICAgICAgIGNvbXBvc2VyLm1lcmdlRGF0ZVRpbWVGb3JtYXQgPSBtZXJnZURhdGVUaW1lRm9ybWF0O1xuICAgICAgICBjb21wb3Nlci5nZXROdW1iZXJGb3JtYXQgPSBnZXROdW1iZXJGb3JtYXQ7XG4gICAgICAgIGNvbXBvc2VyLnNldE51bWJlckZvcm1hdCA9IHNldE51bWJlckZvcm1hdDtcbiAgICAgICAgY29tcG9zZXIubWVyZ2VOdW1iZXJGb3JtYXQgPSBtZXJnZU51bWJlckZvcm1hdDtcbiAgICAgICAgY29tcG9zZXJbSW5lamN0V2l0aE9wdGlvblN5bWJvbF0gPSBfX2luamVjdFdpdGhPcHRpb247XG4gICAgICAgIGNvbXBvc2VyW1RyYW5zbGF0ZVZOb2RlU3ltYm9sXSA9IHRyYW5zbGF0ZVZOb2RlO1xuICAgICAgICBjb21wb3NlcltEYXRldGltZVBhcnRzU3ltYm9sXSA9IGRhdGV0aW1lUGFydHM7XG4gICAgICAgIGNvbXBvc2VyW051bWJlclBhcnRzU3ltYm9sXSA9IG51bWJlclBhcnRzO1xuICAgIH1cbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICBjb21wb3NlcltFbmFibGVFbWl0dGVyXSA9IChlbWl0dGVyKSA9PiB7XG4gICAgICAgICAgICBfY29udGV4dC5fX3ZfZW1pdHRlciA9IGVtaXR0ZXI7XG4gICAgICAgIH07XG4gICAgICAgIGNvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSA9ICgpID0+IHtcbiAgICAgICAgICAgIF9jb250ZXh0Ll9fdl9lbWl0dGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9zZXI7XG59XG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyoqXG4gKiBDb252ZXJ0IHRvIEkxOG4gQ29tcG9zZXIgT3B0aW9ucyBmcm9tIFZ1ZUkxOG4gT3B0aW9uc1xuICpcbiAqIEBpbnRlcm5hbFxuICovXG5mdW5jdGlvbiBjb252ZXJ0Q29tcG9zZXJPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBsb2NhbGUgPSBpc1N0cmluZyhvcHRpb25zLmxvY2FsZSkgPyBvcHRpb25zLmxvY2FsZSA6IERFRkFVTFRfTE9DQUxFO1xuICAgIGNvbnN0IGZhbGxiYWNrTG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxuICAgICAgICA6IGxvY2FsZTtcbiAgICBjb25zdCBtaXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuc2lsZW50VHJhbnNsYXRpb25XYXJuKSB8fFxuICAgICAgICBpc1JlZ0V4cChvcHRpb25zLnNpbGVudFRyYW5zbGF0aW9uV2FybilcbiAgICAgICAgPyAhb3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm5cbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLnNpbGVudEZhbGxiYWNrV2FybikgfHxcbiAgICAgICAgaXNSZWdFeHAob3B0aW9ucy5zaWxlbnRGYWxsYmFja1dhcm4pXG4gICAgICAgID8gIW9wdGlvbnMuc2lsZW50RmFsbGJhY2tXYXJuXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBmYWxsYmFja1Jvb3QgPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1Jvb3QpXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1Jvb3RcbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGZhbGxiYWNrRm9ybWF0ID0gISFvcHRpb25zLmZvcm1hdEZhbGxiYWNrTWVzc2FnZXM7XG4gICAgY29uc3QgbW9kaWZpZXJzID0gaXNQbGFpbk9iamVjdChvcHRpb25zLm1vZGlmaWVycykgPyBvcHRpb25zLm1vZGlmaWVycyA6IHt9O1xuICAgIGNvbnN0IHBsdXJhbGl6YXRpb25SdWxlcyA9IG9wdGlvbnMucGx1cmFsaXphdGlvblJ1bGVzO1xuICAgIGNvbnN0IHBvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXG4gICAgICAgID8gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb25cbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgd2Fybkh0bWxNZXNzYWdlID0gaXNTdHJpbmcob3B0aW9ucy53YXJuSHRtbEluTWVzc2FnZSlcbiAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sSW5NZXNzYWdlICE9PSAnb2ZmJ1xuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgZXNjYXBlUGFyYW1ldGVyID0gISFvcHRpb25zLmVzY2FwZVBhcmFtZXRlckh0bWw7XG4gICAgY29uc3QgaW5oZXJpdExvY2FsZSA9IGlzQm9vbGVhbihvcHRpb25zLnN5bmMpID8gb3B0aW9ucy5zeW5jIDogdHJ1ZTtcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIG9wdGlvbnMuZm9ybWF0dGVyKSB7XG4gICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX0ZPUk1BVFRFUikpO1xuICAgIH1cbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIG9wdGlvbnMucHJlc2VydmVEaXJlY3RpdmVDb250ZW50KSB7XG4gICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRSkpO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZXMgPSBvcHRpb25zLm1lc3NhZ2VzO1xuICAgIGlmIChpc1BsYWluT2JqZWN0KG9wdGlvbnMuc2hhcmVkTWVzc2FnZXMpKSB7XG4gICAgICAgIGNvbnN0IHNoYXJlZE1lc3NhZ2VzID0gb3B0aW9ucy5zaGFyZWRNZXNzYWdlcztcbiAgICAgICAgY29uc3QgbG9jYWxlcyA9IE9iamVjdC5rZXlzKHNoYXJlZE1lc3NhZ2VzKTtcbiAgICAgICAgbWVzc2FnZXMgPSBsb2NhbGVzLnJlZHVjZSgobWVzc2FnZXMsIGxvY2FsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VzW2xvY2FsZV0gfHwgKG1lc3NhZ2VzW2xvY2FsZV0gPSB7fSk7XG4gICAgICAgICAgICBhc3NpZ24obWVzc2FnZSwgc2hhcmVkTWVzc2FnZXNbbG9jYWxlXSk7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAgIH0sIChtZXNzYWdlcyB8fCB7fSkpO1xuICAgIH1cbiAgICBjb25zdCB7IF9faTE4biwgX19yb290LCBfX2luamVjdFdpdGhPcHRpb24gfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzID0gb3B0aW9ucy5kYXRldGltZUZvcm1hdHM7XG4gICAgY29uc3QgbnVtYmVyRm9ybWF0cyA9IG9wdGlvbnMubnVtYmVyRm9ybWF0cztcbiAgICBjb25zdCBmbGF0SnNvbiA9IG9wdGlvbnMuZmxhdEpzb247XG4gICAgY29uc3QgdHJhbnNsYXRlRXhpc3RDb21wYXRpYmxlID0gb3B0aW9uc1xuICAgICAgICAudHJhbnNsYXRlRXhpc3RDb21wYXRpYmxlO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBmbGF0SnNvbixcbiAgICAgICAgZGF0ZXRpbWVGb3JtYXRzLFxuICAgICAgICBudW1iZXJGb3JtYXRzLFxuICAgICAgICBtaXNzaW5nLFxuICAgICAgICBtaXNzaW5nV2FybixcbiAgICAgICAgZmFsbGJhY2tXYXJuLFxuICAgICAgICBmYWxsYmFja1Jvb3QsXG4gICAgICAgIGZhbGxiYWNrRm9ybWF0LFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIHBsdXJhbFJ1bGVzOiBwbHVyYWxpemF0aW9uUnVsZXMsXG4gICAgICAgIHBvc3RUcmFuc2xhdGlvbixcbiAgICAgICAgd2Fybkh0bWxNZXNzYWdlLFxuICAgICAgICBlc2NhcGVQYXJhbWV0ZXIsXG4gICAgICAgIG1lc3NhZ2VSZXNvbHZlcjogb3B0aW9ucy5tZXNzYWdlUmVzb2x2ZXIsXG4gICAgICAgIGluaGVyaXRMb2NhbGUsXG4gICAgICAgIHRyYW5zbGF0ZUV4aXN0Q29tcGF0aWJsZSxcbiAgICAgICAgX19pMThuLFxuICAgICAgICBfX3Jvb3QsXG4gICAgICAgIF9faW5qZWN0V2l0aE9wdGlvblxuICAgIH07XG59XG4vKipcbiAqIGNyZWF0ZSBWdWVJMThuIGludGVyZmFjZSBmYWN0b3J5XG4gKlxuICogQGludGVybmFsXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiBjcmVhdGVWdWVJMThuKG9wdGlvbnMgPSB7fSwgVnVlSTE4bkxlZ2FjeSkge1xuICAgIHtcbiAgICAgICAgY29uc3QgY29tcG9zZXIgPSBjcmVhdGVDb21wb3Nlcihjb252ZXJ0Q29tcG9zZXJPcHRpb25zKG9wdGlvbnMpKTtcbiAgICAgICAgY29uc3QgeyBfX2V4dGVuZGVyIH0gPSBvcHRpb25zO1xuICAgICAgICAvLyBkZWZpbmVzIFZ1ZUkxOG5cbiAgICAgICAgY29uc3QgdnVlSTE4biA9IHtcbiAgICAgICAgICAgIC8vIGlkXG4gICAgICAgICAgICBpZDogY29tcG9zZXIuaWQsXG4gICAgICAgICAgICAvLyBsb2NhbGVcbiAgICAgICAgICAgIGdldCBsb2NhbGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmxvY2FsZS52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgbG9jYWxlKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmxvY2FsZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBmYWxsYmFja0xvY2FsZVxuICAgICAgICAgICAgZ2V0IGZhbGxiYWNrTG9jYWxlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgZmFsbGJhY2tMb2NhbGUodmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbWVzc2FnZXNcbiAgICAgICAgICAgIGdldCBtZXNzYWdlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIubWVzc2FnZXMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZGF0ZXRpbWVGb3JtYXRzXG4gICAgICAgICAgICBnZXQgZGF0ZXRpbWVGb3JtYXRzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5kYXRldGltZUZvcm1hdHMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbnVtYmVyRm9ybWF0c1xuICAgICAgICAgICAgZ2V0IG51bWJlckZvcm1hdHMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLm51bWJlckZvcm1hdHMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gYXZhaWxhYmxlTG9jYWxlc1xuICAgICAgICAgICAgZ2V0IGF2YWlsYWJsZUxvY2FsZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmF2YWlsYWJsZUxvY2FsZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZm9ybWF0dGVyXG4gICAgICAgICAgICBnZXQgZm9ybWF0dGVyKCkge1xuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9GT1JNQVRURVIpKTtcbiAgICAgICAgICAgICAgICAvLyBkdW1teVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgZm9ybWF0dGVyKHZhbCkge1xuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9GT1JNQVRURVIpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtaXNzaW5nXG4gICAgICAgICAgICBnZXQgbWlzc2luZygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZ2V0TWlzc2luZ0hhbmRsZXIoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgbWlzc2luZyhoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2lsZW50VHJhbnNsYXRpb25XYXJuXG4gICAgICAgICAgICBnZXQgc2lsZW50VHJhbnNsYXRpb25XYXJuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0Jvb2xlYW4oY29tcG9zZXIubWlzc2luZ1dhcm4pXG4gICAgICAgICAgICAgICAgICAgID8gIWNvbXBvc2VyLm1pc3NpbmdXYXJuXG4gICAgICAgICAgICAgICAgICAgIDogY29tcG9zZXIubWlzc2luZ1dhcm47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHNpbGVudFRyYW5zbGF0aW9uV2Fybih2YWwpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5taXNzaW5nV2FybiA9IGlzQm9vbGVhbih2YWwpID8gIXZhbCA6IHZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzaWxlbnRGYWxsYmFja1dhcm5cbiAgICAgICAgICAgIGdldCBzaWxlbnRGYWxsYmFja1dhcm4oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzQm9vbGVhbihjb21wb3Nlci5mYWxsYmFja1dhcm4pXG4gICAgICAgICAgICAgICAgICAgID8gIWNvbXBvc2VyLmZhbGxiYWNrV2FyblxuICAgICAgICAgICAgICAgICAgICA6IGNvbXBvc2VyLmZhbGxiYWNrV2FybjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc2lsZW50RmFsbGJhY2tXYXJuKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbih2YWwpID8gIXZhbCA6IHZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtb2RpZmllcnNcbiAgICAgICAgICAgIGdldCBtb2RpZmllcnMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLm1vZGlmaWVycztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBmb3JtYXRGYWxsYmFja01lc3NhZ2VzXG4gICAgICAgICAgICBnZXQgZm9ybWF0RmFsbGJhY2tNZXNzYWdlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZmFsbGJhY2tGb3JtYXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGZvcm1hdEZhbGxiYWNrTWVzc2FnZXModmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tGb3JtYXQgPSB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcG9zdFRyYW5zbGF0aW9uXG4gICAgICAgICAgICBnZXQgcG9zdFRyYW5zbGF0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHBvc3RUcmFuc2xhdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcihoYW5kbGVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzeW5jXG4gICAgICAgICAgICBnZXQgc3luYygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuaW5oZXJpdExvY2FsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc3luYyh2YWwpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5pbmhlcml0TG9jYWxlID0gdmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHdhcm5Jbkh0bWxNZXNzYWdlXG4gICAgICAgICAgICBnZXQgd2Fybkh0bWxJbk1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLndhcm5IdG1sTWVzc2FnZSA/ICd3YXJuJyA6ICdvZmYnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCB3YXJuSHRtbEluTWVzc2FnZSh2YWwpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci53YXJuSHRtbE1lc3NhZ2UgPSB2YWwgIT09ICdvZmYnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGVzY2FwZVBhcmFtZXRlckh0bWxcbiAgICAgICAgICAgIGdldCBlc2NhcGVQYXJhbWV0ZXJIdG1sKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5lc2NhcGVQYXJhbWV0ZXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGVzY2FwZVBhcmFtZXRlckh0bWwodmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHByZXNlcnZlRGlyZWN0aXZlQ29udGVudFxuICAgICAgICAgICAgZ2V0IHByZXNlcnZlRGlyZWN0aXZlQ29udGVudCgpIHtcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfUFJFU0VSVkVfRElSRUNUSVZFKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHByZXNlcnZlRGlyZWN0aXZlQ29udGVudCh2YWwpIHtcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfUFJFU0VSVkVfRElSRUNUSVZFKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcGx1cmFsaXphdGlvblJ1bGVzXG4gICAgICAgICAgICBnZXQgcGx1cmFsaXphdGlvblJ1bGVzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5wbHVyYWxSdWxlcyB8fCB7fTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBmb3IgaW50ZXJuYWxcbiAgICAgICAgICAgIF9fY29tcG9zZXI6IGNvbXBvc2VyLFxuICAgICAgICAgICAgLy8gdFxuICAgICAgICAgICAgdCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzNdID0gYXJncztcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1N0cmluZyhhcmcxKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGFyZzE7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gYXJnMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KGFyZzMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBhcmczO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzMpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVkID0gYXJnMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIGNvbXBvc2VyLnQoa2V5LCAobGlzdCB8fCBuYW1lZCB8fCB7fSkgYXMgYW55LCBvcHRpb25zKVxuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgKGxpc3QgfHwgbmFtZWQgfHwge30pLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnQoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnJ0LCBjb21wb3NlciwgWy4uLmFyZ3NdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyB0Y1xuICAgICAgICAgICAgdGMoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczXSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgcGx1cmFsOiAxIH07XG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1N0cmluZyhhcmcxKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGFyZzE7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gYXJnMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNOdW1iZXIoYXJnMikpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBhcmcyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0FycmF5KGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBhcmcyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVkID0gYXJnMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKGFyZzMpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gYXJnMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShhcmczKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBjb21wb3Nlci50KGtleSwgKGxpc3QgfHwgbmFtZWQgfHwge30pIGFzIGFueSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci50LCBjb21wb3NlciwgW1xuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIChsaXN0IHx8IG5hbWVkIHx8IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHRlXG4gICAgICAgICAgICB0ZShrZXksIGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci50ZShrZXksIGxvY2FsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gdG1cbiAgICAgICAgICAgIHRtKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci50bShrZXkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGdldExvY2FsZU1lc3NhZ2VcbiAgICAgICAgICAgIGdldExvY2FsZU1lc3NhZ2UobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldExvY2FsZU1lc3NhZ2UobG9jYWxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXRMb2NhbGVNZXNzYWdlXG4gICAgICAgICAgICBzZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldExvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtZXJnZUxvY2FsZU1lc3NhZ2VcbiAgICAgICAgICAgIG1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5tZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBkXG4gICAgICAgICAgICBkKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci5kLCBjb21wb3NlciwgWy4uLmFyZ3NdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBnZXREYXRlVGltZUZvcm1hdFxuICAgICAgICAgICAgZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0RGF0ZVRpbWVGb3JtYXRcbiAgICAgICAgICAgIHNldERhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG1lcmdlRGF0ZVRpbWVGb3JtYXRcbiAgICAgICAgICAgIG1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBuXG4gICAgICAgICAgICBuKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci5uLCBjb21wb3NlciwgWy4uLmFyZ3NdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBnZXROdW1iZXJGb3JtYXRcbiAgICAgICAgICAgIGdldE51bWJlckZvcm1hdChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0TnVtYmVyRm9ybWF0XG4gICAgICAgICAgICBzZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5zZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG1lcmdlTnVtYmVyRm9ybWF0XG4gICAgICAgICAgICBtZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLm1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBnZXRDaG9pY2VJbmRleFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICAgICAgZ2V0Q2hvaWNlSW5kZXgoY2hvaWNlLCBjaG9pY2VzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX0dFVF9DSE9JQ0VfSU5ERVgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZ1ZUkxOG4uX19leHRlbmRlciA9IF9fZXh0ZW5kZXI7XG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICAgICAgdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIgPSAoZW1pdHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9fY29tcG9zZXIgPSBjb21wb3NlcjtcbiAgICAgICAgICAgICAgICBfX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdICYmIF9fY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0oZW1pdHRlcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdnVlSTE4bi5fX2Rpc2FibGVFbWl0dGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9fY29tcG9zZXIgPSBjb21wb3NlcjtcbiAgICAgICAgICAgICAgICBfX2NvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSAmJiBfX2NvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdnVlSTE4bjtcbiAgICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuY29uc3QgYmFzZUZvcm1hdFByb3BzID0ge1xuICAgIHRhZzoge1xuICAgICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdXG4gICAgfSxcbiAgICBsb2NhbGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICBzY29wZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIC8vIE5PVEU6IGF2b2lkIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvcnVzaHN0YWNrL2lzc3Vlcy8xMDUwXG4gICAgICAgIHZhbGlkYXRvcjogKHZhbCAvKiBDb21wb25lbnRJMThuU2NvcGUgKi8pID0+IHZhbCA9PT0gJ3BhcmVudCcgfHwgdmFsID09PSAnZ2xvYmFsJyxcbiAgICAgICAgZGVmYXVsdDogJ3BhcmVudCcgLyogQ29tcG9uZW50STE4blNjb3BlICovXG4gICAgfSxcbiAgICBpMThuOiB7XG4gICAgICAgIHR5cGU6IE9iamVjdFxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGdldEludGVycG9sYXRlQXJnKFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbnsgc2xvdHMgfSwgLy8gU2V0dXBDb250ZXh0LFxua2V5cykge1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgLy8gZGVmYXVsdCBzbG90IHdpdGggbGlzdFxuICAgICAgICBjb25zdCByZXQgPSBzbG90cy5kZWZhdWx0ID8gc2xvdHMuZGVmYXVsdCgpIDogW107XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHJldHVybiByZXQucmVkdWNlKChzbG90LCBjdXJyZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIC4uLnNsb3QsXG4gICAgICAgICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgLi4uKGN1cnJlbnQudHlwZSA9PT0gRnJhZ21lbnQgPyBjdXJyZW50LmNoaWxkcmVuIDogW2N1cnJlbnRdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIG5hbWVkIHNsb3RzXG4gICAgICAgIHJldHVybiBrZXlzLnJlZHVjZSgoYXJnLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNsb3QgPSBzbG90c1trZXldO1xuICAgICAgICAgICAgaWYgKHNsb3QpIHtcbiAgICAgICAgICAgICAgICBhcmdba2V5XSA9IHNsb3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcmc7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gZ2V0RnJhZ21lbnRhYmxlVGFnKHRhZykge1xuICAgIHJldHVybiBGcmFnbWVudCA7XG59XG5cbmNvbnN0IFRyYW5zbGF0aW9uSW1wbCA9IC8qI19fUFVSRV9fKi8gZGVmaW5lQ29tcG9uZW50KHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgIG5hbWU6ICdpMThuLXQnLFxuICAgIHByb3BzOiBhc3NpZ24oe1xuICAgICAgICBrZXlwYXRoOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBwbHVyYWw6IHtcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgdmFsaWRhdG9yOiAodmFsKSA9PiBpc051bWJlcih2YWwpIHx8ICFpc05hTih2YWwpXG4gICAgICAgIH1cbiAgICB9LCBiYXNlRm9ybWF0UHJvcHMpLFxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHNldHVwKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgc2xvdHMsIGF0dHJzIH0gPSBjb250ZXh0O1xuICAgICAgICAvLyBOT1RFOiBhdm9pZCBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L3J1c2hzdGFjay9pc3N1ZXMvMTA1MFxuICAgICAgICBjb25zdCBpMThuID0gcHJvcHMuaTE4biB8fFxuICAgICAgICAgICAgdXNlSTE4bih7XG4gICAgICAgICAgICAgICAgdXNlU2NvcGU6IHByb3BzLnNjb3BlLFxuICAgICAgICAgICAgICAgIF9fdXNlQ29tcG9uZW50OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzbG90cykuZmlsdGVyKGtleSA9PiBrZXkgIT09ICdfJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgICAgICAgICBpZiAocHJvcHMubG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBwcm9wcy5sb2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvcHMucGx1cmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnBsdXJhbCA9IGlzU3RyaW5nKHByb3BzLnBsdXJhbCkgPyArcHJvcHMucGx1cmFsIDogcHJvcHMucGx1cmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYXJnID0gZ2V0SW50ZXJwb2xhdGVBcmcoY29udGV4dCwga2V5cyk7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBpMThuW1RyYW5zbGF0ZVZOb2RlU3ltYm9sXShwcm9wcy5rZXlwYXRoLCBhcmcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3QgYXNzaWduZWRBdHRycyA9IGFzc2lnbih7fSwgYXR0cnMpO1xuICAgICAgICAgICAgY29uc3QgdGFnID0gaXNTdHJpbmcocHJvcHMudGFnKSB8fCBpc09iamVjdChwcm9wcy50YWcpXG4gICAgICAgICAgICAgICAgPyBwcm9wcy50YWdcbiAgICAgICAgICAgICAgICA6IGdldEZyYWdtZW50YWJsZVRhZygpO1xuICAgICAgICAgICAgcmV0dXJuIGgodGFnLCBhc3NpZ25lZEF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIH07XG4gICAgfVxufSk7XG4vKipcbiAqIGV4cG9ydCB0aGUgcHVibGljIHR5cGUgZm9yIGgvdHN4IGluZmVyZW5jZVxuICogYWxzbyB0byBhdm9pZCBpbmxpbmUgaW1wb3J0KCkgaW4gZ2VuZXJhdGVkIGQudHMgZmlsZXNcbiAqL1xuLyoqXG4gKiBUcmFuc2xhdGlvbiBDb21wb25lbnRcbiAqXG4gKiBAcmVtYXJrc1xuICogU2VlIHRoZSBmb2xsb3dpbmcgaXRlbXMgZm9yIHByb3BlcnR5IGFib3V0IGRldGFpbHNcbiAqXG4gKiBAVnVlSTE4blNlZSBbVHJhbnNsYXRpb25Qcm9wc10oY29tcG9uZW50I3RyYW5zbGF0aW9ucHJvcHMpXG4gKiBAVnVlSTE4blNlZSBbQmFzZUZvcm1hdFByb3BzXShjb21wb25lbnQjYmFzZWZvcm1hdHByb3BzKVxuICogQFZ1ZUkxOG5TZWUgW0NvbXBvbmVudCBJbnRlcnBvbGF0aW9uXSguLi9ndWlkZS9hZHZhbmNlZC9jb21wb25lbnQpXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxkaXYgaWQ9XCJhcHBcIj5cbiAqICAgPCEtLSAuLi4gLS0+XG4gKiAgIDxpMThuIGtleXBhdGg9XCJ0ZXJtXCIgdGFnPVwibGFiZWxcIiBmb3I9XCJ0b3NcIj5cbiAqICAgICA8YSA6aHJlZj1cInVybFwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICR0KCd0b3MnKSB9fTwvYT5cbiAqICAgPC9pMThuPlxuICogICA8IS0tIC4uLiAtLT5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBgYGBqc1xuICogaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSAndnVlJ1xuICogaW1wb3J0IHsgY3JlYXRlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJ1xuICpcbiAqIGNvbnN0IG1lc3NhZ2VzID0ge1xuICogICBlbjoge1xuICogICAgIHRvczogJ1Rlcm0gb2YgU2VydmljZScsXG4gKiAgICAgdGVybTogJ0kgYWNjZXB0IHh4eCB7MH0uJ1xuICogICB9LFxuICogICBqYToge1xuICogICAgIHRvczogJ+WIqeeUqOimj+e0hCcsXG4gKiAgICAgdGVybTogJ+engeOBryB4eHgg44GuezB944Gr5ZCM5oSP44GX44G+44GZ44CCJ1xuICogICB9XG4gKiB9XG4gKlxuICogY29uc3QgaTE4biA9IGNyZWF0ZUkxOG4oe1xuICogICBsb2NhbGU6ICdlbicsXG4gKiAgIG1lc3NhZ2VzXG4gKiB9KVxuICpcbiAqIGNvbnN0IGFwcCA9IGNyZWF0ZUFwcCh7XG4gKiAgIGRhdGE6IHtcbiAqICAgICB1cmw6ICcvdGVybSdcbiAqICAgfVxuICogfSkudXNlKGkxOG4pLm1vdW50KCcjYXBwJylcbiAqIGBgYFxuICpcbiAqIEBWdWVJMThuQ29tcG9uZW50XG4gKi9cbmNvbnN0IFRyYW5zbGF0aW9uID0gVHJhbnNsYXRpb25JbXBsO1xuY29uc3QgSTE4blQgPSBUcmFuc2xhdGlvbjtcblxuZnVuY3Rpb24gaXNWTm9kZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNBcnJheSh0YXJnZXQpICYmICFpc1N0cmluZyh0YXJnZXRbMF0pO1xufVxuZnVuY3Rpb24gcmVuZGVyRm9ybWF0dGVyKHByb3BzLCBjb250ZXh0LCBzbG90S2V5cywgcGFydEZvcm1hdHRlcikge1xuICAgIGNvbnN0IHsgc2xvdHMsIGF0dHJzIH0gPSBjb250ZXh0O1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBhcnQ6IHRydWUgfTtcbiAgICAgICAgbGV0IG92ZXJyaWRlcyA9IHt9O1xuICAgICAgICBpZiAocHJvcHMubG9jYWxlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IHByb3BzLmxvY2FsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpbmcocHJvcHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgb3B0aW9ucy5rZXkgPSBwcm9wcy5mb3JtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNPYmplY3QocHJvcHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhwcm9wcy5mb3JtYXQua2V5KSkge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5rZXkgPSBwcm9wcy5mb3JtYXQua2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBudW1iZXIgZm9ybWF0IG9wdGlvbnMgb25seVxuICAgICAgICAgICAgb3ZlcnJpZGVzID0gT2JqZWN0LmtleXMocHJvcHMuZm9ybWF0KS5yZWR1Y2UoKG9wdGlvbnMsIHByb3ApID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2xvdEtleXMuaW5jbHVkZXMocHJvcClcbiAgICAgICAgICAgICAgICAgICAgPyBhc3NpZ24oe30sIG9wdGlvbnMsIHsgW3Byb3BdOiBwcm9wcy5mb3JtYXRbcHJvcF0gfSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgICAgIDogb3B0aW9ucztcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJ0cyA9IHBhcnRGb3JtYXR0ZXIoLi4uW3Byb3BzLnZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdKTtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gW29wdGlvbnMua2V5XTtcbiAgICAgICAgaWYgKGlzQXJyYXkocGFydHMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IHBhcnRzLm1hcCgocGFydCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNbcGFydC50eXBlXTtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gc2xvdFxuICAgICAgICAgICAgICAgICAgICA/IHNsb3QoeyBbcGFydC50eXBlXTogcGFydC52YWx1ZSwgaW5kZXgsIHBhcnRzIH0pXG4gICAgICAgICAgICAgICAgICAgIDogW3BhcnQudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmIChpc1ZOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVbMF0ua2V5ID0gYCR7cGFydC50eXBlfS0ke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNTdHJpbmcocGFydHMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtwYXJ0c107XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXNzaWduZWRBdHRycyA9IGFzc2lnbih7fSwgYXR0cnMpO1xuICAgICAgICBjb25zdCB0YWcgPSBpc1N0cmluZyhwcm9wcy50YWcpIHx8IGlzT2JqZWN0KHByb3BzLnRhZylcbiAgICAgICAgICAgID8gcHJvcHMudGFnXG4gICAgICAgICAgICA6IGdldEZyYWdtZW50YWJsZVRhZygpO1xuICAgICAgICByZXR1cm4gaCh0YWcsIGFzc2lnbmVkQXR0cnMsIGNoaWxkcmVuKTtcbiAgICB9O1xufVxuXG5jb25zdCBOdW1iZXJGb3JtYXRJbXBsID0gLyojX19QVVJFX18qLyBkZWZpbmVDb21wb25lbnQoe1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgbmFtZTogJ2kxOG4tbicsXG4gICAgcHJvcHM6IGFzc2lnbih7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBmb3JtYXQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIE9iamVjdF1cbiAgICAgICAgfVxuICAgIH0sIGJhc2VGb3JtYXRQcm9wcyksXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgc2V0dXAocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgaTE4biA9IHByb3BzLmkxOG4gfHxcbiAgICAgICAgICAgIHVzZUkxOG4oe1xuICAgICAgICAgICAgICAgIHVzZVNjb3BlOiBwcm9wcy5zY29wZSxcbiAgICAgICAgICAgICAgICBfX3VzZUNvbXBvbmVudDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZW5kZXJGb3JtYXR0ZXIocHJvcHMsIGNvbnRleHQsIE5VTUJFUl9GT1JNQVRfT1BUSU9OU19LRVlTLCAoLi4uYXJncykgPT4gXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGkxOG5bTnVtYmVyUGFydHNTeW1ib2xdKC4uLmFyZ3MpKTtcbiAgICB9XG59KTtcbi8qKlxuICogZXhwb3J0IHRoZSBwdWJsaWMgdHlwZSBmb3IgaC90c3ggaW5mZXJlbmNlXG4gKiBhbHNvIHRvIGF2b2lkIGlubGluZSBpbXBvcnQoKSBpbiBnZW5lcmF0ZWQgZC50cyBmaWxlc1xuICovXG4vKipcbiAqIE51bWJlciBGb3JtYXQgQ29tcG9uZW50XG4gKlxuICogQHJlbWFya3NcbiAqIFNlZSB0aGUgZm9sbG93aW5nIGl0ZW1zIGZvciBwcm9wZXJ0eSBhYm91dCBkZXRhaWxzXG4gKlxuICogQFZ1ZUkxOG5TZWUgW0Zvcm1hdHRhYmxlUHJvcHNdKGNvbXBvbmVudCNmb3JtYXR0YWJsZXByb3BzKVxuICogQFZ1ZUkxOG5TZWUgW0Jhc2VGb3JtYXRQcm9wc10oY29tcG9uZW50I2Jhc2Vmb3JtYXRwcm9wcylcbiAqIEBWdWVJMThuU2VlIFtDdXN0b20gRm9ybWF0dGluZ10oLi4vZ3VpZGUvZXNzZW50aWFscy9udW1iZXIjY3VzdG9tLWZvcm1hdHRpbmcpXG4gKlxuICogQFZ1ZUkxOG5EYW5nZXJcbiAqIE5vdCBzdXBwb3J0ZWQgSUUsIGR1ZSB0byBubyBzdXBwb3J0IGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRUb1BhcnRzYCBpbiBbSUVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0ludGwvTnVtYmVyRm9ybWF0L2Zvcm1hdFRvUGFydHMpXG4gKlxuICogSWYgeW91IHdhbnQgdG8gdXNlIGl0LCB5b3UgbmVlZCB0byB1c2UgW3BvbHlmaWxsXShodHRwczovL2dpdGh1Yi5jb20vZm9ybWF0anMvZm9ybWF0anMvdHJlZS9tYWluL3BhY2thZ2VzL2ludGwtbnVtYmVyZm9ybWF0KVxuICpcbiAqIEBWdWVJMThuQ29tcG9uZW50XG4gKi9cbmNvbnN0IE51bWJlckZvcm1hdCA9IE51bWJlckZvcm1hdEltcGw7XG5jb25zdCBJMThuTiA9IE51bWJlckZvcm1hdDtcblxuY29uc3QgRGF0ZXRpbWVGb3JtYXRJbXBsID0gLyogI19fUFVSRV9fKi8gZGVmaW5lQ29tcG9uZW50KHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgIG5hbWU6ICdpMThuLWQnLFxuICAgIHByb3BzOiBhc3NpZ24oe1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgdHlwZTogW051bWJlciwgRGF0ZV0sXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBmb3JtYXQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIE9iamVjdF1cbiAgICAgICAgfVxuICAgIH0sIGJhc2VGb3JtYXRQcm9wcyksXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgc2V0dXAocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgaTE4biA9IHByb3BzLmkxOG4gfHxcbiAgICAgICAgICAgIHVzZUkxOG4oe1xuICAgICAgICAgICAgICAgIHVzZVNjb3BlOiBwcm9wcy5zY29wZSxcbiAgICAgICAgICAgICAgICBfX3VzZUNvbXBvbmVudDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZW5kZXJGb3JtYXR0ZXIocHJvcHMsIGNvbnRleHQsIERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMsICguLi5hcmdzKSA9PiBcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgaTE4bltEYXRldGltZVBhcnRzU3ltYm9sXSguLi5hcmdzKSk7XG4gICAgfVxufSk7XG4vKipcbiAqIERhdGV0aW1lIEZvcm1hdCBDb21wb25lbnRcbiAqXG4gKiBAcmVtYXJrc1xuICogU2VlIHRoZSBmb2xsb3dpbmcgaXRlbXMgZm9yIHByb3BlcnR5IGFib3V0IGRldGFpbHNcbiAqXG4gKiBAVnVlSTE4blNlZSBbRm9ybWF0dGFibGVQcm9wc10oY29tcG9uZW50I2Zvcm1hdHRhYmxlcHJvcHMpXG4gKiBAVnVlSTE4blNlZSBbQmFzZUZvcm1hdFByb3BzXShjb21wb25lbnQjYmFzZWZvcm1hdHByb3BzKVxuICogQFZ1ZUkxOG5TZWUgW0N1c3RvbSBGb3JtYXR0aW5nXSguLi9ndWlkZS9lc3NlbnRpYWxzL2RhdGV0aW1lI2N1c3RvbS1mb3JtYXR0aW5nKVxuICpcbiAqIEBWdWVJMThuRGFuZ2VyXG4gKiBOb3Qgc3VwcG9ydGVkIElFLCBkdWUgdG8gbm8gc3VwcG9ydCBgSW50bC5EYXRlVGltZUZvcm1hdCNmb3JtYXRUb1BhcnRzYCBpbiBbSUVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0ludGwvRGF0ZVRpbWVGb3JtYXQvZm9ybWF0VG9QYXJ0cylcbiAqXG4gKiBJZiB5b3Ugd2FudCB0byB1c2UgaXQsIHlvdSBuZWVkIHRvIHVzZSBbcG9seWZpbGxdKGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtYXRqcy9mb3JtYXRqcy90cmVlL21haW4vcGFja2FnZXMvaW50bC1kYXRldGltZWZvcm1hdClcbiAqXG4gKiBAVnVlSTE4bkNvbXBvbmVudFxuICovXG5jb25zdCBEYXRldGltZUZvcm1hdCA9IERhdGV0aW1lRm9ybWF0SW1wbDtcbmNvbnN0IEkxOG5EID0gRGF0ZXRpbWVGb3JtYXQ7XG5cbmZ1bmN0aW9uIGdldENvbXBvc2VyJDIoaTE4biwgaW5zdGFuY2UpIHtcbiAgICBjb25zdCBpMThuSW50ZXJuYWwgPSBpMThuO1xuICAgIGlmIChpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIChpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShpbnN0YW5jZSkgfHwgaTE4bi5nbG9iYWwpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgdnVlSTE4biA9IGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIHZ1ZUkxOG4gIT0gbnVsbFxuICAgICAgICAgICAgPyB2dWVJMThuLl9fY29tcG9zZXJcbiAgICAgICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcbiAgICB9XG59XG5mdW5jdGlvbiB2VERpcmVjdGl2ZShpMThuKSB7XG4gICAgY29uc3QgX3Byb2Nlc3MgPSAoYmluZGluZykgPT4ge1xuICAgICAgICBjb25zdCB7IGluc3RhbmNlLCBtb2RpZmllcnMsIHZhbHVlIH0gPSBiaW5kaW5nO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFpbnN0YW5jZSB8fCAhaW5zdGFuY2UuJCkge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gZ2V0Q29tcG9zZXIkMihpMThuLCBpbnN0YW5jZS4kKTtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBtb2RpZmllcnMucHJlc2VydmUpIHtcbiAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSBwYXJzZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIudCwgY29tcG9zZXIsIFsuLi5tYWtlUGFyYW1zKHBhcnNlZFZhbHVlKV0pLFxuICAgICAgICAgICAgY29tcG9zZXJcbiAgICAgICAgXTtcbiAgICB9O1xuICAgIGNvbnN0IHJlZ2lzdGVyID0gKGVsLCBiaW5kaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IFt0ZXh0Q29udGVudCwgY29tcG9zZXJdID0gX3Byb2Nlc3MoYmluZGluZyk7XG4gICAgICAgIGlmIChpbkJyb3dzZXIgJiYgaTE4bi5nbG9iYWwgPT09IGNvbXBvc2VyKSB7XG4gICAgICAgICAgICAvLyBnbG9iYWwgc2NvcGUgb25seVxuICAgICAgICAgICAgZWwuX19pMThuV2F0Y2hlciA9IHdhdGNoKGNvbXBvc2VyLmxvY2FsZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJpbmRpbmcuaW5zdGFuY2UgJiYgYmluZGluZy5pbnN0YW5jZS4kZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsLl9fY29tcG9zZXIgPSBjb21wb3NlcjtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcbiAgICB9O1xuICAgIGNvbnN0IHVucmVnaXN0ZXIgPSAoZWwpID0+IHtcbiAgICAgICAgaWYgKGluQnJvd3NlciAmJiBlbC5fX2kxOG5XYXRjaGVyKSB7XG4gICAgICAgICAgICBlbC5fX2kxOG5XYXRjaGVyKCk7XG4gICAgICAgICAgICBlbC5fX2kxOG5XYXRjaGVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZGVsZXRlIGVsLl9faTE4bldhdGNoZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsLl9fY29tcG9zZXIpIHtcbiAgICAgICAgICAgIGVsLl9fY29tcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBkZWxldGUgZWwuX19jb21wb3NlcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdXBkYXRlID0gKGVsLCB7IHZhbHVlIH0pID0+IHtcbiAgICAgICAgaWYgKGVsLl9fY29tcG9zZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvc2VyID0gZWwuX19jb21wb3NlcjtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gcGFyc2VWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IFJlZmxlY3QuYXBwbHkoY29tcG9zZXIudCwgY29tcG9zZXIsIFtcbiAgICAgICAgICAgICAgICAuLi5tYWtlUGFyYW1zKHBhcnNlZFZhbHVlKVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldFNTUlByb3BzID0gKGJpbmRpbmcpID0+IHtcbiAgICAgICAgY29uc3QgW3RleHRDb250ZW50XSA9IF9wcm9jZXNzKGJpbmRpbmcpO1xuICAgICAgICByZXR1cm4geyB0ZXh0Q29udGVudCB9O1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlZDogcmVnaXN0ZXIsXG4gICAgICAgIHVubW91bnRlZDogdW5yZWdpc3RlcixcbiAgICAgICAgYmVmb3JlVXBkYXRlOiB1cGRhdGUsXG4gICAgICAgIGdldFNTUlByb3BzXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWUpIHtcbiAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB7IHBhdGg6IHZhbHVlIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICAgIGlmICghKCdwYXRoJyBpbiB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5SRVFVSVJFRF9WQUxVRSwgJ3BhdGgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9WQUxVRSk7XG4gICAgfVxufVxuZnVuY3Rpb24gbWFrZVBhcmFtcyh2YWx1ZSkge1xuICAgIGNvbnN0IHsgcGF0aCwgbG9jYWxlLCBhcmdzLCBjaG9pY2UsIHBsdXJhbCB9ID0gdmFsdWU7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGNvbnN0IG5hbWVkID0gYXJncyB8fCB7fTtcbiAgICBpZiAoaXNTdHJpbmcobG9jYWxlKSkge1xuICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGxvY2FsZTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKGNob2ljZSkpIHtcbiAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBjaG9pY2U7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihwbHVyYWwpKSB7XG4gICAgICAgIG9wdGlvbnMucGx1cmFsID0gcGx1cmFsO1xuICAgIH1cbiAgICByZXR1cm4gW3BhdGgsIG5hbWVkLCBvcHRpb25zXTtcbn1cblxuZnVuY3Rpb24gYXBwbHkoYXBwLCBpMThuLCAuLi5vcHRpb25zKSB7XG4gICAgY29uc3QgcGx1Z2luT3B0aW9ucyA9IGlzUGxhaW5PYmplY3Qob3B0aW9uc1swXSlcbiAgICAgICAgPyBvcHRpb25zWzBdXG4gICAgICAgIDoge307XG4gICAgY29uc3QgdXNlSTE4bkNvbXBvbmVudE5hbWUgPSAhIXBsdWdpbk9wdGlvbnMudXNlSTE4bkNvbXBvbmVudE5hbWU7XG4gICAgY29uc3QgZ2xvYmFsSW5zdGFsbCA9IGlzQm9vbGVhbihwbHVnaW5PcHRpb25zLmdsb2JhbEluc3RhbGwpXG4gICAgICAgID8gcGx1Z2luT3B0aW9ucy5nbG9iYWxJbnN0YWxsXG4gICAgICAgIDogdHJ1ZTtcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGdsb2JhbEluc3RhbGwgJiYgdXNlSTE4bkNvbXBvbmVudE5hbWUpIHtcbiAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLkNPTVBPTkVOVF9OQU1FX0xFR0FDWV9DT01QQVRJQkxFLCB7XG4gICAgICAgICAgICBuYW1lOiBUcmFuc2xhdGlvbi5uYW1lXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKGdsb2JhbEluc3RhbGwpIHtcbiAgICAgICAgWyF1c2VJMThuQ29tcG9uZW50TmFtZSA/IFRyYW5zbGF0aW9uLm5hbWUgOiAnaTE4bicsICdJMThuVCddLmZvckVhY2gobmFtZSA9PiBhcHAuY29tcG9uZW50KG5hbWUsIFRyYW5zbGF0aW9uKSk7XG4gICAgICAgIFtOdW1iZXJGb3JtYXQubmFtZSwgJ0kxOG5OJ10uZm9yRWFjaChuYW1lID0+IGFwcC5jb21wb25lbnQobmFtZSwgTnVtYmVyRm9ybWF0KSk7XG4gICAgICAgIFtEYXRldGltZUZvcm1hdC5uYW1lLCAnSTE4bkQnXS5mb3JFYWNoKG5hbWUgPT4gYXBwLmNvbXBvbmVudChuYW1lLCBEYXRldGltZUZvcm1hdCkpO1xuICAgIH1cbiAgICAvLyBpbnN0YWxsIGRpcmVjdGl2ZVxuICAgIHtcbiAgICAgICAgYXBwLmRpcmVjdGl2ZSgndCcsIHZURGlyZWN0aXZlKGkxOG4pKTtcbiAgICB9XG59XG5cbmNvbnN0IFZ1ZURldlRvb2xzTGFiZWxzID0ge1xuICAgIFtcInZ1ZS1kZXZ0b29scy1wbHVnaW4tdnVlLWkxOG5cIiAvKiBWdWVEZXZUb29sc0lEcy5QTFVHSU4gKi9dOiAnVnVlIEkxOG4gZGV2dG9vbHMnLFxuICAgIFtcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIFZ1ZURldlRvb2xzSURzLkNVU1RPTV9JTlNQRUNUT1IgKi9dOiAnSTE4biBSZXNvdXJjZXMnLFxuICAgIFtcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVnVlRGV2VG9vbHNJRHMuVElNRUxJTkUgKi9dOiAnVnVlIEkxOG4nXG59O1xuY29uc3QgVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnMgPSB7XG4gICAgW1widnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogVnVlRGV2VG9vbHNJRHMuQ1VTVE9NX0lOU1BFQ1RPUiAqL106ICdTZWFyY2ggZm9yIHNjb3BlcyAuLi4nXG59O1xuY29uc3QgVnVlRGV2VG9vbHNUaW1lbGluZUNvbG9ycyA9IHtcbiAgICBbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovXTogMHhmZmNkMTlcbn07XG5cbmNvbnN0IFZVRV9JMThOX0NPTVBPTkVOVF9UWVBFUyA9ICd2dWUtaTE4bjogY29tcG9zZXIgcHJvcGVydGllcyc7XG5sZXQgZGV2dG9vbHNBcGk7XG5hc3luYyBmdW5jdGlvbiBlbmFibGVEZXZUb29scyhhcHAsIGkxOG4pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0dXBEZXZ0b29sc1BsdWdpbih7XG4gICAgICAgICAgICAgICAgaWQ6IFwidnVlLWRldnRvb2xzLXBsdWdpbi12dWUtaTE4blwiIC8qIFZ1ZURldlRvb2xzSURzLlBMVUdJTiAqLyxcbiAgICAgICAgICAgICAgICBsYWJlbDogVnVlRGV2VG9vbHNMYWJlbHNbXCJ2dWUtZGV2dG9vbHMtcGx1Z2luLXZ1ZS1pMThuXCIgLyogVnVlRGV2VG9vbHNJRHMuUExVR0lOICovXSxcbiAgICAgICAgICAgICAgICBwYWNrYWdlTmFtZTogJ3Z1ZS1pMThuJyxcbiAgICAgICAgICAgICAgICBob21lcGFnZTogJ2h0dHBzOi8vdnVlLWkxOG4uaW50bGlmeS5kZXYnLFxuICAgICAgICAgICAgICAgIGxvZ286ICdodHRwczovL3Z1ZS1pMThuLmludGxpZnkuZGV2L3Z1ZS1pMThuLWRldnRvb2xzLWxvZ28ucG5nJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRTdGF0ZVR5cGVzOiBbVlVFX0kxOE5fQ09NUE9ORU5UX1RZUEVTXSxcbiAgICAgICAgICAgICAgICBhcHA6IGFwcCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIH0sIGFwaSA9PiB7XG4gICAgICAgICAgICAgICAgZGV2dG9vbHNBcGkgPSBhcGk7XG4gICAgICAgICAgICAgICAgYXBpLm9uLnZpc2l0Q29tcG9uZW50VHJlZSgoeyBjb21wb25lbnRJbnN0YW5jZSwgdHJlZU5vZGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb21wb25lbnRUcmVlVGFncyhjb21wb25lbnRJbnN0YW5jZSwgdHJlZU5vZGUsIGkxOG4pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFwaS5vbi5pbnNwZWN0Q29tcG9uZW50KCh7IGNvbXBvbmVudEluc3RhbmNlLCBpbnN0YW5jZURhdGEgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50SW5zdGFuY2Uudm5vZGUuZWwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaTE4bi5tb2RlID09PSAnbGVnYWN5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBnbG9iYWwgc2NvcGUgb24gbGVnYWN5IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50SW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fICE9PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpMThuLmdsb2JhbC5fX2NvbXBvc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3BlY3RDb21wb3NlcihpbnN0YW5jZURhdGEsIGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zcGVjdENvbXBvc2VyKGluc3RhbmNlRGF0YSwgY29tcG9uZW50SW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFwaS5hZGRJbnNwZWN0b3Ioe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogVnVlRGV2VG9vbHNMYWJlbHNbXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovXSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2xhbmd1YWdlJyxcbiAgICAgICAgICAgICAgICAgICAgdHJlZUZpbHRlclBsYWNlaG9sZGVyOiBWdWVEZXZUb29sc1BsYWNlaG9sZGVyc1tcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIFZ1ZURldlRvb2xzSURzLkNVU1RPTV9JTlNQRUNUT1IgKi9dXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXBpLm9uLmdldEluc3BlY3RvclRyZWUocGF5bG9hZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmFwcCA9PT0gYXBwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLmluc3BlY3RvcklkID09PSBcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIFZ1ZURldlRvb2xzSURzLkNVU1RPTV9JTlNQRUNUT1IgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyU2NvcGUocGF5bG9hZCwgaTE4bik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCByb290cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBhcGkub24uZ2V0SW5zcGVjdG9yU3RhdGUoYXN5bmMgKHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXBwID09PSBhcHAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuaW5zcGVjdG9ySWQgPT09IFwidnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogVnVlRGV2VG9vbHNJRHMuQ1VTVE9NX0lOU1BFQ1RPUiAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnVuaGlnaGxpZ2h0RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zcGVjdFNjb3BlKHBheWxvYWQsIGkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQubm9kZUlkID09PSAnZ2xvYmFsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm9vdHMuaGFzKHBheWxvYWQuYXBwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbcm9vdF0gPSBhd2FpdCBhcGkuZ2V0Q29tcG9uZW50SW5zdGFuY2VzKHBheWxvYWQuYXBwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vdHMuc2V0KHBheWxvYWQuYXBwLCByb290KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmhpZ2hsaWdodEVsZW1lbnQocm9vdHMuZ2V0KHBheWxvYWQuYXBwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGdldENvbXBvbmVudEluc3RhbmNlKHBheWxvYWQubm9kZUlkLCBpMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSAmJiBhcGkuaGlnaGxpZ2h0RWxlbWVudChpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhcGkub24uZWRpdEluc3BlY3RvclN0YXRlKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hcHAgPT09IGFwcCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5pbnNwZWN0b3JJZCA9PT0gXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0U2NvcGUocGF5bG9hZCwgaTE4bik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhcGkuYWRkVGltZWxpbmVMYXllcih7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVnVlRGV2VG9vbHNJRHMuVElNRUxJTkUgKi8sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBWdWVEZXZUb29sc0xhYmVsc1tcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVnVlRGV2VG9vbHNJRHMuVElNRUxJTkUgKi9dLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogVnVlRGV2VG9vbHNUaW1lbGluZUNvbG9yc1tcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVnVlRGV2VG9vbHNJRHMuVElNRUxJTkUgKi9dXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmZ1bmN0aW9uIGdldEkxOG5TY29wZUxhYmxlKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIChpbnN0YW5jZS50eXBlLm5hbWUgfHxcbiAgICAgICAgaW5zdGFuY2UudHlwZS5kaXNwbGF5TmFtZSB8fFxuICAgICAgICBpbnN0YW5jZS50eXBlLl9fZmlsZSB8fFxuICAgICAgICAnQW5vbnltb3VzJyk7XG59XG5mdW5jdGlvbiB1cGRhdGVDb21wb25lbnRUcmVlVGFncyhpbnN0YW5jZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG50cmVlTm9kZSwgaTE4bikge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGdsb2JhbCA9IGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xuICAgICAgICA/IGkxOG4uZ2xvYmFsXG4gICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcbiAgICBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2Uudm5vZGUuZWwgJiYgaW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fKSB7XG4gICAgICAgIC8vIGFkZCBjdXN0b20gdGFncyBsb2NhbCBzY29wZSBvbmx5XG4gICAgICAgIGlmIChpbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18gIT09IGdsb2JhbCkge1xuICAgICAgICAgICAgY29uc3QgdGFnID0ge1xuICAgICAgICAgICAgICAgIGxhYmVsOiBgaTE4biAoJHtnZXRJMThuU2NvcGVMYWJsZShpbnN0YW5jZSl9IFNjb3BlKWAsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiAweDAwMDAwMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IDB4ZmZjZDE5XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJlZU5vZGUudGFncy5wdXNoKHRhZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpbnNwZWN0Q29tcG9zZXIoaW5zdGFuY2VEYXRhLCBjb21wb3Nlcikge1xuICAgIGNvbnN0IHR5cGUgPSBWVUVfSTE4Tl9DT01QT05FTlRfVFlQRVM7XG4gICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xuICAgICAgICB0eXBlLFxuICAgICAgICBrZXk6ICdsb2NhbGUnLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmxvY2FsZS52YWx1ZVxuICAgIH0pO1xuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5OiAnYXZhaWxhYmxlTG9jYWxlcycsXG4gICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmF2YWlsYWJsZUxvY2FsZXNcbiAgICB9KTtcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleTogJ2ZhbGxiYWNrTG9jYWxlJyxcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZVxuICAgIH0pO1xuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5OiAnaW5oZXJpdExvY2FsZScsXG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogY29tcG9zZXIuaW5oZXJpdExvY2FsZVxuICAgIH0pO1xuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5OiAnbWVzc2FnZXMnLFxuICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBnZXRMb2NhbGVNZXNzYWdlVmFsdWUoY29tcG9zZXIubWVzc2FnZXMudmFsdWUpXG4gICAgfSk7XG4gICAge1xuICAgICAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAga2V5OiAnZGF0ZXRpbWVGb3JtYXRzJyxcbiAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5kYXRldGltZUZvcm1hdHMudmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBrZXk6ICdudW1iZXJGb3JtYXRzJyxcbiAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5udW1iZXJGb3JtYXRzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBnZXRMb2NhbGVNZXNzYWdlVmFsdWUobWVzc2FnZXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKG1lc3NhZ2VzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgdiA9IG1lc3NhZ2VzW2tleV07XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHYpICYmICdzb3VyY2UnIGluIHYpIHtcbiAgICAgICAgICAgIHZhbHVlW2tleV0gPSBnZXRNZXNzYWdlRnVuY3Rpb25EZXRhaWxzKHYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzTWVzc2FnZUFTVCh2KSAmJiB2LmxvYyAmJiB2LmxvYy5zb3VyY2UpIHtcbiAgICAgICAgICAgIHZhbHVlW2tleV0gPSB2LmxvYy5zb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNPYmplY3QodikpIHtcbiAgICAgICAgICAgIHZhbHVlW2tleV0gPSBnZXRMb2NhbGVNZXNzYWdlVmFsdWUodik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gdjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmNvbnN0IEVTQyA9IHtcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAnJic6ICcmYW1wOydcbn07XG5mdW5jdGlvbiBlc2NhcGUocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoL1s8PlwiJl0vZywgZXNjYXBlQ2hhcik7XG59XG5mdW5jdGlvbiBlc2NhcGVDaGFyKGEpIHtcbiAgICByZXR1cm4gRVNDW2FdIHx8IGE7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gZ2V0TWVzc2FnZUZ1bmN0aW9uRGV0YWlscyhmdW5jKSB7XG4gICAgY29uc3QgYXJnU3RyaW5nID0gZnVuYy5zb3VyY2UgPyBgKFwiJHtlc2NhcGUoZnVuYy5zb3VyY2UpfVwiKWAgOiBgKD8pYDtcbiAgICByZXR1cm4ge1xuICAgICAgICBfY3VzdG9tOiB7XG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICAgICAgICAgICAgZGlzcGxheTogYDxzcGFuPsaSPC9zcGFuPiAke2FyZ1N0cmluZ31gXG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJTY29wZShwYXlsb2FkLCBpMThuKSB7XG4gICAgcGF5bG9hZC5yb290Tm9kZXMucHVzaCh7XG4gICAgICAgIGlkOiAnZ2xvYmFsJyxcbiAgICAgICAgbGFiZWw6ICdHbG9iYWwgU2NvcGUnXG4gICAgfSk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgZ2xvYmFsID0gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXG4gICAgICAgID8gaTE4bi5nbG9iYWxcbiAgICAgICAgOiBpMThuLmdsb2JhbC5fX2NvbXBvc2VyO1xuICAgIGZvciAoY29uc3QgW2tleUluc3RhbmNlLCBpbnN0YW5jZV0gb2YgaTE4bi5fX2luc3RhbmNlcykge1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgY29uc3QgY29tcG9zZXIgPSBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcbiAgICAgICAgICAgID8gaW5zdGFuY2VcbiAgICAgICAgICAgIDogaW5zdGFuY2UuX19jb21wb3NlcjtcbiAgICAgICAgaWYgKGdsb2JhbCA9PT0gY29tcG9zZXIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHBheWxvYWQucm9vdE5vZGVzLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGNvbXBvc2VyLmlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBsYWJlbDogYCR7Z2V0STE4blNjb3BlTGFibGUoa2V5SW5zdGFuY2UpfSBTY29wZWBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50SW5zdGFuY2Uobm9kZUlkLCBpMThuKSB7XG4gICAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgICBpZiAobm9kZUlkICE9PSAnZ2xvYmFsJykge1xuICAgICAgICBmb3IgKGNvbnN0IFtjb21wb25lbnQsIGNvbXBvc2VyXSBvZiBpMThuLl9faW5zdGFuY2VzLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgaWYgKGNvbXBvc2VyLmlkLnRvU3RyaW5nKCkgPT09IG5vZGVJZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cbmZ1bmN0aW9uIGdldENvbXBvc2VyJDEobm9kZUlkLCBpMThuKSB7XG4gICAgaWYgKG5vZGVJZCA9PT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgcmV0dXJuIGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xuICAgICAgICAgICAgPyBpMThuLmdsb2JhbFxuICAgICAgICAgICAgOiBpMThuLmdsb2JhbC5fX2NvbXBvc2VyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBBcnJheS5mcm9tKGkxOG4uX19pbnN0YW5jZXMudmFsdWVzKCkpLmZpbmQoaXRlbSA9PiBpdGVtLmlkLnRvU3RyaW5nKCkgPT09IG5vZGVJZCk7XG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xuICAgICAgICAgICAgICAgID8gaW5zdGFuY2VcbiAgICAgICAgICAgICAgICA6IGluc3RhbmNlLl9fY29tcG9zZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGluc3BlY3RTY29wZShwYXlsb2FkLCBpMThuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuKSB7XG4gICAgY29uc3QgY29tcG9zZXIgPSBnZXRDb21wb3NlciQxKHBheWxvYWQubm9kZUlkLCBpMThuKTtcbiAgICBpZiAoY29tcG9zZXIpIHtcbiAgICAgICAgLy8gVE9ETzpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgcGF5bG9hZC5zdGF0ZSA9IG1ha2VTY29wZUluc3BlY3RTdGF0ZShjb21wb3Nlcik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gbWFrZVNjb3BlSW5zcGVjdFN0YXRlKGNvbXBvc2VyKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB7fTtcbiAgICBjb25zdCBsb2NhbGVUeXBlID0gJ0xvY2FsZSByZWxhdGVkIGluZm8nO1xuICAgIGNvbnN0IGxvY2FsZVN0YXRlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogbG9jYWxlVHlwZSxcbiAgICAgICAgICAgIGtleTogJ2xvY2FsZScsXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5sb2NhbGUudmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogbG9jYWxlVHlwZSxcbiAgICAgICAgICAgIGtleTogJ2ZhbGxiYWNrTG9jYWxlJyxcbiAgICAgICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXG4gICAgICAgICAgICBrZXk6ICdhdmFpbGFibGVMb2NhbGVzJyxcbiAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5hdmFpbGFibGVMb2NhbGVzXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXG4gICAgICAgICAgICBrZXk6ICdpbmhlcml0TG9jYWxlJyxcbiAgICAgICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmluaGVyaXRMb2NhbGVcbiAgICAgICAgfVxuICAgIF07XG4gICAgc3RhdGVbbG9jYWxlVHlwZV0gPSBsb2NhbGVTdGF0ZXM7XG4gICAgY29uc3QgbG9jYWxlTWVzc2FnZXNUeXBlID0gJ0xvY2FsZSBtZXNzYWdlcyBpbmZvJztcbiAgICBjb25zdCBsb2NhbGVNZXNzYWdlc1N0YXRlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogbG9jYWxlTWVzc2FnZXNUeXBlLFxuICAgICAgICAgICAga2V5OiAnbWVzc2FnZXMnLFxuICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IGdldExvY2FsZU1lc3NhZ2VWYWx1ZShjb21wb3Nlci5tZXNzYWdlcy52YWx1ZSlcbiAgICAgICAgfVxuICAgIF07XG4gICAgc3RhdGVbbG9jYWxlTWVzc2FnZXNUeXBlXSA9IGxvY2FsZU1lc3NhZ2VzU3RhdGVzO1xuICAgIHtcbiAgICAgICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzVHlwZSA9ICdEYXRldGltZSBmb3JtYXRzIGluZm8nO1xuICAgICAgICBjb25zdCBkYXRldGltZUZvcm1hdHNTdGF0ZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogZGF0ZXRpbWVGb3JtYXRzVHlwZSxcbiAgICAgICAgICAgICAgICBrZXk6ICdkYXRldGltZUZvcm1hdHMnLFxuICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHN0YXRlW2RhdGV0aW1lRm9ybWF0c1R5cGVdID0gZGF0ZXRpbWVGb3JtYXRzU3RhdGVzO1xuICAgICAgICBjb25zdCBudW1iZXJGb3JtYXRzVHlwZSA9ICdEYXRldGltZSBmb3JtYXRzIGluZm8nO1xuICAgICAgICBjb25zdCBudW1iZXJGb3JtYXRzU3RhdGVzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IG51bWJlckZvcm1hdHNUeXBlLFxuICAgICAgICAgICAgICAgIGtleTogJ251bWJlckZvcm1hdHMnLFxuICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIubnVtYmVyRm9ybWF0cy52YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICBzdGF0ZVtudW1iZXJGb3JtYXRzVHlwZV0gPSBudW1iZXJGb3JtYXRzU3RhdGVzO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG59XG5mdW5jdGlvbiBhZGRUaW1lbGluZUV2ZW50KGV2ZW50LCBwYXlsb2FkKSB7XG4gICAgaWYgKGRldnRvb2xzQXBpKSB7XG4gICAgICAgIGxldCBncm91cElkO1xuICAgICAgICBpZiAocGF5bG9hZCAmJiAnZ3JvdXBJZCcgaW4gcGF5bG9hZCkge1xuICAgICAgICAgICAgZ3JvdXBJZCA9IHBheWxvYWQuZ3JvdXBJZDtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkLmdyb3VwSWQ7XG4gICAgICAgIH1cbiAgICAgICAgZGV2dG9vbHNBcGkuYWRkVGltZWxpbmVFdmVudCh7XG4gICAgICAgICAgICBsYXllcklkOiBcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVnVlRGV2VG9vbHNJRHMuVElNRUxJTkUgKi8sXG4gICAgICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBldmVudCxcbiAgICAgICAgICAgICAgICBncm91cElkLFxuICAgICAgICAgICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgbWV0YToge30sXG4gICAgICAgICAgICAgICAgZGF0YTogcGF5bG9hZCB8fCB7fSxcbiAgICAgICAgICAgICAgICBsb2dUeXBlOiBldmVudCA9PT0gXCJjb21waWxlLWVycm9yXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5DT01QSUxFX0VSUk9SICovXG4gICAgICAgICAgICAgICAgICAgID8gJ2Vycm9yJ1xuICAgICAgICAgICAgICAgICAgICA6IGV2ZW50ID09PSBcImZhbGxiYWNrXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5GQUxCQUNLICovIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9PT0gXCJtaXNzaW5nXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5NSVNTSU5HICovXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICd3YXJuaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnZGVmYXVsdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWRpdFNjb3BlKHBheWxvYWQsIGkxOG4pIHtcbiAgICBjb25zdCBjb21wb3NlciA9IGdldENvbXBvc2VyJDEocGF5bG9hZC5ub2RlSWQsIGkxOG4pO1xuICAgIGlmIChjb21wb3Nlcikge1xuICAgICAgICBjb25zdCBbZmllbGRdID0gcGF5bG9hZC5wYXRoO1xuICAgICAgICBpZiAoZmllbGQgPT09ICdsb2NhbGUnICYmIGlzU3RyaW5nKHBheWxvYWQuc3RhdGUudmFsdWUpKSB7XG4gICAgICAgICAgICBjb21wb3Nlci5sb2NhbGUudmFsdWUgPSBwYXlsb2FkLnN0YXRlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09PSAnZmFsbGJhY2tMb2NhbGUnICYmXG4gICAgICAgICAgICAoaXNTdHJpbmcocGF5bG9hZC5zdGF0ZS52YWx1ZSkgfHxcbiAgICAgICAgICAgICAgICBpc0FycmF5KHBheWxvYWQuc3RhdGUudmFsdWUpIHx8XG4gICAgICAgICAgICAgICAgaXNPYmplY3QocGF5bG9hZC5zdGF0ZS52YWx1ZSkpKSB7XG4gICAgICAgICAgICBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZSA9IHBheWxvYWQuc3RhdGUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT09ICdpbmhlcml0TG9jYWxlJyAmJiBpc0Jvb2xlYW4ocGF5bG9hZC5zdGF0ZS52YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbXBvc2VyLmluaGVyaXRMb2NhbGUgPSBwYXlsb2FkLnN0YXRlLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFN1cHBvcnRzIGNvbXBhdGliaWxpdHkgZm9yIGxlZ2FjeSB2dWUtaTE4biBBUElzXG4gKiBUaGlzIG1peGluIGlzIHVzZWQgd2hlbiB3ZSB1c2UgdnVlLWkxOG5AdjkueCBvciBsYXRlclxuICovXG5mdW5jdGlvbiBkZWZpbmVNaXhpbih2dWVpMThuLCBjb21wb3NlciwgaTE4bikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGJlZm9yZUNyZWF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy4kb3B0aW9ucztcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmkxOG4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zSTE4biA9IG9wdGlvbnMuaTE4bjtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5fX2kxOG4pIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0kxOG4uX19pMThuID0gb3B0aW9ucy5fX2kxOG47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnNJMThuLl9fcm9vdCA9IGNvbXBvc2VyO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSB0aGlzLiRyb290KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1lcmdlIG9wdGlvbiBhbmQgZ3R0YWNoIGdsb2JhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpMThuID0gbWVyZ2VUb0dsb2JhbCh2dWVpMThuLCBvcHRpb25zSTE4bik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zSTE4bi5fX2luamVjdFdpdGhPcHRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zSTE4bi5fX2V4dGVuZGVyID0gaTE4bi5fX3Z1ZUkxOG5FeHRlbmQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dHRhY2ggbG9jYWwgVnVlSTE4biBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpMThuID0gY3JlYXRlVnVlSTE4bihvcHRpb25zSTE4bik7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBWdWVJMThuIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF92dWVJMThuID0gdGhpcy4kaTE4bjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF92dWVJMThuLl9fZXh0ZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZGlzcG9zZXIgPSBfdnVlSTE4bi5fX2V4dGVuZGVyKHRoaXMuJGkxOG4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5fX2kxOG4pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcyA9PT0gdGhpcy4kcm9vdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtZXJnZSBvcHRpb24gYW5kIGd0dGFjaCBnbG9iYWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IG1lcmdlVG9HbG9iYWwodnVlaTE4biwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBhdHR0YWNoIGxvY2FsIFZ1ZUkxOG4gaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IGNyZWF0ZVZ1ZUkxOG4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgX19pMThuOiBvcHRpb25zLl9faTE4bixcbiAgICAgICAgICAgICAgICAgICAgICAgIF9faW5qZWN0V2l0aE9wdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fZXh0ZW5kZXI6IGkxOG4uX192dWVJMThuRXh0ZW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgX19yb290OiBjb21wb3NlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZW5kIFZ1ZUkxOG4gaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgX3Z1ZUkxOG4gPSB0aGlzLiRpMThuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3Z1ZUkxOG4uX19leHRlbmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3Z1ZUkxOG4uX19kaXNwb3NlciA9IF92dWVJMThuLl9fZXh0ZW5kZXIodGhpcy4kaTE4bik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggZ2xvYmFsIFZ1ZUkxOG4gaW5zdGFuY2VcbiAgICAgICAgICAgICAgICB0aGlzLiRpMThuID0gdnVlaTE4bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLl9faTE4bkdsb2JhbCkge1xuICAgICAgICAgICAgICAgIGFkanVzdEkxOG5SZXNvdXJjZXMoY29tcG9zZXIsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZGVmaW5lcyB2dWUtaTE4biBsZWdhY3kgQVBJc1xuICAgICAgICAgICAgdGhpcy4kdCA9ICguLi5hcmdzKSA9PiB0aGlzLiRpMThuLnQoLi4uYXJncyk7XG4gICAgICAgICAgICB0aGlzLiRydCA9ICguLi5hcmdzKSA9PiB0aGlzLiRpMThuLnJ0KC4uLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy4kdGMgPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi50YyguLi5hcmdzKTtcbiAgICAgICAgICAgIHRoaXMuJHRlID0gKGtleSwgbG9jYWxlKSA9PiB0aGlzLiRpMThuLnRlKGtleSwgbG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMuJGQgPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi5kKC4uLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy4kbiA9ICguLi5hcmdzKSA9PiB0aGlzLiRpMThuLm4oLi4uYXJncyk7XG4gICAgICAgICAgICB0aGlzLiR0bSA9IChrZXkpID0+IHRoaXMuJGkxOG4udG0oa2V5KTtcbiAgICAgICAgICAgIGkxOG4uX19zZXRJbnN0YW5jZShpbnN0YW5jZSwgdGhpcy4kaTE4bik7XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcbiAgICAgICAgICAgICAgICAhZmFsc2UgJiZcbiAgICAgICAgICAgICAgICB0aGlzLiRlbCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBfdnVlSTE4biA9IHRoaXMuJGkxOG47XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuX19WVUVfSTE4Tl9fID0gX3Z1ZUkxOG4uX19jb21wb3NlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gKHRoaXMuX192X2VtaXR0ZXIgPVxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbWl0dGVyKCkpO1xuICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZW5hYmxlRW1pdHRlciAmJiBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIoZW1pdHRlcik7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5vbignKicsIGFkZFRpbWVsaW5lRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1bm1vdW50ZWQoKSB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgX3Z1ZUkxOG4gPSB0aGlzLiRpMThuO1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXG4gICAgICAgICAgICAgICAgIWZhbHNlICYmXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwgJiZcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5fX1ZVRV9JMThOX18pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3ZfZW1pdHRlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdl9lbWl0dGVyLm9mZignKicsIGFkZFRpbWVsaW5lRXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fX3ZfZW1pdHRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJGkxOG4pIHtcbiAgICAgICAgICAgICAgICAgICAgX3Z1ZUkxOG4uX19kaXNhYmxlRW1pdHRlciAmJiBfdnVlSTE4bi5fX2Rpc2FibGVFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRlbC5fX1ZVRV9JMThOX187XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHQ7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kcnQ7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kdGM7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kdGU7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kZDtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRuO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHRtO1xuICAgICAgICAgICAgaWYgKF92dWVJMThuLl9fZGlzcG9zZXIpIHtcbiAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2Rpc3Bvc2VyKCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF92dWVJMThuLl9fZGlzcG9zZXI7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF92dWVJMThuLl9fZXh0ZW5kZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpMThuLl9fZGVsZXRlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJGkxOG47XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gbWVyZ2VUb0dsb2JhbChnLCBvcHRpb25zKSB7XG4gICAgZy5sb2NhbGUgPSBvcHRpb25zLmxvY2FsZSB8fCBnLmxvY2FsZTtcbiAgICBnLmZhbGxiYWNrTG9jYWxlID0gb3B0aW9ucy5mYWxsYmFja0xvY2FsZSB8fCBnLmZhbGxiYWNrTG9jYWxlO1xuICAgIGcubWlzc2luZyA9IG9wdGlvbnMubWlzc2luZyB8fCBnLm1pc3Npbmc7XG4gICAgZy5zaWxlbnRUcmFuc2xhdGlvbldhcm4gPVxuICAgICAgICBvcHRpb25zLnNpbGVudFRyYW5zbGF0aW9uV2FybiB8fCBnLnNpbGVudEZhbGxiYWNrV2FybjtcbiAgICBnLnNpbGVudEZhbGxiYWNrV2FybiA9IG9wdGlvbnMuc2lsZW50RmFsbGJhY2tXYXJuIHx8IGcuc2lsZW50RmFsbGJhY2tXYXJuO1xuICAgIGcuZm9ybWF0RmFsbGJhY2tNZXNzYWdlcyA9XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0RmFsbGJhY2tNZXNzYWdlcyB8fCBnLmZvcm1hdEZhbGxiYWNrTWVzc2FnZXM7XG4gICAgZy5wb3N0VHJhbnNsYXRpb24gPSBvcHRpb25zLnBvc3RUcmFuc2xhdGlvbiB8fCBnLnBvc3RUcmFuc2xhdGlvbjtcbiAgICBnLndhcm5IdG1sSW5NZXNzYWdlID0gb3B0aW9ucy53YXJuSHRtbEluTWVzc2FnZSB8fCBnLndhcm5IdG1sSW5NZXNzYWdlO1xuICAgIGcuZXNjYXBlUGFyYW1ldGVySHRtbCA9IG9wdGlvbnMuZXNjYXBlUGFyYW1ldGVySHRtbCB8fCBnLmVzY2FwZVBhcmFtZXRlckh0bWw7XG4gICAgZy5zeW5jID0gb3B0aW9ucy5zeW5jIHx8IGcuc3luYztcbiAgICBnLl9fY29tcG9zZXJbU2V0UGx1cmFsUnVsZXNTeW1ib2xdKG9wdGlvbnMucGx1cmFsaXphdGlvblJ1bGVzIHx8IGcucGx1cmFsaXphdGlvblJ1bGVzKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGdldExvY2FsZU1lc3NhZ2VzKGcubG9jYWxlLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBvcHRpb25zLm1lc3NhZ2VzLFxuICAgICAgICBfX2kxOG46IG9wdGlvbnMuX19pMThuXG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMobWVzc2FnZXMpLmZvckVhY2gobG9jYWxlID0+IGcubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZXNbbG9jYWxlXSkpO1xuICAgIGlmIChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cykge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGV0aW1lRm9ybWF0cykuZm9yRWFjaChsb2NhbGUgPT4gZy5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5kYXRldGltZUZvcm1hdHNbbG9jYWxlXSkpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5udW1iZXJGb3JtYXRzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMubnVtYmVyRm9ybWF0cykuZm9yRWFjaChsb2NhbGUgPT4gZy5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMubnVtYmVyRm9ybWF0c1tsb2NhbGVdKSk7XG4gICAgfVxuICAgIHJldHVybiBnO1xufVxuXG4vKipcbiAqIEluamVjdGlvbiBrZXkgZm9yIHtAbGluayB1c2VJMThufVxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGUgZ2xvYmFsIGluamVjdGlvbiBrZXkgZm9yIEkxOG4gaW5zdGFuY2VzIHdpdGggYHVzZUkxOG5gLiB0aGlzIGluamVjdGlvbiBrZXkgaXMgdXNlZCBpbiBXZWIgQ29tcG9uZW50cy5cbiAqIFNwZWNpZnkgdGhlIGkxOG4gaW5zdGFuY2UgY3JlYXRlZCBieSB7QGxpbmsgY3JlYXRlSTE4bn0gdG9nZXRoZXIgd2l0aCBgcHJvdmlkZWAgZnVuY3Rpb24uXG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmNvbnN0IEkxOG5JbmplY3Rpb25LZXkgPSBcbi8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ2dsb2JhbC12dWUtaTE4bicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIGNyZWF0ZUkxOG4ob3B0aW9ucyA9IHt9LCBWdWVJMThuTGVnYWN5KSB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX19sZWdhY3lNb2RlID0gX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX18gJiYgaXNCb29sZWFuKG9wdGlvbnMubGVnYWN5KVxuICAgICAgICAgICAgPyBvcHRpb25zLmxlZ2FjeVxuICAgICAgICAgICAgOiBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXztcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfX2dsb2JhbEluamVjdGlvbiA9IGlzQm9vbGVhbihvcHRpb25zLmdsb2JhbEluamVjdGlvbilcbiAgICAgICAgPyBvcHRpb25zLmdsb2JhbEluamVjdGlvblxuICAgICAgICA6IHRydWU7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX19hbGxvd0NvbXBvc2l0aW9uID0gX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX18gJiYgX19sZWdhY3lNb2RlXG4gICAgICAgICAgICA/ICEhb3B0aW9ucy5hbGxvd0NvbXBvc2l0aW9uXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgX19pbnN0YW5jZXMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgW2dsb2JhbFNjb3BlLCBfX2dsb2JhbF0gPSBjcmVhdGVHbG9iYWwob3B0aW9ucywgX19sZWdhY3lNb2RlKTtcbiAgICBjb25zdCBzeW1ib2wgPSAvKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSA/ICd2dWUtaTE4bicgOiAnJyk7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICBpZiAoX19sZWdhY3lNb2RlICYmIF9fYWxsb3dDb21wb3NpdGlvbiAmJiAhZmFsc2UpIHtcbiAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RJQ0VfRFJPUF9BTExPV19DT01QT1NJVElPTikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9fZ2V0SW5zdGFuY2UoY29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBfX2luc3RhbmNlcy5nZXQoY29tcG9uZW50KSB8fCBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfX3NldEluc3RhbmNlKGNvbXBvbmVudCwgaW5zdGFuY2UpIHtcbiAgICAgICAgX19pbnN0YW5jZXMuc2V0KGNvbXBvbmVudCwgaW5zdGFuY2UpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfX2RlbGV0ZUluc3RhbmNlKGNvbXBvbmVudCkge1xuICAgICAgICBfX2luc3RhbmNlcy5kZWxldGUoY29tcG9uZW50KTtcbiAgICB9XG4gICAge1xuICAgICAgICBjb25zdCBpMThuID0ge1xuICAgICAgICAgICAgLy8gbW9kZVxuICAgICAgICAgICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIF9fbGVnYWN5TW9kZVxuICAgICAgICAgICAgICAgICAgICA/ICdsZWdhY3knXG4gICAgICAgICAgICAgICAgICAgIDogJ2NvbXBvc2l0aW9uJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBhbGxvd0NvbXBvc2l0aW9uXG4gICAgICAgICAgICBnZXQgYWxsb3dDb21wb3NpdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hbGxvd0NvbXBvc2l0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGluc3RhbGwgcGx1Z2luXG4gICAgICAgICAgICBhc3luYyBpbnN0YWxsKGFwcCwgLi4ub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcbiAgICAgICAgICAgICAgICAgICAgIWZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5fX1ZVRV9JMThOX18gPSBpMThuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzZXR1cCBnbG9iYWwgcHJvdmlkZXJcbiAgICAgICAgICAgICAgICBhcHAuX19WVUVfSTE4Tl9TWU1CT0xfXyA9IHN5bWJvbDtcbiAgICAgICAgICAgICAgICBhcHAucHJvdmlkZShhcHAuX19WVUVfSTE4Tl9TWU1CT0xfXywgaTE4bik7XG4gICAgICAgICAgICAgICAgLy8gc2V0IGNvbXBvc2VyICYgdnVlaTE4biBleHRlbmQgaG9vayBvcHRpb25zIGZyb20gcGx1Z2luIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb25zWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0gb3B0aW9uc1swXTtcbiAgICAgICAgICAgICAgICAgICAgaTE4bi5fX2NvbXBvc2VyRXh0ZW5kID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuX19jb21wb3NlckV4dGVuZDtcbiAgICAgICAgICAgICAgICAgICAgaTE4bi5fX3Z1ZUkxOG5FeHRlbmQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5fX3Z1ZUkxOG5FeHRlbmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGdsb2JhbCBtZXRob2QgYW5kIHByb3BlcnRpZXMgaW5qZWN0aW9uIGZvciBDb21wb3NpdGlvbiBBUElcbiAgICAgICAgICAgICAgICBsZXQgZ2xvYmFsUmVsZWFzZUhhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghX19sZWdhY3lNb2RlICYmIF9fZ2xvYmFsSW5qZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFJlbGVhc2VIYW5kbGVyID0gaW5qZWN0R2xvYmFsRmllbGRzKGFwcCwgaTE4bi5nbG9iYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpbnN0YWxsIGJ1aWx0LWluIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZVxuICAgICAgICAgICAgICAgIGlmIChfX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5KGFwcCwgaTE4biwgLi4ub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHNldHVwIG1peGluIGZvciBMZWdhY3kgQVBJXG4gICAgICAgICAgICAgICAgaWYgKF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIF9fbGVnYWN5TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBhcHAubWl4aW4oZGVmaW5lTWl4aW4oX19nbG9iYWwsIF9fZ2xvYmFsLl9fY29tcG9zZXIsIGkxOG4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVsZWFzZSBnbG9iYWwgc2NvcGVcbiAgICAgICAgICAgICAgICBjb25zdCB1bm1vdW50QXBwID0gYXBwLnVubW91bnQ7XG4gICAgICAgICAgICAgICAgYXBwLnVubW91bnQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFJlbGVhc2VIYW5kbGVyICYmIGdsb2JhbFJlbGVhc2VIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGkxOG4uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB1bm1vdW50QXBwKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyBzZXR1cCB2dWUtZGV2dG9vbHMgcGx1Z2luXG4gICAgICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJiAhZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgZW5hYmxlRGV2VG9vbHMoYXBwLCBpMThuKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5DQU5OT1RfU0VUVVBfVlVFX0RFVlRPT0xTX1BMVUdJTik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNyZWF0ZUVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9fbGVnYWN5TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX3Z1ZUkxOG4gPSBfX2dsb2JhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZW5hYmxlRW1pdHRlciAmJiBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIoZW1pdHRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2NvbXBvc2VyID0gX19nbG9iYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0gJiYgX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdKGVtaXR0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2xvYmFsIGFjY2Vzc29yXG4gICAgICAgICAgICBnZXQgZ2xvYmFsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX2dsb2JhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNwb3NlKCkge1xuICAgICAgICAgICAgICAgIGdsb2JhbFNjb3BlLnN0b3AoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBAaW50ZXJuYWxcbiAgICAgICAgICAgIF9faW5zdGFuY2VzLFxuICAgICAgICAgICAgLy8gQGludGVybmFsXG4gICAgICAgICAgICBfX2dldEluc3RhbmNlLFxuICAgICAgICAgICAgLy8gQGludGVybmFsXG4gICAgICAgICAgICBfX3NldEluc3RhbmNlLFxuICAgICAgICAgICAgLy8gQGludGVybmFsXG4gICAgICAgICAgICBfX2RlbGV0ZUluc3RhbmNlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpMThuO1xuICAgIH1cbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiB1c2VJMThuKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gICAgaWYgKGluc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLk1VU1RfQkVfQ0FMTF9TRVRVUF9UT1ApO1xuICAgIH1cbiAgICBpZiAoIWluc3RhbmNlLmlzQ0UgJiZcbiAgICAgICAgaW5zdGFuY2UuYXBwQ29udGV4dC5hcHAgIT0gbnVsbCAmJlxuICAgICAgICAhaW5zdGFuY2UuYXBwQ29udGV4dC5hcHAuX19WVUVfSTE4Tl9TWU1CT0xfXykge1xuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTk9UX0lOU1RBTExFRCk7XG4gICAgfVxuICAgIGNvbnN0IGkxOG4gPSBnZXRJMThuSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgIGNvbnN0IGdsID0gZ2V0R2xvYmFsQ29tcG9zZXIoaTE4bik7XG4gICAgY29uc3QgY29tcG9uZW50T3B0aW9ucyA9IGdldENvbXBvbmVudE9wdGlvbnMoaW5zdGFuY2UpO1xuICAgIGNvbnN0IHNjb3BlID0gZ2V0U2NvcGUob3B0aW9ucywgY29tcG9uZW50T3B0aW9ucyk7XG4gICAgaWYgKF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGlmIChpMThuLm1vZGUgPT09ICdsZWdhY3knICYmICFvcHRpb25zLl9fdXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBpZiAoIWkxOG4uYWxsb3dDb21wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0lOX0xFR0FDWV9NT0RFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1c2VJMThuRm9yTGVnYWN5KGluc3RhbmNlLCBzY29wZSwgZ2wsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzY29wZSA9PT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgYWRqdXN0STE4blJlc291cmNlcyhnbCwgb3B0aW9ucywgY29tcG9uZW50T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBnbDtcbiAgICB9XG4gICAgaWYgKHNjb3BlID09PSAncGFyZW50Jykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBsZXQgY29tcG9zZXIgPSBnZXRDb21wb3NlcihpMThuLCBpbnN0YW5jZSwgb3B0aW9ucy5fX3VzZUNvbXBvbmVudCk7XG4gICAgICAgIGlmIChjb21wb3NlciA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9GT1VORF9QQVJFTlRfU0NPUEUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvc2VyID0gZ2w7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvc2VyO1xuICAgIH1cbiAgICBjb25zdCBpMThuSW50ZXJuYWwgPSBpMThuO1xuICAgIGxldCBjb21wb3NlciA9IGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGluc3RhbmNlKTtcbiAgICBpZiAoY29tcG9zZXIgPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb21wb3Nlck9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICBpZiAoJ19faTE4bicgaW4gY29tcG9uZW50T3B0aW9ucykge1xuICAgICAgICAgICAgY29tcG9zZXJPcHRpb25zLl9faTE4biA9IGNvbXBvbmVudE9wdGlvbnMuX19pMThuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnbCkge1xuICAgICAgICAgICAgY29tcG9zZXJPcHRpb25zLl9fcm9vdCA9IGdsO1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvc2VyID0gY3JlYXRlQ29tcG9zZXIoY29tcG9zZXJPcHRpb25zKTtcbiAgICAgICAgaWYgKGkxOG5JbnRlcm5hbC5fX2NvbXBvc2VyRXh0ZW5kKSB7XG4gICAgICAgICAgICBjb21wb3NlcltEaXNwb3NlU3ltYm9sXSA9XG4gICAgICAgICAgICAgICAgaTE4bkludGVybmFsLl9fY29tcG9zZXJFeHRlbmQoY29tcG9zZXIpO1xuICAgICAgICB9XG4gICAgICAgIHNldHVwTGlmZUN5Y2xlKGkxOG5JbnRlcm5hbCwgaW5zdGFuY2UsIGNvbXBvc2VyKTtcbiAgICAgICAgaTE4bkludGVybmFsLl9fc2V0SW5zdGFuY2UoaW5zdGFuY2UsIGNvbXBvc2VyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvc2VyO1xufVxuLyoqXG4gKiBDYXN0IHRvIFZ1ZUkxOG4gbGVnYWN5IGNvbXBhdGlibGUgdHlwZVxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGlzIEFQSSBpcyBwcm92aWRlZCBvbmx5IHdpdGggW3Z1ZS1pMThuLWJyaWRnZV0oaHR0cHM6Ly92dWUtaTE4bi5pbnRsaWZ5LmRldi9ndWlkZS9taWdyYXRpb24vd2F5cy5odG1sI3doYXQtaXMtdnVlLWkxOG4tYnJpZGdlKS5cbiAqXG4gKiBUaGUgcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNvbnZlcnQgYW4ge0BsaW5rIEkxOG59IGluc3RhbmNlIGNyZWF0ZWQgd2l0aCB7QGxpbmsgY3JlYXRlSTE4biB8IGNyZWF0ZUkxOG4obGVnYWN5OiB0cnVlKX0gaW50byBhIGB2dWUtaTE4bkB2OC54YCBjb21wYXRpYmxlIGluc3RhbmNlIG9mIGBuZXcgVnVlSTE4bmAgaW4gYSBUeXBlU2NyaXB0IGVudmlyb25tZW50LlxuICpcbiAqIEBwYXJhbSBpMThuIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEkxOG59XG4gKiBAcmV0dXJucyBBIGkxOG4gaW5zdGFuY2Ugd2hpY2ggaXMgY2FzdGVkIHRvIHtAbGluayBWdWVJMThufSB0eXBlXG4gKlxuICogQFZ1ZUkxOG5UaXBcbiAqIDpuZXc6IHByb3ZpZGVkIGJ5ICoqdnVlLWkxOG4tYnJpZGdlIG9ubHkqKlxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG4vKiAjX19OT19TSURFX0VGRkVDVFNfXyAqL1xuY29uc3QgY2FzdFRvVnVlSTE4biA9IChpMThuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuKSA9PiB7XG4gICAgaWYgKCEoX19WVUVfSTE4Tl9CUklER0VfXyBpbiBpMThuKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTk9UX0NPTVBBVElCTEVfTEVHQUNZX1ZVRV9JMThOKTtcbiAgICB9XG4gICAgcmV0dXJuIGkxOG47XG59O1xuZnVuY3Rpb24gY3JlYXRlR2xvYmFsKG9wdGlvbnMsIGxlZ2FjeU1vZGUsIFZ1ZUkxOG5MZWdhY3kgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4pIHtcbiAgICBjb25zdCBzY29wZSA9IGVmZmVjdFNjb3BlKCk7XG4gICAge1xuICAgICAgICBjb25zdCBvYmogPSBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXyAmJiBsZWdhY3lNb2RlXG4gICAgICAgICAgICA/IHNjb3BlLnJ1bigoKSA9PiBjcmVhdGVWdWVJMThuKG9wdGlvbnMpKVxuICAgICAgICAgICAgOiBzY29wZS5ydW4oKCkgPT4gY3JlYXRlQ29tcG9zZXIob3B0aW9ucykpO1xuICAgICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3Njb3BlLCBvYmpdO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEkxOG5JbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIHtcbiAgICAgICAgY29uc3QgaTE4biA9IGluamVjdCghaW5zdGFuY2UuaXNDRVxuICAgICAgICAgICAgPyBpbnN0YW5jZS5hcHBDb250ZXh0LmFwcC5fX1ZVRV9JMThOX1NZTUJPTF9fXG4gICAgICAgICAgICA6IEkxOG5JbmplY3Rpb25LZXkpO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFpMThuKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoIWluc3RhbmNlLmlzQ0VcbiAgICAgICAgICAgICAgICA/IEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1JcbiAgICAgICAgICAgICAgICA6IEkxOG5FcnJvckNvZGVzLk5PVF9JTlNUQUxMRURfV0lUSF9QUk9WSURFKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTE4bjtcbiAgICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gZ2V0U2NvcGUob3B0aW9ucywgY29tcG9uZW50T3B0aW9ucykge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIHJldHVybiBpc0VtcHR5T2JqZWN0KG9wdGlvbnMpXG4gICAgICAgID8gKCdfX2kxOG4nIGluIGNvbXBvbmVudE9wdGlvbnMpXG4gICAgICAgICAgICA/ICdsb2NhbCdcbiAgICAgICAgICAgIDogJ2dsb2JhbCdcbiAgICAgICAgOiAhb3B0aW9ucy51c2VTY29wZVxuICAgICAgICAgICAgPyAnbG9jYWwnXG4gICAgICAgICAgICA6IG9wdGlvbnMudXNlU2NvcGU7XG59XG5mdW5jdGlvbiBnZXRHbG9iYWxDb21wb3NlcihpMThuKSB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgcmV0dXJuIGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xuICAgICAgICAgICAgPyBpMThuLmdsb2JhbFxuICAgICAgICAgICAgOiBpMThuLmdsb2JhbC5fX2NvbXBvc2VyXG4gICAgICAgIDtcbn1cbmZ1bmN0aW9uIGdldENvbXBvc2VyKGkxOG4sIHRhcmdldCwgdXNlQ29tcG9uZW50ID0gZmFsc2UpIHtcbiAgICBsZXQgY29tcG9zZXIgPSBudWxsO1xuICAgIGNvbnN0IHJvb3QgPSB0YXJnZXQucm9vdDtcbiAgICBsZXQgY3VycmVudCA9IGdldFBhcmVudENvbXBvbmVudEluc3RhbmNlKHRhcmdldCwgdXNlQ29tcG9uZW50KTtcbiAgICB3aGlsZSAoY3VycmVudCAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGkxOG5JbnRlcm5hbCA9IGkxOG47XG4gICAgICAgIGlmIChpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbicpIHtcbiAgICAgICAgICAgIGNvbXBvc2VyID0gaTE4bkludGVybmFsLl9fZ2V0SW5zdGFuY2UoY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX18pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2dWVJMThuID0gaTE4bkludGVybmFsLl9fZ2V0SW5zdGFuY2UoY3VycmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKHZ1ZUkxOG4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb3NlciA9IHZ1ZUkxOG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5fX2NvbXBvc2VyO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NlciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIWNvbXBvc2VyW0luZWpjdFdpdGhPcHRpb25TeW1ib2xdIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2VyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcG9zZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvb3QgPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvc2VyO1xufVxuZnVuY3Rpb24gZ2V0UGFyZW50Q29tcG9uZW50SW5zdGFuY2UodGFyZ2V0LCB1c2VDb21wb25lbnQgPSBmYWxzZSkge1xuICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAge1xuICAgICAgICAvLyBpZiBgdXNlQ29tcG9uZW50OiB0cnVlYCB3aWxsIGJlIHNwZWNpZmllZCwgd2UgZ2V0IGxleGljYWwgc2NvcGUgb3duZXIgaW5zdGFuY2UgZm9yIHVzZS1jYXNlIHNsb3RzXG4gICAgICAgIHJldHVybiAhdXNlQ29tcG9uZW50XG4gICAgICAgICAgICA/IHRhcmdldC5wYXJlbnRcbiAgICAgICAgICAgIDogdGFyZ2V0LnZub2RlLmN0eCB8fCB0YXJnZXQucGFyZW50OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB9XG59XG5mdW5jdGlvbiBzZXR1cExpZmVDeWNsZShpMThuLCB0YXJnZXQsIGNvbXBvc2VyKSB7XG4gICAgbGV0IGVtaXR0ZXIgPSBudWxsO1xuICAgIHtcbiAgICAgICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGluamVjdCBjb21wb3NlciBpbnN0YW5jZSB0byBET00gZm9yIGludGxpZnktZGV2dG9vbHNcbiAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcbiAgICAgICAgICAgICAgICAhZmFsc2UgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQudm5vZGUuZWwpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudm5vZGUuZWwuX19WVUVfSTE4Tl9fID0gY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgZW1pdHRlciA9IGNyZWF0ZUVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgIGNvbnN0IF9jb21wb3NlciA9IGNvbXBvc2VyO1xuICAgICAgICAgICAgICAgIF9jb21wb3NlcltFbmFibGVFbWl0dGVyXSAmJiBfY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0oZW1pdHRlcik7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5vbignKicsIGFkZFRpbWVsaW5lRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0YXJnZXQpO1xuICAgICAgICBvblVubW91bnRlZCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgY29uc3QgX2NvbXBvc2VyID0gY29tcG9zZXI7XG4gICAgICAgICAgICAvLyByZW1vdmUgY29tcG9zZXIgaW5zdGFuY2UgZnJvbSBET00gZm9yIGludGxpZnktZGV2dG9vbHNcbiAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcbiAgICAgICAgICAgICAgICAhZmFsc2UgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQudm5vZGUuZWwgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQudm5vZGUuZWwuX19WVUVfSTE4Tl9fKSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlciAmJiBlbWl0dGVyLm9mZignKicsIGFkZFRpbWVsaW5lRXZlbnQpO1xuICAgICAgICAgICAgICAgIF9jb21wb3NlcltEaXNhYmxlRW1pdHRlcl0gJiYgX2NvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSgpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXQudm5vZGUuZWwuX19WVUVfSTE4Tl9fO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaTE4bi5fX2RlbGV0ZUluc3RhbmNlKHRhcmdldCk7XG4gICAgICAgICAgICAvLyBkaXNwb3NlIGV4dGVuZGVkIHJlc291cmNlc1xuICAgICAgICAgICAgY29uc3QgZGlzcG9zZSA9IF9jb21wb3NlcltEaXNwb3NlU3ltYm9sXTtcbiAgICAgICAgICAgIGlmIChkaXNwb3NlKSB7XG4gICAgICAgICAgICAgICAgZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfY29tcG9zZXJbRGlzcG9zZVN5bWJvbF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRhcmdldCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXNlSTE4bkZvckxlZ2FjeShpbnN0YW5jZSwgc2NvcGUsIHJvb3QsIG9wdGlvbnMgPSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbikge1xuICAgIGNvbnN0IGlzTG9jYWxTY29wZSA9IHNjb3BlID09PSAnbG9jYWwnO1xuICAgIGNvbnN0IF9jb21wb3NlciA9IHNoYWxsb3dSZWYobnVsbCk7XG4gICAgaWYgKGlzTG9jYWxTY29wZSAmJlxuICAgICAgICBpbnN0YW5jZS5wcm94eSAmJlxuICAgICAgICAhKGluc3RhbmNlLnByb3h5LiRvcHRpb25zLmkxOG4gfHwgaW5zdGFuY2UucHJveHkuJG9wdGlvbnMuX19pMThuKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTVVTVF9ERUZJTkVfSTE4Tl9PUFRJT05fSU5fQUxMT1dfQ09NUE9TSVRJT04pO1xuICAgIH1cbiAgICBjb25zdCBfaW5oZXJpdExvY2FsZSA9IGlzQm9vbGVhbihvcHRpb25zLmluaGVyaXRMb2NhbGUpXG4gICAgICAgID8gb3B0aW9ucy5pbmhlcml0TG9jYWxlXG4gICAgICAgIDogIWlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKTtcbiAgICBjb25zdCBfbG9jYWxlID0gcmVmKFxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICFpc0xvY2FsU2NvcGUgfHwgX2luaGVyaXRMb2NhbGVcbiAgICAgICAgPyByb290LmxvY2FsZS52YWx1ZVxuICAgICAgICA6IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKVxuICAgICAgICAgICAgPyBvcHRpb25zLmxvY2FsZVxuICAgICAgICAgICAgOiBERUZBVUxUX0xPQ0FMRSk7XG4gICAgY29uc3QgX2ZhbGxiYWNrTG9jYWxlID0gcmVmKFxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICFpc0xvY2FsU2NvcGUgfHwgX2luaGVyaXRMb2NhbGVcbiAgICAgICAgPyByb290LmZhbGxiYWNrTG9jYWxlLnZhbHVlXG4gICAgICAgIDogaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIGlzQXJyYXkob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIGlzUGxhaW5PYmplY3Qob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGVcbiAgICAgICAgICAgIDogX2xvY2FsZS52YWx1ZSk7XG4gICAgY29uc3QgX21lc3NhZ2VzID0gcmVmKGdldExvY2FsZU1lc3NhZ2VzKF9sb2NhbGUudmFsdWUsIG9wdGlvbnMpKTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfZGF0ZXRpbWVGb3JtYXRzID0gcmVmKGlzUGxhaW5PYmplY3Qob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpXG4gICAgICAgID8gb3B0aW9ucy5kYXRldGltZUZvcm1hdHNcbiAgICAgICAgOiB7IFtfbG9jYWxlLnZhbHVlXToge30gfSk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX251bWJlckZvcm1hdHMgPSByZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpXG4gICAgICAgID8gb3B0aW9ucy5udW1iZXJGb3JtYXRzXG4gICAgICAgIDogeyBbX2xvY2FsZS52YWx1ZV06IHt9IH0pO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9taXNzaW5nV2FybiA9IGlzTG9jYWxTY29wZVxuICAgICAgICA/IHJvb3QubWlzc2luZ1dhcm5cbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5taXNzaW5nV2FybilcbiAgICAgICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9mYWxsYmFja1dhcm4gPSBpc0xvY2FsU2NvcGVcbiAgICAgICAgPyByb290LmZhbGxiYWNrV2FyblxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX2ZhbGxiYWNrUm9vdCA9IGlzTG9jYWxTY29wZVxuICAgICAgICA/IHJvb3QuZmFsbGJhY2tSb290XG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tSb290KVxuICAgICAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrUm9vdFxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIC8vIGNvbmZpZ3VyZSBmYWxsIGJhY2sgdG8gcm9vdFxuICAgIGNvbnN0IF9mYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mYWxsYmFja0Zvcm1hdDtcbiAgICAvLyBydW50aW1lIG1pc3NpbmdcbiAgICBjb25zdCBfbWlzc2luZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5taXNzaW5nKSA/IG9wdGlvbnMubWlzc2luZyA6IG51bGw7XG4gICAgLy8gcG9zdFRyYW5zbGF0aW9uIGhhbmRsZXJcbiAgICBjb25zdCBfcG9zdFRyYW5zbGF0aW9uID0gaXNGdW5jdGlvbihvcHRpb25zLnBvc3RUcmFuc2xhdGlvbilcbiAgICAgICAgPyBvcHRpb25zLnBvc3RUcmFuc2xhdGlvblxuICAgICAgICA6IG51bGw7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX3dhcm5IdG1sTWVzc2FnZSA9IGlzTG9jYWxTY29wZVxuICAgICAgICA/IHJvb3Qud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlKVxuICAgICAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sTWVzc2FnZVxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IF9lc2NhcGVQYXJhbWV0ZXIgPSAhIW9wdGlvbnMuZXNjYXBlUGFyYW1ldGVyO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9tb2RpZmllcnMgPSBpc0xvY2FsU2NvcGVcbiAgICAgICAgPyByb290Lm1vZGlmaWVyc1xuICAgICAgICA6IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5tb2RpZmllcnMpXG4gICAgICAgICAgICA/IG9wdGlvbnMubW9kaWZpZXJzXG4gICAgICAgICAgICA6IHt9O1xuICAgIC8vIHBsdXJhbFJ1bGVzXG4gICAgY29uc3QgX3BsdXJhbFJ1bGVzID0gb3B0aW9ucy5wbHVyYWxSdWxlcyB8fCAoaXNMb2NhbFNjb3BlICYmIHJvb3QucGx1cmFsUnVsZXMpO1xuICAgIC8vIHRyYWNrIHJlYWN0aXZpdHlcbiAgICBmdW5jdGlvbiB0cmFja1JlYWN0aXZpdHlWYWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBfbG9jYWxlLnZhbHVlLFxuICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlLFxuICAgICAgICAgICAgX21lc3NhZ2VzLnZhbHVlLFxuICAgICAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSxcbiAgICAgICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8vIGxvY2FsZVxuICAgIGNvbnN0IGxvY2FsZSA9IGNvbXB1dGVkKHtcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmxvY2FsZS52YWx1ZSA6IF9sb2NhbGUudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogdmFsID0+IHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGZhbGxiYWNrTG9jYWxlXG4gICAgY29uc3QgZmFsbGJhY2tMb2NhbGUgPSBjb21wdXRlZCh7XG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgICAgID8gX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrTG9jYWxlLnZhbHVlXG4gICAgICAgICAgICAgICAgOiBfZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogdmFsID0+IHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBtZXNzYWdlc1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZS5tZXNzYWdlcy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICByZXR1cm4gX21lc3NhZ2VzLnZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzID0gY29tcHV0ZWQoKCkgPT4gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSk7XG4gICAgY29uc3QgbnVtYmVyRm9ybWF0cyA9IGNvbXB1dGVkKCgpID0+IF9udW1iZXJGb3JtYXRzLnZhbHVlKTtcbiAgICBmdW5jdGlvbiBnZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKCkge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICA/IF9jb21wb3Nlci52YWx1ZS5nZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKClcbiAgICAgICAgICAgIDogX3Bvc3RUcmFuc2xhdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5zZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldE1pc3NpbmdIYW5kbGVyKCkge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmdldE1pc3NpbmdIYW5kbGVyKCkgOiBfbWlzc2luZztcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gd2FycFdpdGhEZXBzKGZuKSB7XG4gICAgICAgIHRyYWNrUmVhY3Rpdml0eVZhbHVlcygpO1xuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgID8gd2FycFdpdGhEZXBzKCgpID0+IFJlZmxlY3QuYXBwbHkoX2NvbXBvc2VyLnZhbHVlLnQsIG51bGwsIFsuLi5hcmdzXSkpXG4gICAgICAgICAgICA6IHdhcnBXaXRoRGVwcygoKSA9PiAnJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJ0KC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgPyBSZWZsZWN0LmFwcGx5KF9jb21wb3Nlci52YWx1ZS5ydCwgbnVsbCwgWy4uLmFyZ3NdKVxuICAgICAgICAgICAgOiAnJztcbiAgICB9XG4gICAgZnVuY3Rpb24gZCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgID8gd2FycFdpdGhEZXBzKCgpID0+IFJlZmxlY3QuYXBwbHkoX2NvbXBvc2VyLnZhbHVlLmQsIG51bGwsIFsuLi5hcmdzXSkpXG4gICAgICAgICAgICA6IHdhcnBXaXRoRGVwcygoKSA9PiAnJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG4oLi4uYXJncykge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICA/IHdhcnBXaXRoRGVwcygoKSA9PiBSZWZsZWN0LmFwcGx5KF9jb21wb3Nlci52YWx1ZS5uLCBudWxsLCBbLi4uYXJnc10pKVxuICAgICAgICAgICAgOiB3YXJwV2l0aERlcHMoKCkgPT4gJycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0bShrZXkpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS50bShrZXkpIDoge307XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRlKGtleSwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUudGUoa2V5LCBsb2NhbGUpIDogZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldExvY2FsZU1lc3NhZ2UobG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZ2V0TG9jYWxlTWVzc2FnZShsb2NhbGUpIDoge307XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldExvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5zZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSA9IG1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKSA6IHt9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXREYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xuICAgICAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gZm9ybWF0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLm1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldE51bWJlckZvcm1hdChsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5nZXROdW1iZXJGb3JtYXQobG9jYWxlKSA6IHt9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldE51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XG4gICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gZm9ybWF0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgd3JhcHBlciA9IHtcbiAgICAgICAgZ2V0IGlkKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5pZCA6IC0xO1xuICAgICAgICB9LFxuICAgICAgICBsb2NhbGUsXG4gICAgICAgIGZhbGxiYWNrTG9jYWxlLFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgZGF0ZXRpbWVGb3JtYXRzLFxuICAgICAgICBudW1iZXJGb3JtYXRzLFxuICAgICAgICBnZXQgaW5oZXJpdExvY2FsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuaW5oZXJpdExvY2FsZSA6IF9pbmhlcml0TG9jYWxlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgaW5oZXJpdExvY2FsZSh2YWwpIHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuaW5oZXJpdExvY2FsZSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGF2YWlsYWJsZUxvY2FsZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUuYXZhaWxhYmxlTG9jYWxlc1xuICAgICAgICAgICAgICAgIDogT2JqZWN0LmtleXMoX21lc3NhZ2VzLnZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IG1vZGlmaWVycygpIHtcbiAgICAgICAgICAgIHJldHVybiAoX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLm1vZGlmaWVycyA6IF9tb2RpZmllcnMpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcGx1cmFsUnVsZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gKF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5wbHVyYWxSdWxlcyA6IF9wbHVyYWxSdWxlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBpc0dsb2JhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuaXNHbG9iYWwgOiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IG1pc3NpbmdXYXJuKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5taXNzaW5nV2FybiA6IF9taXNzaW5nV2FybjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IG1pc3NpbmdXYXJuKHZhbCkge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5taXNzaW5nV2FybiA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGZhbGxiYWNrV2FybigpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tXYXJuIDogX2ZhbGxiYWNrV2FybjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGZhbGxiYWNrV2Fybih2YWwpIHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubWlzc2luZ1dhcm4gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBmYWxsYmFja1Jvb3QoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrUm9vdCA6IF9mYWxsYmFja1Jvb3Q7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBmYWxsYmFja1Jvb3QodmFsKSB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrUm9vdCA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGZhbGxiYWNrRm9ybWF0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja0Zvcm1hdCA6IF9mYWxsYmFja0Zvcm1hdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGZhbGxiYWNrRm9ybWF0KHZhbCkge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja0Zvcm1hdCA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHdhcm5IdG1sTWVzc2FnZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgICAgICA/IF9jb21wb3Nlci52YWx1ZS53YXJuSHRtbE1lc3NhZ2VcbiAgICAgICAgICAgICAgICA6IF93YXJuSHRtbE1lc3NhZ2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCB3YXJuSHRtbE1lc3NhZ2UodmFsKSB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLndhcm5IdG1sTWVzc2FnZSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGVzY2FwZVBhcmFtZXRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgICAgICA/IF9jb21wb3Nlci52YWx1ZS5lc2NhcGVQYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICA6IF9lc2NhcGVQYXJhbWV0ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBlc2NhcGVQYXJhbWV0ZXIodmFsKSB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmVzY2FwZVBhcmFtZXRlciA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdCxcbiAgICAgICAgZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcixcbiAgICAgICAgc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcixcbiAgICAgICAgZ2V0TWlzc2luZ0hhbmRsZXIsXG4gICAgICAgIHNldE1pc3NpbmdIYW5kbGVyLFxuICAgICAgICBydCxcbiAgICAgICAgZCxcbiAgICAgICAgbixcbiAgICAgICAgdG0sXG4gICAgICAgIHRlLFxuICAgICAgICBnZXRMb2NhbGVNZXNzYWdlLFxuICAgICAgICBzZXRMb2NhbGVNZXNzYWdlLFxuICAgICAgICBtZXJnZUxvY2FsZU1lc3NhZ2UsXG4gICAgICAgIGdldERhdGVUaW1lRm9ybWF0LFxuICAgICAgICBzZXREYXRlVGltZUZvcm1hdCxcbiAgICAgICAgbWVyZ2VEYXRlVGltZUZvcm1hdCxcbiAgICAgICAgZ2V0TnVtYmVyRm9ybWF0LFxuICAgICAgICBzZXROdW1iZXJGb3JtYXQsXG4gICAgICAgIG1lcmdlTnVtYmVyRm9ybWF0XG4gICAgfTtcbiAgICBmdW5jdGlvbiBzeW5jKGNvbXBvc2VyKSB7XG4gICAgICAgIGNvbXBvc2VyLmxvY2FsZS52YWx1ZSA9IF9sb2NhbGUudmFsdWU7XG4gICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlID0gX2ZhbGxiYWNrTG9jYWxlLnZhbHVlO1xuICAgICAgICBPYmplY3Qua2V5cyhfbWVzc2FnZXMudmFsdWUpLmZvckVhY2gobG9jYWxlID0+IHtcbiAgICAgICAgICAgIGNvbXBvc2VyLm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5rZXlzKF9kYXRldGltZUZvcm1hdHMudmFsdWUpLmZvckVhY2gobG9jYWxlID0+IHtcbiAgICAgICAgICAgIGNvbXBvc2VyLm1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmtleXMoX251bWJlckZvcm1hdHMudmFsdWUpLmZvckVhY2gobG9jYWxlID0+IHtcbiAgICAgICAgICAgIGNvbXBvc2VyLm1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgX251bWJlckZvcm1hdHMudmFsdWVbbG9jYWxlXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb21wb3Nlci5lc2NhcGVQYXJhbWV0ZXIgPSBfZXNjYXBlUGFyYW1ldGVyO1xuICAgICAgICBjb21wb3Nlci5mYWxsYmFja0Zvcm1hdCA9IF9mYWxsYmFja0Zvcm1hdDtcbiAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tSb290ID0gX2ZhbGxiYWNrUm9vdDtcbiAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tXYXJuID0gX2ZhbGxiYWNrV2FybjtcbiAgICAgICAgY29tcG9zZXIubWlzc2luZ1dhcm4gPSBfbWlzc2luZ1dhcm47XG4gICAgICAgIGNvbXBvc2VyLndhcm5IdG1sTWVzc2FnZSA9IF93YXJuSHRtbE1lc3NhZ2U7XG4gICAgfVxuICAgIG9uQmVmb3JlTW91bnQoKCkgPT4ge1xuICAgICAgICBpZiAoaW5zdGFuY2UucHJveHkgPT0gbnVsbCB8fCBpbnN0YW5jZS5wcm94eS4kaTE4biA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTk9UX0FWQUlMQUJMRV9DT01QT1NJVElPTl9JTl9MRUdBQ1kpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gKF9jb21wb3Nlci52YWx1ZSA9IGluc3RhbmNlLnByb3h5LiRpMThuXG4gICAgICAgICAgICAuX19jb21wb3Nlcik7XG4gICAgICAgIGlmIChzY29wZSA9PT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSBjb21wb3Nlci5sb2NhbGUudmFsdWU7XG4gICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUgPSBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZTtcbiAgICAgICAgICAgIF9tZXNzYWdlcy52YWx1ZSA9IGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlO1xuICAgICAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSA9IGNvbXBvc2VyLmRhdGV0aW1lRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlID0gY29tcG9zZXIubnVtYmVyRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0xvY2FsU2NvcGUpIHtcbiAgICAgICAgICAgIHN5bmMoY29tcG9zZXIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHdyYXBwZXI7XG59XG5jb25zdCBnbG9iYWxFeHBvcnRQcm9wcyA9IFtcbiAgICAnbG9jYWxlJyxcbiAgICAnZmFsbGJhY2tMb2NhbGUnLFxuICAgICdhdmFpbGFibGVMb2NhbGVzJ1xuXTtcbmNvbnN0IGdsb2JhbEV4cG9ydE1ldGhvZHMgPSBbJ3QnLCAncnQnLCAnZCcsICduJywgJ3RtJywgJ3RlJ11cbiAgICA7XG5mdW5jdGlvbiBpbmplY3RHbG9iYWxGaWVsZHMoYXBwLCBjb21wb3Nlcikge1xuICAgIGNvbnN0IGkxOG4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGdsb2JhbEV4cG9ydFByb3BzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbXBvc2VyLCBwcm9wKTtcbiAgICAgICAgaWYgKCFkZXNjKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgd3JhcCA9IGlzUmVmKGRlc2MudmFsdWUpIC8vIGNoZWNrIGNvbXB1dGVkIHByb3BzXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZXNjLnZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgICBzZXQodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc2MudmFsdWUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVzYy5nZXQgJiYgZGVzYy5nZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaTE4biwgcHJvcCwgd3JhcCk7XG4gICAgfSk7XG4gICAgYXBwLmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRpMThuID0gaTE4bjtcbiAgICBnbG9iYWxFeHBvcnRNZXRob2RzLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29tcG9zZXIsIG1ldGhvZCk7XG4gICAgICAgIGlmICghZGVzYyB8fCAhZGVzYy52YWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcHAuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMsIGAkJHttZXRob2R9YCwgZGVzYyk7XG4gICAgfSk7XG4gICAgY29uc3QgZGlzcG9zZSA9ICgpID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgZGVsZXRlIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kaTE4bjtcbiAgICAgICAgZ2xvYmFsRXhwb3J0TWV0aG9kcy5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgZGVsZXRlIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllc1tgJCR7bWV0aG9kfWBdO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBkaXNwb3NlO1xufVxuXG57XG4gICAgaW5pdEZlYXR1cmVGbGFncygpO1xufVxuLy8gcmVnaXN0ZXIgbWVzc2FnZSBjb21waWxlciBmb3Igaml0IGNvbXBpbGF0aW9uXG5pZiAoX19JTlRMSUZZX0pJVF9DT01QSUxBVElPTl9fKSB7XG4gICAgcmVnaXN0ZXJNZXNzYWdlQ29tcGlsZXIoY29tcGlsZSk7XG59XG4vLyByZWdpc3RlciBtZXNzYWdlIHJlc29sdmVyIGF0IHZ1ZS1pMThuXG5yZWdpc3Rlck1lc3NhZ2VSZXNvbHZlcihyZXNvbHZlVmFsdWUpO1xuLy8gcmVnaXN0ZXIgZmFsbGJhY2sgbG9jYWxlIGF0IHZ1ZS1pMThuXG5yZWdpc3RlckxvY2FsZUZhbGxiYWNrZXIoZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4pO1xuLy8gTk9URTogZXhwZXJpbWVudGFsICEhXG5pZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICBjb25zdCB0YXJnZXQgPSBnZXRHbG9iYWxUaGlzKCk7XG4gICAgdGFyZ2V0Ll9fSU5UTElGWV9fID0gdHJ1ZTtcbiAgICBzZXREZXZUb29sc0hvb2sodGFyZ2V0Ll9fSU5UTElGWV9ERVZUT09MU19HTE9CQUxfSE9PS19fKTtcbn1cbmlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIDtcblxuZXhwb3J0IHsgRGF0ZXRpbWVGb3JtYXQsIEkxOG5ELCBJMThuSW5qZWN0aW9uS2V5LCBJMThuTiwgSTE4blQsIE51bWJlckZvcm1hdCwgVHJhbnNsYXRpb24sIFZFUlNJT04sIGNhc3RUb1Z1ZUkxOG4sIGNyZWF0ZUkxOG4sIHVzZUkxOG4sIHZURGlyZWN0aXZlIH07XG4iLCIvLyBUaGlzIGlzIGp1c3QgYW4gZXhhbXBsZSxcbi8vIHNvIHlvdSBjYW4gc2FmZWx5IGRlbGV0ZSBhbGwgZGVmYXVsdCBwcm9wcyBiZWxvd1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZhaWxlZDogJ0FjdGlvbiBmYWlsZWQnLFxuICBzdWNjZXNzOiAnQWN0aW9uIHdhcyBzdWNjZXNzZnVsJ1xufVxuIiwiaW1wb3J0IGVuVVMgZnJvbSAnLi9lbi1VUydcblxuZXhwb3J0IGRlZmF1bHQge1xuICAnZW4tVVMnOiBlblVTXG59XG4iLCJpbXBvcnQgeyBib290IH0gZnJvbSAncXVhc2FyL3dyYXBwZXJzJ1xuaW1wb3J0IHsgY3JlYXRlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJ1xuaW1wb3J0IG1lc3NhZ2VzIGZyb20gJ3NyYy9pMThuJ1xuXG5leHBvcnQgZGVmYXVsdCBib290KCh7IGFwcCB9KSA9PiB7XG4gIGNvbnN0IGkxOG4gPSBjcmVhdGVJMThuKHtcbiAgICBsb2NhbGU6ICdlbi1VUycsXG4gICAgZ2xvYmFsSW5qZWN0aW9uOiB0cnVlLFxuICAgIG1lc3NhZ2VzXG4gIH0pXG5cbiAgLy8gU2V0IGkxOG4gaW5zdGFuY2Ugb24gYXBwXG4gIGFwcC51c2UoaTE4bilcbn0pXG4iXSwibmFtZXMiOlsiYXNzaWduIiwiaXNTdHJpbmciLCJpc09iamVjdCIsImpvaW4iLCJjb2RlIiwic3JjIiwiZGVzIiwiZm9ybWF0IiwibWVzc2FnZXMiLCJpbmRleCIsImNvbnRleHQiLCJpc0xpdGVyYWwiLCJwYXJzZSIsImJhc2VDb21waWxlIiwiaW5pdEZlYXR1cmVGbGFncyIsInR5cGUiLCJpMThuIiwiY29kZSQxIiwiaW5jJDEiLCJpbmMiLCJWRVJTSU9OIiwicmVzb2x2ZVZhbHVlIiwibXNnIiwic291cmNlIiwibWVzc2FnZSIsImxvY2FsZSIsImxvY2FsZXMiLCJfY29udGV4dCIsIm9wdGlvbnMiLCJnbG9iYWwiLCJjb21wb3NlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSxNQUFNLFlBQVksT0FBTyxXQUFXO0FBa0NwQyxNQUFNLGFBQWEsQ0FBQyxNQUFNLFlBQVksVUFBVSxDQUFDLFlBQVksT0FBTyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUk7QUFDM0YsTUFBTSx5QkFBeUIsQ0FBQyxRQUFRLEtBQUssV0FBVyxzQkFBc0IsRUFBRSxHQUFHLFFBQVEsR0FBRyxLQUFLLEdBQUcsT0FBUSxDQUFBO0FBQzlHLE1BQU0sd0JBQXdCLENBQUMsU0FBUyxLQUFL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
