import execa from 'execa';
import yarnOrNpm from 'yarn-or-npm';

function chooseClient(foundTargets: string[]): 'yarn' | 'npm' {
  // If package-lock.json found, use npm
  if (foundTargets.includes('package-lock.json')) {
    return 'npm';
  }

  // If yarn.lock found, use yarn
  if (foundTargets.includes('yarn.lock')) {
    return 'yarn';
  }

  // Otherwise, use yarn-or-npm module
  return (yarnOrNpm as () => 'yarn' | 'npm')();
}

function installDependencies(
  client: 'yarn' | 'npm',
  options: execa.CommonOptions<'utf8'> = { stdio: 'inherit' }
): execa.ExecaChildProcess {
  return execa(client, ['install'], options);
}

// eslint-disable-next-line import/prefer-default-export
export default function install(
  foundTargets: string[],
  options?: execa.CommonOptions<'utf8'>
): execa.ExecaChildProcess {
  return installDependencies(chooseClient(foundTargets), options);
}
