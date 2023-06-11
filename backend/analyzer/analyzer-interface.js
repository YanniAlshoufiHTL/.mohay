import { languageSyntax } from "./analyzer-syntax.js";

/*
 * analyze function (takes String, outputs object)
 *
 * output object interface:
 * {
 *  codeCorrect: boolean,
 *
 *  keywords: […], // example for keyword: { value: "wow", row: 4, col: 5 }
 *  expressions: […], // example for expression: { occurence: "PI", row: 1, col: 0 }
 *
 *  variables: […], // example for variable: { name: "peter", row: 22, col: 10 }
 *  constants: […], // example for constant: { name: "PI", row: 1, col: 0 }
 *  functions: […], // example for function: { name: "rect", row: 50, col: 10 }
 *
 *  errors: […], // example for error: { message: "Unknown symbol 'f'.", row: 3, col_start: 10, col_end: 15 }
 * }
 */

function analyze(code) {
    let result = {
        codeCorrect: false,

        keywords: [],
        expressions: [],

        variables: [],
        constants: [],
        functions: [],

        errors: [],
    };

    let lines = code.split(/\r?\n/);

    for (let line of lines) {
        line = line.trim();

        if (line[0] === "$")
          return "TODO: MAKE THIS RETURN ERROR!";

        for (const key in languageSyntax) {
            for (const [index, [innerKey, innerValue]] of Object.entries(Object.entries(languageSyntax[key]))) {
                let keyword = innerValue[0];

                if (keyword && keyword !== "" && innerKey[0] !== "$") {
                    const splitLine = line.split(" ");
                    const firstWordOfLine = splitLine[0];

                    if (firstWordOfLine === keyword || line[0] === "." && keyword === ".") {
                        let syntaxLine = Object.entries(languageSyntax[key])[index];
                        let symanticSyntaxLine = syntaxLine[1];

                        symanticSyntaxLine[1] = symanticSyntaxLine[1].split("").map((value, idx) => value == "|" ? symanticSyntaxLine[0] : value).join("");

                        // split both next to each other
                        const splitSyntax = symanticSyntaxLine[1].split(" ");
                        const splitConcrete = line.split(" ");

                        console.log(splitSyntax);
                        console.log(splitConcrete);
                    }
                }
            }
        }
    }

    return result;
}

window.analyze = analyze;

/**
 * @method
 * @param {string} name
 * @returns {boolean}
 */
function isNameAllowed(name) {
    return name !== "" && typeof(name) === "string" && /^[a-zA-Z_]*$/.test(name);
}

import { assert_eq } from './assert.js';

/**
 * @method
 * @returns {void}
 */
function tests() {
    const mohayVarNamingTests = () => {
        console.log("Unit testing...");
        assert_eq(isNameAllowed("correctName"), true);
        assert_eq(isNameAllowed("correct_name"), true);
        assert_eq(isNameAllowed("Correct_Name"), true);

        assert_eq(isNameAllowed("incorrect Name"), false);
        assert_eq(isNameAllowed("incorrect-Name"), false);
        assert_eq(isNameAllowed("%ASasfjv89jl;a/;"), false);
        assert_eq(isNameAllowed(""), false);
        assert_eq(isNameAllowed(null), false);
        assert_eq(isNameAllowed(5), false);
        assert_eq(isNameAllowed(true), false);
    };

    // mohayVarNamingTests();
}

tests();
