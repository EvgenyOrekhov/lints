/*jslint node */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/dockerfilelint");

test("dockerfilelint", function (t) {
    const lint = makeLinter({
        rcFile: ".dockerfilelintrc"
    });

    return lint({
        promisedFile: Promise.resolve(
            `from alpine

RUN sudo ls
`
        )
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "dockerfilelint",
                warnings: [
                    {
                        line: 1,
                        column: 0,
                        message: "Base Image Missing Tag",
                        ruleId: "missing_tag"
                    },
                    {
                        line: 3,
                        column: 0,
                        message: "Use Of sudo Is Not Allowed",
                        ruleId: "sudo_usage"
                    }
                ]
            },
            "should lint using dockerfilelint"
        )
    );
});

test("dockerfilelint", function (t) {
    const lint = makeLinter({
        rcFile: "test/stubs/.dockerfilelintrc"
    });

    return lint({
        promisedFile: Promise.resolve(
            `FROM alpine

RUN sudo ls
`
        )
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "dockerfilelint",
                warnings: [
                    {
                        line: 1,
                        column: 0,
                        message: "Base Image Missing Tag",
                        ruleId: "missing_tag"
                    }
                ]
            },
            "should work with subdirectories in the \"rcFile\" option"
        )
    );
});
