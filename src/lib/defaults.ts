export const targets = ['package.json', 'yarn.lock', 'package-lock.json'];
export const query = 'diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD';
