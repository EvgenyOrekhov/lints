/*jslint node, es6, maxlen: 80 */

"use strict";

const fs = require("fs");

const R = require("ramda");
const Bluebird = require("bluebird");

Bluebird.promisifyAll(fs);

module.exports = function promiseFiles(config) {
    return R.assoc(
        "promisedFiles",
        R.mapObjIndexed(
            (ignore, fileName) => fs.readFileAsync(fileName, "utf8"),
            config.fileLinters
        ),
        config
    );
};
