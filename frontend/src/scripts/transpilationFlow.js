import { analyze } from "./analyzer-interface";

/*
 * @method
 * @param {string} code
 * @returns {{
 *     codeCorrect: boolean,
 *     errorLine: number,
 *     failureReason: String,
 *     code: String,
 * }}
 */
async function analyzeAndGetNew(code) {
    const analyzed = analyze(code);

    if (!analyzed.codeCorrect)
        return analyzed;

    const jsCode = await transpileCode(code);

    return {
        codeCorrect: true,
        errorLine: -1,
        failureReason: "",
        code: jsCode,
    };
}

/**
 * @method
 * @param {String} code
 * @return {Promise<null> | Promise<String>}
 */
async function transpileCode(code) {
    const transpiledCode = await fetch("/loose_transpile", {
        method: "POST",
        body: {
            code: code,
        },
    })

    return transpiledCode ? transpiledCode : null;
}
