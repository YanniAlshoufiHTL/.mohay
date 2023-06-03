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
 * Syntax is always given as an array, first containing the keyword or undefined for no keyword, then the entire syntax and lastly the single elements of it. Spaces before and after the above named special conventions are ignored.
 *
 * If a grouping (a js object) of things contains a partially equal syntax, the partially equal syntax is given at the beginning of the object with the "$common" key and each other element replaces it with a '|' symbol. Anything that IS different is denoted through '<param>' which will be replaced by the key of the object value.
 *
 * If spaces before or after '<…>' denoted syntax should NOT be ignored, a '<' + amout of spaces as space chars in js + '>' must be written.
 *
 * If there's an '*' before the '>' in a '<…>', the number of '<…>' given is up to the user.
 *
 */

// TODO: MAKE SURE RETURN TYPE OF EXPRESSIONS IS SOMEHOW PROGRAMMED IN!!

export let languageSyntax = {
  declarations: {
    "constants": ["wow" , "wow <name> = <expr>", "<name>", "=", "<expr>"],
    "variables": [".", ".<><name> = <expr>", ".", "<><name>", "=", "<expr>"],
  },

  predefinedFunctions: {
    "$common": "<param>",
    "rect": ["rect", "| <point> <nume> <nume>", "|", "<point>", "<nume>", "<nume>"],
    "circle": ["circle", "| <point> <nume>", "|", "<point>", "<nume>"],
    "line": ["line", "| <point> <point>", "|", "<point>", "<point>"],
    "arc": ["arc", "| <point> <nume> <nume> <nume>", "|", "<nume>", "<nume>", "<nume>"],
    "triangle": ["triangle", "| <point> <point> <point>", "|", "<point>", "<point>", "<point>"],
    "polygon": ["polygon", "| <point> <nume> <nume> <nume>", "|", "<point>", "<nume>", "<nume>", "<nume>"],
    "vector": ["vector", "| <point*>", "|", '<point*>'],
  },

  predefinedConstants: {
    "$common": "<param>",
    "PI": [undefined, "|", "|"],
    "E": [undefined, "|", "|"],
  },

  comments: {
    "inline": ["//", "// <text>", "//", "<text>"],
    "multiline": ["/*", "/* <mtext> */", "/*", "<ml>", "<text>", "<ml>", "*/"],
  }
}

let runtimeVariables = {};
let runtimeConstants = {};

let parameterAttributes = {};
let parameterlessAttributes = {};






