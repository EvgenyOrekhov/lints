/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const markdownlint = require("markdownlint");
const Bluebird = require("bluebird");

const linterName = "markdownlint";

const markdownlintAsync = Bluebird.promisify(markdownlint);

function lintAndLogWarnings(settings) {
    function logWarnings(result) {
        settings.logWarnings(result.data);
    }

    return markdownlintAsync({
        strings: {
            data: settings.data
        },
        config: settings.options,
        resultVersion: 1
    }).then(logWarnings);
}

function logWarning(warning) {
    const message = warning.errorDetail
        ? `${warning.ruleDescription} (${warning.errorDetail})`
        : warning.ruleDescription;

    console.log(`    line ${warning.lineNumber} column 0
        ${message} (${warning.ruleAlias})`);
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
