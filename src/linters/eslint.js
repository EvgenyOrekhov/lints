/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const eslint = require("eslint").linter;

const linterName = "ESLint";

function lintAndLogWarnings(settings) {
    const options = settings.options === undefined
        ? {"extends": "eslint:recommended"}
        : settings.options;

    const warnings = eslint.verify(settings.data, options);

    settings.logWarnings(warnings);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.column}
        ${warning.message}`);
}

function lint(config) {
    const settings = config || {};

    settings.lintAndLogWarnings = lintAndLogWarnings;
    settings.logWarning = logWarning;
    settings.linterName = linterName;

    return abstractLinter(settings);
}

module.exports = lint;
