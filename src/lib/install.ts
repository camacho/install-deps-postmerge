import execa from 'execa';
import yarnOrNpm from 'yarn-or-npm';

function chooseClient(foundTargets) {
  // If package.lock.json found, use npm
  if (foundTargets.includes('package.lock.json')) return 'npm';

  // If yarn.lock found, use yarn
  if (foundTargets.includes('yarn.lock')) return 'yarn';

  // Otherwise, use yarn-or-npm module
  return yarnOrNpm();
}

function installDependencies(
  client: 'yarn' | 'npm',
  options: execa.CommonOptions<'utf8'> = { stdio: 'inherit' }
) {
  return execa(client, ['install'], options);
}

export function install(foundTargets, options?: execa.CommonOptions<'utf8'>) {
  return installDependencies(chooseClient(foundTargets), options);
}
