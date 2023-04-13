let globalfilename = null;
let variables = [];
let constants = [];
let shapes = [];
let errors = [];

class Analyzer {
    constructor() {
        this.analyzer = new Analyzer();
    }
    analyze(code, filename) {
        let line = 0;
        globalfilename = filename;

        // analyze the code
        for (line of code) {
            // analyze the line
            line.trim();
            if (line.startsWith(".")) {
                //datatype
                let error = checkSyntaxVariable(line);
                if (error != null) {
                    errors.push(
                        error + "\n" + "at line ${line}" + "in file ${globalfilename}"
                    );
                } else {
                    let name = getStringBetween(line, ".", "=");
                    let value = getStringBetween(line, "=", "\n");
                    let variable = new variable(name, value);
                }
            }
            line++;
        }
        return errors.length > 0 ? errors : "analyzed successfully";
    }
}
