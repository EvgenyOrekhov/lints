/*jslint node, es6, maxlen: 80 */

"use strict";

const {test} = require("tap");

const lints = require("../src/lints");

test("lints()", function (t) {
    const config = {
        "../test/stubs/linter": {
            files: [
                "test/stubs/text.txt"
            ],
            rcFile: "test/stubs/json.json"
        }
    };

    const promisedResult = lints(config);

    return promisedResult.then(
        (result) => t.strictSame(
            result,
            {
                "test/stubs/text.txt": [
                    {
                        rcFile: "test/stubs/json.json",
                        options: {some: "json"},
                        rcFileContents: "{\"some\":\"json\"}\n",
                        fileName: "test/stubs/text.txt",
                        file: "some text\n"
                    }
                ]
            },
            "should produce file warnings"
        )
    );
});
