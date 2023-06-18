namespace transpiler.Logic.Composite_interfaces {
    internal interface IVariable : IExpression {
        public IExpression expression { get; set; }
    }

}
