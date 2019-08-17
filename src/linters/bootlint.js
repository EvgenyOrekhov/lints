/*jslint node */

"use strict";

const bootlint = require("bootlint");
const Bluebird = require("bluebird");
const R = require("ramda");

const {pipeP} = require("../util");

module.exports = function makeLinter({promisedOptions}) {
    return function lint({promisedFile}) {
        return pipeP([
            Bluebird.props,
            function lintAndAdaptWarnings({options, file}) {
                const defaultedOptions = R.defaultTo([], options);

                const warnings = [];

                bootlint.lintHtml(
                    file,
                    // eslint-disable-next-line fp/no-mutating-methods
                    (warning) => warnings.push(warning),
                    defaultedOptions
                );

                return {
                    linterName: "Bootlint",
                    warnings: warnings.map(function adaptWarning({
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
            }
        ])({
            options: promisedOptions,
            file: promisedFile
        });
    };
};
