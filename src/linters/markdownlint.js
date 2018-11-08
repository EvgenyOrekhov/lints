/*jslint node */

"use strict";

const markdownlint = require("markdownlint");

const Bluebird = require("bluebird");

const markdownlintAsync = Bluebird.promisify(markdownlint);

const indexOfRuleAlias = 1;

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return Bluebird
            .props({
                options: promisedOptions,
                file: promisedFile
            })
            .then(function runMarkdownlint({options, file}) {
                return markdownlintAsync({
                    strings: {data: file},
                    config: options
                });
            })
            .then(function adaptWarnings({data}) {
                return {
                    linterName: "markdownlint",
                    warnings: data.map(function adaptWarning({
                        lineNumber: line,
                        errorDetail,
                        ruleDescription,
                        ruleNames
                    }) {
                        return {
                            line,
                            column: 0,
                            message: errorDetail
                                ? `${ruleDescription} (${errorDetail})`
                                : ruleDescription,
                            ruleId: ruleNames[indexOfRuleAlias]
                        };
                    })
                };
            });
    };
};
