/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const stylelint = require("stylelint");

function throwError(err) {
    process.exitCode = 1;
    console.error(err);

    throw err;
}

function lintAndLogWarnings(settings) {
    function logWarnings(result) {
        settings.logWarnings(result.results[0].warnings);
    }

    const options = settings.options === undefined
        ? {"extends": "stylelint-config-standard"}
        : settings.options;

    stylelint
        .lint({
            code: settings.data,
            codeFilename: settings.file,
            config: options
        })
        .then(logWarnings)
        .catch(throwError);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.column}
        ${warning.text}`);
}

function lint(config) {
    const settings = config || {};

    settings.lintAndLogWarnings = lintAndLogWarnings;
    settings.logWarning = logWarning;
    console.log("Running stylelint...");
    abstractLinter(settings);
}

module.exports = lint;
