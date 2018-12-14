/*jslint node */

"use strict";

const htmlhint = require("htmlhint").HTMLHint;

const Bluebird = require("bluebird");

const {pipeP} = require("../util");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return pipeP([
            Bluebird.props,
            function lintAndAdaptWarnings({options, file}) {
                const warnings = htmlhint.verify(file, options);

                return {
                    linterName: "HTMLHint",
                    warnings: warnings.map(function adaptWarning({
                        line,
                        col: column,
                        message,
                        rule
                    }) {
                        return {
                            line,
                            column,
                            message,
                            ruleId: rule.id
                        };
                    })
                };
            }
        ])({
            options: promisedOptions,
            file: promisedFile
        });
    };
};
