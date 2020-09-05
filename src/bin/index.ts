#!/usr/bin/env node

import installDepsPostMerge from '../index';
import onError from '../lib/onError';

installDepsPostMerge()
  .then((b) =>
    console.log(b ? '🚚 Dependencies updated!' : '✅ No new dependencies!')
  )
  .catch(onError);
