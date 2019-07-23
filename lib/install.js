const yarnOrNpm = require('yarn-or-npm');
const execa = require('execa');

function chooseClient(foundTargets) {
  // If package.lock.json found, use npm
  if (foundTargets.includes('package.lock.json')) return 'npm';

  // If yarn.lock found, use yarn
  if (foundTargets.includes('yarn.lock')) return 'yarn';

  // Otherwise, use yarn-or-npm module
  return yarnOrNpm();
}

function installDependencies(client, options = { stdio: 'inherit' }) {
  return execa(client, ['install'], options);
}

function install(foundTargets, options) {
  return installDependencies(chooseClient(foundTargets), options);
}

module.exports = install;
