/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const stylelint = require("stylelint");

const linterName = "stylelint";

function lintAndLogWarnings(settings) {
    function logWarnings(result) {
        settings.logWarnings(result.results[0].warnings);
    }

    const options = settings.options === undefined
        ? {"extends": "stylelint-config-standard"}
        : settings.options;

    return stylelint
        .lint({
            code: settings.data,
            codeFilename: settings.file,
            config: options
        })
        .then(logWarnings);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.column}
        ${warning.text}`);
}

function lint(config) {
    const settings = config || {};

    settings.lintAndLogWarnings = lintAndLogWarnings;
    settings.logWarning = logWarning;
    settings.linterName = linterName;
    abstractLinter(settings);
}

module.exports = lint;
