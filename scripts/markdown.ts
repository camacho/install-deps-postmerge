#!/usr/bin/env node

import path from 'path';
import { spawnSync } from 'child_process';

import markdownMagic from 'markdown-magic';
import install from 'markdown-magic-install-command';
import engines from 'markdown-magic-engines';

const root = path.resolve(__dirname, '..');
const globs = [`${root}/**/**.md`, `!${root}/node_modules/**`];

// Add any configurations here
const config: markdownMagic.Configuration = {
  transforms: {
    /* eslint-disable @typescript-eslint/naming-convention */
    INSTALL: install as markdownMagic.TransformFunction,
    ENGINES: engines as markdownMagic.TransformFunction,
    /* eslint-enable @typescript-eslint/naming-convention */
  },
};

const target = process.argv[2] || globs;

function stageChanges(
  error: Error | undefined,
  output: ReadonlyArray<markdownMagic.ProcessedConfig>
): void {
  if (error) {
    throw error;
  }

  const files = output
    .map((data) => data.outputFilePath)
    .filter((file) => !!file);

  if (!files.length) {
    return;
  }

  spawnSync('prettier', [...files, '--write']);
  spawnSync('git', ['add', ...files]);
}

markdownMagic(target, config, stageChanges);
