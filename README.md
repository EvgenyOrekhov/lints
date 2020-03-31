<!-- markdownlint-disable single-title -->

# Deprecated in favor of using the linters directly

# lints

[![npm version](https://img.shields.io/npm/v/lints.svg?style=flat-square)](https://www.npmjs.com/package/lints)
[![Travis CI build status](https://img.shields.io/travis/EvgenyOrekhov/lints/master.svg?style=flat-square)](https://travis-ci.org/EvgenyOrekhov/lints)
[![Codacy grade](https://img.shields.io/codacy/757146806ea6467e9ecdd1cd2873ec60/master.svg?style=flat-square)](https://www.codacy.com/app/EvgenyOrekhov/lints)

## Gain the power of static code analysis with a single command

![screencast.gif](screencast.gif)

lints comes with:

- [JSLint](http://jslint.com) - The JavaScript Code Quality Tool
- [JSHint](http://jshint.com) - a tool that helps to detect errors and potential
  problems in your JavaScript code
- [ESLint](http://eslint.org) - a fully pluggable tool for identifying and
  reporting on patterns in JavaScript
- [CSSLint](http://csslint.net) - automated linting of Cascading Stylesheets
- [stylelint](http://stylelint.io) - a mighty, modern CSS linter
- [HTMLHint](http://htmlhint.com) - a Static Code Analysis Tool for HTML
- [w3cjs](http://thomasdavis.github.com/w3cjs/) - a node.js library for testing
  files or url's against the w3c html validator
- [Bootlint](http://www.bootlint.com) - an HTML linter for Bootstrap projects
- [markdownlint](https://github.com/DavidAnson/markdownlint) - a Node.js style
  checker and lint tool for Markdown files
- [remark-lint](https://github.com/wooorm/remark-lint) - a Markdown code style
  linter
- [dockerfilelint](https://github.com/replicatedhq/dockerfilelint) - linter and
  validator for Dockerfile

## Quick start

Install: `npm install lints -g`

Run: `lints`

If there are warnings, lints will send them to stdout and exit with a non-zero
exit code.

If you want lints to run when you do `npm test`, then install it as a dev
dependency:

```sh
npm install lints --save-dev
```

and add it as your `pretest` script to your package.json:

```json
"scripts": {
    "pretest": "lints"
}
```

## Configuration

To customize lints create the `.lints.json` file in the root of your project.
You can see the default config in
[src/default.lints.json](src/default.lints.json)

To customize an individual linter create a respective rc file in the root of
your project.

## Compatibility

lints is compatible with the "Current" version of Node.js.

You can check whether it is compatible with Node.js 6.0 on the
[Travis CI page](https://travis-ci.org/EvgenyOrekhov/lints)

## [Changelog](https://github.com/EvgenyOrekhov/lints/releases)

## License

[MIT](LICENSE)
