/*jslint es6, node, maxlen: 80 */

'use strict';

const abstractLinter = require('../abstract-linter.js');
const jslinter = require('jslinter');

function lintAndLogWarnings(settings) {
    const warnings = jslinter(settings.data, settings.options).warnings;

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
    console.log("Running JSLint...");
    abstractLinter(settings);
}

module.exports = lint;
