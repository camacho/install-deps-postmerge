import install from '../index';
import onError from '../lib/onError';

install()
  .then((b) =>
    console.log(b ? '🚚 Dependencies updated!' : '✅ No new dependencies!')
  )
  .catch(onError);
