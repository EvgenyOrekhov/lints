/*jslint node, es6, maxlen: 80 */

"use strict";

const fs = require("fs");

const R = require("ramda");
const Bluebird = require("bluebird");

Bluebird.promisifyAll(fs);

module.exports = function promiseOptions(config) {
    return R.evolve({
        linterConfigs: R.map(
            function promiseRcFileAndParsedOptions(linterConfig) {
                const promisedRcFile = fs.readFileAsync(
                    linterConfig.rcFile,
                    "utf8"
                );

                return R.merge(linterConfig, {
                    promisedRcFile: promisedRcFile.catch(() => undefined),
                    promisedOptions: promisedRcFile
                        .then(JSON.parse)
                        .catch(() => undefined)
                });
            }
        )
    }, config);
};
