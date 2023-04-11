class line {
    static InitLineWithString(p1, p2) {
        this.p1 = p1.replace("(", "").replace(")", "").trim();
        this.p2 = p2.replace("(", "").replace(")", "").trim();
        //3,8
        //3,29
    }
    static InitLineWithPoints(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}
