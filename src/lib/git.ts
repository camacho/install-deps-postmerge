import execa from 'execa';

function findRoot() {
  return execa('git', ['rev-parse', '--show-toplevel']);
}

export async function findChangedFiles(query: string | string[]) {
  const { stdout: rootDir } = await findRoot();
  const args = Array.isArray(query) ? query : query.split(' ');
  const { stdout } = await execa('git', args, { cwd: rootDir });
  const files = (stdout || '').trim().split('\n');
  return files;
}
