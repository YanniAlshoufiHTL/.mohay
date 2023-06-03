/* Syntax Conventions:
 *
 * <expr>  : An expression that returns a values
 * <nume>  : A nummeric expression
 * <point> : A point, which is equivilant to '(<nume>, <nume>)'
 * <name>  : The name of the currently relevant symbol
 * <func>  : A function
 * <mtext> : Plain multiline text
 * <text>  : Plain inline text
 *
 * Syntax is always given as an array, first containing the entire syntax and then the single elements of it. Spaces before and after the above named special conventions are ignored.
 *
 * If a grouping (a js object) of things contains a partially equal syntax, the partially equal syntax is given at the beginning of the object with the "$common" key and each other element replaces it with a '|' symbol. Anything that IS different is denoted through '<param>' which will be replaced by the key of the object value.
 *
 * If spaces before or after '<…>' denoted syntax should NOT be ignored, a '<' + amout of spaces as space chars in js + '>' must be written.
 *
 * If there's an '*' before the '>' in a '<…>', the number of '<…>' given is up to the user.
 */

let languageSyntax = {
  declarations: {
    "constants": ["wow <name> = <Expr>", "<name>", "=", "<expr>"],
    "variables": [".<><name> = <Expr>"],
  },

  predefinedFunctions: {
    "$common": "<param>",
    "rect": ["| <point> <nume> <nume>", "|", "<nume>", "<nume>"],
    "circle": ["| <point> <nume>", "|", "<point>", "<nume>"],
    "line": ["| <point> <point>", "|", "<point>", "<point>"],
    "arc": ["| <point> <nume> <nume> <nume>", "|", "<nume>", "<nume>", "<nume>"],
    "triangle": ["| <point> <point> <point>", "|", "<point>", "<point>", "<point>"],
    "polygon": ["| <point> <nume> <nume> <nume>", "|", "<point>", "<nume>", "<nume>", "<nume>"],
    "vector": ["| <point*>", "|", '<point*>'],
  },

  predefinedConstants: {
    "$common": "<param>",
    "PI": ["|", "|"],
    "E": ["|", "|"],
  },

  comments: {
    "inline": ["// <text>", "//", "<text>"],
    "multiline": ["/* <mtext> */", "/*", "<ml>", "<text>", "<ml>", "*/"],
  }
}

let runtimeVariables = {};
let runtimeConstants = {};

let parameterAttributes = {};
let parameterlessAttributes = {};






