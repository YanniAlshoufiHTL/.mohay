namespace transpiler.Logic.Composite_interfaces {
    public interface IConstant : IExpression {
        public INumeric Value { get; set; }
    }

}
