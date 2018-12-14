/*jslint node */

"use strict";

const csslint = require("csslint").CSSLint;

const Bluebird = require("bluebird");

const {pipeP} = require("../util");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return pipeP([
            Bluebird.props,
            function lintAndAdaptWarnings({options, file}) {
                const {messages} = csslint.verify(file, options);

                return {
                    linterName: "CSSLint",
                    warnings: messages.map(function adaptWarning({
                        line,
                        col,
                        message,
                        rule
                    }) {
                        return {
                            line: line || 0,
                            column: col || 0,
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
