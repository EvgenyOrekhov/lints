/*jslint node, es6, maxlen: 80 */

"use strict";

const htmlhint = require("htmlhint").HTMLHint;

const Bluebird = require("bluebird");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return Bluebird
            .props({
                options: promisedOptions,
                file: promisedFile
            })
            .then(function ({options, file}) {
                const warnings = htmlhint.verify(file, options);

                return {
                    linterName: "HTMLHint",
                    warnings: warnings.map(function ({
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
