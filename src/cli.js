/*jslint node, es6, maxlen: 80 */

"use strict";

const fs = require("fs");

const Bluebird = require("bluebird");

const lints = require("./lints");
const prettyPrint = require("./pretty-print");

Bluebird.promisifyAll(fs);

module.exports = function cli({
    rcFile,
    log
}) {
    return fs
        .readFileAsync(rcFile, "utf8")
        .then(JSON.parse)
        .then(lints)
        .then(prettyPrint)
        .tap(log)
        .then(function setAndReturnExitCode(output) {
            process.exitCode = Number(output.length > 0);

            return process.exitCode;
        })
        .catch(function setExitCodeTo1AndRethrowError(err) {
            process.exitCode = 1;

            // eslint-disable-next-line fp/no-throw
            throw err;
        });
};
