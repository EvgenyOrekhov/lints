/*jslint node, es6, maxlen: 80 */

"use strict";

const {jslint} = require("jslinter");

const Bluebird = require("bluebird");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return Bluebird
            .props({
                options: promisedOptions,
                file: promisedFile
            })
            .then(function ({options, file}) {
                const {warnings} = jslint(file, options);

                return {
                    linterName: "JSLint",
                    warnings: warnings.map(function ({
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
            });
    };
};
