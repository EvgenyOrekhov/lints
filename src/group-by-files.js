/*jslint node */

"use strict";

const R = require("ramda");

module.exports = function groupByFiles(config) {
    return Object.keys(config).reduce(
        (acc, linterName) => R.evolve(
            {
                fileLinters: (fileLinters) => config[linterName].files.reduce(
                    (filesAcc, fileName) => R.assoc(
                        fileName,
                        R.append(linterName, filesAcc[fileName]),
                        filesAcc
                    ),
                    fileLinters
                )
            },
            acc
        ),
        {
            fileLinters: {},
            linterConfigs: R.pipe(
                R.reject(
                    R.propSatisfies(R.isEmpty, "files")
                ),
                R.map(
                    R.omit(["files", "ignore"])
                )
            )(config)
        }
    );
};
