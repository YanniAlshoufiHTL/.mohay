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
 *
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
    if (line[0] === "$")
      return "TODO: MAKE THIS RETURN ERROR!";

    let syntaxObjectLine = getSyntaxObjectLine(line);
  }

  return result;
}

window.analyze = analyze;

/* example result: { ["inline": ["//", "// <text>", "//", "<text>"] }
 * if multiple lines are affected, the following is a valid response using "$nextLine"
 * { "$nextLine": 10, ["/*", "/* <mtext> *\/", "/*", "<ml>", "<text>", "<ml>", "*\/"] }
 *
 * if no result was found, the function returns undefined
 */

/*
 let bar = undefined;

  for (const [index, [innerKey, innerValue]] of Object.entries(Object.entries(languageSyntax[key]))) {
    if (Object.entries(languageSyntax[key])[index][0] === "$common" && +index === 0) {
      bar = innerValue;
    } else {

    }
  }
*/

function getSyntaxObjectLine(line) {
  let result = {}

  for (const key in languageSyntax) {
    for (const [index, [innerKey, innerValue]] of Object.entries(Object.entries(languageSyntax[key]))) {

      let keyword = innerValue[0];
      if (keyword && keyword !== "" && innerKey[0] !== "$") {
        let firstWordOfLine = line.split(" ")[0];
        //
        // console.log("\n" + firstWordOfLine);
        // console.log(keyword);
        //
        // for (let i = 0; i < keyword.length && firstWordOfLine.length; i++) {
        //   console.log(keyword.codePointAt(i), firstWordOfLine.codePointAt(i));
        // }
        //
        // console.log(firstWordOfLine === keyword);

        if (line.split(" ")[0] === keyword || line[0] === "." && keyword === ".") {
          console.log("PINGO!");
          console.table("Keyword: " + keyword)
          console.table(Object.entries(languageSyntax[key])[index]);
        }
      }
    }
  }

  return result;
}
