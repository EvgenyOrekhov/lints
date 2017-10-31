/*jslint node, es6, maxlen: 80 */

"use strict";

const fs = require("fs");

const R = require("ramda");
const Bluebird = require("bluebird");
const jsYaml = require("js-yaml");

Bluebird.promisifyAll(fs);

module.exports = R.evolve({
    linterConfigs: R.map(
        function promiseRcFileAndParsedOptions(linterConfig) {
            const promisedRcFile = fs.readFileAsync(
                linterConfig.rcFile,
                "utf8"
            );

            return R.merge(linterConfig, {
                promisedRcFile: promisedRcFile.catch(() => undefined),
                promisedOptions: promisedRcFile
                    .then(function parse(rcFile) {
                        try {
                            return JSON.parse(rcFile);
                        } catch (ignore) {
                            return jsYaml.safeLoad(rcFile);
                        }
                    })
                    .catch(() => undefined)
            });
        }
    )
});
