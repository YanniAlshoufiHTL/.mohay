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
