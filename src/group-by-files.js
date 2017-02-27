/*jslint node, es6, maxlen: 80 */

"use strict";

const R = require("ramda");

module.exports = function groupByFiles(config) {
    return Object
        .keys(config)
        .reduce(
            function (acc, linterName) {
                return R.evolve({
                    fileLinters: (fileLinters) => config[linterName].files.reduce(
                        function (filesAcc, fileName) {
                            const linters = R.propOr([], fileName, filesAcc);

                            return R.assoc(
                                fileName,
                                linters.concat(linterName),
                                filesAcc
                            );
                        },
                        fileLinters
                    )
                }, acc);
            },
            {
                fileLinters: {},
                linterConfigs: R.pipe(
                    R.pickBy(
                        R.propSatisfies(
                            R.complement(R.isEmpty),
                            "files"
                        )
                    ),
                    R.mapObjIndexed(
                        R.omit(["files", "ignore"])
                    )
                )(config)
            }
        );
};
