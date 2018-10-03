/*jslint node, maxlen: 80 */

"use strict";

const {CLIEngine} = require("eslint");

const Bluebird = require("bluebird");
const R = require("ramda");

module.exports = function makeLinter({promisedOptions}) {
    const promisedCliEngine = promisedOptions.then(
        (options) => new CLIEngine({
            baseConfig: R.defaultTo({extends: "eslint:recommended"}, options),
            useEslintrc: false
        })
    );

    return function lint({promisedFile, fileName}) {
        return Bluebird
            .props({
                cliEngine: promisedCliEngine,
                file: promisedFile
            })
            .then(function lintAndAdaptWarnings({cliEngine, file}) {
                // eslint-disable-next-line prefer-destructuring
                const {messages} = cliEngine
                    .executeOnText(file, fileName)
                    .results[0];

                return {
                    linterName: "ESLint",
                    warnings: messages.map(
                        R.pick(["line", "column", "message", "ruleId"])
                    )
                };
            });
    };
};
