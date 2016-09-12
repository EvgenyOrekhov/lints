/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const CLIEngine = require("eslint").CLIEngine;

const linterName = "ESLint";

function lintAndLogWarnings(settings) {
    const options = settings.options === undefined
        ? {"extends": "eslint:recommended"}
        : settings.options;

    const cliEngine = new CLIEngine({
        baseConfig: options,
        useEslintrc: false
    });

    const warnings = cliEngine.executeOnText(settings.data).results[0].messages;

    settings.logWarnings(warnings);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.column}
        ${warning.message} (${warning.ruleId})`);
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
