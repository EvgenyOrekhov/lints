/*jslint es6, node, maxlen: 80 */

"use strict";

const abstractLinter = require("../abstract-linter.js");
const stylelint = require("stylelint");

const linterName = "stylelint";

function lintAndLogWarnings(settings) {
    function buildOptions() {
        if (settings.options.extends === undefined) {
            return settings.options;
        }

        return Object.assign(
            {},
            settings.options,
            {
                extends: typeof settings.options.extends === "string"
                    ? require.resolve(settings.options.extends)
                    : settings.options.extends.map(require.resolve)
            }
        );
    }
    function logWarnings(result) {
        settings.logWarnings(result.results[0].warnings);
    }

    const options = settings.options === undefined
        ? {"extends": require.resolve("stylelint-config-standard")}
        : buildOptions();

    return stylelint
        .lint({
            code: settings.data,
            codeFilename: settings.file,
            config: options
        })
        .then(logWarnings);
}

function logWarning(warning) {
    console.log(`    line ${warning.line} column ${warning.column}
        ${warning.text}`);
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
