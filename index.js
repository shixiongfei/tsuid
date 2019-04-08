"use strict";

const Long = require("long");

// Date starts 2015-01-01
const EPOCH = 1420070400000;

// +-------------------------+--------------------+-----------------+
// |        timestamp        |      additional    |     counter     |
// |         41 bits         |  13 bits : 0~8191  | 10 bit : 0~1023 |
// +-------------------------+--------------------+-----------------+

function generate(counter, additional = 0) {
  let now = Date.now();

  if (!additional) {
    additional = Math.floor(Math.random() * 10000);
  }

  return Long.fromNumber(now - EPOCH, true).shl(23)
    .or((additional & 0x1FFF) << 10)
    .or((counter) & 0x3FF);
}

function paramDefault(param, defaultValue) {
  return param == undefined ? defaultValue : param;
}

exports = module.exports = (options) => {
  options = options || {};

  if (typeof options === 'string') {
    options = { type: options };
  }

  let type = paramDefault(options.type, "base64");
  let additional = paramDefault(options.additional, 0);
  let count = paramDefault(options.counter, Math.floor(Math.random() * 10000));

  let tsuid = generate(count, additional);

  if (type === "base64") {
    // NOTE: this is URL-safe Base64Url format. not pure base64.
    return Buffer.from(tsuid.toBytes())
      .toString("base64")
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  } else if (type === "hash" || type == "hex") {
    return tsuid.toString(16);
  } else if (type === "decimal" || type == "number") {
    return tsuid.toString();
  } else if (type === "long") {
    return tsuid;
  } else throw new TypeError("Unknown encoding: " + type);
};
