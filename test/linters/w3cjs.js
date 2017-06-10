/*jslint node, es6, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");
const nock = require("nock");

const makeLinter = require("../../src/linters/w3cjs");

test("w3cjs", function (t) {
    const lint = makeLinter();

    return lint({
        promisedFile: Promise.resolve(
            `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <header role="banner">
            </header>
        </body>
    </html>
`
        )
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "w3cjs",
                warnings: [
                    {
                        line: 5,
                        column: 15,
                        message: "Element “head” is missing a required "
                                + "instance of child element “title”.",
                        ruleId: "error"
                    }
                ]
            },
            "should lint using w3cjs"
        )
    );
});

test("w3cjs", function (t) {
    nock("http://validator.w3.org")
        .filteringPath(() => "/")
        .post("/")
        .replyWithError("Error message");

    t.tearDown(() => nock.cleanAll());

    const lint = makeLinter();

    return lint({
        promisedFile: Promise.resolve("")
    }).then(
        t.notOk,
        (err) => t.strictSame(
            err.message,
            "Error message",
            "should reject w3cjs errors"
        )
    );
});
