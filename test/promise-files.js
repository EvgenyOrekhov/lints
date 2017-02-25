/*jslint node, es6, maxlen: 80 */

"use strict";

const {test} = require("tap");

const promiseFiles = require("../src/promise-files");

test("promiseFiles()", function (t) {
    const result = promiseFiles({
        files: {
            "test/stubs/text.txt": ["linter"]
        },
        linters: {
            linter: {}
        }
    });

    t.match(
        result,
        {
            files: {
                "test/stubs/text.txt": ["linter"]
            },
            linters: {
                linter: {}
            }
        },
        "should not modify original properties"
    );

    return result.promisedFiles["test/stubs/text.txt"].then(
        (file) => t.strictSame(
            file,
            "some text\n",
            "should resolve to file contents"
        )
    );
});
