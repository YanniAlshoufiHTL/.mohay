/* Syntax Conventions:
 *
 * SyntacticParams:
 * <expr>  : An expression that returns a values
 * <nume>  : A nummeric expression
 * <point> : A point, which is equivilant to '(<nume>, <nume>)'
 * <name>  : The name of the currently relevant symbol
 * <text>  : Plain inline text
 *
 * Syntax Array: keyword + syntax string.
 *
 * '+' in a syntax string represent n spaces while n > 1.
 * If 0 or more spaces are OK it's represented by '^'.
 *
 * A bar/pipe ('|') represents the keyword.
 */

let languageSyntax = {
    // These return a boolean which indicates that str is valid
    syntacticPramsCheckers: {
        "<expr>":  str => isStringExpression(str) || isNumericExpression(str),
        "<nume>":  str => isNumericExpression(str),
        "<str>": str => isStringExpression(str),

        "<point>": str => isPoint(str),

        "<name>":  str => isNameAllowed(str),

        "<text>":  _ => true,

        "<hex>": str => isHexExpression(str),

        "<bool>": str => str === "true" || str === "false",
    },

    declarations: {
        "constants": [ "wow",      "wow+<name>+=+<nume>"], // We might add support for <expr> (which includes <str>) later, 
        "variables": [ ".",        ".<name>+=+<nume>"], // but right now it's just a pain in the neck
    },

    predefinedFunctions: {
        "rect":      [ "rect",     "|+<point>+<nume>+<nume>"],
        "line":      [ "line",     "|+<point>+<point>"],
        "circle":    [ "circle",   "|+<point>+<nume>"],
        "arc":       [ "arc",      "|+<point>+<nume>+<nume>+<nume>"],
        "triangle":  [ "triangle", "|+<point>+<point>+<point>"],
        "polygon":   [ "polygon",  "|+<point>+<nume>+<nume>+<nume>"],
        "c":         [ "c",        "|+<hex>"],
        "f":         [ "f",        "|+<bool>"],
        "s":         [ "s",        "|+<bool>"],
    },

    comments: {
        "inline":    [ "//", "//<text>"],
    },

    predefinedConstants: [
        "PI",
        "E",
    ],
}

let runtimeVarsConsts = {};

/**
 * @method
 * @param {string} name
 * @returns {boolean}
 */
function isNameAllowed(name) {
    return name !== "" && typeof name === "string" && /^[a-zA-Z_]*$/.test(name);
}

/**
 * @method
 * @param {string} expression
 * @returns {boolean}
 */
function isNumericExpression(expression) {
    const trimmed = expression.trim();

    return typeof expression === "string" &&
        trimmed !== "" &&
        (
            trimmed === "NaN" ||
            isFinite(trimmed) ||
            /^((- *)|(-))?Infinity+$/g.test(trimmed) ||
            runtimeVarsConsts[trimmed] !== undefined && runtimeVarsConsts[trimmed] === "<nume>"
        );
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

    return first === "\"" && last === "\"" ||
           runtimeVarsConsts[trimmed] !== undefined && runtimeVarsConsts[trimmed] === "<str>";
}

/**
 * @method
 * @param {string} expression
 * @returns {boolean}
 */
function isHexExpression(expression) {
   return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(expression);
}

/**
 * @method
 * @param {string} str
 * @returns {string}
 */
function replaceInQuoteSpacesWithUnicodeChar(str) {
    let inStr = false;

    for (const [idx, char] of str.split("").entries()) {
        if (!inStr && str === '"')
            inStr = true;
        else if (inStr && str === '"')
            inStr = false;

        if (inStr && char === " ") {
            str[idx] = "\u2800";
        }
    }

    return str;
}

/**
 * @method
 * @param {string} str
 * @returns {Array.<Array.<int>>}
 */
function getParsInString(str) {
    let parr = [];
    let isIn = false;

    for (const [i, char] of str.split("").entries()) {
        if (!isIn && char === '(') {
            isIn = true;
            parr.push([i]);
        }

        if (isIn && char === ')') {
            isIn = false;
            parr[parr.length - 1].push(i);
        }
    }

    return parr;
}

/**
 * @method
 * @param {string} str
 * @returns {boolean}
 */

function isPoint(str) {
    if (str[0] !== "(" || str[str.length - 1] !== ")")
        return false;   

    if (str.split("").filter(a => a === ",").length !== 1)
        return false;

    const commaIdx = str.indexOf(",");

    const first = str.substring(1, commaIdx);
    const second = str.substring(commaIdx + 1, str.length - 1);

    if (first == "" || second == "") // the '==' intead of '===' is on purpose
        return false;

    if (!isNumericExpression(first) || !isNumericExpression(second))
        return false;

    return true;
}

/**
 * @method
 * @param {string} str
 * @param {string} syntax
 * @returns {boolean}
 */
function followsSyntax(str, syntax) {
    while (str.indexOf("  ") !== -1)
        str = str.replaceAll("  ", " ");

    str = str.replaceAll("*", " ");

    // In this piece of code, I'm removing all spaces within a point.
    // Generally speaking it's bad practice to bind a generalization to a concrete case.
    // Meaning, it's really bad that I'm basically assuming that the '^'s only occur in parentheses
    // and so I don't have to deal with them, I'm removing all spaces from within a bracket.
    // Here, I didn't have much time to think about implementation details,
    // so I'm just implementing it like this.
    let parenthesesIndexes = getParsInString(str);
    for (const parPair of parenthesesIndexes) {
        for (let i = parPair[1]; i >= parPair[0]; i--) {
            if (str[i] === ' ')
                str = str.slice(0, i) + str.slice(i + 1);
        }
    }

    // same for point
    if (syntax[0] === '.') {
        syntax = syntax.slice(1);
        str = str.slice(1);
    }

    // End of bad code.

    let splitSyntax = syntax.split('+');
    let splitStr = str.split(' ');

    if (splitSyntax.length !== splitStr.length)
        return false;

    for (let [idx, syn] of splitSyntax.entries()) {
        syn = syn.trim();

        if (languageSyntax.syntacticPramsCheckers[syn] !== undefined) {
            const follows = languageSyntax.syntacticPramsCheckers[syn](splitStr[idx]);

            if (follows === false)
                return false;
        } else if (splitStr[idx] !== splitSyntax[idx])
                return false;

    };

    return true;
}

/* Unit Testing */
/**
 * @method
 * @returns {void}
 */
function _tests() {
    console.log("\n\n\n\n\nUnit testing...\n");

    const mohayVarNamingTests = () => {
        console.log("\n\n\n\n\nVariable Naming Tests...\n\n\n");

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
        console.log("\n\n\n\n\nNummeric Expression Tests...\n\n\n");

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

        assert_eq(isNumericExpression(""), false, "empty string");
        assert_eq(isNumericExpression("   -    0 "), false, "   -    0 ");
        assert_eq(isNumericExpression("4,5"), false, "4,5");
        assert_eq(isNumericExpression("_"), false, "_");
        assert_eq(isNumericExpression("Inf"), false, "Inf");
        assert_eq(isNumericExpression("infinity"), false, "infinity");
        assert_eq(isNumericExpression("infinity-"), false, "infinity");
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
        console.log("\n\n\n\n\nString Expression Tests...\n\n\n");

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

    const mohaySyntaxExpressionTests = () => {
        console.log("\n\n\n\n\nSyntax Expression Tests...\n\n\n");

        assert_eq(followsSyntax("(4, 5)",  "<point>"), true, "Point: '(4, 5)'");
        assert_eq(followsSyntax("(4, 5)",  "<point>"), true, "Point: '(4, 5)'");
        assert_eq(followsSyntax("(Infinity, 5)",  "<point>"), true, "Point: '(Infinity, 5)'");

        assert_eq(followsSyntax("(4; 5)",  "<point>"), false, "Point: '(4; 5)'");
        assert_eq(followsSyntax("(_, 5)",  "<point>"), false, "Point: '(_, 5)'");
        assert_eq(followsSyntax("(infinity, 5)",  "<point>"), false, "Point: '(infinity, 5)'");
        assert_eq(followsSyntax("(3, 2) (4, 61) (4, 2)", "<point>"), false, "(3, 2) (4, 61) (4, 2)");
    }

    mohayVarNamingTests();
    mohayNumericExpressionTests();
    mohayStringExpressionTests();
    mohaySyntaxExpressionTests();
}
// _tests();
