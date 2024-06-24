'use strict';

const { SchemaType, Schema, Types } = require('mongoose');
const bson = require('bson');

// Define the custom Timestamp type
class Timestamp extends SchemaType {
  constructor(key, options) {
    super(key, options, 'Timestamp');
  }

  // Cast the value to a BSON Timestamp
  cast(val) {
    if (val instanceof bson.Timestamp) {
      return val;
    }

    if (typeof val === 'object' && val != null && val.hasOwnProperty('t') && val.hasOwnProperty('i')) {      
      return new bson.Timestamp(val);
    }
    if (typeof val === 'bigint') {
      return new bson.Timestamp(val);
    }

    throw new Error('Value is not a valid BSON Timestamp or compatible object');
  }
}

Schema.Types.Timestamp = Timestamp;
Types.Timestamp = Timestamp;

module.exports = Timestamp;