/*jslint node, es6, maxlen: 80 */

"use strict";

const Bluebird = require("bluebird");

module.exports = function makeLinter({
    rcFile,
    promisedOptions,
    promisedRcFile
}) {
    return function lint({fileName, promisedFile}) {
        return Bluebird
            .props({
                rcFile,
                options: promisedOptions,
                rcFileContents: promisedRcFile,
                fileName,
                file: promisedFile
            });
    };
};
