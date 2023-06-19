/**
 * @method
 * @param {string} code
 * @returns {{
 *     codeCorrect: boolean,
 *     errorLine: number,
 *     failureReason: String,
 *     code: String,
 * }}
 */
export function analyze(code) {
    runtimeVarsConsts = {};


    let lines = code.split(/\r?\n/);

    for (let [idx, line] of lines.entries()) {
        const commentIdx = line.indexOf("//");
        if (commentIdx !== -1) {
            line = line.substring(0, commentIdx).trim();
        }

        line = line.trim();

        if (line !== "") {
            if (line[0] === "$") {
                return getErrResult(idx, "A line cannot start with a dollar sign!");;
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
                               return getErrResult(idx, `This line doesn't follow the syntax for ${line[0] === "." ? "variables" : `'${line.split(" ")[0]}'`}.`);
                            }

                            if (keyword === "wow" || line[0] === ".") {
                                const varConstName = line[0] === "." ? splitLine[0] : splitLine[1];

                                if (keyword === "wow" && runtimeVarsConsts[varConstName] !== undefined) {
                                    return getErrResult(idx, `A variable or constant with the name ${varConstName} already exists.`);
                                }
                                
                                const varConstType = followsSyntax(splitLine[splitLine.length - 1], "<nume>") ? "<nume>" : "<str>";
                                runtimeVarsConsts[varConstName] = varConstType;
                            }
                        }
                    }
                }
            }

            if (!someKeyWasOk) {
                return getErrResult(idx, `Cannot resolve symbol '${line.split(" ")[0]}'.`);
            }
        }
    }

    // TODO
    // Refactor this monstrosity of a code
    // Make it READABLE
    // Make sure it still works

 
    return {
        codeCorrect: true,
        errorLine: -1,
        failureReason: "",
        code: "",
    };  
}

/**
 * @method
 * @param {number} idx0
 * @param {String} message
 * @returns {Object}
 */
function getErrResult(idx0, message) {
    return {
        codeCorrect : false,
        errorLine : idx0 + 1,
        failureReason : message,
        code: "",
    }
}

window.analyze = analyze;
