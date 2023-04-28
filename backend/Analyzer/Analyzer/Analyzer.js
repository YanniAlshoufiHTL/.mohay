function analyze(filename) {
    let code = document.getElementById("myDiv").innerText;

    let erros = [];
    let tokens = [];

    let lines = code.split("\n");
    lines = lines.filter((item) => item !== "");

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let lineTokens = line.split(" ");
        lineTokens = lineTokens.filter((item) => item !== "");

        let linetokens = [];
        for (let j = 0; j < lineTokens.length; j++) {
            let token = lineTokens[j];
            let tokenType = getTokenType(token);
            if (tokenType === "error") {
                erros.push(token);
            }
            linetokens.push([token, tokenType]);
        }
        let lineResult = checkline(linetokens);
        tokens.push([linetokens, lineResult]);
    }
    console.log(tokens);
}
