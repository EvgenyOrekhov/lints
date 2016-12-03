/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const remark = require("remark");
const remarkLint = require("remark-lint");
const consistentRules = require("remark-preset-lint-consistent").plugins.lint;
const recommendedRules = require("remark-preset-lint-recommended").plugins.lint;

const linterName = "remark-lint";

function lintAndLogWarnings(settings) {
    function buildOptions() {
        if (settings.options.presets === undefined) {
            return settings.options.plugins.lint;
        }

        return Object.assign(
            {},
            settings.options.presets.some(
                function hasConsistentPreset(presetName) {
                    return presetName === "remark-preset-lint-consistent"
                            || presetName === "lint-consistent";
                }
            ) && consistentRules,
            settings.options.presets.some(
                function hasRecommendedPreset(presetName) {
                    return presetName === "remark-preset-lint-recommended"
                            || presetName === "lint-recommended";
                }
            ) && recommendedRules,
            settings.options.plugins && settings.options.plugins.lint
        );
    }

    const options = settings.options === undefined
        ? Object.assign(
            {},
            consistentRules,
            recommendedRules
        )
        : buildOptions();

    const result = remark()
        .use(remarkLint, options)
        .process(settings.data);

    settings.logWarnings(result.messages);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.column}
        ${warning.message} (${warning.ruleId})`);
}

function lint(config) {
    const settings = Object.assign({}, config, {
        lintAndLogWarnings,
        logWarning,
        linterName
    });

    return abstractLinter(settings);
}

module.exports = lint;
