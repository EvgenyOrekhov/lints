/*jslint node, es6, maxlen: 80 */

"use strict";

const w3cjs = require("w3cjs");

const Bluebird = require("bluebird");

module.exports = function makeLinter() {
    return function lint({promisedFile}) {
        return Bluebird
            .props({
                file: promisedFile
            })
            .then(function ({file}) {
                return new Promise(
                    (resolve) => w3cjs.validate({
                        input: file,
                        callback: function ({messages}) {
                            resolve({
                                linterName: "w3cjs",
                                warnings: messages
                                    .filter(
                                        (message) => message.type === "error"
                                    )
                                    .map(function ({
                                        lastLine: line,
                                        lastColumn: column,
                                        message,
                                        type: ruleId
                                    }) {
                                        return {
                                            line,
                                            column,
                                            message,
                                            ruleId
                                        };
                                    })
                            });
                        }
                    })
                );
            });
    };
};
