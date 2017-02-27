/*jslint node, es6, maxlen: 80 */

"use strict";

const jshint = require("jshint").JSHINT;

const Bluebird = require("bluebird");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return Bluebird
            .props({
                options: promisedOptions,
                file: promisedFile
            })
            .then(function ({options, file}) {
                jshint(file, options);

                return {
                    linterName: "JSHint",
                    warnings: jshint.errors.map(function ({
                        line,
                        character: column,
                        reason: message,
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
            });
    };
};
