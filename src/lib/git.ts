import execa from 'execa';

function findRoot(): execa.ExecaChildProcess {
  return execa('git', ['rev-parse', '--show-toplevel']);
}

// eslint-disable-next-line import/prefer-default-export
export async function findChangedFiles(
  query: string | string[]
): Promise<string[]> {
  const { stdout: rootDir } = await findRoot();
  const args = Array.isArray(query) ? query : query.split(' ');
  const { stdout } = await execa('git', args, { cwd: rootDir });
  const files = (stdout || '').trim().split('\n');
  return files;
}
