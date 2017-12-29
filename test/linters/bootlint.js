/*jslint node, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/bootlint");

const html = `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <header class="checkbox">
            </header>
        </body>
    </html>
`;

test("bootlint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve(html)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "Bootlint",
                warnings: [
                    {
                        line: 8,
                        column: 12,
                        message: "Incorrect markup used with the `.checkbox` "
                                + "class. The correct markup structure is "
                                + ".checkbox>label>input[type=\"checkbox\"]",
                        ruleId: "E017"
                    },
                    {
                        line: 0,
                        column: 0,
                        message: "Unable to locate jQuery, which is required "
                                + "for Bootstrap's JavaScript plugins to work; "
                                + "however, you might not be using Bootstrap's "
                                + "JavaScript",
                        ruleId: "W005"
                    }
                ]
            },
            "should lint using Bootlint"
        )
    );
});

test("bootlint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve(["W005"])
    });

    return lint({
        promisedFile: Promise.resolve(html)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "Bootlint",
                warnings: [
                    {
                        line: 8,
                        column: 12,
                        message: "Incorrect markup used with the `.checkbox` "
                                + "class. The correct markup structure is "
                                + ".checkbox>label>input[type=\"checkbox\"]",
                        ruleId: "E017"
                    }
                ]
            },
            "should use options"
        )
    );
});
