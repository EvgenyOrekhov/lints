/*jslint node */

"use strict";

const w3cjs = require("w3cjs");
const Bluebird = require("bluebird");

module.exports = function makeLinter() {
    return function lint({promisedFile}) {
        return Bluebird.props({file: promisedFile}).then(
            function lintAndAdaptWarnings({file}) {
                // eslint-disable-next-line promise/avoid-new
                return new Promise(
                    (resolve, reject) => w3cjs.validate({
                        input: file,
                        callback: function callback(err, result) {
                            if (err) {
                                return reject(err);
                            }

                            const {messages} = result;

                            resolve({
                                linterName: "w3cjs",
                                warnings: messages.filter(
                                    (message) => message.type === "error"
                                ).map(function adaptWarning({
                                    lastLine,
                                    lastColumn,
                                    message,
                                    type: ruleId
                                }) {
                                    return {
                                        line: lastLine || 0,
                                        column: lastColumn || 0,
                                        message,
                                        ruleId
                                    };
                                })
                            });
                        }
                    })
                );
            }
        );
    };
};
