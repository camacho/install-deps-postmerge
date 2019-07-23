const execa = require('execa');

function findRoot() {
  return execa('git', ['rev-parse', '--show-toplevel']);
}

async function findChangedFiles(query) {
  const { stdout: rootDir } = await findRoot();
  const args = Array.isArray(query) ? query : query.split(' ');
  const { stdout } = await execa('git', args, { cwd: rootDir });
  const files = (stdout || '').trim().split('\n');
  return files;
}

module.exports = findChangedFiles;
