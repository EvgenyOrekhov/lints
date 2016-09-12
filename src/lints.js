/*jslint es6, node, maxlen: 80 */
/*eslint global-require: 0 */

"use strict";

const fs = require("fs");
const Bluebird = require("bluebird");

function logError(err) {
    process.exitCode = 1;
    console.error(err);
}

function requireAndRunLinters(config) {
    function requireAndRunLinter(linterName) {
        const linter = require(`./linters/${linterName}.js`);

        linter(config[linterName]);
    }

    Object.keys(config).forEach(requireAndRunLinter);
}

Bluebird.promisifyAll(fs);

fs
    .readFileAsync(`${process.cwd()}/.lints.json`, "utf8")
    .then(JSON.parse)
    .catch(() => require("./default.lints.json"))
    .then(requireAndRunLinters)
    .catch(logError);
