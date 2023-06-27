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
export async function analyzeAndGetNew(code) {
    const analyzed = analyze(code);

    if (!analyzed.codeCorrect) return analyzed;

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
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: getTranspilableCode(code).trim(),
        }),
    };

    const transpiledCode = await fetch(
        "http://192.168.127.251:7000/loose-transpile",
        options
    ).then((x) => x.json());

    return transpiledCode ? transpiledCode : null;
}

/**
 * @method
 * @param {String} code
 * @returns {String}
 */
function getTranspilableCode(code) {
    code = code
        .split("\n")
        .map((x) => {
            x = x.trim();

            if (x.includes("//")) {
                const idx = x.indexOf("//");
                x = x.substring(0, idx).trim();
            }

            const parPairs = getParPairs(x);
            for (let i = parPairs.length - 1; i >= 0; i--) {
                const pair = parPairs[i];

                for (let j = pair[1]; j >= pair[0]; j--) {
                    if (x[j] === " ") (x = x.slice(0, j)), x.slice(j + 1);
                }
            }

            return x;
        })
        .join("\n");

    while (code.includes("\n\n")) code = code.replaceAll("\n\n", "\n");

    while (code.includes("  ")) code = code.replaceAll("  ", " ");

    return code;
}

/**
 * @method
 * @param {String} string
 * @return {Array.<[number, number]>}
 */
function getParPairs(string) {
    let pairs = [];
    let isIn = false;

    for (const [idx, char] of string.split("").entries()) {
        if (!isIn && char === "(") {
            pairs.push([idx]);
            isIn = true;
        } else if (isIn && char === ")") {
            pairs[pairs.length - 1].push(idx);
            isIn = false;
        }
    }

    return pairs;
}
