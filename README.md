# mongoose-bson-timestamps
Implementation of BSON timestamp type for Mongoose

## Usage

First, `npm install @mongoosejs/bson-timestamp` and import this package.

```javascript
// Using Node.js `require()`
const Timestamp = require('@mongoosejs/bson-timestamp');

// Using ES6 imports
import Timestamp from '@mongoosejs/bson-timestamp';
```

You can then use `Timestamp` as a schema type in your schema definitions.

```javascript
const Timestamp = require('@mongoosejs/bson-timestamp');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  myTimestamp: { type: Timestamp }
});
```