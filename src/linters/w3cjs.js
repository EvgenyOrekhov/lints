/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const w3cjs = require("w3cjs");

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
    const settings = config || {};

    settings.lintAndLogWarnings = lintAndLogWarnings;
    settings.logWarning = logWarning;
    console.log("Running w3cjs...");
    abstractLinter(settings);
}

module.exports = lint;
