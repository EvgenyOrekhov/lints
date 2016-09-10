/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const csslint = require("csslint").CSSLint;

const linterName = "CSSLint";

function lintAndLogWarnings(settings) {
    const warnings = csslint.verify(settings.data, settings.options).messages;

    settings.logWarnings(warnings);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.col}
        ${warning.message} (${warning.rule.id})`);
}

function lint(config) {
    const settings = config || {};

    settings.lintAndLogWarnings = lintAndLogWarnings;
    settings.logWarning = logWarning;
    settings.linterName = linterName;

    return abstractLinter(settings);
}

module.exports = lint;
