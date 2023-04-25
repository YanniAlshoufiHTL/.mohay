function checkSyntaxVariable(line) {
    let error;
    //not checking for "." because this method only gets called after "."
    if (!line.includes("=")) {
        error = "not valid Syntax for variable "; //not valid Syntax
    }
    console.log(getRestOfString(line, "="));
    debugger;

    return error;
}
class variable {
    constructor(name, type, value, line) {
        this.name = name;
        this.type = type;
        this.line = line;

        switch (type) {
            case "rect":
                console.log("entring rect");
                this.value = new rect(value);
                break;
            case "circle":
                console.log("point");
                this.value = new circle(getStringBetween(value, "point", "\n"));
                break;
            default:
                errors.push(
                    new String(
                        "not valid type or not declared" +
                            "at line " +
                            codeline +
                            "in file " +
                            globalfilename
                    )
                );
                break;
        }
    }
}
