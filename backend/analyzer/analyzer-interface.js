/**
 * analyze function (takes String, outputs object)
 *
 * output object interface:
 * {
 *  codeCorrect: boolean,
 *  errorLine: number,
 *  failureReason: String
 * }
 *
 * @method
 * @param {string} code
 * @returns {Object}
 */
function analyze(code) {
    let result = {
        codeCorrect: true,
        errorLine: -1,
        failureReason: "",
    };

    let lines = code.split(/\r?\n/);

    for (let [idx, line] of lines.entries()) {
        line = line.trim();

        if (line !== "" && !(line[0] === "/" && line[1] === "/")) {
            if (line[0] === "$") {
                result.codeCorrect = false;
                result.errorLine = idx;
                result.failureReason = "A line cannot start with a dollar sign!";

                return result;
            }

            let someKeyWasOk = false;
            for (const key in languageSyntax) {
                for (const [index, [innerKey, innerValue]] of Object.entries(Object.entries(languageSyntax[key]))) {
                    let keyword = innerValue[0];

                    if (keyword && keyword !== "" && innerKey[0] !== "$") {
                        const splitLine = line.split(" ");
                        const firstWordOfLine = splitLine[0];

                        if (firstWordOfLine === keyword || line[0] === "." && keyword === ".") {
                            someKeyWasOk = true;

                            let syntaxLine = Object.entries(languageSyntax[key])[index];
                            let symanticSyntaxLine = syntaxLine[1];

                            symanticSyntaxLine[1] = symanticSyntaxLine[1].split("").map((value, _) => value == "|" 
                                ? symanticSyntaxLine[0] 
                                : value).join("");

                            const syntax = symanticSyntaxLine[1];
                            const str = line;

                            if (!followsSyntax(str, syntax)) {
                                result.codeCorrect = false;
                                result.errorLine = idx;
                                result.failureReason = 
                                    `This line doesn't follow the syntax for ${line[0] === "." ? "variables" : `'${line.split(" ")[0]}'`}.`
                            }

                            if (keyword === "wow" || line[0] === ".") {
                                const varConstName = line[0] === "." ? splitLine[0] : splitLine[1];

                                if (runtimeVarsConsts[varConstName] !== undefined) {
                                    result.codeCorrect = false;
                                    result.errorLine = idx;
                                    result.failureReason = `A variable or constant with the name ${varConstName} already exists.`;
                                }
                                
                                const varConstType = followsSyntax(splitLine[splitLine.length - 1], "<nume>") ? "<nume>" : "<str>";
                                runtimeVarsConsts[varConstName] = varConstType;
                            }
                        }
                    }
                }
            }

            if (!someKeyWasOk) {
                result.codeCorrect = false;
                result.errorLine = idx;
                result.failureReason = `Cannot resolve symbol '${line.split(" ")[0]}'.`;
                return result;
            }
        }
    }

    return result;
}

window.analyze = analyze;
