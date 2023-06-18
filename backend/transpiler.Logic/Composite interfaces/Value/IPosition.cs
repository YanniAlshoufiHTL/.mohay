namespace transpiler.Logic.Composite_interfaces {
    public interface IPosition : IExpression {
        public INumeric X { get; set; }
        public INumeric Y { get; set; }
    }

}