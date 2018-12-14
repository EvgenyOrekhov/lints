/*jslint node */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const promiseOptions = require("../src/promise-options");

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        linterConfigs: {
            linter: {
                rcFile: "test/stubs/json.json"
            }
        }
    });

    t.match(
        result,
        {
            linterConfigs: {
                linter: {
                    rcFile: "test/stubs/json.json"
                }
            }
        },
        "should not modify original properties"
    );

    return Promise.all([
        result.linterConfigs.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                "{\"some\":\"json\"}\n",
                "should resolve to rcFile contents"
            )
        ),
        result.linterConfigs.linter.promisedOptions.then(
            (options) => t.strictSame(
                options,
                {some: "json"},
                "should parse JSON"
            )
        )
    ]);
});

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        linterConfigs: {
            linter: {
                rcFile: "test/stubs/yaml.yaml"
            }
        }
    });

    return Promise.all([
        result.linterConfigs.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                "%YAML 1.2\n---\nsome: yaml\n",
                "should resolve to rcFile contents"
            )
        ),
        result.linterConfigs.linter.promisedOptions.then(
            (options) => t.strictSame(
                options,
                {some: "yaml"},
                "should parse YAML"
            )
        )
    ]);
});

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        linterConfigs: {
            linter: {
                rcFile: "nonexistent"
            }
        }
    });

    return Promise.all([
        result.linterConfigs.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                undefined,
                "should resolve to undefined if rcFile is not found"
            )
        ),
        result.linterConfigs.linter.promisedOptions.then(
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
        linterConfigs: {
            linter: {
                rcFile: "test/stubs/unparseable.txt"
            }
        }
    });

    return result.linterConfigs.linter.promisedOptions.then(
        (options) => t.strictSame(
            options,
            undefined,
            "should resolve to undefined if there were a parse error"
        )
    );
});

test("promiseOptions()", function (t) {
    const result = promiseOptions({
        linterConfigs: {
            linter: {
                rcFile: null
            }
        }
    });

    return Promise.all([
        result.linterConfigs.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                undefined,
                "should resolve to undefined if the \"rcFile\" option is null"
            )
        ),
        result.linterConfigs.linter.promisedOptions.then(
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
        linterConfigs: {
            linter: {}
        }
    });

    return Promise.all([
        result.linterConfigs.linter.promisedRcFile.then(
            (rcFileContents) => t.strictSame(
                rcFileContents,
                undefined,
                (
                    "should resolve to undefined if the \"rcFile\" option is "
                    + "undefined"
                )
            )
        ),
        result.linterConfigs.linter.promisedOptions.then(
            (options) => t.strictSame(
                options,
                undefined,
                (
                    "should resolve to undefined if the \"rcFile\" option is "
                    + "undefined"
                )
            )
        )
    ]);
});
