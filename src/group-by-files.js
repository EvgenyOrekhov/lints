/*jslint node, es6, maxlen: 80 */
/*eslint indent: "off" */

"use strict";

const R = require("ramda");

module.exports = function groupByFiles(config) {
    return Object
        .keys(config)
        .reduce(
            (acc, linterName) => R.evolve(
                {
                    fileLinters: (fileLinters) => config[linterName]
                        .files
                        .reduce(
                            function addLinterNameToFile(filesAcc, fileName) {
                                const linters = R.propOr(
                                    [],
                                    fileName,
                                    filesAcc
                                );

                                return R.assoc(
                                    fileName,
                                    linters.concat(linterName),
                                    filesAcc
                                );
                            },
                            fileLinters
                        )
                },
                acc
            ),
            {
                fileLinters: {},
                linterConfigs: R.pipe(
                    R.pickBy(
                        R.propSatisfies(
                            R.complement(R.isEmpty),
                            "files"
                        )
                    ),
                    R.map(
                        R.omit(["files", "ignore"])
                    )
                )(config)
            }
        );
};
