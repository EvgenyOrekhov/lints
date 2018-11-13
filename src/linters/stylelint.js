/*jslint node */

"use strict";

const stylelint = require("stylelint");

const Bluebird = require("bluebird");
const R = require("ramda");

module.exports = function makeLinter({promisedOptions}) {
    const promisedResolvedOptions = promisedOptions.then(
        R.pipe(
            R.defaultTo({extends: "stylelint-config-standard"}),

            /*
             * Note: require.resolve() is needed for the "extends" feature due
             * to a bug in stylelint.
             *
             * See https://github.com/stylelint/stylelint/issues/1973
             */

            R.evolve({
                extends: R.ifElse(
                    R.is(String),
                    (baseConfig) => require.resolve(baseConfig),
                    R.map(require.resolve)
                )
            })
        )
    );

    return function lint({promisedFile, fileName}) {
        return R.pipeP(
            Bluebird.props,
            function runStylelint({options, file}) {
                return stylelint.lint({
                    code: file,
                    codeFilename: fileName,
                    config: options
                });
            },
            function adaptWarnings({results}) {
                return {
                    linterName: "stylelint",
                    warnings: results[0].warnings.map(
                        function adaptWarning({
                            line,
                            column,
                            text: message,
                            rule: ruleId
                        }) {
                            return {
                                line,
                                column,
                                message: message.replace(/\s\(.+\)$/u, ""),
                                ruleId
                            };
                        }
                    )
                };
            }
        )({
            options: promisedResolvedOptions,
            file: promisedFile
        });
    };
};
