/*jslint node, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const parseGlobs = require("../src/parse-globs");

test("parseGlobs()", function (t) {
    return parseGlobs({
        linter: {
            files: [
                "test/stubs/glob/*.JS"
            ],
            ignore: [
                "test/stubs/glob/ignore.js"
            ]
        },
        global: {
            ignore: [
                "test/stubs/glob/global-ignore.js"
            ]
        }
    }).then((result) => t.strictSame(
        result,
        {
            linter: {
                files: [
                    "test/stubs/glob/empty.js"
                ],
                ignore: [
                    "test/stubs/glob/ignore.js"
                ]
            }
        },
        "should parse the globs and return a new config with files"
    ));
});

test("parseGlobs()", function (t) {
    return parseGlobs({
        linter: {
            files: [
                "test/stubs/glob/*.JS"
            ],
            ignore: [
                "test/stubs/glob/ignore.js"
            ]
        }
    }).then((result) => t.strictSame(
        result,
        {
            linter: {
                files: [
                    "test/stubs/glob/empty.js",
                    "test/stubs/glob/global-ignore.js"
                ],
                ignore: [
                    "test/stubs/glob/ignore.js"
                ]
            }
        },
        "should not crash if global config is missing"
    ));
});

test("parseGlobs()", function (t) {
    return parseGlobs({
        linter: {
            files: [
                "test/stubs/glob/*.JS"
            ]
        }
    }).then((result) => t.strictSame(
        result,
        {
            linter: {
                files: [
                    "test/stubs/glob/empty.js",
                    "test/stubs/glob/global-ignore.js",
                    "test/stubs/glob/ignore.js"
                ]
            }
        },
        "should not crash if linter's \"ignore\" is missing"
    ));
});
