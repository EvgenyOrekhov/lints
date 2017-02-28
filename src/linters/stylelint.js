/*jslint node, es6, maxlen: 80 */

"use strict";

const stylelint = require("stylelint");

const Bluebird = require("bluebird");
const R = require("ramda");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile, fileName}) {
        return Bluebird
            .props({
                options: promisedOptions,
                file: promisedFile
            })
            .then(function ({options, file}) {
                const defaultedOptions = R.defaultTo(
                    {extends: "stylelint-config-standard"},
                    options
                );

/*
 * Note: require.resolve() is needed for the "extends" feature due to a bug in
 * stylelint.
 *
 * See https://github.com/stylelint/stylelint/issues/1973
 * and https://github.com/stylelint/stylelint/issues/1973#issuecomment-264695959
 */

                const resolvedOptions = R.evolve(
                    {
                        extends: R.ifElse(
                            R.is(String),
                            require.resolve,
                            R.map(require.resolve)
                        )
                    },
                    defaultedOptions
                );

                return stylelint
                    .lint({
                        code: file,
                        codeFilename: fileName,
                        config: resolvedOptions
                    })
                    .then(function ({results}) {
                        return {
                            linterName: "stylelint",
                            warnings: results[0].warnings.map(function ({
                                line,
                                column,
                                text: message,
                                rule: ruleId
                            }) {
                                return {
                                    line,
                                    column,
                                    message: message.replace(/\s\(.+\)$/, ""),
                                    ruleId
                                };
                            })
                        };
                    });
            });
    };
};
