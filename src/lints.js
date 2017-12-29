/*jslint node, maxlen: 80 */

"use strict";

const R = require("ramda");
const Bluebird = require("bluebird");

const parseGlobs = require("./parse-globs");
const groupByFiles = require("./group-by-files");
const promiseOptions = require("./promise-options");
const promiseFiles = require("./promise-files");

const promiseConfig = R.pipeP(
    parseGlobs,
    groupByFiles,
    promiseOptions,
    promiseFiles
);

module.exports = function lints(config, lintersDirectory) {
    return R.pipeP(
        promiseConfig,
        function instantiateAndRunLinters({
            fileLinters,
            linterConfigs,
            promisedFiles
        }) {
            const linters = R.mapObjIndexed(
                // eslint-disable-next-line global-require
                (linterConfig, linterName) => require(
                    lintersDirectory + linterName
                )(linterConfig),
                linterConfigs
            );

            return R.mapObjIndexed(
                (linterNames, fileName) => Bluebird.map(
                    linterNames,
                    (linterName) => linters[linterName]({
                        fileName,
                        promisedFile: promisedFiles[fileName]
                    })
                ),
                fileLinters
            );
        },
        Bluebird.props
    )(config);
};
