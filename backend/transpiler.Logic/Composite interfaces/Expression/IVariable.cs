namespace transpiler.Logic.Composite_interfaces {
    public interface IVariable : IExpression {
        public IValue Name { get; set; }
        public IValue Value { get; set; }
    }
}
