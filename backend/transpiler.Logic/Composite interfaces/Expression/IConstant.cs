namespace transpiler.Logic.Composite_interfaces {
    public interface IConstant : IExpression {
        public IValue Value { get; set; }
    }

}
