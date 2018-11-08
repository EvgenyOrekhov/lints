/*jslint node */

"use strict";

const path = require("path");

const {run} = require("dockerfilelint");

module.exports = function makeLinter({rcFile}) {
    const configDirectory = path.dirname(rcFile);

    return function lint({promisedFile}) {
        return promisedFile.then(function lintAndAdaptWarnings(file) {
            const warnings = run(configDirectory, file);

            return {
                linterName: "dockerfilelint",
                warnings: warnings.map(function adaptWarning({
                    line,
                    title: message,
                    rule: ruleId
                }) {
                    return {
                        line,
                        column: 0,
                        message,
                        ruleId
                    };
                })
            };
        });
    };
};
