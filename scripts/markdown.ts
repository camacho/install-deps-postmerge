#!/usr/bin/env node

import path from 'path';
import { spawnSync } from 'child_process';

import markdownMagic from 'markdown-magic';
import INSTALL from 'markdown-magic-install-command';

const root = path.resolve(__dirname, '..');
const globs = [`${root}/**/**.md`, `!${root}/node_modules/**`];

// Add any configurations here
const config = {
  transforms: {
    INSTALL,
  },
};

const target = process.argv[2] || globs;

function stageChanges(err, output) {
  if (err) throw err;

  const files = output.map(data => data.outputFilePath).filter(file => !!file);

  if (!files.length) return;

  spawnSync('prettier', [...files, '--write']);
  spawnSync('git', ['add', ...files]);
}

markdownMagic(target, config, stageChanges);
