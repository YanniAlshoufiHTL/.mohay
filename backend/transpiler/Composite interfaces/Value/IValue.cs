using System.Runtime.CompilerServices;

namespace transpiler.Logic.Composite_interfaces {
    public interface IValue : IExpression {
        public string _Value { get; set; }
        public string ToString();
    }
}