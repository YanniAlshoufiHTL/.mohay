let globalfilename;
let variables;
let constants;
let shapes;
let errors;

function analyze() {
    let code = document.getElementById("myDiv").textContent;
    let filename = "test.mohay";

    let codeline = 0;
    globalfilename = filename;
    variables = [];
    constants = [];
    shapes = [];
    errors = [];

    // analyze the code
    for (line of code.split("\n")) {
        // analyze the line
        line.trim();
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
                let datatype = new variable(name, type, value);
                variables.push(datatype);
            }
        }
        codeline++;
    }
    console.table(variables);
    return errors.length > 0 ? errors : "analyzed successfully";
}
function sendDivContent() {
    var divContent = document.getElementById("myDiv").innerHTML;
    let data = analyze(divContent, "test.mohay");
    console.log(data);
}
