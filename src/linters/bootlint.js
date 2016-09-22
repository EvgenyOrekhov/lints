/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const bootlint = require("bootlint");

const linterName = "Bootlint";

function lintAndLogWarnings(settings) {
    const options = settings.options === undefined
        ? []
        : settings.options;

    const warnings = [];

    bootlint.lintHtml(
        settings.data,
        // eslint-disable-next-line fp/no-mutating-methods
        (warning) => warnings.push(warning),
        options
    );

    settings.logWarnings(warnings);
}

function logWarning(warning) {
    console.log(`    ${warning.message} (${warning.id})`);
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
