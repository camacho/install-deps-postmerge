module.exports = {
  targets: ['yarn.lock', 'package.json', 'package.lock.json'],
  query: 'diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD',
};
