# install-deps-postmerge

Script for installing dependencies using npm or yarn as a `postmerge` [git-hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->

- [Install](#install)
- [What does this module do?](#what-does-this-module-do)
- [How do I use it in my project?](#how-do-i-use-it-in-my-project)
- [Requirements](#requirements)
  <!-- AUTO-GENERATED-CONTENT:END -->

## Install

<!-- AUTO-GENERATED-CONTENT:START (INSTALL:flags=["-D"]) -->

```sh
yarn add -D install-deps-postmerge
```

<!-- AUTO-GENERATED-CONTENT:END -->

## What does this module do?

This script will git a list of files by running:

```sh
git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD
```

It will take the results and check if `package.json`, `package.lock.json`, or `yarn.lock` is listed.

If any of those files is found, the script will **intelligently** pick the correct client (based on which lockfile changed and falling back to [yarn-or-npm](https://github.com/camacho/yarn-or-npm)) to `install` the dependencies.

## How do I use it in my project?

It can be used as part of a `postmerge` [npm script](https://docs.npmjs.com/misc/scripts) alongside ['husky'](https://github.com/typicode/husky) for githook integrations:

```json
{
  "scripts": {
    "postmerge": "install-deps-postmerge"
  },
  "devDependencies": {
    "install-deps-postmerge": "latest"
  },
  "optionalDependencies": {
    "husky": "latest"
  }
}
```

Alternatively, if you do not want to use ['husky'](https://github.com/typicode/husky), the script can be added as a command in the `.git/hooks/post-merge` file:

```sh
npm run -s postmerge
# or
yarn -s postmerge
```

## Requirements

<!-- AUTO-GENERATED-CONTENT:START (ENGINES) -->

- **node**: >=7.6.0
  <!-- AUTO-GENERATED-CONTENT:END -->
