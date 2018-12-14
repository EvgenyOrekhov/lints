/*jslint node */

"use strict";

const remark = require("remark");
const remarkLint = require("remark-lint");

const Bluebird = require("bluebird");
const R = require("ramda");

const prepareOptions = require("./prepare-options");

const {pipeP} = require("../../util");

module.exports = function makeLinter({promisedOptions}) {
    const promisedProcessor = promisedOptions.then(
        R.pipe(
            R.defaultTo({
                plugins: [
                    "remark-preset-lint-consistent",
                    "remark-preset-lint-recommended"
                ]
            }),
            prepareOptions,
            R.prop("plugins"),
            R.reduce(
                function usePlugin(processor, [plugin, pluginOptions]) {
                    return processor.use(plugin, pluginOptions);
                },
                remark().use(remarkLint)
            )
        )
    );

    return function lint({promisedFile}) {
        return pipeP([
            Bluebird.props,
            function runRemarkLint({processor, file}) {
                return processor.process(file);
            },
            function adaptWarnings({messages}) {
                return {
                    linterName: "remark-lint",
                    warnings: messages.map(
                        R.pick(["line", "column", "message", "ruleId"])
                    )
                };
            }
        ])({
            processor: promisedProcessor,
            file: promisedFile
        });
    };
};
