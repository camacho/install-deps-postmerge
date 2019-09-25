export const targets = ['yarn.lock', 'package.json', 'package.lock.json'];
export const query = 'diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD';
