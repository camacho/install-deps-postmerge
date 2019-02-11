const yarnOrNpm = require('yarn-or-npm');
const execa = require('execa');
const path = require('path');

function chooseClient(files) {
  // If package.lock.json found, use npm
  if (files.includes('package.lock.json')) return 'npm';

  // If yarn.lock found, use yarn
  if (files.includes('yarn.lock')) return 'yarn';

  // Otherwise, use yarn-or-npm module
  return yarnOrNpm();
}

function installDependencies(
  directory,
  client,
  options = { stdio: 'inherit' }
) {
  const args = client === 'npm' ? ['install'] : [];
  return execa.stdout(client, args, Object.assign({ cwd: directory }, options));
}

async function install(foundTargets, options) {
  const directoryFilesMap = foundTargets.reduce((dirs, file) => {
    const dir = path.dirname(file);
    // eslint-disable-next-line no-param-reassign
    if (!dirs[dir]) dirs[dir] = [];
    dirs[dir].push(file);
    return dirs;
  }, {});

  /* eslint-disable */
  // this isn't the most pleasant code to read
  // but it seems the cleanest way to execute a
  // series of async fns in a synchronous fashion
  for (const entry in Object.entries(directoryFilesMap)) {
    const [directory, files] = entry;
    await installDependencies(directory, chooseClient(files), options);
  }
  /* eslint-enable */
}

module.exports = install;
