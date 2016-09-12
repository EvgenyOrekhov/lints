/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const w3cjs = require("w3cjs");

const linterName = "w3cjs";

function lintAndLogWarnings(settings) {
    function filterAndLogWarnings(result) {
        const warnings = result.messages.filter(
            (message) => message.type === "error"
        );

        settings.logWarnings(warnings);
    }

    w3cjs.validate({
        input: settings.data,
        callback: filterAndLogWarnings
    });
}

function logWarning(warning) {
    console.log(warning);
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
