import { findChangedFiles } from './lib/git';
import { install } from './lib/install';
import * as defaults from './lib/defaults';

async function installDepsPostMerge(_options = {}): Promise<boolean> {
  const options = { ...defaults, ..._options };

  const files = await findChangedFiles(options.query);
  const foundTargets = options.targets.filter((target) =>
    files.includes(target)
  );

  if (!foundTargets.length) {
    return false;
  }

  await install(foundTargets);
  return true;
}

export default installDepsPostMerge;
