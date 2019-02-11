const findChangedFiles = require('./src/git');
const install = require('./src/install');
const defaults = require('./src/defaults');

async function installDepsPostMerge(_options = {}) {
  const options = Object.assign({}, defaults, _options);

  const files = await findChangedFiles(options.query);
  const foundTargets = options.targets.filter(target => files.includes(target));

  if (!foundTargets.length) return false;

  await install(foundTargets);
  return true;
}

module.exports = installDepsPostMerge;

// For testing
if (require.main === module) installDepsPostMerge();
