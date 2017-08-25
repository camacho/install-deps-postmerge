const execa = require('execa');

async function findRoot() {
  const rootDir = await execa.stdout('git', ['rev-parse', '--show-toplevel']);
  return rootDir;
}

async function findChangedFiles(query) {
  const rootDir = await findRoot();
  const args = Array.isArray(query) ? query : query.split(' ');
  const stdout = await execa.stdout('git', args, { cwd: rootDir });
  const files = (stdout || '').trim().split('\n');
  return files;
}

module.exports = findChangedFiles;
