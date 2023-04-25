let globalfilename;
let variables;
let constants;
let shapes;
let errors;

function analyze() {
    let code = document.getElementById("myDiv").innerText;
    let filename = "test.mohay";

    code = code.split("\n");
    code.filter((a) => a != "");
    code = code.map((str) => str.trim());

    let codeline = 0;
    globalfilename = filename;
    variables = [];
    constants = [];
    shapes = [];
    errors = [];

    // analyze the code
    for (line of code) {
        // analyze the line
        if (line.startsWith(".")) {
            //datatype
            let error = checkSyntaxVariable(line);
            if (error != null) {
                errors.push(
                    new String(
                        error +
                            "at line " +
                            codeline +
                            "in file " +
                            globalfilename
                    )
                );
            } else {
                let name = getStringBetween(line, ".", "=").trim();
                let value = getRestOfString(line, "rect");
                let type = getStringBetween(line, "=", "(").trim();

                let datatype = new variable(name, type, value, codeline);
                variables.push(datatype);
            }
        } else {
            errors.push(
                new String(
                    "Invalid line " +
                        "at line " +
                        codeline +
                        " in file " +
                        globalfilename
                )
            );
        }
        codeline++;
    }

    if (variables.length > 0) {
        console.table(variables);
    }

    console.table(errors);
    return errors.length > 0 ? errors : "analyzed successfully";
}
function sendDivContent() {
    var divContent = document.getElementById("myDiv").innerHTML;
    let data = analyze(divContent, "test.mohay");
    console.log(data);
}
