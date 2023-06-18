namespace transpiler.Logic.Composite_interfaces {
    public interface IConstant : IExpression {
        public IValue Value { get; set; }
        public IValue Name { get; set; }
    }

}
