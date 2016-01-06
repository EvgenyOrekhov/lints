/*jslint es6, node, maxlen: 80 */

'use strict';

const abstractLinter = require('../abstract-linter.js');
const htmlhint = require('htmlhint').HTMLHint;

function lintAndLogWarnings(settings) {
    const warnings = htmlhint.verify(settings.data, settings.options);

    settings.logWarnings(warnings);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.col}
        ${warning.message}`);
}

function lint(config) {
    const settings = config || {};

    settings.lintAndLogWarnings = lintAndLogWarnings;
    settings.logWarning = logWarning;
    console.log("Running HTMLHint...");
    abstractLinter(settings);
}

module.exports = lint;
