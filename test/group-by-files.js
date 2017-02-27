/*jslint node, es6, maxlen: 80 */

"use strict";

const {test} = require("tap");

const groupByFiles = require("../src/group-by-files");

test("groupByFiles()", function (t) {
    const result = groupByFiles({
        linterAB: {
            files: [
                "fileA",
                "fileB"
            ],
            ignore: [
                "ignore"
            ],
            rcFile: ".linterAB.rc"
        },
        linterBC: {
            files: [
                "fileB",
                "fileC"
            ],
            ignore: [
                "ignore"
            ]
        }
    });

    t.strictSame(
        result,
        {
            fileLinters: {
                fileA: ["linterAB"],
                fileB: ["linterAB", "linterBC"],
                fileC: ["linterBC"]
            },
            linterConfigs: {
                linterAB: {
                    rcFile: ".linterAB.rc"
                },
                linterBC: {}
            }
        },
        "should group by files"
    );

    t.end();
});

test("groupByFiles()", function (t) {
    const result = groupByFiles({
        linterAB: {
            files: [
                "fileA",
                "fileB"
            ],
            ignore: [
                "ignore"
            ],
            rcFile: ".linterAB.rc"
        },
        linterBC: {
            files: [
                "fileB",
                "fileC"
            ],
            ignore: [
                "ignore"
            ]
        },
        linterD: {
            files: []
        }
    });

    t.strictSame(
        result,
        {
            fileLinters: {
                fileA: ["linterAB"],
                fileB: ["linterAB", "linterBC"],
                fileC: ["linterBC"]
            },
            linterConfigs: {
                linterAB: {
                    rcFile: ".linterAB.rc"
                },
                linterBC: {}
            }
        },
        "should omit linters without files"
    );

    t.end();
});
