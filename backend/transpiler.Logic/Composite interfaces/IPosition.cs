namespace transpiler.Logic.Composite_interfaces;
internal interface IPosition : IExpression {
    INumeric X { get; set; }
    INumeric Y { get; set; }
}