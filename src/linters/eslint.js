/*jslint node */

"use strict";

const {CLIEngine} = require("eslint");
const Bluebird = require("bluebird");
const R = require("ramda");

const {pipeP} = require("../util");

module.exports = function makeLinter({promisedOptions}) {
    const promisedCliEngine = promisedOptions.then(
        (options) => new CLIEngine({
            baseConfig: R.defaultTo({extends: "eslint:recommended"}, options),
            useEslintrc: false
        })
    );

    return function lint({promisedFile, fileName}) {
        return pipeP([
            Bluebird.props,
            function lintAndAdaptWarnings({cliEngine, file}) {
                const report = cliEngine.executeOnText(file, fileName);

                const messages = R.pathOr(
                    [],
                    ["results", 0, "messages"],
                    report
                );

                return {
                    linterName: "ESLint",
                    warnings: messages.map(
                        R.pick(["line", "column", "message", "ruleId"])
                    )
                };
            }
        ])({
            cliEngine: promisedCliEngine,
            file: promisedFile
        });
    };
};
