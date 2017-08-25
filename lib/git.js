const execa = require('execa');

async function findRoot(cwd = process.cwd()) {
  const root = await execa.stdout('git', ['rev-parse', '--show-toplevel'], {
    cwd,
  });
  return root;
}

async function findChangedFiles(query, cwd) {
  const root = await findRoot(cwd);
  const args = Array.isArray(query) ? query : query.split(' ');
  const stdout = await execa.stdout('git', args, { cwd: root });
  const files = (stdout || '').trim().split('\n');
  return files;
}

module.exports = findChangedFiles;
