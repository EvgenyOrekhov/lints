/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const eslint = require("eslint").linter;

function lintAndLogWarnings(settings) {
    const warnings = eslint.verify(settings.data, settings.options);

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
    console.log("Running ESLint...");
    abstractLinter(settings);
}

module.exports = lint;
