/* Syntax Conventions:
 *
 * SyntacticParams:
 * <expr>  : An expression that returns a values
 * <nume>  : A nummeric expression
 * <point> : A point, which is equivilant to '(<nume>, <nume>)'
 * <name>  : The name of the currently relevant symbol
 * <mtext> : Plain multiline text
 * <text>  : Plain inline text
 *
 * Syntax Array: keyword + syntax string.
 *
 * Spaces in a syntax string represent n spaces while n > 1.
 * If 0 or more spaces are OK it's represented by ^.
 *
 * A bar/pipe ('|') represents the keyword.
 *
 * If a +1 occurance of a certein syntacticparam is needed,
 * we indictate that by usnign an astrisk ('*') before the '>'.
 *
 */

export let languageSyntax = {
    // These either return a boolean which indicates that str is valid or a string that deligates the checking on other subfunctions.
    // Recursions are condsidered incorrect code.
    syntacticPramsCheckers: {
        "<expr>":  (str) => { return true }, // TODO IMPLEMENT THIS
        "<nume>":  (str) => isNumericExpression(str),

        "<point>": (str) => "(^<nume>^,^<nume>^)",

        "<name>":  (str) => isNameAllowed(str),

        "<metxt>": (str) => true, // TODO IMPLEMENT THIS
        "<text>":  (str) => true, // TODO IMPLEMENT THIS
    },

    declarations: {
        "constants": [ "wow",      "wow <name>^=^<expr>"],
        "variables": [ ".",        ".<name>^=^<expr>"]
    },

    predefinedFunctions: {

        "circle":    [ "circle",   "| <point> <nume>"],
        "line":      [ "line",     "| <point> <point>"],
        "arc":       [ "arc",      "| <point> <nume> <nume> <nume>"],
        "triangle":  [ "triangle", "| <point> <point> <point>"],
        "polygon":   [ "polygon",  "| <point> <nume> <nume> <nume>"],
        "vector":    [ "vector",   "| <point*>"],
    },

    comments: {
        "inline":    [ "//", "//<text>"],
        "multiline": [ "/*", "/*<mtext>*/"],
    },

    predefinedConstants: [
        "PI",
        "E",
    ],
}

let runtimeVariables = {};
let runtimeConstants = {};

let parameterAttributes = {};
let parameterlessAttributes = {};


/**
 * @method
 * @param {string} name
 * @returns {boolean}
 */
function isNameAllowed(name) {
    return name !== "" && typeof(name) === "string" && /^[a-zA-Z_]*$/.test(name);
}

/**
 * @method
 * @param {string} expression
 * @returns {boolen}
 */
function isNumericExpression(expression) {
    return str === "NaN" || parseInt(str) != NaN;
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

    mohayVarNamingTests();
}

// tests();
