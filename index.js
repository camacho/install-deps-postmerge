const findChangedFiles = require('./lib/git');
const install = require('./lib/install');
const defaults = require('./lib/defaults');

async function installDepsPostMerge(cwd = process.cwd(), _options = {}) {
  const options = Object.assign({}, defaults, _options);

  const files = await findChangedFiles(options.query, cwd);
  const foundTargets = options.targets.filter(target => files.includes(target));

  await install(foundTargets, { stdio: 'inherit', cwd: root });
}

module.exports = installDepsPostMerge;

if (require.main === module) installDepsPostMerge();
