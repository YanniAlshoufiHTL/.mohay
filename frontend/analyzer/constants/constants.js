class constant {
    static InitConstant(value, line, scopestart, scopeend) {
        this.type = "constant";
        this.value = value;
        this.line = line;
        this.scopestart = scopestart;
        this.scopeend = scopeend;
        return this;
    }
}
