/*jslint node, es6, maxlen: 80 */

"use strict";

const R = require("ramda");
const globby = require("globby");
const Bluebird = require("bluebird");

module.exports = function parseGlobs(config) {
    const globalIgnore = R.pathOr([], ["global", "ignore"], config);

    const linterConfigs = R.dissoc("global", config);

    const promisedFiles = R.mapObjIndexed(
        function ({files, ignore: ignorePatterns}) {
            const defaultedIgnore = R.defaultTo([], ignorePatterns);

            return globby(files, {
                ignore: globalIgnore.concat(defaultedIgnore),
                nodir: true,
                nocase: true
            });
        },
        linterConfigs
    );

    return Bluebird
        .props(promisedFiles)
        .then(
            (files) => R.mapObjIndexed(
                (linterConfig, linterName) => R.assoc(
                    "files",
                    files[linterName],
                    linterConfig
                ),
                linterConfigs
            )
        );
};
