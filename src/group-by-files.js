/*jslint node, es6, maxlen: 80 */

"use strict";

const R = require("ramda");

module.exports = function groupByFiles(config) {
    return Object
        .keys(config)
        .reduce(
            function (acc, linterName) {
                return R.evolve({
                    files: (files) => config[linterName].files.reduce(
                        function (filesAcc, fileName) {
                            const linters = R.propOr([], fileName, filesAcc);

                            return R.assoc(
                                fileName,
                                linters.concat(linterName),
                                filesAcc
                            );
                        },
                        files
                    )
                }, acc);
            },
            {
                files: {},
                linters: R.pipe(
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
