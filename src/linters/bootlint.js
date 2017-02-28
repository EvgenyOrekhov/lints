/*jslint node, es6, maxlen: 80 */

"use strict";

const bootlint = require("bootlint");

const Bluebird = require("bluebird");
const R = require("ramda");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return Bluebird
            .props({
                options: promisedOptions,
                file: promisedFile
            })
            .then(function ({options, file}) {
                const defaultedOptions = R.defaultTo([], options);

                const warnings = [];

                bootlint.lintHtml(
                    file,
                    (warning) => warnings.push(warning),
                    defaultedOptions
                );

                return {
                    linterName: "Bootlint",
                    warnings: warnings.map(function ({
                        elements,
                        message,
                        id: ruleId
                    }) {
                        const {line, column} = R.pathOr(
                            {
                                line: 0,
                                column: 0
                            },
                            [0, "startLocation"],
                            elements
                        );

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
