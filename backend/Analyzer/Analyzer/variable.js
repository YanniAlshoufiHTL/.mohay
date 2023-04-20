function checkSyntaxVariable(line) {
    //not checking for "." because this method only gets called after "."
    if (!line.includes("=")) {
        return "not valid Syntax for variable"; //not valid Syntax
    }
}
class variable {
    constructor(name, type, value) {
        this.name = name;
        this.type = type;

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
