/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const jshint = require("jshint").JSHINT;

const linterName = "JSHint";

function lintAndLogWarnings(settings) {
    jshint(settings.data, settings.options);
    settings.logWarnings(jshint.errors);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.character}
        ${warning.reason}`);
}

function lint(config) {
    const settings = Object.assign({}, config, {
        lintAndLogWarnings,
        logWarning,
        linterName
    });

    return abstractLinter(settings);
}

module.exports = lint;
