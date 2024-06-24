'use strict';

const Timestamp = require('../');
const assert = require('assert');
const bson = require('bson');
const mongoose = require('mongoose');

describe('Double', function() {
  let Model;

  before(function() {
    mongoose.connect('mongodb://127.0.0.1:27017/timestamps_test');
    const schema = new mongoose.Schema({ ts: Timestamp });
    Model = mongoose.model('Test', schema);
  });

  after(function() {
    return mongoose.disconnect();
  });

  describe('casts', function() {
    it('bson timestamp instances', async function() {
      const ts = new bson.Timestamp(1444n);
      const doc = new Model({ ts });
      assert.strictEqual(doc.ts, ts);

      await doc.validate();
    });

    it('bigint', async function() {
      const ts = 8472n;
      const doc = new Model({ ts });
      assert.strictEqual(doc.ts.toString(), '8472');
      
      await doc.validate();
    });

    it('object', async function() {
      const ts = { t: 1, i: 2 };
      const doc = new Model({ ts });
      assert.strictEqual(doc.ts.toString(), '4294967298');
      
      await doc.validate();
    });

    it('null', async function() {
      const doc = new Model({ ts: null });
      assert.strictEqual(doc.ts, null);

      await doc.validate();
    });

    it('handles cast error', async function() {
      const doc = new Model({ ts: 'taco tuesday' });
      assert.strictEqual(doc.ts, undefined);

      const err = await doc.validate().then(() => null, err => err);
      assert.ok(err);
      assert.ok(err.errors['ts']);
      assert.equal(err.errors['ts'].constructor.name, 'CastError');
    });
  });

  it('saves correctly', async function() {
    const doc = new Model({ ts: 8472n });
    await doc.save();

    const { ts } = await Model.findById(doc._id).lean().orFail();
    assert.strictEqual(ts.constructor.name, 'Timestamp');
    assert.strictEqual(ts.toString(), '8472');
  });
});