namespace transpiler.Logic.Composite_interfaces {
    public interface IPosition : IExpression {
        public IValue X { get; set; }
        public IValue Y { get; set; }
    }

}