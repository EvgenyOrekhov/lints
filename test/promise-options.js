/*jslint node, es6, maxlen: 80 */

"use strict";

const {test} = require("tap");

const promiseOptions = require("../src/promise-options");

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        files: {
            "test/stubs/text.txt": ["linter"]
        },
        linters: {
            linter: {
                rcFile: "test/stubs/json.json"
            }
        }
    });

    t.match(
        result,
        {
            files: {
                "test/stubs/text.txt": ["linter"]
            },
            linters: {
                linter: {
                    rcFile: "test/stubs/json.json"
                }
            }
        },
        "should not modify original properties"
    );

    return Promise.all([
        result.linters.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                "{\"some\":\"json\"}\n",
                "should resolve to rcFile contents"
            )
        ),
        result.linters.linter.promisedOptions.then(
            (options) => t.strictSame(
                options,
                {some: "json"},
                "should resolve to parsed options"
            )
        )
    ]);
});

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        linters: {
            linter: {
                rcFile: "nonexistent"
            }
        }
    });

    return Promise.all([
        result.linters.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                undefined,
                "should resolve to undefined if rcFile is not found"
            )
        ),
        result.linters.linter.promisedOptions.then(
            (options) => t.strictSame(
                options,
                undefined,
                "should resolve to undefined if rcFile is not found"
            )
        )
    ]);
});

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        linters: {
            linter: {
                rcFile: "test/stubs/text.txt"
            }
        }
    });

    return result.linters.linter.promisedOptions.then(
        (options) => t.strictSame(
            options,
            undefined,
            "should resolve to undefined if there were a parse error"
        )
    );
});

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        linters: {
            linter: {
                rcFile: null
            }
        }
    });

    return Promise.all([
        result.linters.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                undefined,
                "should resolve to undefined if the \"rcFile\" option is null"
            )
        ),
        result.linters.linter.promisedOptions.then(
            (options) => t.strictSame(
                options,
                undefined,
                "should resolve to undefined if the \"rcFile\" option is null"
            )
        )
    ]);
});

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        linters: {
            linter: {}
        }
    });

    return Promise.all([
        result.linters.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                undefined,
                "should resolve to undefined if the \"rcFile\" option is "
                        + "undefined"
            )
        ),
        result.linters.linter.promisedOptions.then(
            (options) => t.strictSame(
                options,
                undefined,
                "should resolve to undefined if the \"rcFile\" option is "
                        + "undefined"
            )
        )
    ]);
});
