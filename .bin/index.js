#!/usr/bin/env node

const install = require('../index.js');
const onError = require('../lib/onError.js');

try {
  install();
} catch (error) {
  onError(error);
}
