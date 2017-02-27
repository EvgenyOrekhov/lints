/*jslint node, es6, maxlen: 80 */

"use strict";

const R = require("ramda");

function prettifyWarning({
    line,
    column,
    message,
    ruleId
}) {
    return `    line ${line} column ${column}
        ${message} (${ruleId})`;
}

module.exports = R.pipe(
    R.mapObjIndexed(
        function (results, fileName) {
            return R.pipe(
                R.reject(
                    R.propSatisfies(R.isEmpty, "warnings")
                ),
                R.map(
                    R.pipe(
                        R.evolve({
                            warnings: R.map(prettifyWarning)
                        }),
                        R.evolve({
                            warnings: R.join("\n")
                        }),
                        function ({linterName, warnings}) {
                            return `${fileName} (${linterName})
${warnings}
`;
                        }
                    )
                ),
                R.join("\n")
            )(results);
        }
    ),
    R.values,
    R.reject(R.isEmpty),
    R.join("\n")
);
