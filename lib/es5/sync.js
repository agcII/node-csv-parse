'use strict';

// Generated by CoffeeScript 2.0.3
// # CSV Parse Sync

// Provides a synchronous alternative to the CSV parser.

// Usage: `records = parse(data, [options]`
var StringDecoder, parse;

var _require = require('string_decoder');

StringDecoder = _require.StringDecoder;


parse = require('./index');

module.exports = function (data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var decoder, err, parser, records;
  records = options.objname ? {} : [];
  if (data instanceof Buffer) {
    decoder = new StringDecoder();
    data = decoder.write(data);
  }
  parser = new parse.Parser(options);
  parser.push = function (record) {
    if (options.objname) {
      return records[record[0]] = record[1];
    } else {
      return records.push(record);
    }
  };
  err = parser.__write(data, false);
  if (err) {
    throw err;
  }
  if (data instanceof Buffer) {
    err = parser.__write(data.end(), true);
    if (err) {
      throw err;
    }
  }
  err = parser.__flush();
  if (err) {
    throw err;
  }
  return records;
};