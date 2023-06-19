namespace transpiler.Logic.Composite_interfaces {
    public interface IKeyword : IExpression {
        public IValue Name { get; set; }
    }
}