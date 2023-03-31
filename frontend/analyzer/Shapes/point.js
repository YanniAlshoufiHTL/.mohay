class point {
    static InitPoint(p1String) {
        this = p1String.replace("(", "").replace(")", "").trim();
        //3,8
        return this;
    }
    static InitPointWithPoint(p) {
        this = p;
        return this;
    }
}
