/*jslint node, es6, maxlen: 80 */

"use strict";

const csslint = require("csslint").CSSLint;

const Bluebird = require("bluebird");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return Bluebird
            .props({
                options: promisedOptions,
                file: promisedFile
            })
            .then(function lintAndAdaptWarnings({options, file}) {
                const {messages} = csslint.verify(file, options);

                return {
                    linterName: "CSSLint",
                    warnings: messages.map(function adaptWarning({
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
            });
    };
};
