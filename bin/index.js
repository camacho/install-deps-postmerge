#!/usr/bin/env node

const install = require('../index.js');
const onError = require('../lib/onError.js');

install()
  .then(b => console.log(b ? 'Dependencies updated!' : 'No new dependencies!'))
  .catch(onError);
