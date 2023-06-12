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

let languageSyntax = {
    // These either return a boolean which indicates that str is valid or a string that deligates the checking on other subfunctions.
    // Recursions are condsidered incorrect code.
    syntacticPramsCheckers: {
        "<expr>":  (str) => isStringExpression(str) || isNumericExpression(str), // TODO IMPLEMENT THIS
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
 * @returns {boolean}
 */
function isNumericExpression(expression) {
    return /[0123456789\-\*\+\/]/.test(expression);
}

/**
 * @method
 * @param {string} expression
 * @returns {boolean}
 */
function isStringExpression(expression) {
    const trimmed = expression.trim();
    const first = trimmed[0];
    const last = trimmed[trimmed.length - 1];

    return first === "\"" && last === "\"";
}

/* Unit Testing */

// /**
//  * @method
//  * @returns {void}
//  */
function tests() {
    console.log("\n\n\n\n\nUnit testing...\n");

    const mohayVarNamingTests = () => {
        console.log("\n\nVariable Naming Tests...\n");

        assert_eq(isNameAllowed("correctName"), true, "correctName");
        assert_eq(isNameAllowed("correct_name"), true, "correct_name");
        assert_eq(isNameAllowed("Correct_Name"), true, "Correct_Name");

        assert_eq(isNameAllowed("incorrect Name"), false, "incorrect Name");
        assert_eq(isNameAllowed("incorrect-Name"), false, "incorrect-Name");
        assert_eq(isNameAllowed("%ASasfjv89jl;a/;"), false, "%ASasfjv89jl;a/;");
        assert_eq(isNameAllowed(""), false, "empty string");
        assert_eq(isNameAllowed(null), false, "null (not string)");
        assert_eq(isNameAllowed(5), false), "5 (not string)";
        assert_eq(isNameAllowed(true), false, "true (not string)");
    };

    const mohayNumericExpressionTests = () => {
        console.log("\n\nNummeric Expression Tests...\n");

        assert_eq(isNumericExpression("5"), true, "5");
        assert_eq(isNumericExpression("13"), true, "13");
        assert_eq(isNumericExpression("-18"), true, "-18");
        assert_eq(isNumericExpression("3.0"), true, "3.0");
        assert_eq(isNumericExpression("-3.0"), true, "-3.0");
        assert_eq(isNumericExpression("3.5"), true, "3.5");
        assert_eq(isNumericExpression("-3.5"), true, "-3.5");
        assert_eq(isNumericExpression("0xAFF2b"), true, "0xAFF2b");
        assert_eq(isNumericExpression("-0"), true, "-0");
        assert_eq(isNumericExpression("0"), true, "0");
        assert_eq(isNumericExpression("NaN"), true, "NaN");
        assert_eq(isNumericExpression("Infinity"), true, "Infinity");
        assert_eq(isNumericExpression("- Infinity"), true, "- Infinity");
        assert_eq(isNumericExpression("   - Infinity "), true, "   - Infinity ");
        assert_eq(isNumericExpression("   -    0 "), true, "   -    0 ");

        assert_eq(isNumericExpression(""), false, "empty string");
        assert_eq(isNumericExpression("4,5"), false, "4,5");

        assert_eq(isNumericExpression("Inf"), false, "Inf");
        assert_eq(isNumericExpression("infinity"), false, "infinity");
        assert_eq(isNumericExpression("--"), false, "--");
        assert_eq(isNumericExpression("++4"), false, "++4");
        assert_eq(isNumericExpression("asdf"), false, "asdf");
        assert_eq(isNumericExpression(undefined), false, "undefined (not string)");
        assert_eq(isNumericExpression(34), false, "34 (not string)");
        assert_eq(isNumericExpression(-34), false, "-34 (not string)");
        assert_eq(isNumericExpression(-3.4), false, "-3.4 (not string)");
        assert_eq(isNumericExpression(0xFFF), false, "0xFFF (not string)");
        assert_eq(isNumericExpression(/a/), false, "/a/ (not string)");
    }

    const mohayStringExpressionTests = () => {
        console.log("\n\nString Expression Tests...\n");

        assert_eq(isStringExpression('"normal string"'), true);
        assert_eq(isStringExpression('  "normal string but with too many spaces" '), true);
        assert_eq(isStringExpression('          "      ;lsd;f83j lksajf;sdlkfj asdjlfd89pf7asdf883j;;&        "              '), true);
        assert_eq(isStringExpression('""'), true);
        assert_eq(isStringExpression('   ""                    '), true);

        assert_eq(isStringExpression('incorrectString"'), false);
        assert_eq(isStringExpression('incorrect String"'), false);
        assert_eq(isStringExpression('"definitely not normal string'), false);
        assert_eq(isStringExpression('Why does this string not have any quotes??'), false);
    }

    mohayVarNamingTests();
    mohayNumericExpressionTests();
    mohayStringExpressionTests();
}

tests();
