class variable {
    static InitWithValue(name, value, line, scopestart, scopeend) {
        this.name = name;
        this.value = value;
        this.type = "variable";
        this.line = line;
        this.scopestart = scopestart;
        this.scopeend = scopeend;
        return this;
    }
    static InitWithoutValue(name, line, scopestart, scopeend) {
        this.name = name;
        this.value = null;
        this.type = "variable";
        this.type = null;
        this.line = line;
        this.scopestart = scopestart;
        this.scopeend = scopeend;
        return this;
    }
    static InitWithPoint(point, line, scopestart, scopeend) {
        this.name = null;
        this.value = point;
        this.type = "variable";
        this.contain = "point";
        this.line = line;
        this.scopestart = scopestart;
        this.scopeend = scopeend;
        return this;
    }
    static InitWithVector(vector, line, scopestart, scopeend) {
        this.name = null;
        this.value = vector;
        this.type = "variable";
        this.contain = "vector";
        this.line = line;
        this.scopestart = scopestart;
        this.scopeend = scopeend;
        return this;
    }
    declare(value, type = null) {
        this.value = value;
        if (type !== null) {
            this.contain = type;
        }
    }
}
