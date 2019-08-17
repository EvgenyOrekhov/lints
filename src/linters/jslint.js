/*jslint node */

"use strict";

const jslint = require("jslint-node");
const Bluebird = require("bluebird");

const {pipeP} = require("../util");

module.exports = function makeLinter({promisedOptions}) {
    const promisedLinter = jslint();

    return function lint({promisedFile}) {
        return pipeP([
            Bluebird.props,
            function lintAndAdaptWarnings({options, file, linter}) {
                const {warnings} = linter.jslint(file, options);

                return {
                    linterName: "JSLint",
                    warnings: warnings.map(function adaptWarning({
                        line,
                        column,
                        message,
                        code: ruleId
                    }) {
                        return {
                            line,
                            column,
                            message,
                            ruleId
                        };
                    })
                };
            }
        ])({
            options: promisedOptions,
            file: promisedFile,
            linter: promisedLinter
        });
    };
};
